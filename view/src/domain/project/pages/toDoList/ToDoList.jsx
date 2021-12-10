import { useState } from 'react';
import CreateTask from './components/CreateTask';
import TaskList from './components/TaskList';

const ToDoList = () => {
  const ntask = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
  const [tasks, setTasks] = useState(ntask);

  const createTask = (tasks) => {
    if (ntask.trim() === '') {
      alert("Task can't be empty");
      return;
    }
    tasks.push({ ntask, isCompleted: false });
    setTasks({ tasks: ntask });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const toggleTask = (taskId) => {
    const taskItem = tasks[taskId];
    taskItem.isCompleted = !taskItem.isCompleted;
    setTasks({ tasks: ntask });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const deleteTask = (taskId) => {
    tasks.splice(taskId, 1);
    setTasks({ tasks: ntask });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const editTask = (taskId, task) => {
    const taskItem = tasks[taskId];
    taskItem.task = task;
    setTasks({ tasks: ntask });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  return (
    <div className='tmain'>
      <h1 className='tmain__item-1'>Todo List</h1>
      <div className='content'>
        <CreateTask createTask={createTask} />
        <br />
        <TaskList
          tasks={tasks}
          deleteTask={deleteTask}
          editTask={editTask}
          toggleTask={toggleTask}
        />
      </div>
    </div>
  );
};

export default ToDoList;
