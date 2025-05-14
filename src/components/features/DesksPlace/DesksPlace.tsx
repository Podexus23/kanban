import { useRef } from "react";

import styles from "./DesksPlace.module.css";
import Desk from "../desk/Desk";
import Button from "../../Button";
import { useTranslation } from "react-i18next";

function DesksPlace({ desks, onSetDesk }) {
  const { t } = useTranslation();
  const dragParentDesk = useRef(null);
  const refDragTask = useRef(null);
  const refNewTaskParent = useRef(null);
  //desk management
  function handleAddNewDesk(e) {
    onSetDesk((desks) => [
      ...desks,
      `${t("desk.newDeskTitle")}${desks.length}`,
    ]);
  }
  function handleDeleteDesk(id) {
    onSetDesk((desks) => desks.filter((desk) => desk != id));
  }
  function handleRenameDeskTitle(oldName, newName) {
    onSetDesk((desks) =>
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
        {desks.map((desk) => (
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
