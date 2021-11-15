import shortid from 'shortid';
import { ADD_LIST, ADD_CARD } from './projectPlannerTypes';

export function addFirstList(firstListId = shortid.generate()) {
  return {
    type: ADD_LIST,
    payload: {
      listId: firstListId,
      cardId: shortid.generate(),
      cardText: 'First card',
    },
  };
}

export function addFirstCard(firstListId = shortid.generate()) {
  return {
    type: ADD_CARD,
    payload: {
      listId: firstListId,
      cardId: shortid.generate(),
      cardText: 'First card',
    },
  };
}

export function addSecondCard(firstListId = shortid.generate()) {
  return {
    type: ADD_CARD,
    payload: {
      listId: firstListId,
      cardId: shortid.generate(),
      cardText: 'Second card',
    },
  };
}

export function addSecondList(secondListId = shortid.generate()) {
  return {
    type: ADD_LIST,
    payload: { listId: secondListId, listTitle: 'Second list' },
  };
}

export function addSubCardOne(firstListId = shortid.generate()) {
  return {
    type: ADD_CARD,
    payload: {
      listId: firstListId,
      cardId: shortid.generate(),
      cardText: 'Card 1',
    },
  };
}

export function addSubCardTwo(firstListId = shortid.generate()) {
  return {
    type: ADD_CARD,
    payload: {
      listId: firstListId,
      cardId: shortid.generate(),
      cardText: 'Card 2',
    },
  };
}
