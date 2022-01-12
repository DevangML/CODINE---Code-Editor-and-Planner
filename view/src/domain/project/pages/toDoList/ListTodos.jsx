import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Todo from './Todo';

import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import { getTodos } from '../../../../redux/actions/todoActions';
import store from '../../../../redux/store';

const useStyles = makeStyles({
  todosStyle: {
    margin: '20px auto',
    padding: '20px',
    margin: '3vw',
    borderRadius: '9px',
    boxShadow: '0px 0px 12px -3px #000000',
  },
});

const ListTodos = ({ todo, setTodo }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = store.getState().auth;
  const todos = store.getState().todos;

  useEffect(() => {
    dispatch(getTodos());
  }, [todo._id, dispatch]);

  return (
    <>
      <div className={classes.todosStyle}>
        <Typography variant='h5'> {todos.length > 0 ? 'theTodos;' : 'noTodosYet;'} </Typography>
        {todos &&
          todos.map((todo) => {
            return <Todo todo={todo} key={todo._id} setTodo={setTodo} todos={todos} />;
          })}
      </div>
    </>
  );
};

export default ListTodos;
