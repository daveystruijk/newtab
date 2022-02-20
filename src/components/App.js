import React from 'react';
import dayjs from 'dayjs';
import { TaskProvider } from '../providers/TaskProvider';
import { MainPage } from './MainPage';

require('dayjs/locale/nl');
dayjs.locale('nl');

dayjs.extend(require('dayjs/plugin/duration'));
dayjs.extend(require('dayjs/plugin/customParseFormat'));

export function App() {
  return (
    <TaskProvider>
      <MainPage />
    </TaskProvider>
  );
}
