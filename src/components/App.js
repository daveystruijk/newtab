import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import { TaskProvider } from '../providers/TaskProvider';
import { MainPage } from './MainPage';

require('dayjs/locale/nl');
const duration = require('dayjs/plugin/duration');
dayjs.locale('nl');
dayjs.extend(duration);

export function App() {
  return (
    <TaskProvider>
      <MainPage />
    </TaskProvider>
  );
}
