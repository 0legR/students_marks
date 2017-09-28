import axios from 'axios';	

export function userCreateAdminRequest(userData) {
	return dispatch => axios.post('/api/users/admin/create', userData);
}
