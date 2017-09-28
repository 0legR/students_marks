import {combineReducers} from 'redux';
import users from './reducers/users';
import flashMessages from './reducers/flashMessages';
import userTypes from './reducers/userTypes';
import marks from './reducers/marks';

export default combineReducers(
	{users, flashMessages, userTypes, marks}
);