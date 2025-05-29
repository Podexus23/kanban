import { useState } from "react";
import styles from "./Task.module.css";
import Button from "../../components/Button";
import { useTranslation } from "react-i18next";

const Task = ({ task, onRemoveTask, onEditTask }) => {
  const { t } = useTranslation();
  const [isTitleChange, setIsTitleChange] = useState(false);
  const [isDescriptionChange, setIsDescriptionChange] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.text);

  return (
    <div
      className={styles.task}
      draggable={isTitleChange || isDescriptionChange ? "false" : "true"}
    >
      <header className={styles.header}>
        {isTitleChange ? (
          <div className={styles.inputWrapper}>
            <input
              type={"text"}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.titleInput}
            />
            <Button
              onClick={() => {
                onEditTask(task.id, "title", title);
                setIsTitleChange(false);
              }}
              name={`✔️`}
              title={t("task.confirmNewTitle")}
              size={"small"}
            />
          </div>
        ) : (
          <h3>{title}</h3>
        )}

        <div className={styles.buttons}>
          <Button
            name={"❌"}
            size={"small"}
            onClick={(e) => onRemoveTask(e, task.id)}
            title={t("task.remove")}
          />
          <Button
            name={"✏️"}
            size={"small"}
            onClick={() => {
              setIsTitleChange(true);
            }}
            title={t("task.editTitle")}
          />
        </div>
      </header>
      <div className={`${styles.description}`}>
        {isDescriptionChange ? (
          <div className={styles.inputWrapper}>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.titleInput}
            />
            <Button
              onClick={() => {
                onEditTask(task.id, "description", description);
                setIsDescriptionChange(false);
              }}
              name={`✔️`}
              title={t("task.confirmNewDescription")}
              size={"small"}
            />
          </div>
        ) : (
          <p className={styles.text}>{description}</p>
        )}
        <Button
          name={"✏️"}
          size={"small"}
          onClick={() => {
            setIsDescriptionChange(true);
          }}
          title={t("task.editDescription")}
        />
      </div>
    </div>
  );
};

export default Task;
