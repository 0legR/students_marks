import {SET_MARKS_TO_REDUX, DESTROY_MARKS} from '../actions/types';

export default function marks (state = [], action = {}) {
	switch(action.type) {
		case SET_MARKS_TO_REDUX:
			return action.marks;
		case DESTROY_MARKS:
			if(action.marks.length === 0) {
				return state;
			} else {
				let marks;
				action.marks.forEach(function(mark) {
					marks = state.filter(item => item.id !== mark.id);
				});
				return marks;
			}
		default: return state;
	}
};
