import { combineReducers } from 'redux'
import boardReducer from './boardReducer'
import cardsByIdReducer from './cardsByIdReducer'
import listsByIdReducer from './listByIdReducer'

const rootReducer = combineReducers({
	board: boardReducer,
	listsById: listsByIdReducer,
	cardsById: cardsByIdReducer
})

export default rootReducer
