import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import { groupBy } from 'lodash';
import MultiProgress from 'react-multi-progress';
import { COLORS } from './Task';

const HOURS_PER_DAY = 8;

export function Day(props) {
  const { day, dayTasks } = props;

  const date = dayjs(day, 'YYYY-MM-DD');

  const sumTaskHours = (tasks) =>
    tasks
      .map((task) => dayjs.duration(task.estimate, 'minutes').asHours())
      .reduce((a, b) => a + b, 0);

  const hours = sumTaskHours(dayTasks);
  const isToday = date.isSame(dayjs(), 'day');
  const elements = dayTasks.map((task) => ({
    value: dayjs.duration(task.estimate, 'minutes').asHours() / HOURS_PER_DAY * 100,
    color: COLORS[task.category],
  }));

  useEffect(() => {
    if (isToday) {
      const el = document.getElementsByClassName('today')[0];
      el.scrollIntoView();
    }
  }, [isToday]);

  return (
    <div className="day">
      <h2 className={isToday ? 'today' : ''}>
        {date.format('dddd D MMM')}
      </h2>
      <div className="progress">
        <MultiProgress
          elements={elements}
          backgroundColor="#222"
          transitionTime={0}
        />
        <span>{hours}h</span>
      </div>
    </div>
  );
}
