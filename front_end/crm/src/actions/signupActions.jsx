import axios from 'axios';	

export function userSignupRequest(userData) {
	return dispatch => axios.post('/api/users', userData);
}

export function isUserExists(identifier) {
	return dispatch => axios.get(`/api/users/${identifier}`);
}

