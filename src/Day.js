import React from 'react';
import dayjs from 'dayjs';

export function Day(props) {
  const { day } = props;

  const date = dayjs(day, 'YYYY-MM-DD');

  return <h2>{date.format('dddd D MMM')}</h2>;
}
