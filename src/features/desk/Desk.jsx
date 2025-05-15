// - Стандартные колонки: "To Do", "In Progress", "Done" ✔️
// - Возможность добавлять/удалять/переименовывать колонки ✔️
// - Горизонтальный скролл или адаптивное отображение колонок ✔️

import { useRef, useState } from "react";
import styles from "./Desk.module.css";
import { faker } from "@faker-js/faker";
import Task from "../Task/Task";
import Button from "../../components/Button";
import NewTask from "../Task/NewTask";
import { useTranslation } from "react-i18next";

// const makeTask = () => {
//   return {
//     text: faker.lorem.lines({ min: 1, max: 1 }),
//     title: faker.lorem.words({ min: 2, max: 6 }),
//     id: faker.string.uuid(),
//   };
// };

function Desk({
  deskTitle,
  onDeleteDesk,
  data,
  onDeskUpdate,
  onRenameDeskTitle,
  onHandleOver,
  refDragParent,
  refDragTask,
  refNewTaskParent,
}) {
  const { t } = useTranslation();
  const [tasks, setTasks] = useState([...data]);

  const [draggable, setDraggable] = useState(null);
  const [isAddNewTask, setIsAddNewTask] = useState(false);

  const dragOver = useRef(null);

  //wrapper around task updates
  const handleTaskUpdates = (newData) => {
    onDeskUpdate(deskTitle, newData);
    setTasks(newData);
  };

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

    handleTaskUpdates(newTasks);
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

    handleTaskUpdates(newTasks);
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
    const newTasks = [
      ...tasks,
      { text: description, title: title, id: faker.string.uuid() },
    ];
    handleTaskUpdates(newTasks);

    setIsAddNewTask(false);
  };

  const handleRemoveTask = (e, id) => {
    handleTaskUpdates([...tasks.filter((task) => task.id !== id)]);
  };

  const handleEditTask = (id, type, data) => {
    const newTasks = [...tasks];
    const task = newTasks.find((task) => task.id === id);
    if (!task) return tasks;
    if (type === "title") task.title = data;
    if (type === "description") task.text = data;
    handleTaskUpdates(newTasks);
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
        name={t("task.add")}
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
  const { t } = useTranslation();
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
            title={t("desk.confirmNewTitle")}
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
          title={t("desk.remove")}
          size={"small"}
        />
        <Button
          onClick={handleRenameDeskTitle}
          name={`✏️`}
          title={t("desk.edit")}
          size={"small"}
        />
      </div>
    </header>
  );
}

export default Desk;
