import axios from 'axios';
import {SET_CUSTOMERS_TO_REDUX} from './types';

export function getCustomersInfo() {
	return dispatch => axios.get(`/api/kanban`)
		.then(res => res.data)
		.then(data => dispatch(setCustomersToRedux(data)));
}

function setCustomersToRedux(customers) {
	return {
		type: SET_CUSTOMERS_TO_REDUX,
		customers
	};
}