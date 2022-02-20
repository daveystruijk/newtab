import React, { useState } from 'react';
import dayjs from 'dayjs';
import { DAY_FORMAT } from '../constants';
import { useTaskProvider } from '../providers/TaskProvider';
import { Countdown } from './Countdown';

export function Break({ task }) {
  const { setTask, deleteTask, moveTaskUp, moveTaskDown } = useTaskProvider();

  const [text, setText] = useState(task.text);
  const [isEditing, setIsEditing] = useState(false);

  const onTaskClick = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const onTaskDelete = (e) => {
    e.stopPropagation();
    if (!confirm('Delete task?')) {
      return;
    }
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

  const now = dayjs();
  const isToday = task.day === now.format(DAY_FORMAT);
  const timeMatches = task.text.match(/\d\d?\:\d\d/);
  const breakAt = timeMatches ? dayjs(timeMatches[0], 'HH:mm') : null;

  return (
    <div className="task-container">
      <a className="task break" onClick={onTaskClick}>
        {!isEditing && (
          <div className="view">
            {task.text}
            {isToday && <Countdown from={now} to={breakAt} />}
          </div>
        )}
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
          <button className="delete" onClick={onTaskDelete}>
            x
          </button>
        </div>
      </a>
    </div>
  );
}
