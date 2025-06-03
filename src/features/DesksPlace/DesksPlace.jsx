import styles from "./DesksPlace.module.css";
import Desk from "../desk/Desk";
import Button from "../../components/Button";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  addDesk,
  selectDeskByTaskId,
  selectTaskById,
  updateDeskDataById,
} from "./desksSlice";
import { closestCenter, DndContext, DragOverlay } from "@dnd-kit/core";

import { store } from "../../app/store";
import { useState } from "react";
import Task from "../Task/Task";
import { arrayMove } from "@dnd-kit/sortable";

import { TouchSensor, MouseSensor, useSensor, useSensors } from "@dnd-kit/core";

function DesksPlace() {
  const { t } = useTranslation();
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5, // чтобы не сразу активировался
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 150,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  const dispatch = useDispatch();
  const desks = useSelector((state) => state.desks);

  const [activeId, setActiveId] = useState(null);
  const dragTaskData = selectTaskById(store.getState(), activeId);

  function handleTaskDragStart({ active }) {
    setActiveId(active.id);
  }

  const handleTaskDragEnd = ({ active, over }) => {
    if (active.id !== over.id) {
      // если оба из одного деска
      const desk = selectDeskByTaskId(store.getState(), active.id);
      const oldIndex = desk.data.findIndex((task) => task.id === active.id);
      const newIndex = desk.data.findIndex((task) => task.id === over.id);
      dispatch(
        updateDeskDataById(desk.id, arrayMove(desk.data, oldIndex, newIndex))
      );
    }
    setActiveId(null);
  };

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
          onDragStart={handleTaskDragStart}
          onDragEnd={handleTaskDragEnd}
          sensors={sensors}
        >
          {desks.map((desk) => {
            return (
              <Desk deskTitle={desk.name} key={desk.name} data={desk.data} />
            );
          })}
          <DragOverlay>
            {activeId ? <Task task={dragTaskData} /> : null}
          </DragOverlay>
        </DndContext>
      </div>
    </>
  );
}

export default DesksPlace;
