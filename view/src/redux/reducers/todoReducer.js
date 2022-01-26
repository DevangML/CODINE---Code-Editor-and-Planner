import { toast } from 'react-toastify';
import {
  GET_TODOS,
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  CHECK_TODO,
  CLEAR_TODOS,
} from '../constants/toDoTypes';

const todoReducer = (todos = [], action) => {
  switch (action.type) {
    case GET_TODOS:
      todos.length === 0 ? (todos = todos.concat(action.todo)) : (todos = todos);
      return todos;
    case ADD_TODO:
      toast.success('A todo was added...', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return [action.todo.data, ...todos];
    case UPDATE_TODO:
      toast.success('A todo was updated...', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    case CHECK_TODO:
      toast.success('A todo status was changed...', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return todos.map((todo) => (todo._id === action.todo.data._id ? action.todo.data : todo));
    case DELETE_TODO:
      toast.success('A todo was deleted...', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return todos.filter((todo) => todo._id !== action.id);
    default:
      return todos;
  }
};

export default todoReducer;
