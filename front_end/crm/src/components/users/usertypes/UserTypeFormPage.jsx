import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getOneType, updateUserType, isTypeExists, userTypeRequest} from '../../../actions/usertypeActions';
import {addFlashMessages} from '../../../actions/flashMessages';
import UserTypeForm from './UserTypeForm';
import {Redirect} from 'react-router-dom';

class UserTypeFormPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false
		}
	}

	componentDidMount() {
		if (this.props.match.params.id) {
			this.props.getOneType(this.props.match.params.id);
		}
	}

	saveUserType = ({id, typename, typeId}) => {
		if (id) {
			return this.props.updateUserType({id, typename, typeId})
				.then(() => {this.setState({redirect: true})});
		} else {
			return this.props.userTypeRequest({typename, typeId})
				.then(() => {this.setState({redirect: true})});
		}
	}

	render () {
		return (
			<div>
				{this.state.redirect ? <Redirect to="/users/types" /> :
					<UserTypeForm
						type={this.props.type}
						saveUserType={this.saveUserType}
						isTypeExists={this.props.isTypeExists}
						addFlashMessages={this.props.addFlashMessages}
					/>}
			</div>
		);
	}
}

UserTypeFormPage.propTypes = {
	userTypeRequest: PropTypes.func.isRequired,
	isTypeExists: PropTypes.func.isRequired,
	addFlashMessages: PropTypes.func.isRequired,
	getOneType: PropTypes.func.isRequired,
	updateUserType: PropTypes.func.isRequired,
	type: PropTypes.object
}

function mapStateToProps(state, props) {
	let radix = false;
	if (props.match.params.id) {
		return {
			type: state.userTypes.find(item => item.id === parseInt(props.match.params.id, radix))
		};
	}
	return {type: null};
}

export default connect(mapStateToProps, {getOneType, updateUserType, isTypeExists, addFlashMessages, userTypeRequest})(UserTypeFormPage);
