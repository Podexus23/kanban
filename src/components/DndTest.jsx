// import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { useState } from "react";

// function DndTest() {
//   const containers = ["A", "B", "C"];
//   const [parent, setParent] = useState(null);

//   const draggableMarkup = <Draggable id="draggable">Drag me</Draggable>;

//   function handleDragEnd(e) {
//     const { over } = e;
//     setParent(over ? over.id : null);
//   }

//   return (
//     <div style={{ backgroundColor: "#797979" }}>
//       <DndContext onDragEnd={handleDragEnd}>
//         {parent === null ? draggableMarkup : null}

//         {containers.map((id) => (
//           <Droppable key={id} id={id}>
//             {parent === id ? draggableMarkup : "Drop Here"}
//           </Droppable>
//         ))}
//       </DndContext>
//     </div>
//   );
// }

// function Draggable({ children, id }) {
//   const { attributes, listeners, setNodeRef, transform } = useDraggable({
//     id,
//   });
//   const style = transform
//     ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
//     : undefined;

//   return (
//     <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
//       {children}
//     </button>
//   );
// }

// function Droppable({ children, id }) {
//   const { isOver, setNodeRef } = useDroppable({ id });

//   const style = {
//     color: isOver ? "green" : undefined,
//   };

//   return (
//     <div ref={setNodeRef} style={style}>
//       {children}
//     </div>
//   );
// }

// export default DndTest;

import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

function SortableItem({ id }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    transition,
    padding: 8,
    border: "1px solid gray",
    marginBottom: 4,
    background: "white",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      🟦 {id}
    </div>
  );
}

function SortableList() {
  const [items, setItems] = useState(["a", "b", "c"]);

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={({ active, over }) => {
        if (active.id !== over.id) {
          const oldIndex = items.indexOf(active.id);
          const newIndex = items.indexOf(over.id);
          setItems(arrayMove(items, oldIndex, newIndex));
        }
      }}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((id) => (
          <SortableItem key={id} id={id} />
        ))}
      </SortableContext>
    </DndContext>
  );
}

export default SortableList;
