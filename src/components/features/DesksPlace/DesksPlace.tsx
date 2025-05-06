import { useRef, useState } from "react";

import styles from "./DesksPlace.module.css";
import Desk from "../desk/Desk";
import Button from "../../Button";

function DesksPlace({ desks }) {
  const [usedDesks, setUsedDesks] = useState(desks);
  const dragParentDesk = useRef(null);
  const refDragTask = useRef(null);
  const refNewTaskParent = useRef(null);

  //desk management
  function handleAddNewDesk(e) {
    setUsedDesks((desks) => [...desks, `New Desk #${desks.length}`]);
  }
  function handleDeleteDesk(id) {
    setUsedDesks((desks) => desks.filter((desk) => desk != id));
  }
  function handleRenameDeskTitle(oldName, newName) {
    setUsedDesks((desks) =>
      desks.map((desk) => (desk === oldName ? newName : desk))
    );
  }

  //drag and drop for tasks
  function handleDragTaskOverDesks(e, currentDeskOver) {
    // если таже доска - ничего не делаем
    // если вышел из доски? ничего не делаем
    // if (currentDeskOver === dragParentDesk.current) return;

    // если оказался в другой доске
    // - удаляем из своей доски, из tasks
    // - просовываем в другую доску так же как при перемещении
    // что надо: элемент, родителская доска, доска над которой находится

    refNewTaskParent.current = currentDeskOver;
    console.log(currentDeskOver);
  }

  return (
    <>
      <Button
        onClick={handleAddNewDesk}
        name={"Add new Desk"}
        size={"medium"}
      />
      <div className={styles.DesksPlace}>
        {usedDesks.map((desk) => (
          <Desk
            deskTitle={desk}
            key={desk}
            onDeleteDesk={handleDeleteDesk}
            onRenameDeskTitle={handleRenameDeskTitle}
            onHandleOver={handleDragTaskOverDesks}
            refDragParent={dragParentDesk}
            refDragTask={refDragTask}
            refNewTaskParent={refNewTaskParent}
          />
        ))}
      </div>
    </>
  );
}

export default DesksPlace;
