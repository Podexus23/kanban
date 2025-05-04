import { useState, useRef } from "react";
import "./baseDragNDrop.css";

const DragAndDrop = ({ idPref }) => {
  // 4 items
  const [items, setItems] = useState([
    { id: `${idPref}1`, text: "Item 1" },
    { id: `${idPref}2`, text: "Item 2" },
    { id: `${idPref}3`, text: "Item 3" },
    { id: `${idPref}4`, text: "Item 4" },
  ]);

  const [draggedItem, setDraggedItem] = useState(null);
  const dragOverItem = useRef(null);

  const handleDragStart = (e, index) => {
    setDraggedItem(items[index]);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentNode);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    dragOverItem.current = index;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const newItems = [...items];
    // Удаляем перетаскиваемый элемент
    newItems.splice(items.indexOf(draggedItem), 1);
    // Вставляем элемент на новую позицию
    newItems.splice(dragOverItem.current, 0, draggedItem);

    setItems(newItems);
    setDraggedItem(null);
    dragOverItem.current = null;
  };

  return (
    <div className="drag-container">
      {items.map((item, index) => (
        <div
          key={item.id}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDrop={handleDrop}
          className="draggable-item"
          style={{
            opacity: draggedItem === item ? 0.5 : 1,
            backgroundColor: draggedItem === item ? "#f8f9fa" : "white",
          }}
        >
          {item.text}
        </div>
      ))}
    </div>
  );
};

export default DragAndDrop;
