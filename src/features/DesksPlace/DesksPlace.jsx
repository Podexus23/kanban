import styles from "./DesksPlace.module.css";
import Desk from "../desk/Desk";
import Button from "../../components/Button";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addDesk, updateDeskDataById } from "./desksSlice";
import { arrayMove } from "@dnd-kit/sortable";
import { closestCenter, DndContext } from "@dnd-kit/core";

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
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={({ active, over }) => {
            if (active.id !== over.id) {
              console.log(active, over);
            }
          }}
        >
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
