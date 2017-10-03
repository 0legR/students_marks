import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import settings from '../../le/eng/menu/settings';

class Settings extends Component {
	render() {
		return (
			<div className="settings-container">
				<div className="ui block header">{settings.mainHeader}</div>
				<div>
					<div className="ui block header header-settings">{settings.staffSettings.header}</div>
					<div className="ui middle aligned divided list">
						<ul>
							<li><Link to="/users/administrators">{settings.staffSettings.adminLink}</Link></li>
							<li><Link to="/users/managers">{settings.staffSettings.managerLink}</Link></li>
						</ul>
					</div>
				</div>
				<div>
					<div className="ui block header header-settings">{settings.directorySettings.header}</div>
					<div className="ui middle aligned divided list">
						<ul>
							<li><Link to="/users/types">{settings.directorySettings.typeLink}</Link></li>
							<li><Link to="/marks/settings">{settings.directorySettings.markLink}</Link></li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default Settings;