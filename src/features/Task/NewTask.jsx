import { useState } from "react";
import styles from "./Task.module.css";
import Button from "../../components/Button";

const NewTask = ({ onSubmitTask, onCloseAddNewTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmitTask = (e) => {
    e.preventDefault();
    onSubmitTask({ description, title });
    setTitle("");
    setDescription("");
  };

  return (
    <div className={styles.task}>
      <form onSubmit={handleSubmitTask}>
        <div className={styles.header}>
          <div className={styles.inputWrapper}>
            <input
              type={"text"}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.titleInput}
              required
            />
            <Button
              onClick={onCloseAddNewTask}
              name={`❌`}
              title={"don't add new task"}
              size={"small"}
            />
          </div>
        </div>
        <div className={`${styles.description}`}>
          <div className={styles.inputWrapper}>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.titleInput}
              required
            />
            <Button name={`✔️`} title={"add new task"} size={"small"} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewTask;
