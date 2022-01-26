import React from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { deleteTodo, checkTodo } from '../../../../redux/actions/todoActions';
import store from '../../../../redux/store';

const Todo = ({ todo, setTodo, todos }) => {
  const dispatch = useDispatch();
  const auth = store.getState().auth;

  const handleOnUpdateClick = (id) => {
    const foundTodo = todos.find((todo) => todo._id === id);
    setTodo({ ...foundTodo });
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleCheck = (id) => {
    dispatch(checkTodo(id));
  };

  return (
    <>
      <div className='todoStyle'>
        <div>
          {todo.isComplete ? (
            <h5 className='checked'>{todo.name}</h5>
          ) : (
            <h5 className='unchecked'>{todo.name}</h5>
          )}
          <h5 className='moreStyle'>Author: {todo.author}</h5>
          <h5 className='moreStyle'>Added: {moment(todo.date).fromNow()}</h5>
        </div>
        <section className='buttonGroup'>
          {auth._id && auth._id === todo.uid ? (
            <>
              <button className='checkbtn' onClick={() => handleCheck(todo._id)}>
                {todo.isComplete ? <>❌</> : <>✅</>}
              </button>
              <button className='updateButton' onClick={() => handleOnUpdateClick(todo._id)}>
                Update
              </button>
              <button className='deleteButton' onClick={() => handleDelete(todo._id)}>
                🗑️
              </button>
            </>
          ) : null}
        </section>
      </div>
    </>
  );
};

export default Todo;
