import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { useState } from "react";

function DndTest() {
  const containers = ["A", "B", "C"];
  const [parent, setParent] = useState(null);

  const draggableMarkup = <Draggable id="draggable">Drag me</Draggable>;

  function handleDragEnd(e) {
    const { over } = e;
    setParent(over ? over.id : null);
  }

  return (
    <div style={{ backgroundColor: "#797979" }}>
      <DndContext onDragEnd={handleDragEnd}>
        {parent === null ? draggableMarkup : null}

        {containers.map((id) => (
          <Droppable key={id} id={id}>
            {parent === id ? draggableMarkup : "Drop Here"}
          </Droppable>
        ))}
      </DndContext>
    </div>
  );
}

function Draggable({ children, id }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });
  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </button>
  );
}

function Droppable({ children, id }) {
  const { isOver, setNodeRef } = useDroppable({ id });

  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}

export default DndTest;
