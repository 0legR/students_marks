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
import MarksSettings from './marks/marksColumnSettings/MarksSettingsIndex';
import MarksSettingsFormPage from './marks/marksColumnSettings/MarksSettingsFormPage';
import MarksWeigth from './marks/weigth/MarksWeigthIndex';
import MarksWeigthFormPage from './marks/weigth/MarksWeigthFormPage';
import Kanban from './menu/Kanban';

const Routs = () => 
	<Router>
		<App>
			<Route path="/" exact component={Main} />
			<Route path="/home" component={requireAuth(Home)} />
			<Route path="/settings" component={requireAuth(Settings)} />
			<Route path="/marks" exact component={requireAuth(Marks)} />
			<Route path="/kanban" exact component={requireAuth(Kanban)} />
			<Route path="/marks/settings" exact component={requireAuth(MarksSettings)} />
			<Route path="/marks/settings/create" exact component={requireAuth(MarksSettingsFormPage)} />
			<Route path="/marks/settings/update/:name" exact component={requireAuth(MarksSettingsFormPage)} />
			<Route path="/marks/weigth" exact component={requireAuth(MarksWeigth)} />
			<Route path="/marks/weigth/:id" exact component={requireAuth(MarksWeigthFormPage)} />
			<Route path="/users/administrators" exact component={requireAuth(Administrators)} />
			<Route path="/users/administrators/create" exact component={requireAuth(AdministratorsCreate)} />
			<Route path="/users/managers" component={requireAuth(Managers)} />
			<Route path="/users/types" exact component={requireAuth(UserTypesIndex)} />
			<Route path="/users/types/create" exact component={requireAuth(UserTypeFormPage)} />
			<Route path="/users/types/update/:id" exact component={requireAuth(UserTypeFormPage)} />
		</App>
	</Router>;

export default Routs;
