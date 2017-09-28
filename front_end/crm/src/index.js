import React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import 'semantic-ui/dist/semantic.min.css';
import rootReducer from './rootReducer';
import {Provider} from 'react-redux';
import './style.css';
import Routs from './components/Routs';
import setAuthorizationToken from './utils/setAuthorizationToken';
import {setCurrentUser} from './actions/authActions';
import jwtDecode from 'jwt-decode';

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);

if (localStorage.jwtToken) {
	setAuthorizationToken(localStorage.jwtToken);
	store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
};

render(
	<Provider store={store}>
			<Routs />
	</Provider>,
	document.getElementById('root')
);