import React from 'react';
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
  const tasksByCategory = groupBy(dayTasks, 'category');
  const hoursByCategory = Object.keys(tasksByCategory).map((category) => ({
    value: sumTaskHours(tasksByCategory[category]) / HOURS_PER_DAY * 100,
    color: COLORS[category],
  }));

  console.log(hoursByCategory);

  return (
    <div className="day">
      <h2 className={isToday ? 'today' : ''}>
        {date.format('dddd D MMM')}
      </h2>
      <div className="progress">
        <MultiProgress
          elements={hoursByCategory}
          backgroundColor="#222"
        />
        <span>{hours}h</span>
      </div>
    </div>
  );
}
