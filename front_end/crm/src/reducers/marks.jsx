import {SET_MARKS_TO_REDUX} from '../actions/types';

export default function marks (state = [], action = {}) {
	switch(action.type) {
		case SET_MARKS_TO_REDUX:
			return action.marks;
		default: return state;
	}
};