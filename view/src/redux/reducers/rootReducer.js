import { combineReducers } from 'redux';
import authReducer from './authReducers/authReducer';
import alertReducer from './authReducers/alertReducer';
import boardReducer from './projectPlannerReducers/boardReducer';
import cardsByIdReducer from './projectPlannerReducers/cardsByIdReducer';
import listsByIdReducer from './projectPlannerReducers/listByIdReducer';

const rootReducer = combineReducers({
  board: boardReducer,
  listsById: listsByIdReducer,
  cardsById: cardsByIdReducer,
  auth: authReducer,
  alert: alertReducer,
});

export default rootReducer;
