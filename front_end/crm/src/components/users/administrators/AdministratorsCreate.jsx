import React, {Component} from 'react';
import {TextFieldGroup} from '../../layout/TextFieldGroup';
import statuses from '../../data/status';
import timezones from '../../data/timezone';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {isUserExists} from '../../../actions/signupActions';
import {addFlashMessages} from '../../../actions/flashMessages';
import validateInput from '../../../utils/validations/signup';
import classnames from 'classnames';
import {userCreateAdminRequest} from '../../../actions/createUserActions';
import administrators from '../../../le/eng/users/administrators';

class AdministratorsCreate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			email: "",
			password: "",
			passwordConfirmation: "",
			timezone: "",
			status: "",
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

				if (res.data.user) {
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
			this.props.userCreateAdminRequest(this.state)
				.then(() => {
					this.props.addFlashMessages({
						type: "success",
						text: "You have created new user-Administrator successful"
					});
					this.context.router.history.push('/users/administrators');
				})
				.catch(
					(error) => this.setState({errors: error.response.data, isLoading: false})
				);
		};
	}

	render() {
		const {username, email, timezone, status, errors, isLoading, invalid, password, passwordConfirmation} = this.state;
		const statusOptions = statuses.map((val, key) => 
			<option key={val.key} value={val.key}>{val.value}</option>);
		const timezoneOptions = timezones.map((val, key) =>
			<option key={val.text} value={val.text}>{val.value}</option>);
		return (
			<form className={classnames("ui", "form signup", {loading: this.state.isLoading})} onSubmit={this.handleOnSubmit}>
				<h1>{administrators.createButton}</h1>
				<TextFieldGroup
					error={errors.username}
					label={administrators.usernameLabel}
					onChange={this.handleOnChange}
					isUserExists={this.handlerIsUserExists}
					value={username}
					field="username"
				/>
				<TextFieldGroup
					error={errors.email}
					label={administrators.emailLabel}
					onChange={this.handleOnChange}
					isUserExists={this.handlerIsUserExists}
					value={email}
					field="email"
					type="email"
				/>
				<TextFieldGroup
					error={errors.password}
					label={administrators.passwordLabel}
					onChange={this.handleOnChange}
					value={password}
					field="password"
					type="password"
				/>
				<TextFieldGroup
					error={errors.passwordConfirmation}
					label={administrators.passwordConfirmLabel}
					onChange={this.handleOnChange}
					value={passwordConfirmation}
					field="passwordConfirmation"
					type="password"
				/>
				<div className={errors.status ? "field ui input error" : "field"}>
					<label className="ui label">{administrators.statusLabel}</label>
					<select
						value={status}
						onChange={this.handleOnChange}
						name="status"
						className="ui fluid dropdown"
					>
						<option value="" disabled>Choose status</option>
						{statusOptions}
					</select>
					{errors.timezone && <span className="ui negative message">{errors.timezone}</span>}
				</div>
				<div className={errors.timezone ? "field ui input error" : "field"}>
					<label className="ui label">{administrators.timezoneLabel}</label>
					<select
						value={timezone}
						onChange={this.handleOnChange}
						name="timezone"
						className="ui fluid dropdown"
					>
						<option value="" disabled>Choose your timezone</option>
						{timezoneOptions}
					</select>
					{errors.timezone && <span className="ui negative message">{errors.timezone}</span>}
				</div>
				<div className="field">
					<div className="create-type-button">
						<button
							disabled={isLoading || invalid }
							className="ui orange basic right floated button"
						>{administrators.signupButton}</button>
					</div>
				</div>
			</form>
		);
	}
}

AdministratorsCreate.propTypes = {
	userCreateAdminRequest: PropTypes.func.isRequired,
	isUserExists: PropTypes.func.isRequired,
	addFlashMessages: PropTypes.func.isRequired
}

AdministratorsCreate.contextTypes = {
	router: PropTypes.object.isRequired
}

export default connect(null, {userCreateAdminRequest, isUserExists, addFlashMessages})(AdministratorsCreate);