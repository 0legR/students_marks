import {SET_MARKS_TO_REDUX, DESTROY_MARKS} from '../actions/types';

export default function marks (state = [], action = {}) {
	switch(action.type) {
		case SET_MARKS_TO_REDUX:
			return action.marks;
		case DESTROY_MARKS:
			return action.marks.forEach(
				mark => state.filter(item => item.id !== mark.id)
			);
		default: return state;
	}
};
