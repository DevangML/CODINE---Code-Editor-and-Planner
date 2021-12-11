import { useState } from 'react';

const TaskItem = (props) => {
  const [task, setTask] = useState(props.taskItem.task);
  const [isEditing, setIsEditing] = useState(false);

  const setEditingState = (isEditing) => {
    setIsEditing(isEditing);
  };

  const toggleTask = () => {
    props.toggleTask(props.id);
  };

  const deleteTask = () => {
    props.deleteTask(props.id);
  };

  const handleChange = (event) => {
    setTask(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.editTask(props.id, task);
    setIsEditing(false);
  };

  return (
    <tr>
      {isEditing ? (
        <>
          <td>
            <form onSubmit={handleSubmit}>
              <input value={task} onChange={handleChange} autoFocus />
            </form>
          </td>
          <td>
            <button className='save' onClick={handleSubmit} type='submit'>
              Save
            </button>
            <button className='back' onClick={() => setEditingState(false)} type='button'>
              Back
            </button>
          </td>
        </>
      ) : (
        <>
          <td className='task' onClick={toggleTask}>
            <input type='checkbox' readOnly checked={props.taskItem.isCompleted} />
            <span className={props.taskItem.isCompleted ? 'completed' : 'not-completed'}>
              {props.taskItem.task}
            </span>
          </td>
          <td>
            <button className='edit' onClick={() => setEditingState(true)}>
              Edit
            </button>
            <button className='delete' onClick={deleteTask}>
              Delete
            </button>
          </td>
        </>
      )}
    </tr>
  );
};

export default TaskItem;
