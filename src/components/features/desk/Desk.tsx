// - Стандартные колонки: "To Do", "In Progress", "Done" ✔️
// - Возможность добавлять/удалять/переименовывать колонки ✔️
// - Горизонтальный скролл или адаптивное отображение колонок
import { useState } from "react";
import styles from "./Desk.module.css";
import { faker } from "@faker-js/faker";
import Task from "../Task/Task";

function Desk({ deskTitle, onDeleteDesk, onRenameDeskTitle }) {
  const [isRename, setIsRename] = useState(false);
  const [titleInput, setTitleInput] = useState(deskTitle);

  //!remove
  const taskToTest = Array.from({ length: 4 }, (_, index) => "");

  //delete desk
  function handleDeleteDesk() {
    onDeleteDesk(deskTitle);
  }
  //rename desk
  function handleRenameDeskTitle() {
    setIsRename(true);
  }

  function handleAddNewTitle() {
    onRenameDeskTitle(deskTitle, titleInput);
    setIsRename(false);
  }

  return (
    <div className={styles.desk}>
      <header>
        {isRename ? (
          <div>
            <input
              type={"text"}
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
            />
            <button onClick={handleAddNewTitle}>✔️</button>
          </div>
        ) : (
          <h2>{deskTitle}</h2>
        )}

        <div className={styles.buttons}>
          <button title="delete desk" onClick={handleDeleteDesk}>
            ❌
          </button>
          <button title="edit desk name" onClick={handleRenameDeskTitle}>
            ✏️
          </button>
        </div>
      </header>
      <main>
        <div>
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
