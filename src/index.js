import ReactDOM from 'react-dom';
import { App } from './components/App';
import { TaskProvider } from './providers/TaskProvider';

const app = document.getElementById('app');
ReactDOM.render(
  <TaskProvider>
    <App />
  </TaskProvider>,
  app
);
