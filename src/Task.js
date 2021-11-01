import React, { useState } from 'react';

const CATEGORIES = ['personal', 'momo'];

export function Task(props) {
  const { task, setTask, deleteTask, moveTaskUp, moveTaskDown } = props;

  const [isEditing, setIsEditing] = useState(false);

  const onTaskClick = () => {
    setIsEditing(true);
  };

  const onIconClick = (e) => {
    e.stopPropagation();
    const i = CATEGORIES.indexOf(task.category);
    setTask({ ...task, category: CATEGORIES[(i + 1) % CATEGORIES.length] });
  };

  const onTaskComplete = (e) => {
    e.stopPropagation();
  };

  const onTaskDelete = (e) => {
    e.stopPropagation();
    deleteTask(task.id);
  };

  const onInputChange = (e) => setTask({ ...task, text: e.target.value });

  const onInputKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  const onInputBlur = () => {
    setIsEditing(false);
  };

  const onUp = (e) => {
    e.stopPropagation();
    moveTaskUp(task.id);
  };

  const onDown = (e) => {
    e.stopPropagation();
    moveTaskDown(task.id);
  };

  return (
    <a className={`task category-${task.category}`} onClick={onTaskClick}>
      <div className="icon" onClick={onIconClick} />
      {!isEditing && <div className="view">{task.text}</div>}
      {isEditing && (
        <input
          className="edit"
          value={task.text}
          onChange={onInputChange}
          onKeyDown={onInputKeyDown}
          onBlur={onInputBlur}
          autoFocus={true}
        />
      )}
      <div className="task-buttons">
        <button className="complete" onClick={onTaskComplete}>
          ✓
        </button>
        <button className="delete" onClick={onTaskDelete}>
          x
        </button>
        <button className="up" onClick={onUp}>
          ⇧
        </button>
        <button className="down" onClick={onDown}>
          ⇩
        </button>
      </div>
    </a>
  );
}
