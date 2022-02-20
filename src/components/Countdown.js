import React from 'react';
import dayjs from 'dayjs';

export function Countdown({ from, to }) {
  const diff = to ? dayjs.duration(to.diff(from)) : 0;
  const minutes = diff && diff.asMinutes();
  if (minutes <= 0 || minutes > 720) { return <></>; }

  const countdown = `(-${diff.format('H:mm')})`;
  const countdownStyle = { color: minutes };

  return (
    <span className="countdown" style={countdownStyle}>
      {countdown}
    </span>
  );
}
