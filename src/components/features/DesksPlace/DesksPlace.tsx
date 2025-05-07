import { useRef, useState, useTransition } from "react";

import styles from "./DesksPlace.module.css";
import Desk from "../desk/Desk";
import Button from "../../Button";
import { useTranslation } from "react-i18next";

function DesksPlace({ desks }) {
  const { t } = useTranslation();
  const [usedDesks, setUsedDesks] = useState(desks);
  const dragParentDesk = useRef(null);
  const refDragTask = useRef(null);
  const refNewTaskParent = useRef(null);

  //desk management
  function handleAddNewDesk(e) {
    setUsedDesks((desks) => [
      ...desks,
      `${t("desk.newDeskTitle")}${desks.length}`,
    ]);
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
    refNewTaskParent.current = currentDeskOver;
  }

  return (
    <>
      <Button onClick={handleAddNewDesk} name={t("desk.add")} size={"medium"} />
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
