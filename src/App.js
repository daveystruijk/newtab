import React from 'react';
import { useChromeStorageLocal } from 'use-chrome-storage';
import { Task } from './Task';

const INITIAL_TASKS = {
  1: {
    id: 1,
    category: 'personal',
    text: 'Hi',
  },
};

export function App() {
  const [tasks, setTasks] = useChromeStorageLocal('tasks', INITIAL_TASKS);

  const resetTasks = () => {
    setTasks(INITIAL_TASKS);
  };

  const setTask = (task) => setTasks({ ...tasks, [`${task.id}`]: task });

  return (
    <div>
      <div className="tasks">
        {Object.keys(tasks).map((key) => (
          <Task key={key} task={tasks[`${key}`]} setTask={setTask} />
        ))}
      </div>
      <div className="debug">
        <button onClick={resetTasks}>Reset</button>
      </div>
    </div>
  );
}
