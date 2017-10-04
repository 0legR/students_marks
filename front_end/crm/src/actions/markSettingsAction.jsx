import axios from 'axios';
import {SET_MARK_SETTINGS_TO_REDUX, SET_ONE_MARKSET_TO_REDUX, DESTROY_MARK_SET} from './types';

export function getMarkSettings() {
	return dispatch => axios.get('/api/students/settings')
		.then(res => res.data)
		.then(data => dispatch(setMarkSettingsToRedux(data)));
}

function setMarkSettingsToRedux(markSettings) {
	return {
		type: SET_MARK_SETTINGS_TO_REDUX,
		markSettings
	};
}

export function getOneMarkSet(name) {
	return dispatch => axios.get(`/api/students/settings/${name}`)
		.then(res => res.data)
		.then(data => dispatch(setOneMarkSetToRedux(data.settings[0])));
}

function setOneMarkSetToRedux(markSet) {
	return {
		type: SET_ONE_MARKSET_TO_REDUX,
		markSet
	};
}

export function markSettingsRequest(settingsData) {
	return dispatch => axios.post('/api/students/settings', settingsData);
}

export function updateMarkSettings(settingsData) {
	return dispatch => axios.put(`/api/students/settings/${settingsData.name}`, settingsData);
}

export function isMarkSettingsExists(identifier) {
	return dispatch => axios.get(`/api/students/settings/${identifier}`);
}

export function deleteMarkSettings(name) {
	return dispatch => axios.delete(`/api/students/settings/${name}`)
		.then(res => res.data)
		.then(data => dispatch(destroyMarkSettings(name)));
}

function destroyMarkSettings(name) {
	return {
		type: DESTROY_MARK_SET,
		name
	};
}
