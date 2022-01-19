import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Todo from './Todo';
import { getTodos } from '../../../../redux/actions/todoActions';
import store from '../../../../redux/store';

const ListTodos = ({ todo, setTodo }) => {
  const dispatch = useDispatch();
  const todos = store.getState().todos;

  useEffect(() => {
    dispatch(getTodos());
  }, [todo._id, dispatch]);

  return (
    <>
      <div className='todosStyle'>
        <h5> {todos.length > 0 ? 'theTodos;' : 'noTodosYet;'} </h5>
        {todos &&
          todos.map((todo) => {
            return <Todo todo={todo} key={todo._id} setTodo={setTodo} todos={todos} />;
          })}
      </div>
    </>
  );
};

ListTodos.propTypes = { todos: PropTypes.func };

export default ListTodos;
