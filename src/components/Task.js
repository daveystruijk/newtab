import React, { useState } from 'react';
import dayjs from 'dayjs';
import { useTaskProvider } from '../providers/TaskProvider';

export const ESTIMATES = [15, 30, 60, 120, 180, 240, 480];
export const CATEGORIES = ['personal', 'momo', 'freelance', 'tu'];
export const COLORS = {
  personal: '#28CD41',
  momo: '#C697C5',
  freelance: '#F6BB3F',
  tu: '#0697CF',
};

export function Task({ task }) {
  const { setTask, deleteTask, moveTaskUp, moveTaskDown } = useTaskProvider();

  const [text, setText] = useState(task.text);
  const [isEditing, setIsEditing] = useState(false);

  const onTaskClick = (e) => {
    e.stopPropagation();
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

  const onInputChange = (e) => setText(e.target.value);

  const onInputKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      setIsEditing(false);
      setTask({ ...task, text });
    } else if (e.key === 'ArrowUp') {
      moveTaskUp(task);
    } else if (e.key === 'ArrowDown') {
      moveTaskDown(task);
    }
  };

  const onInputBlur = () => {
    setIsEditing(false);
    setTask({ ...task, text });
  };

  const onUp = (e) => {
    e.stopPropagation();
    moveTaskUp(task);
  };

  const onDown = (e) => {
    e.stopPropagation();
    moveTaskDown(task);
  };

  const estimate =
    task.estimate < 60
      ? `${task.estimate}m`
      : `${dayjs.duration(task.estimate, 'minutes').asHours()}h`;

  return (
    <div className="task-container">
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
            value={text}
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
    </div>
  );
}
