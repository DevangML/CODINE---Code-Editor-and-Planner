import { ADD_LIST, ADD_CARD } from './projectPlannerTypes'

import shortid from 'shortid'

export const addFirstList = (firstListId) => {
	return {
		type: ADD_LIST,
		payload: {
			listId: firstListId,
			cardId: shortid.generate(),
			cardText: 'First card'
		}
	}
}

export const addFirstCard = (firstListId) => {
	return {
		type: ADD_CARD,
		payload: {
			listId: firstListId,
			cardId: shortid.generate(),
			cardText: 'First card'
		}
	}
}

export const addSecondCard = (firstListId) => {
	return {
		type: ADD_CARD,
		payload: {
			listId: firstListId,
			cardId: shortid.generate(),
			cardText: 'Second card'
		}
	}
}

export const addSecondList = (secondListId) => {
	return {
		type: ADD_LIST,
		payload: { listId: secondListId, listTitle: 'Second list' }
	}
}

export const addSubCardOne = (firstListId) => {
	return {
		type: ADD_CARD,
		payload: {
			listId: firstListId,
			cardId: shortid.generate(),
			cardText: 'Card 1'
		}
	}
}

export const addSubCardTwo = (firstListId) => {
	return {
		type: ADD_CARD,
		payload: {
			listId: firstListId,
			cardId: shortid.generate(),
			cardText: 'Card 2'
		}
	}
}
