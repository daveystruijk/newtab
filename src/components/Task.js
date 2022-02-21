import React, { useState } from 'react';
import dayjs from 'dayjs';
import { DAY_FORMAT } from '../constants';
import { useTaskProvider } from '../providers/TaskProvider';
import { CATEGORIES, CATEGORY_KEYS } from '../categories';
import { Countdown } from './Countdown';

export const ESTIMATES = [15, 30, 60, 120, 180, 240, 480];

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
    const i = CATEGORY_KEYS.indexOf(task.category);
    const category = CATEGORY_KEYS[(i + 1) % CATEGORY_KEYS.length];
    setTask({ ...task, category });
  };

  const onIconRightClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const i = CATEGORY_KEYS.indexOf(task.category);
    const category =
      i === 0
        ? CATEGORY_KEYS[CATEGORY_KEYS.length - 1]
        : CATEGORY_KEYS[(i - 1) % CATEGORY_KEYS.length];
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

  const now = dayjs();
  const isToday = task.day === now.format(DAY_FORMAT);
  const timeMatches = task.text.match(/\d\d?\:\d\d/);
  const breakAt = timeMatches ? dayjs(timeMatches[0], 'HH:mm') : null;

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
        {!isEditing && (
          <div className="view">
            {task.text}
            {isToday && <Countdown from={now} to={breakAt} />}
          </div>
        )}
        {isEditing && (
          <input
            className="text"
            value={text}
            onChange={onInputChange}
            onKeyDown={onInputKeyDown}
            onBlur={onInputBlur}
            autoFocus={true}
          />
        )}
        <div className="task-buttons">
          <button className="complete" onClick={onTaskComplete}>
            {task.done ? '«' : '✓'}
          </button>
          <button className="delete" onClick={onTaskDelete}>
            x
          </button>
          <div className="buttons-vertical">
            <button className="up" onClick={onUp}>
              ⇧
            </button>
            <button className="down" onClick={onDown}>
              ⇩
            </button>
          </div>
        </div>
      </a>
    </div>
  );
}
