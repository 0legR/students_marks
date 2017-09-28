import axios from 'axios';
import {SET_MARKS_TO_REDUX, DESTROY_MARKS} from './types';

export function saveMark(markData) {
	return dispatch => axios.post('/api/students', markData);
}

export function getMarks() {
	return dispatch => axios.get('/api/students')
		.then(res => res.data)
		.then(data => dispatch(setMarksToRedux(data)));
}

function setMarksToRedux(marks) {
	return {
		type: SET_MARKS_TO_REDUX,
		marks
	};
}

export function deleteMarks(marks) {
	return dispatch => axios.delete('/api/students')
		.then(res => res.data)
		.then(data => dispatch(destroyMarksFromRedux(marks)));
}

function destroyMarksFromRedux(marks) {
	return {
		type: DESTROY_MARKS,
		marks
	};
}
