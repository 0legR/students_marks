import {combineReducers} from 'redux';
import users from './reducers/users';
import flashMessages from './reducers/flashMessages';
import userTypes from './reducers/userTypes';
import marks from './reducers/marks';
import markSettings from './reducers/markSettings';
import markWeigth from './reducers/markWeigth';

export default combineReducers(
	{users, flashMessages, userTypes, marks, markSettings, markWeigth}
);