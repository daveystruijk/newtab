import React from 'react';
import dayjs from 'dayjs';
import { useTaskProvider } from '../providers/TaskProvider';
import { Task } from './Task';
import { Break } from './Break';
import { DayProgress } from './DayProgress';

export function Day({ date, tasks }) {
  const { addTask } = useTaskProvider();

  const isToday = date.isSame(dayjs(), 'day');

  return (
    <div>
      <div className={`day ${isToday ? 'today' : ''}`}>
        <div className="title">
          <h2>{date.format('dddd D MMM')}</h2>
          <button
            onClick={() => {
              addTask(date);
            }}
          >
            +
          </button>
          <button
            onClick={() => {
              addTask(date, 'break');
            }}
          >
            B
          </button>
        </div>
        <DayProgress
          tasks={tasks.filter((task) => task.task_type === 'task')}
        />
      </div>
      <div>
        {tasks.map((task) => {
          if (task.task_type === 'break') {
            return <Break key={task.id} task={task} />;
          } else {
            return <Task key={task.id} task={task} />;
          }
        })}
      </div>
    </div>
  );
}
