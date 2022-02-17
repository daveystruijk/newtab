import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { groupBy, range } from 'lodash';
import { DAY_FORMAT } from '../constants';
import { useTaskProvider } from '../providers/TaskProvider';
import { Day } from './Day';

export const MainPage = () => {
  const [visible, setVisible] = useState(false);

  const { tasks } = useTaskProvider();
  const hasTasks = tasks.length > 0;

  useEffect(() => {
    if (!hasTasks || !visible) { return; }
    const el = document.getElementsByClassName('today')[0];
    el.scrollIntoView();
  }, [hasTasks]);

  const now = dayjs();
  const today = now.format(DAY_FORMAT);

  const exportTasks = () =>
    navigator.clipboard.writeText(JSON.stringify(tasks));

  const days = range(-300, 90)
    .map((i) => now.add(i, 'days'))
    .map((date) => date.format(DAY_FORMAT));

  const tasksPerDay = groupBy(tasks, 'day');

  if (!visible) {
    return (
      <div
        style={{ width: '100%', height: '100%' }}
        onClick={() => setVisible(true)}
      ></div>
    );
  }

  return (
    <div>
      <div className="tasks">
        {days.map((day) => {
          const visible = day === today || day in tasksPerDay;
          if (!visible) {
            return;
          }

          const date = dayjs(day, DAY_FORMAT);
          const tasks = tasksPerDay[day] || [];
          return <Day key={day} day={day} date={date} tasks={tasks} />;
        })}
      </div>
      <div className="debug">
        <button onClick={exportTasks}>Export</button>
      </div>
    </div>
  );
};
