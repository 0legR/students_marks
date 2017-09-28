import React, {Component} from 'react';
import administrators from '../../le/eng/users/administrators';
import statuses from '../data/status';
import timezones from '../data/timezone';
import {Link} from 'react-router-dom';

class Administrators extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			email: "",
			timezone: "",
			status: ""
		}
		this.handlerOnChange = this.handlerOnChange.bind(this);
	}

	handlerOnChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	render() {
		const {username, email, timezone, status} = this.state;
		const statusOptions = statuses.map((val, key) => 
			<option key={val.key} value={val.key}>{val.value}</option>);
		const timezoneOptions = timezones.map((val, key) =>
			<option key={val.text} value={val.text}>{val.value}</option>);
		return (
			<div>
				<button
					className="ui orange basic right floated button create-button"
				><Link to="/users/administrators/create">{administrators.createButton}</Link></button>
				<table className="ui striped table">
				  <thead>
				    <tr>
				      <th>{administrators.thUsername}</th>
				      <th>{administrators.thEmail}</th>
				      <th>{administrators.thTimezone}</th>
				      <th>{administrators.thStatus}</th>
				    </tr>
				    <tr className="table-filter">
				    	<th>
					    	<div className="ui icon input loading">
					    		<input type="text" name="username" value={username} />
					    		<i className="search icon"></i>
				    		</div>
				    	</th>
				    	<th>
				    		<div className="ui icon input loading">
					    		<input type="email" name="email" value={email} />
					    		<i className="search icon"></i>
				    		</div></th>
				    	<th>
				    		<select
				    			className="ui selection dropdown"
				    			value={timezone}
				    			name="timezone"
				    			onChange={this.handlerOnChange}
				    		>
				    			<option value="" disabled></option>
								{timezoneOptions}
				    		</select>
				    	</th>
				    	<th>
				    		<select
				    			className="ui selection dropdown"
				    			value={status}
				    			name="status"
				    			onChange={this.handlerOnChange}
				    		>
				    			<option value="" disabled></option>
								{statusOptions}
				    		</select>
				    	</th>
				    </tr>
				  </thead>
				  <tbody>
				    <tr>
				      <td>John Lilki</td>
				      <td>September 14, 2013</td>
				      <td>jhlilk22@yahoo.com</td>
				      <td>status</td>
				    </tr>
				    <tr>
				      <td>Jamie Harington</td>
				      <td>January 11, 2014</td>
				      <td>jamieharingonton@yahoo.com</td>
				      <td>status</td>
				    </tr>
				    <tr>
				      <td>Jill Lewis</td>
				      <td>May 11, 2014</td>
				      <td>jilsewris22@yahoo.com</td>
				      <td>status</td>
				    </tr>
				  </tbody>
				</table>
			</div>
		);
	}
}

export default Administrators;