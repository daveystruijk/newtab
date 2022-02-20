import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { groupBy, range } from 'lodash';
import { DAY_FORMAT } from '../constants';
import { useTaskProvider } from '../providers/TaskProvider';
import { Day } from './Day';

export const MainPage = () => {
  const [visible, setVisible] = useState(true);

  const { tasks, setTasks } = useTaskProvider();
  const hasTasks = tasks.length > 0;

  useEffect(() => {
    if (!hasTasks || !visible) {
      window.scrollTo(0, 0);
      return;
    }
    const el = document.getElementsByClassName('today')[0];
    el.scrollIntoView();
  }, [hasTasks, visible]);

  const onGlobalKeyDown = (e) => {};

  useEffect(() => {
    window.addEventListener('keydown', onGlobalKeyDown);
    return () => {
      window.removeEventListener('keydown', onGlobalKeyDown);
    };
  });

  const now = dayjs();
  const today = now.format(DAY_FORMAT);

  const exportTasks = () =>
    navigator.clipboard.writeText(JSON.stringify(tasks));

  const days = range(-90, 90)
    .map((i) => now.add(i, 'days'))
    .map((date) => date.format(DAY_FORMAT));

  const tasksPerDay = groupBy(tasks, 'day');

  if (!visible) {
    return (
      <div
        style={{ width: '100%', height: '10000px', backgroundColor: '#444' }}
        onClick={() => setVisible(true)}
      ></div>
    );
  }

  return (
    <div onKeyDown={onGlobalKeyDown}>
      <div className="tasks">
        {days.map((day) => {
          const showDay = day === today || day in tasksPerDay;
          if (!showDay) {
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
