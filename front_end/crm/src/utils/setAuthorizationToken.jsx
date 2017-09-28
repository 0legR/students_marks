import axios from 'axios';

export default function setAuthorizationToken(token) {
	if (token) {
		axios.defaults.headers.common['Authorization'] = `Auth ${token}`;
	} else {
		delete axios.defaults.headers.common['Authorization'];
	}
} 