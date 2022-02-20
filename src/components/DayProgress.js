import React from 'react';
import dayjs from 'dayjs';
import MultiProgress from 'react-multi-progress';
import { COLORS } from './Task';

const HOURS_PER_DAY = 8;

export function DayProgress({ tasks }) {
  const sumTaskHours = (tasks) =>
    tasks
      .map((task) => dayjs.duration(task.estimate, 'minutes').asHours())
      .reduce((a, b) => a + b, 0);

  const hours = sumTaskHours(tasks);

  const elements = tasks.map((task) => ({
    value:
      (dayjs.duration(task.estimate, 'minutes').asHours() / HOURS_PER_DAY) *
      100,
    color: COLORS[task.category],
  }));

  return (
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
  );
}
