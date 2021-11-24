import { combineReducers } from 'redux';
<<<<<<< HEAD
import boardReducer from './boardReducer';
import cardsByIdReducer from './cardsByIdReducer';
import listsByIdReducer from './listByIdReducer';
=======
import boardReducer from './projectPlannerReducers/boardReducer';
import cardsByIdReducer from './projectPlannerReducers/cardsByIdReducer';
import listsByIdReducer from './projectPlannerReducers/listByIdReducer';
>>>>>>> origin/development

const rootReducer = combineReducers({
  board: boardReducer,
  listsById: listsByIdReducer,
  cardsById: cardsByIdReducer,
});

export default rootReducer;
