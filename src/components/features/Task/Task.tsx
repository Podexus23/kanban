import { useRef, useState } from "react";
import styles from "./Task.module.css";

const Task = ({ task, dragOver, onDraggable, onDragEnd }) => {
  const handleDragStart = (e, id) => {
    onDraggable(id);
    e.dataTransfer.effectAllowed = "move";
    console.log("start");
    console.log(e.target);
  };

  const handleDragEnd = (e) => {
    onDraggable(null);
    dragOver = null;
    console.log("end");
    console.log(e.target);
  };

  const handleDragOver = (e, id) => {
    e.preventDefault();
    dragOver.current = id;
    // console.log("over");
    // console.log(dragOver);
  };

  return (
    <div
      className={styles.task}
      draggable
      onDragStart={(e) => handleDragStart(e, task.id)}
      onDragOver={(e) => handleDragOver(e, task.id)}
      onDragEnd={(e) => onDragEnd(e, task.id)}
    >
      {task.text}
    </div>
  );
};

export default Task;
