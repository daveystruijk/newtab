import React, { createContext, useContext } from 'react';
import { useChromeStorageLocal } from 'use-chrome-storage';
import dayjs from 'dayjs';
import { DAY_FORMAT } from '../constants';

export const TaskContext = createContext({});
export const useTaskProvider = () => useContext(TaskContext);

const INITIAL_TASKS = [];

const newTask = (id, day) => ({
  id,
  day,
  text: 'New Task',
  created_at: dayjs(),
  task_type: 'task',
  category: 'personal',
  estimate: 30,
  done: false,
});

const newBreak = (id, day) => ({
  id,
  day,
  text: 'New Break',
  created_at: dayjs(),
  task_type: 'break',
});

const getAutoIncrementId = (tasks) =>
  tasks.length === 0
    ? 1
    : 1 + tasks.map((task) => task.id).reduce((a, b) => Math.max(a, b));

const swap =
  (x, y) =>
  ([...xs]) =>
    xs.length > 1 ? (([xs[x], xs[y]] = [xs[y], xs[x]]), xs) : xs;

const insert = (arr, index, newItem) => [
  ...arr.slice(0, index),
  newItem,
  ...arr.slice(index),
];

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useChromeStorageLocal('tasks', INITIAL_TASKS);

  const addTask = (date = dayjs(), task_type = 'task') => {
    const id = getAutoIncrementId(tasks);
    const index = tasks.findIndex((task) =>
      dayjs(task.day, DAY_FORMAT).isAfter(date.subtract(1, 'day'))
    );
    const day = date.format(DAY_FORMAT);
    const task = task_type === 'task' ? newTask(id, day) : newBreak(id, day);
    if (index === -1) {
      return setTasks([ ...tasks, task]);
    } else {
      return setTasks(insert(tasks, index, task));
    }
  };

  const setTask = (t) =>
    setTasks(tasks.map((task) => (task.id === t.id ? t : task)));

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const resetTasks = () => {
    if (confirm('Are you sure?')) {
      setTasks(INITIAL_TASKS);
    }
  };

  const moveTaskUp = (task) => {
    const i = tasks.indexOf(task);
    if (i === 0 || task.day !== tasks[i - 1].day) {
      const prevDay = dayjs(task.day, DAY_FORMAT)
        .add(-1, 'day')
        .format(DAY_FORMAT);
      setTask({ ...task, day: prevDay });
    } else {
      setTasks(swap(i, i - 1)(tasks));
    }
  };
  const moveTaskDown = (task) => {
    const i = tasks.indexOf(task);
    if (i >= tasks.length - 1 || task.day !== tasks[i + 1].day) {
      const nextDay = dayjs(task.day, DAY_FORMAT)
        .add(1, 'day')
        .format(DAY_FORMAT);
      setTask({ ...task, day: nextDay });
    } else {
      setTasks(swap(i, i + 1)(tasks));
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        setTask,
        deleteTask,
        moveTaskUp,
        moveTaskDown,
        resetTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
