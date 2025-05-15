import { useRef } from "react";

import styles from "./DesksPlace.module.css";
import Desk from "../desk/Desk";
import Button from "../../components/Button";
import { useTranslation } from "react-i18next";

function DesksPlace({ desks, onSetDesk }) {
  //передать таски
  const { t } = useTranslation();
  const dragParentDesk = useRef(null);
  const refDragTask = useRef(null);
  const refNewTaskParent = useRef(null);
  const deskNames = desks.map((desk) => desk.name);

  //desk management
  function handleAddNewDesk() {
    onSetDesk((desks) => [
      ...desks,
      { name: `${t("desk.newDeskTitle")}${desks.length}`, data: [] },
    ]);
  }

  function handleDeleteDesk(id) {
    onSetDesk((desks) => desks.filter((desk) => desk.name !== id));
  }

  function handleRenameDeskTitle(oldName, newName) {
    onSetDesk((desks) =>
      desks.map((desk) => {
        if (desk.name === oldName) desk.name = newName;
        return desk;
      })
    );
  }

  //обновлять такски
  const handleDeskUpdate = (deskName, data) => {
    const newDesks = desks.map((desk) => {
      if (desk.name === deskName) {
        desk.data = data;
      }
      return desk;
    });
    onSetDesk(newDesks);
  };

  //drag and drop for tasks
  function handleDragTaskOverDesks(e, currentDeskOver) {
    refNewTaskParent.current = currentDeskOver;
  }

  return (
    <>
      <Button onClick={handleAddNewDesk} name={t("desk.add")} size={"medium"} />
      <div className={styles.DesksPlace}>
        {deskNames.map((desk) => (
          <Desk
            deskTitle={desk}
            key={desk}
            data={desks.find((d) => d.name === desk).data}
            onDeskUpdate={handleDeskUpdate}
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
