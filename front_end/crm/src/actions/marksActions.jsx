import axios from 'axios';
import {SET_MARKS_TO_REDUX} from './types';

export function saveMark(markData) {console.log(markData);
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
