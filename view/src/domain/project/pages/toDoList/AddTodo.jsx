import React from 'react';
import { useDispatch } from 'react-redux';
import { addTodo, updateTodo } from '../../../../redux/actions/todoActions';

const AddTodo = ({ todo, setTodo }) => {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (todo._id) {
      const id = todo._id;
      const updatedTodo = {
        name: todo.name,
        isComplete: todo.isComplete,
        date: todo.date,
        author: todo.author,
        uid: todo.uid,
      };

      dispatch(updateTodo(updatedTodo, id));
    } else {
      const newTodo = {
        ...todo,
        date: new Date(),
      };

      dispatch(addTodo(newTodo));
    }
    setTodo({ name: '', isComplete: false });
  };

  return (
    <section className='addtodo'>
      <form noValidate autoComplete='off' className='formStyle' onSubmit={handleSubmit}>
        <input
          id='enter-todo'
          placeholder='enterTodo'
          value={todo.name}
          onChange={(e) => setTodo({ ...todo, name: e.target.value })}
        />
        <button className='submitButton' type='submit'>
          Send
        </button>
      </form>
    </section>
  );
};

export default AddTodo;
