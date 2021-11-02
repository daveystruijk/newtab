import React from 'react';
import dayjs from 'dayjs';
import { groupBy } from 'lodash';
import { useChromeStorageLocal } from 'use-chrome-storage';
import { Task } from './Task';
import { Day } from './Day';

require('dayjs/locale/nl');
const duration = require('dayjs/plugin/duration');
dayjs.locale('nl');
dayjs.extend(duration);

const DAY_FORMAT = 'YYYY-MM-DD';

const INITIAL_TASKS = [];

const swap =
  (x, y) =>
  ([...xs]) =>
    xs.length > 1 ? (([xs[x], xs[y]] = [xs[y], xs[x]]), xs) : xs;

const insert = (arr, index, newItem) => [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // inserted item
  newItem,
  // part of the array after the specified index
  ...arr.slice(index),
];

export function App() {
  const [tasks, setTasks] = useChromeStorageLocal('tasks', INITIAL_TASKS);

  const today = dayjs().format(DAY_FORMAT);
  const getAutoIncrementId = (tasks) =>
    tasks.length === 0
      ? 1
      : 1 + tasks.map((task) => task.id).reduce((a, b) => Math.max(a, b));
  const setTask = (t) =>
    setTasks(tasks.map((task) => (task.id === t.id ? t : task)));
  const resetTasks = () => {
    if (confirm('Are you sure?')) {
      setTasks(INITIAL_TASKS);
    }
  };
  const newTask = (id) => ({
    id,
    category: 'personal',
    text: 'New Task',
    day: today,
    estimate: 30,
    done: false,
  });
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  const addTask = () => {
    const id = getAutoIncrementId(tasks);
    const index = tasks.findIndex((task) =>
      dayjs(task.day, DAY_FORMAT).isAfter(dayjs())
    );
    console.log(index);
    return setTasks(insert(tasks, index, newTask(id)));
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

  console.log(tasks);

  // TODO: Tags on the side, which auto-match
  // - Clicking a tag will show only tasks from that tag

  const taskList = [];
  const tasksPerDay = groupBy(tasks, 'day');
  for (let day of Object.keys(tasksPerDay).sort()) {
    const dayTasks = tasksPerDay[day];
    taskList.push(<Day key={day} day={day} dayTasks={dayTasks} />);
    for (let task of dayTasks) {
      taskList.push(
        <Task
          key={task.id}
          task={task}
          setTask={setTask}
          deleteTask={deleteTask}
          moveTaskUp={moveTaskUp}
          moveTaskDown={moveTaskDown}
        />
      );
    }
  }

  return (
    <div>
      <div className="tasks">{taskList}</div>
      <div className="debug">
        <button onClick={addTask}>+</button>
        <button onClick={resetTasks}>Reset</button>
      </div>
    </div>
  );
}
