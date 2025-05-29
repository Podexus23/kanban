import { useState } from "react";
import styles from "./Desk.module.css";
import { faker } from "@faker-js/faker";
import Task from "../Task/Task";
import Button from "../../components/Button";
import NewTask from "../Task/NewTask";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  removeDesk,
  renameDesk,
  selectDeskById,
  updateDeskData,
} from "../DesksPlace/desksSlice";

function Desk({ deskTitle }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => selectDeskById(state, deskTitle));

  const [isAddNewTask, setIsAddNewTask] = useState(false);

  //wrapper around task updates
  const handleTaskUpdates = (newData) => {
    dispatch(updateDeskData(deskTitle, newData));
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
    let index = newTasks.findIndex((task) => task.id === id);
    console.log(index);
    if (index < 0) return tasks;
    let newTask = { ...tasks[index] };

    if (type === "title") newTask.title = data;
    if (type === "description") newTask.text = data;
    newTasks.splice(index, 1, newTask);
    console.log(newTasks);
    handleTaskUpdates(newTasks);
  };

  return (
    <div className={styles.desk}>
      <DeskHeader title={deskTitle} />
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
              onRemoveTask={handleRemoveTask}
              onEditTask={handleEditTask}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

function DeskHeader({ title }) {
  const { t } = useTranslation();
  const [isRename, setIsRename] = useState(false);
  const [titleInput, setTitleInput] = useState(title);

  const dispatch = useDispatch();

  //rename desk local state
  function handleRenameDeskTitle() {
    setIsRename(true);
  }
  function handleAddNewTitle() {
    dispatch(renameDesk(title, titleInput));
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
          onClick={() => dispatch(removeDesk(title))}
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
