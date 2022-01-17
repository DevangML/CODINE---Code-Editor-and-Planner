import axios from 'axios';
import { toast } from 'react-toastify';
import { API, setHeaders } from '../../api';
import { GET_TODOS, ADD_TODO, UPDATE_TODO, DELETE_TODO, CHECK_TODO } from '../constants/toDoTypes';
import store from '../store';

export const getTodos = () => (dispatch) => {
  try {
    axios.get('http://localhost:5000/todo/read', setHeaders()).then((todoss) => {
      // for (let index = 0; index < todoss.length; index++) {
      //   const element = todoss[index];
      //   todos.push(element)
      // }
      // console.log(`Hello`)
      let todos = todoss.data;
      console.log(`${todos.values()}`);

      dispatch({
        type: GET_TODOS,
        todo: todos,
      });
    });
  } catch (err) {
    toast.error(err.response?.data, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }
};

export const addTodo = (newTodo) => async (dispatch, getState) => {
  const author = store.getState().auth.name;
  const uid = store.getState().auth._id;
  await API.post('/todo/create', { ...newTodo, author, uid }, setHeaders())
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

export const updateTodo = (updatedTodo, id) => async (dispatch) => {
  await API.put(`/todo/update/${id}`, updatedTodo, setHeaders())
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

export const deleteTodo = (id) => async (dispatch) => {
  await API.delete(`/todo/delete/${id}`, setHeaders())
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

export const checkTodo = (id) => async (dispatch) => {
  await API.patch(`/todo/update/partial/${id}`, {}, setHeaders())
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
