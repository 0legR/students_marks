import axios from 'axios';
import {SET_TYPES_TO_REDUX, SET_ONE_TYPE_TO_REDUX, DESTROY_USER_TYPE} from './types';

export function userTypeRequest(userData) {
	return dispatch => axios.post('/api/types', userData);
}

export function getTypes() {
	return dispatch => axios.get('/api/types')
		.then(res => res.data)
		.then(data => dispatch(setTypesToRedux(data.types)));
}

export function isTypeExists(identifier) {
	return dispatch => axios.get(`/api/types/${identifier}`);
}

function setTypesToRedux(types) {
	return {
		type: SET_TYPES_TO_REDUX,
		types
	};
}

export function getOneType(id) {
	return dispatch => axios.get(`/api/types/${id}`)
		.then(res => res.data)
		.then(data => dispatch(setOneTypeToRedux(data.type)));
}

function setOneTypeToRedux(typeuser) {
	return {
		type: SET_ONE_TYPE_TO_REDUX,
		typeuser
	};
}

export function updateUserType(userData) {
	return dispatch => axios.put(`/api/types/${userData.id}`, userData);
}

export function deleteUserType(id) {
	return dispatch => axios.delete(`/api/types/${id}`)
		.then(res => res.data)
		.then(data => dispatch(destroyUserType(id)));
}

function destroyUserType(idType) {
	return {
		type: DESTROY_USER_TYPE,
		idType
	};
}
