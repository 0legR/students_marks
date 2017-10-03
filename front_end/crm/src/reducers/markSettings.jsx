import {SET_MARK_SETTINGS_TO_REDUX, SET_ONE_MARKSET_TO_REDUX} from '../actions/types';

export default function markSettings(state = [], action = {}) {
	switch(action.type) {
		case SET_MARK_SETTINGS_TO_REDUX:
			return action.markSettings;
		case SET_ONE_MARKSET_TO_REDUX:
			const index = state.findIndex(item => item.name === action.markSet.name);
			if (index > -1) {
				return state.map(item => {
					if (item.name === action.markSet.name) {
						return action.markSet;
					}
					return item;
				})
			} else {
				return [
					...state,
					action.markSet
				];
			}
		default: return state;
	}
};
