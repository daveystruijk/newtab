import React from 'react';
import dayjs from 'dayjs';
import { groupBy } from 'lodash';
import { useChromeStorageLocal } from 'use-chrome-storage';
import { Task } from './Task';
import { Day } from './Day';

const INITIAL_TASKS = [];

export function App() {
  const [tasks, setTasks] = useChromeStorageLocal('tasks', INITIAL_TASKS);

  const resetTasks = () => setTasks(INITIAL_TASKS);

  const getAutoIncrementId = (tasks) =>
    tasks.length === 0
      ? 1
      : 1 + tasks.map((task) => task.id).reduce((a, b) => Math.max(a, b));
  const setTask = (t) =>
    setTasks(tasks.map((task) => (task.id === t.id ? t : task)));

  const newTask = (id) => ({
    id,
    category: 'personal',
    text: 'New Task',
    day: dayjs().format('YYYY-MM-DD'),
  });
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  const addTask = () => {
    const id = getAutoIncrementId(tasks);
    return setTasks([...tasks, newTask(id)]);
  };
  const moveTaskUp = (id) => {

  };
  const moveTaskDown = (id) => {

  };

  const taskList = [];
  const tasksPerDay = groupBy(tasks, 'day');
  for (let [day, dayTasks] of Object.entries(tasksPerDay)) {
    taskList.push(<Day key={day} day={day} />);
    for (let task of dayTasks) {
      taskList.push(
        <Task
          key={task.id}
          task={task}
          setTask={setTask}
          deleteTask={deleteTask}
        />
      );
    }
  }

  return (
    <div>
      <div className="tasks">
        {taskList}
        <div className="list-controls">
          <button onClick={addTask}>+</button>
        </div>
      </div>
      <div className="debug">
        <button onClick={resetTasks}>Reset</button>
      </div>
    </div>
  );
}
