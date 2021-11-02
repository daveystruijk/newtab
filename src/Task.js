import React, { useState } from 'react';

export const ESTIMATES = [15, 30, 60, 120, 240];
export const CATEGORIES = ['personal', 'momo'];
export const COLORS = {
  personal: '#F6BB3F',
  momo: '#C697C5',
};

export function Task(props) {
  const { task, setTask, deleteTask, moveTaskUp, moveTaskDown } = props;

  const [isEditing, setIsEditing] = useState(false);

  const onTaskClick = () => {
    setIsEditing(true);
  };

  const onIconClick = (e) => {
    e.stopPropagation();
    const i = CATEGORIES.indexOf(task.category);
    const category = CATEGORIES[(i + 1) % CATEGORIES.length];
    setTask({ ...task, category });
  };

  const onIconRightClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const i = CATEGORIES.indexOf(task.category);
    const category =
      i === 0
        ? CATEGORIES[CATEGORIES.length - 1]
        : CATEGORIES[(i - 1) % CATEGORIES.length];
    setTask({ ...task, category });
  };

  const onEstimateClick = (e) => {
    e.stopPropagation();
    const i = ESTIMATES.indexOf(task.estimate);
    const estimate = ESTIMATES[(i + 1) % ESTIMATES.length];
    setTask({ ...task, estimate });
  };

  const onEstimateRightClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const i = ESTIMATES.indexOf(task.estimate);
    const estimate =
      i === 0
        ? ESTIMATES[ESTIMATES.length - 1]
        : ESTIMATES[(i - 1) % ESTIMATES.length];
    setTask({ ...task, estimate });
  };

  const onTaskComplete = (e) => {
    e.stopPropagation();
    setTask({ ...task, done: !task.done });
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
    moveTaskUp(task);
  };

  const onDown = (e) => {
    e.stopPropagation();
    moveTaskDown(task);
  };

  const estimate = task.estimate;

  return (
    <a
      className={`task category-${task.category}${task.done ? ' done' : ''}`}
      onClick={onTaskClick}
    >
      <div
        className="icon"
        onClick={onIconClick}
        onContextMenu={onIconRightClick}
      />
      <div
        className="estimate"
        onClick={onEstimateClick}
        onContextMenu={onEstimateRightClick}
      >
        {estimate}
      </div>
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
        <div className="buttons-vertical">
          <button className="up" onClick={onUp}>
            ⇧
          </button>
          <button className="down" onClick={onDown}>
            ⇩
          </button>
        </div>
        <button className="complete" onClick={onTaskComplete}>
          {task.done ? '«' : '✓'}
        </button>
        <button className="delete" onClick={onTaskDelete}>
          x
        </button>
      </div>
    </a>
  );
}
