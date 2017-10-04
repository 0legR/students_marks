import {SET_MARK_SETTINGS_TO_REDUX, SET_ONE_MARKSET_TO_REDUX, DESTROY_MARK_SET} from '../actions/types';

export default function markSettings(state = [], action = {}) {
	switch(action.type) {
		case SET_MARK_SETTINGS_TO_REDUX:
			return action.markSettings;
		case SET_ONE_MARKSET_TO_REDUX:
			const index = function(state) {
				for(let prop in state) {
					return state[prop].findIndex(item => item.name === action.markSet.name);
				}
			};
			if (index(state) > -1) {
				let settings = [];
				let itemElse = [];
				for(let prop in state) {
					state[prop].map(item => {
						if (item.name === action.markSet.name) {
							return settings = action.markSet;
						} else {
							return itemElse = item;
						}
					});
				};

				if (settings.length !== 0) {
					return settings;
				} else {
					return itemElse;
				}
			} else {
				return [
					...state,
					action.markSet
				];
			}
		case DESTROY_MARK_SET:
			let settings;
			for(let prop in state) {
				settings = state[prop].filter(item => item.name !== action.name);
			}
			return settings;
		default: return state;
	}
};
