import {SET_CUSTOMERS_TO_REDUX} from '../actions/types';

export default function kanban (state = [], action = {}) {
	switch(action.type) {
		case SET_CUSTOMERS_TO_REDUX:
			return action.customers;
		default: return state;
	}
};
