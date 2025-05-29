import styles from "./DesksPlace.module.css";
import Desk from "../desk/Desk";
import Button from "../../components/Button";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addDesk } from "./desksSlice";
import { DndContext } from "@dnd-kit/core";
import { useState } from "react";

function DesksPlace() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const desks = useSelector((state) => state.desks);

  const [parent, setParent] = useState(null);

  function handleDragEnd(e) {
    const { over } = e;
    console.log(over);
    setParent(over ? over.id : null);
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
        <DndContext onDragEnd={handleDragEnd}>
          {desks.map((desk) => {
            return (
              <Desk deskTitle={desk.name} key={desk.name} data={desk.data} />
            );
          })}
        </DndContext>
      </div>
    </>
  );
}

export default DesksPlace;
