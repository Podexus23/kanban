import { useRef, useState } from "react";
import styles from "./Task.module.css";

const Task = ({ task, dragOver, onDragStart, onDragEnd }) => {
  const handleDragOver = (e, id) => {
    e.preventDefault();
    if (dragOver.current === id) return;
    dragOver.current = id;
  };

  return (
    <div
      className={styles.task}
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      onDragOver={(e) => handleDragOver(e, task.id)}
      onDragEnd={(e) => onDragEnd(e, task.id)}
    >
      {task.text}
    </div>
  );
};

export default Task;
