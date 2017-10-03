import React from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import Main from './Main';
import Home from './Home';
import App from './App';
import Settings from './menu/Settings';
import Marks from './menu/Marks';
import requireAuth from '../utils/requireAuth';
import Administrators from './users/Administrators';
import Managers from './users/Managers';
import AdministratorsCreate from './users/administrators/AdministratorsCreate';
import UserTypesIndex from './users/usertypes/UserTypesIndex';
import UserTypeFormPage from './users/usertypes/UserTypeFormPage';
import MarksSettings from './marks/MarksSettingsIndex';
import MarksSettingsFormPage from './marks/MarksSettingsFormPage';

const Routs = () => 
	<Router>
		<App>
			<Route path="/" exact component={Main} />
			<Route path="/home" component={requireAuth(Home)} />
			<Route path="/settings" component={requireAuth(Settings)} />
			<Route path="/marks" exact component={requireAuth(Marks)} />
			<Route path="/marks/settings" exact component={requireAuth(MarksSettings)} />
			<Route path="/marks/settings/create" exact component={requireAuth(MarksSettingsFormPage)} />
			<Route path="/users/administrators" exact component={requireAuth(Administrators)} />
			<Route path="/users/administrators/create" exact component={requireAuth(AdministratorsCreate)} />
			<Route path="/users/managers" component={requireAuth(Managers)} />
			<Route path="/users/types" exact component={requireAuth(UserTypesIndex)} />
			<Route path="/users/types/create" exact component={requireAuth(UserTypeFormPage)} />
			<Route path="/users/types/update/:id" exact component={requireAuth(UserTypeFormPage)} />
		</App>
	</Router>;

export default Routs;
