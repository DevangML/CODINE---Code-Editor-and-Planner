import { useState, useEffect } from 'react';
import {
  Paper, TextField, Checkbox, Button,
} from '@material-ui/core';
import {
  addTask, getTasks, updateTask, deleteTask,
} from '../../services/toDoListServices/taskServices';

const ToDoList = function () {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState('');

  const task = async () => {
    try {
      const { data } = await getTasks();
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    task();
  }, []);

  const handleChange = ({ currentTarget: input }) => {
    currentTask(input.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const originalTasks = tasks;
    try {
      const { data } = await addTask({ task: currentTask });
      const tasks = originalTasks;
      tasks.push(data);
      setTasks(tasks);
      setCurrentTask('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (currentTask) => {
    const originalTasks = tasks;
    try {
      const tasks = [...originalTasks];
      const index = tasks.findIndex((task) => task._id === currentTask);
      tasks[index] = { ...tasks[index] };
      tasks[index].completed = !tasks[index].completed;
      setTasks(tasks);
      await updateTask(currentTask, {
        completed: tasks[index].completed,
      });
    } catch (error) {
      setTasks(originalTasks);
      console.log(error);
    }
  };

  const handleDelete = async (currentTask) => {
    const originalTasks = tasks;
    try {
      const tasks = originalTasks.filter((task) => task._id !== currentTask);
      setTasks(tasks);
      await deleteTask(currentTask);
    } catch (error) {
      setTasks(originalTasks);
      console.log(error);
    }
  };

  return (
    <div className='toDo flex'>
      <Paper elevation={3} className='tdcontainer'>
        <div className='heading'>TO-DO</div>
        <form onSubmit={handleSubmit} className='flex' style={{ margin: '15px 0' }}>
          <TextField
            variant='outlined'
            size='small'
            style={{ width: '80%' }}
            value={currentTask}
            required
            onChange={handleChange}
            placeholder='Add New TO-DO'
          />
          <Button style={{ height: '40px' }} color='primary' variant='outlined' type='submit'>
            Add task
          </Button>
        </form>
        <div>
          {tasks.map((task) => (
            <Paper key={task._id} className='flex task_container'>
              <Checkbox
                checked={task.completed}
                onClick={() => handleUpdate(task._id)}
                color='primary'
              />
              <div className={task.completed ? 'task line_through' : 'task'}>{task.task}</div>
              <Button onClick={() => handleDelete(task._id)} color='secondary'>
                delete
              </Button>
            </Paper>
          ))}
        </div>
      </Paper>
    </div>
  );
};

export default ToDoList;
