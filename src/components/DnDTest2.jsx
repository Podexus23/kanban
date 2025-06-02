import { DndContext, closestCorners } from "@dnd-kit/core";
import { SortableContext, arrayMove, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

function SortableItem({ task }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "8px",
    margin: "4px",
    background: "#eee",
    borderRadius: "4px",
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {task.name}
    </div>
  );
}

function Desk({ id, tasks }) {
  return (
    <SortableContext items={tasks.map((t) => t.id)}>
      <div
        style={{
          width: "200px",
          minHeight: "300px",
          padding: "8px",
          margin: "0 16px",
          background: "#fafafa",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        {tasks.map((task) => (
          <SortableItem key={task.id} task={task} />
        ))}
      </div>
    </SortableContext>
  );
}

export default function DnDDesk() {
  const [desks, setDesks] = useState([
    {
      id: "desk-1",
      tasks: [
        { id: "task-1", name: "Task 1" },
        { id: "task-2", name: "Task 2" },
      ],
    },
    {
      id: "desk-2",
      tasks: [
        { id: "task-3", name: "Task 3" },
        { id: "task-4", name: "Task 4" },
      ],
    },
  ]);

  const findDeskByTaskId = (taskId) =>
    desks.find((desk) => desk.tasks.find((task) => task.id === taskId));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const sourceDesk = findDeskByTaskId(active.id);
    const destinationDesk = findDeskByTaskId(over.id);

    if (!sourceDesk || !destinationDesk) return;

    if (sourceDesk.id === destinationDesk.id) {
      const oldIndex = sourceDesk.tasks.findIndex(
        (task) => task.id === active.id
      );
      const newIndex = destinationDesk.tasks.findIndex(
        (task) => task.id === over.id
      );

      const newTasks = arrayMove(sourceDesk.tasks, oldIndex, newIndex);

      setDesks(
        desks.map((desk) =>
          desk.id === sourceDesk.id ? { ...desk, tasks: newTasks } : desk
        )
      );
    } else {
      const taskToMove = sourceDesk.tasks.find((task) => task.id === active.id);

      setDesks(
        desks.map((desk) => {
          if (desk.id === sourceDesk.id) {
            return {
              ...desk,
              tasks: desk.tasks.filter((task) => task.id !== active.id),
            };
          } else if (desk.id === destinationDesk.id) {
            const insertIndex = desk.tasks.findIndex(
              (task) => task.id === over.id
            );
            const newTasks = [...desk.tasks];
            newTasks.splice(insertIndex, 0, taskToMove);

            return {
              ...desk,
              tasks: newTasks,
            };
          }
          return desk;
        })
      );
    }
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", padding: "16px" }}>
        {desks.map((desk) => (
          <Desk key={desk.id} id={desk.id} tasks={desk.tasks} />
        ))}
      </div>
    </DndContext>
  );
}
