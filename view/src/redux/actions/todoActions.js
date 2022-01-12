import { toast } from 'react-toastify';
import { API, setHeaders } from '../../api';
import { GET_TODOS, ADD_TODO, UPDATE_TODO, DELETE_TODO, CHECK_TODO } from '../constants/toDoTypes';
import store from '../store';

export const getTodos = () => (dispatch) => {
  try {
    API.get('/todo', setHeaders()).then((todos) => {
      dispatch({
        type: GET_TODOS,
        todos,
      });
    });
  } catch (err) {
    toast.error(err.response?.data, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }
};

export const addTodo = (newTodo) => (dispatch, getState) => {
  const author = getState().auth.name;
  const uid = getState().auth._id;
  API.post('/todo', { ...newTodo, author, uid }, setHeaders())
    .then((todo) => {
      dispatch({
        type: ADD_TODO,
        todo,
      });
      setTimeout(() => {
        window.location.reload(false);
      }, 100);
    })
    .catch((error) => {
      console.log(`Error in adding todos: ${error.response}`);

      toast.error(error.response?.data, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    });
};

export const updateTodo = (updatedTodo, id) => (dispatch) => {
  API.put(`/todo/${id}`, updatedTodo, setHeaders())
    .then((todo) => {
      dispatch({
        type: UPDATE_TODO,
        todo,
      });
      setTimeout(() => {
        window.location.reload(false);
      }, 100);
    })
    .catch((error) => {
      console.log(error);
      toast.error(error.response?.data, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    });
};

export const deleteTodo = (id) => (dispatch) => {
  API.delete(`/todo/${id}`, setHeaders())
    .then(() => {
      dispatch({
        type: DELETE_TODO,
        id,
      });
      setTimeout(() => {
        window.location.reload(false);
      }, 100);
    })
    .catch((error) => {
      console.log(error);
      toast.error(error.response?.data, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    });
};

export const checkTodo = (id) => (dispatch) => {
  API.patch(`/todo/${id}`, {}, setHeaders())
    .then((todo) => {
      dispatch({
        type: CHECK_TODO,
        todo,
      });
      setTimeout(() => {
        window.location.reload(false);
      }, 100);
    })
    .catch((error) => {
      console.log(error);
      toast.error(error.response?.data, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    });
};
