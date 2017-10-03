import React, {Component} from 'react';
import {TextFieldGroup} from '../layout/TextFieldGroup';
import classnames from 'classnames';
import settings from '../../le/eng/marks/settings';
import PropTypes from 'prop-types';
import validateInput from '../../utils/validations/marksSettings';

export default class MarkSettingsForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: this.props.type ? this.props.markSettings.name : "",
			type: this.props.type ? this.props.markSettings.type : "",
			isUpdate: false,
			errors: {},
			isLoading: false,
			invalid: false
		}

		this.handlerOnSubmit = this.handlerOnSubmit.bind(this);
		this.handlerOnChange = this.handlerOnChange.bind(this);
		this.handlerIsTypeExists = this.handlerIsTypeExists.bind(this);
	}
	
	handlerOnChange(e) {
		if (this.state.name === "" && this.state.type === "") {
			this.setState({invalid: false});
		};

		this.setState({
			[e.target.name]: e.target.value.toLowerCase().replace(/ /g, "_")
		});
	}

	handlerIsTypeExists(e) {
		if (!this.state.isUpdate) {
			const field = e.target.name;
			const val = e.target.value;
			if (val !== "") {
				this.props.isMarkSettingsExists(val).then(res => {
					let errors = this.state.errors;
					let invalid;
					if (res.data.settings.length !== 0) {
						errors[field] = "There is column with such " + field;
						invalid = true;
					} else {
						errors[field] = "";
						invalid = false;
					}
					this.setState({errors, invalid});
				});
			};
		};
	}

	isValid() {
		const {errors, isValid} = validateInput(this.state);
		if (!isValid) {
			return this.setState({errors});
		}
		return isValid;
	}

	handlerOnSubmit(e) {
		e.preventDefault();
		if (this.isValid()) {
			const {name, type} = this.state;
			this.setState({errors: {}, isLoading: true});
			this.props.saveMarkSettings({name, type})
				.then(() => {
					this.props.addFlashMessages({
						type: "success",
						text: "You have created/updated new column successful"
					});
					this.context.router.history.push('/marks/settings');
				})
				.catch(
					(error) => this.setState({errors: error.response.data, isLoading: false})
				);
		};
	}
	render() {
		const {name, type, errors, isLoading, invalid} = this.state;

		return (
			<form className={classnames("ui", "form signup", {loading: this.state.isLoading})} onSubmit={this.handlerOnSubmit}>
				<h1>{settings.formCreate.header}</h1>
				<TextFieldGroup
					error={errors.name}
					label={settings.formCreate.label.name}
					onChange={this.handlerOnChange}
					value={name}
					field="name"
					isUserExists={this.handlerIsTypeExists}
					onKeyUp={(e) => e.target.value = e.target.value.match(/^[a-z _]+$/)}
				/>
				<TextFieldGroup
					error={errors.type}
					label={settings.formCreate.label.type}
					onChange={this.handlerOnChange}
					value={type}
					field="type"
					onKeyUp={(e) => e.target.value = e.target.value.match(/^[a-z]+$/)}
				/>
				<div className="field create-type-button">
					<div className="create-type-button">
						<button
							disabled={isLoading || invalid }
							className="ui orange basic right floated button"
						>{settings.formCreate.button.save}</button>
					</div>
				</div>
			</form>
		);
	}
}

MarkSettingsForm.contextTypes = {
	router: PropTypes.object.isRequired
}
