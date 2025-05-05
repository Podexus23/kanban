// - Стандартные колонки: "To Do", "In Progress", "Done" ✔️
// - Возможность добавлять/удалять/переименовывать колонки ✔️
// - Горизонтальный скролл или адаптивное отображение колонок
import { useState } from "react";
import styles from "./Desk.module.css";
import { faker } from "@faker-js/faker";
import Task from "../Task/Task";
import Button from "../../Button";

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
  //!remove
  const taskToTest = Array.from({ length: 4 }, (_, index) => "");

  return (
    <div className={styles.desk}>
      <DeskHeader
        title={deskTitle}
        onDeleteDesk={onDeleteDesk}
        onRenameDeskTitle={onRenameDeskTitle}
      />
      <Button name={"+ add new task"} size={"medium"} />
      <main>
        <div className={styles.tasklist}>
          {taskToTest.map((task) => (
            <Task task={faker.lorem.lines({ min: 1, max: 2 })} />
          ))}
        </div>
        {/* <div>{faker.lorem.lines({ min: 1, max: 2 })}</div> */}
      </main>
    </div>
  );
}

export default Desk;
