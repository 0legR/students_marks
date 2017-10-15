import React, {Component} from 'react';

export default class ClientInfo extends Component {
	render() {
		return (
			<div className="client-info-container">
				<div><p>{this.props.name}</p></div>
				<div><p>{this.props.phone}</p></div>
				<div><p>{this.props.email}</p></div>
			</div>
		);
	}
}