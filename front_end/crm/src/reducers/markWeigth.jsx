import {SET_MARK_WEIGTH_TO_REDUX, DESTROY_MARK_WEIGTH, SET_ONE_MARK_WEIGTH_TO_REDUX} from '../actions/types';

export default function markWeigth(state = [], action = {}) {
	switch(action.type) {
		case SET_MARK_WEIGTH_TO_REDUX:
			return action.markWeigth;
		case SET_ONE_MARK_WEIGTH_TO_REDUX:
			const index = state.findIndex(item => item.id === action.markWeigth.id);
			if (index > -1) {
				return state.map(item => {
					if (item.id === action.markWeigth.id) {
						return action.markWeigth;
					}
					return item;
				})
			} else {
				return [
					...state,
					action.markWeigth
				];
			}
		case DESTROY_MARK_WEIGTH:
			return state.filter(item => item.id !== action.id);
		default: return state;
	}
};

