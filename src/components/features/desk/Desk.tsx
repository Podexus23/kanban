// - Стандартные колонки: "To Do", "In Progress", "Done" ✔️
// - Возможность добавлять/удалять/переименовывать колонки ✔️
// - Горизонтальный скролл или адаптивное отображение колонок ✔️

import { useRef, useState } from "react";
import styles from "./Desk.module.css";
import { faker } from "@faker-js/faker";
import Task from "../Task/Task";
import Button from "../../Button";
import NewTask from "../Task/NewTask";

const makeTask = () => {
  return {
    text: faker.lorem.lines({ min: 1, max: 1 }),
    title: faker.lorem.words({ min: 2, max: 6 }),
    id: faker.string.uuid(),
  };
};

function Desk({
  deskTitle,
  onDeleteDesk,
  onRenameDeskTitle,
  onHandleOver,
  refDragParent,
  refDragTask,
  refNewTaskParent,
}) {
  const [tasks, setTasks] = useState(
    Array.from({ length: 4 }, (_, index) => makeTask())
  );
  const [draggable, setDraggable] = useState(null);
  const [isAddNewTask, setIsAddNewTask] = useState(false);

  const dragOver = useRef(null);

  //task drag
  const handleTaskDragEnd = (e) => {
    const toMoveIndex = tasks.findIndex((task) => task.id == dragOver.current);
    const draggableIndex = tasks.findIndex((task) => task.id == draggable);

    const newTasks = [...tasks];
    if (refNewTaskParent.current === refDragParent.current) {
      // удаляем элемент
      newTasks.splice(draggableIndex, 1);
      // Вставляем элемент на новую позицию
      newTasks.splice(toMoveIndex, 0, tasks[draggableIndex]);
    } else if (e.dataTransfer.dropEffect === "move") {
      newTasks.splice(draggableIndex, 1);
    }

    setTasks(newTasks);
    setDraggable(null);
    dragOver.current = null;
    refDragParent.current = null;
    refNewTaskParent.current = null;
  };
  const handleStartDragTask = (e, id) => {
    setDraggable(id);
    e.dataTransfer.effectAllowed = "move";
    refDragParent.current = deskTitle;
    refDragTask.current = tasks.find((task) => task.id === id);
  };

  //desk drop
  const handleDragOverDesk = (e) => {
    e.preventDefault();
    onHandleOver(e, deskTitle);
  };
  const handleEndTaskDrop = (e) => {
    if (refDragParent.current === deskTitle) return;
    e.preventDefault();
    let toMoveIndex = tasks.findIndex((task) => task.id == dragOver.current);
    const newTasks = [...tasks];

    if (dragOver.current === null) {
      const elemHeight = e.target.offsetHeight;
      const dropHeight = e.nativeEvent.offsetY;

      toMoveIndex = dropHeight > elemHeight / 2 ? newTasks.length : 0;
    }
    // Вставляем элемент на новую позицию
    newTasks.splice(toMoveIndex, 0, refDragTask.current);

    setTasks(newTasks);
    setDraggable(null);
    dragOver.current = null;
    refDragParent.current = null;
  };
  //task management
  const handleOpenNewTaskBlock = () => {
    setIsAddNewTask(true);
  };

  const handleCloseAddNewTask = () => {
    setIsAddNewTask(false);
  };

  const handleSubmitNewTask = ({ description, title }) => {
    setTasks((tasks) => [
      ...tasks,
      { text: description, title: title, id: faker.string.uuid() },
    ]);

    setIsAddNewTask(false);
  };

  const handleRemoveTask = (e, id) => {
    setTasks((tasks) => [...tasks.filter((task) => task.id !== id)]);
  };
  const handleEditTask = (id, type, data) => {
    console.log(id, type, data);
    setTasks((tasks) => {
      const task = tasks.find((task) => task.id === id);
      if (!task) return tasks;
      if (type === "title") task.title = data;
      if (type === "description") task.text = data;
      return tasks;
    });
  };

  return (
    <div
      className={styles.desk}
      onDragOver={handleDragOverDesk}
      onDrop={handleEndTaskDrop}
    >
      <DeskHeader
        title={deskTitle}
        onDeleteDesk={onDeleteDesk}
        onRenameDeskTitle={onRenameDeskTitle}
      />
      <Button
        onClick={handleOpenNewTaskBlock}
        name={"+ add new task"}
        size={"medium"}
      />
      {isAddNewTask && (
        <NewTask
          onCloseAddNewTask={handleCloseAddNewTask}
          onSubmitTask={handleSubmitNewTask}
        />
      )}
      <main>
        <div className={styles.tasklist}>
          {tasks.map((task) => (
            <Task
              task={task}
              key={task.id}
              dragOver={dragOver}
              onDragStart={handleStartDragTask}
              onDragEnd={handleTaskDragEnd}
              onRemoveTask={handleRemoveTask}
              onEditTask={handleEditTask}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

function DeskHeader({ title, onDeleteDesk, onRenameDeskTitle }) {
  const [isRename, setIsRename] = useState(false);
  const [titleInput, setTitleInput] = useState(title);

  //delete desk
  function handleDeleteDesk() {
    onDeleteDesk(title);
  }
  //rename desk
  function handleRenameDeskTitle() {
    setIsRename(true);
  }

  function handleAddNewTitle() {
    onRenameDeskTitle(title, titleInput);
    setIsRename(false);
  }

  return (
    <header className={styles.header}>
      {isRename ? (
        <div>
          <input
            type={"text"}
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
          />
          <Button
            onClick={handleAddNewTitle}
            name={`✔️`}
            title={'title="delete desk'}
            size={"small"}
          />
        </div>
      ) : (
        <h2>{title}</h2>
      )}

      <div className={styles.buttons}>
        <Button
          onClick={handleDeleteDesk}
          name={`❌`}
          title={'title="delete desk'}
          size={"small"}
        />
        <Button
          onClick={handleRenameDeskTitle}
          name={`✏️`}
          title={"edit desk name"}
          size={"small"}
        />
      </div>
    </header>
  );
}

export default Desk;
