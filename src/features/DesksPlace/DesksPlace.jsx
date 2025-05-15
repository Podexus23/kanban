import { useRef } from "react";

import styles from "./DesksPlace.module.css";
import Desk from "../desk/Desk";
import Button from "../../components/Button";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addDesk } from "./desksSlice";

function DesksPlace() {
  const { t } = useTranslation();
  const dragParentDesk = useRef(null);
  const refDragTask = useRef(null);
  const refNewTaskParent = useRef(null);

  const dispatch = useDispatch();
  const { desks } = useSelector((state) => state.desks);

  //drag and drop for tasks
  function handleDragTaskOverDesks(e, currentDeskOver) {
    refNewTaskParent.current = currentDeskOver;
  }

  return (
    <>
      <Button
        onClick={() =>
          dispatch(
            addDesk({
              name: `${t("desk.newDeskTitle")}${desks.length}`,
              data: [],
            })
          )
        }
        name={t("desk.add")}
        size={"medium"}
      />
      <div className={styles.DesksPlace}>
        {desks.map((desk) => (
          <Desk
            deskTitle={desk.name}
            key={desk.name}
            data={desk.data}
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
