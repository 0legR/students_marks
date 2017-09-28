import React, {Component} from 'react';
import {TextFieldGroup} from './layout/TextFieldGroup';
import timezones from './data/timezone';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {userSignupRequest, isUserExists} from '../actions/signupActions';
import {addFlashMessages} from '../actions/flashMessages';
import validateInput from '../utils/validations/signup';
import classnames from 'classnames';

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			email: "",
			password: "",
			passwordConfirmation: "",
			timezone: "",
			errors: {},
			isLoading: false,
			invalid: false
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
				if (res.data) {
					errors[field] = "There is user with such " + field;
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
		if (!isValid) {
			return this.setState({errors});
		}
		return isValid;
	}

	handleOnSubmit(e) {
		e.preventDefault();
		if (this.isValid()) {
			this.setState({errors: {}, isLoading: true});
			this.props.userSignupRequest(this.state)
				.then(() => {
					this.props.addFlashMessages({
						type: "success",
						text: "You have signed up successful! Welcome!"
					});
					this.context.router.history.push('/');
				})
				.catch(
					(error) => this.setState({errors: error.response.data, isLoading: false})
				);
		};
		this.setState({
			username: "",
			email: "",
			password: "",
			passwordConfirmation: "",
			timezone: ""
		});
		setTimeout(() => {this.setState({isLoading: false})}, 2000);
	}

	render() {
		const options = timezones.map((val, key) => 
			<option key={val.text} value={val.text}>{val.value}</option>);

		const {errors, username, email, password, passwordConfirmation, timezone, isLoading, invalid} = this.state;

		return (
			<form className={classnames("ui", "form signup", {loading: this.state.isLoading})} onSubmit={this.handleOnSubmit}>
				<h1>User Registration</h1>
				<TextFieldGroup
					error={errors.username}
					label="Username"
					onChange={this.handleOnChange}
					isUserExists={this.handlerIsUserExists}
					value={username}
					field="username"
				/>
				<TextFieldGroup
					error={errors.email}
					label="E-mail"
					onChange={this.handleOnChange}
					isUserExists={this.handlerIsUserExists}
					value={email}
					field="email"
					type="email"
				/>
				<TextFieldGroup
					error={errors.password}
					label="Password"
					onChange={this.handleOnChange}
					value={password}
					field="password"
					type="password"
				/>
				<TextFieldGroup
					error={errors.passwordConfirmation}
					label="Password Confirmation"
					onChange={this.handleOnChange}
					value={passwordConfirmation}
					field="passwordConfirmation"
					type="password"
				/>
				<div className={errors.timezone ? "field ui input error" : "field"}>
					<label className="ui label">Timezone</label>
					<select
						value={timezone}
						onChange={this.handleOnChange}
						name="timezone"
						className="ui fluid dropdown"
					>
						<option value="" disabled>Choose your timezone</option>
						{options}
					</select>
					{errors.timezone && <span className="ui negative message">{errors.timezone}</span>}
				</div>
				<div className="field">
					<button disabled={isLoading || invalid } className="ui primary button">Sign Up</button>
				</div>
			</form>
		);
	}
}

SignUp.propTypes = {
	userSignupRequest: PropTypes.func.isRequired,
	isUserExists: PropTypes.func.isRequired,
	addFlashMessages: PropTypes.func.isRequired
}

SignUp.contextTypes = {
	router: PropTypes.object.isRequired
}

export default connect(null, {userSignupRequest, isUserExists, addFlashMessages})(SignUp);
