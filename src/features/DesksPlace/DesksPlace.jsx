import { useRef } from "react";

import styles from "./DesksPlace.module.css";
import Desk from "../desk/Desk";
import Button from "../../components/Button";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addDesk } from "./desksSlice";
import { DndContext } from "@dnd-kit/core";

function DesksPlace() {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const desks = useSelector((state) => state.desks);

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
        <DndContext>
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
