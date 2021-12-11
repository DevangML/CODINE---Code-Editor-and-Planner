import { useState } from 'react';

const CreateTask = (props) => {
  const [task, setTask] = useState('');

  const handleChange = (event) => {
    setTask(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.createTask(task);
    setTask('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Enter task'
        value={task}
        onChange={handleChange}
        autoFocus
        className='tasks__input'
      />
      <button class='add' type='submit'>
        Add
      </button>
    </form>
  );
};

export default CreateTask;
