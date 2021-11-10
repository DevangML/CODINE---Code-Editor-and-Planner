import shortid from 'shortid'
import {
	addFirstCard,
	addFirstList,
	addSecondCard,
	addSecondList,
	addSubCardOne,
	addSubCardTwo
} from './actions/projectPlannerActions'

export default function seed(store) {
	console.log('Insert first list')
	const firstListId = shortid.generate()

	store.dispatch(addFirstList)

	store.dispatch(addFirstCard)

	store.dispatch(addSecondCard)

	console.log('Insert second list')
	const secondListId = shortid.generate()

	store.dispatch(addSecondList)

	store.dispatch(addSubCardOne)

	store.dispatch(addSubCardTwo)
}
