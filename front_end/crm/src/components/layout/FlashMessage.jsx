import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class FlashMessage extends Component {
	constructor(props) {
		super(props);
		this.handleOnClick = this.handleOnClick.bind(this);
	}

	handleOnClick() {
		this.props.deleteFlashMessage(this.props.message.id);
	}

	render() {
		const {type, text} = this.props.message;

		return (
			<div className={classnames(null, {
				'ui success message': type === "success",
				'ui negative message': type === "error"
			})}>
				<i className="close icon" onClick={this.handleOnClick}></i>
				<div className="header">{text}</div>
			</div>
		);
	}
}

FlashMessage.propTypes = {
	message: PropTypes.object.isRequired,
	deleteFlashMessage: PropTypes.func.isRequired
}
