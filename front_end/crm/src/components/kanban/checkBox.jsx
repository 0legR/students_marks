import React, {Component} from 'react';

export default class Checkbox extends Component {
	render() {
		return (
			<div className={this.props.nameClass}>
				<input
					type="checkbox"
					name={this.props.name}
					checked={this.props.checked}
				/>
				<label className="order-content-label">{this.props.label}</label>
			</div>
		);
	}
}
