import React, { useState } from 'react';
import store from '../../../../redux/store';
import AddTodo from './AddTodo';
import ListTodos from './ListTodos';

const Todos = () => {
  const auth = store.getState().auth;
  const [todo, setTodo] = useState({
    name: '',
    isComplete: false,
  });

  return (
    <section className='todo__container'>
      {auth._id ? (
        <>
          <AddTodo todo={todo} setTodo={setTodo} />
          <ListTodos todo={todo} setTodo={setTodo} />
        </>
      ) : (
        <>
          <ListTodos todo={todo} setTodo={setTodo} />
        </>
      )}
    </section>
  );
};

export default Todos;
