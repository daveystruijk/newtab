import React from 'react';
import dayjs from 'dayjs';
import MultiProgress from 'react-multi-progress';
import { useTaskProvider } from '../providers/TaskProvider';
import { Task, COLORS } from './Task';

const HOURS_PER_DAY = 8;

export function Day({ date, tasks }) {
  const { addTask } = useTaskProvider();

  const sumTaskHours = (tasks) =>
    tasks
      .map((task) => dayjs.duration(task.estimate, 'minutes').asHours())
      .reduce((a, b) => a + b, 0);

  const hours = sumTaskHours(tasks);
  const isToday = date.isSame(dayjs(), 'day');
  const elements = tasks.map((task) => ({
    value:
      (dayjs.duration(task.estimate, 'minutes').asHours() / HOURS_PER_DAY) *
      100,
    color: COLORS[task.category],
  }));

  return (
    <div>
      <div className={`day ${isToday ? 'today' : ''}`}>
        <div className="title">
          <h2>{date.format('dddd D MMM')}</h2>
          <button
            onClick={() => {
              addTask(date);
            }}
            key="add"
          >
            +
          </button>
        </div>
        <div className="progress">
          <MultiProgress
            elements={elements}
            backgroundColor="#222"
            transitionTime={0}
            round={false}
            roundLastElement={false}
          />
          <span>{hours}h</span>
        </div>
      </div>
      <div>
        {tasks.map(task =>
          <Task
            key={task.id}
            task={task}
          />
        )}
      </div>
    </div>
  );
}
