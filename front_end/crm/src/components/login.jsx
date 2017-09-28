import React, {Component} from 'react';
import {TextFieldGroup} from './layout/TextFieldGroup';
import {connect} from 'react-redux';
import validateInput from '../utils/validations/login';
import PropTypes from 'prop-types';
import {login} from '../actions/authActions';
import {isUserExists} from '../actions/signupActions';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			identifier: "",
			password: "",
			isLoading: false,
			invalid: false,
			errors: {},
			errorLaravel: ""
		}
		this.handleOnSubmit = this.handleOnSubmit.bind(this);
		this.handleOnChange = this.handleOnChange.bind(this);
		this.handlerIsUserExists = this.handlerIsUserExists.bind(this);
	}

	handleOnChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handlerIsUserExists(e) {
		const field = e.target.name;
		const val = e.target.value;
		if (val !== "") {
			this.props.isUserExists(val).then(res => {
				let errors = this.state.errors;
				let invalid;
				if (res.data.length === 0) {
					errors[field] = "U're not registered yet!" + field;
					invalid = true;
				} else {
					errors[field] = "";
					invalid = false;
				}
				this.setState({errors, invalid});
			});
		};
	}

	isValid() {
		const {errors, isValid} = validateInput(this.state);
		if(!isValid) {
			return this.setState({errors});
		}
		return isValid;
	}

	handleOnSubmit(e) {
		e.preventDefault();
		if (this.isValid()) {
			this.setState({errors: {}, isLoading: true});
			this.props.login(this.state)
				.then((res) => {
					this.context.router.history.push("/home");
				})
				.catch(
					(error) => this.setState({errorLaravel: error.message, isLoading: false})
				);
		}
	}

	render() {
		const {identifier, password, isLoading, invalid, errors, errorLaravel} = this.state;
		return (
			<form className="ui form header-block login" onSubmit={this.handleOnSubmit}>
				<h5 className="login-header">Please login</h5>
				{errorLaravel && <div className="login-error"><div className="ui negative message">{errorLaravel}</div></div>}
				<div className="2 fields login-2-fields">
					<div className="login-field">
					<TextFieldGroup
						label="Username / E-mail"
						onChange={this.handleOnChange}
						value={identifier}
						field="identifier"
						error={errors.identifier}
						isUserExists={this.handlerIsUserExists}
					/>
					</div>
					<div className="login-field">
					<TextFieldGroup
						label="Password"
						onChange={this.handleOnChange}
						value={password}
						field="password"
						type="password"
						error={errors.password}
					/>
					</div>
				</div>
				<div className="login-button">
					<button disabled={isLoading || invalid} className="ui primary button">Login</button>
				</div>
			</form>
		);
	}
}

Login.propTypes = {
	login: PropTypes.func.isRequired,
	isUserExists: PropTypes.func.isRequired
}

Login.contextTypes = {
	router: PropTypes.object.isRequired
}

export default connect(null,{login, isUserExists})(Login);
