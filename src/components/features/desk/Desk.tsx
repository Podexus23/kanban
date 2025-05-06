// - Стандартные колонки: "To Do", "In Progress", "Done" ✔️
// - Возможность добавлять/удалять/переименовывать колонки ✔️
// - Горизонтальный скролл или адаптивное отображение колонок ✔️
import { useEffect, useRef, useState } from "react";
import styles from "./Desk.module.css";
import { faker } from "@faker-js/faker";
import Task from "../Task/Task";
import Button from "../../Button";

const makeTask = () => {
  return {
    text: faker.lorem.lines({ min: 1, max: 1 }),
    id: faker.string.uuid(),
  };
};

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

function Desk({ deskTitle, onDeleteDesk, onRenameDeskTitle }) {
  const [tasks, setTasks] = useState(
    Array.from({ length: 4 }, (_, index) => makeTask())
  );
  const [draggable, setDraggable] = useState(null);
  const dragOver = useRef(null);

  const handleAddTask = () => {
    setTasks((tasks) => [...tasks, makeTask()]);
  };

  const handleTaskDragEnd = (e) => {
    const toMoveIndex = tasks.findIndex((task) => task.id == dragOver.current);
    const draggableIndex = tasks.findIndex((task) => task.id == draggable);

    const newTasks = [...tasks];
    newTasks.splice(draggableIndex, 1);
    // Вставляем элемент на новую позицию
    newTasks.splice(toMoveIndex, 0, tasks[draggableIndex]);
    setTasks(newTasks);

    setDraggable(null);
    dragOver.current = null;
    console.log("end");
  };

  return (
    <div
      className={styles.desk}
      // onDragOver={() => console.log(dragOver.current)}
    >
      <DeskHeader
        title={deskTitle}
        onDeleteDesk={onDeleteDesk}
        onRenameDeskTitle={onRenameDeskTitle}
      />
      <Button onClick={handleAddTask} name={"+ add new task"} size={"medium"} />
      <main>
        <div className={styles.tasklist}>
          {tasks.map((task) => (
            <Task
              task={task}
              key={task.id}
              dragOver={dragOver}
              onDraggable={setDraggable}
              onDragEnd={handleTaskDragEnd}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Desk;
