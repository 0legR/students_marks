import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {deleteFlashMessage} from '../../actions/flashMessages';
import FlashMessage from './FlashMessage';

class FlashMessageList extends Component {
	render() {
		const messages = this.props.messages.map(message => 
			<FlashMessage
				key={message.id}
				message={message}
				deleteFlashMessage={this.props.deleteFlashMessage}
			/>
		);
		return (<div>{messages}</div>);
	}
}

FlashMessageList.propTypes = {
	deleteFlashMessage: PropTypes.func.isRequired,
	messages: PropTypes.array.isRequired
}

function mapStateToProps(state) {
	return {
		messages: state.flashMessages
	}
}

export default connect(mapStateToProps, {deleteFlashMessage})(FlashMessageList);
