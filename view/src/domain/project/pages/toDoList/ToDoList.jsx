import React from 'react';
import CreateTask from './components/CreateTask';
import TaskList from './components/TaskList';

const tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: tasks,
    };
  }
  createTask = (task) => {
    if (task.trim() === '') {
      alert("Task can't be empty");
      return;
    }
    tasks.push({ task, isCompleted: false });
    this.setState({ tasks: tasks });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };
  toggleTask = (taskId) => {
    const taskItem = tasks[taskId];
    taskItem.isCompleted = !taskItem.isCompleted;
    this.setState({ tasks: tasks });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };
  deleteTask = (taskId) => {
    tasks.splice(taskId, 1);
    this.setState({ tasks: tasks });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };
  editTask = (taskId, task) => {
    const taskItem = tasks[taskId];
    taskItem.task = task;
    this.setState({ tasks: tasks });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };
  render() {
    return (
      <div className='tmain'>
        <h1 className='tmain__item-1'>Todo List</h1>
        <div className='content'>
          <CreateTask createTask={this.createTask} />
          <br />
          <TaskList
            tasks={this.state.tasks}
            deleteTask={this.deleteTask}
            editTask={this.editTask}
            toggleTask={this.toggleTask}
          />
        </div>
      </div>
    );
  }
}
