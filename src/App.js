import React from 'react';
import { useChromeStorageLocal } from 'use-chrome-storage';
import ContentEditable from 'react-contenteditable';
import { Task } from './Task';

const INITIAL_TASKS = [
  {
    id: 1,
    category: 'personal',
  },
];

export function App() {
  const [tasks, setTasks] = useChromeStorageLocal('tasks', INITIAL_TASKS);

  return (
    <div className="tasks">
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
}
