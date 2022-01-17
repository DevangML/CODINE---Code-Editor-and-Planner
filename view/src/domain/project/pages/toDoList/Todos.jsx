import React, { useState, useEffect } from "react";
import AddTodo from "./AddTodo";
import ListTodos from "./ListTodos";

import { useSelector } from "react-redux";
import store from "../../../../redux/store";

const Todos = () => {
  const auth = store.getState().auth;
  const [todo, setTodo] = useState({
    name: "",
    isComplete: false,
  });

  return (
    <section className="todo__container">
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