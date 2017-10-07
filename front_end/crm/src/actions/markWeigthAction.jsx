import axios from 'axios';
import {SET_MARK_WEIGTH_TO_REDUX, DESTROY_MARK_WEIGTH, SET_ONE_MARK_WEIGTH_TO_REDUX} from './types';

export function getMarkWeigth() {
	return dispatch => axios.get('/api/students/weigth')
		.then(res => res.data)
		.then(data => dispatch(setMarkSettingsToRedux(data)));
}

function setMarkSettingsToRedux(markWeigth) {
	return {
		type: SET_MARK_WEIGTH_TO_REDUX,
		markWeigth
	};
}

export function deleteMarkWeigth(id) {
	return dispatch => axios.delete(`/api/students/weigth/${id}`)
		.then(res => res.data)
		.then(data => dispatch(destroyMarkSettings(id)));
}

function destroyMarkSettings(id) {
	return {
		type: DESTROY_MARK_WEIGTH,
		id
	};
}

export function getOneMarkWeigth(id) {
	return dispatch => axios.get(`/api/students/weigth/${id}`)
		.then(res => res.data)
		.then(data => dispatch(setOneMarkWeigthToRedux(data.markWeigth)));
}

function setOneMarkWeigthToRedux(markWeigth) {
	return {
		type: SET_ONE_MARK_WEIGTH_TO_REDUX,
		markWeigth
	};
}

export function updateMarkWeigth(markWeigth) {
	return dispatch => axios.put(`/api/students/weigth/${markWeigth.id}`, markWeigth);
}
