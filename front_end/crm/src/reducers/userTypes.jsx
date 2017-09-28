import {SET_TYPES_TO_REDUX, SET_ONE_TYPE_TO_REDUX, DESTROY_USER_TYPE} from '../actions/types';

export default function userTypes (state = [], action = {}) {
	switch(action.type) {
		case SET_TYPES_TO_REDUX:
			return action.types;
		case SET_ONE_TYPE_TO_REDUX:
			const index = state.findIndex(item => item.id === action.typeuser.id);
			if (index > -1) {
				return state.map(item => {
					if (item.id === action.typeuser.id) {
						return action.typeuser;
					}
					return item;
				})
			} else {
				return [
					...state,
					action.typeuser
				];
			}
		case DESTROY_USER_TYPE:
			return state.filter(item => item.id !== action.idType);
		default: return state;
	}
};