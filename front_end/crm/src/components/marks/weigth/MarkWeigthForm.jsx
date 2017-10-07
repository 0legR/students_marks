import React, {Component} from 'react';
import {TextFieldGroup} from '../../layout/TextFieldGroup';
import classnames from 'classnames';
import weigth from '../../../le/eng/marks/weigth';
import PropTypes from 'prop-types';
import validateInput from '../../../utils/validations/marksWeigth';

export default class MarkWeigthForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.markWeigth.id,
			columnName: this.props.markWeigth.name,
			columnWeigth: this.props.markWeigth.weigth.toString(),
			errors: {},
			isLoading: false
		}

		this.handlerOnSubmit = this.handlerOnSubmit.bind(this);
		this.handlerOnChange = this.handlerOnChange.bind(this);
	}
	
	handlerOnChange(e) {
		this.setState({
			[e.target.name]: e.target.value.toLowerCase()
		});
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
			const {id, columnName, columnWeigth} = this.state;
			this.setState({errors: {}, isLoading: true});
			this.props.saveMarkWeigth({id, columnName, columnWeigth})
				.then(() => {
					this.props.addFlashMessages({
						type: "success",
						text: "You have created/updated column weigth successful"
					});
					this.context.router.history.push('/marks/weigth');
				})
				.catch(
					(error) => this.setState({errors: error.response.data, isLoading: false})
				);
		};
	}

	render() {
		const {columnName, columnWeigth, errors, isLoading} = this.state;
		const regexFloat = /^(?=.+)(?:[0-5])?(?:\.[0-9]{0,2})?$/;

		return (
			<form className={classnames("ui", "form signup", {loading: this.state.isLoading})} onSubmit={this.handlerOnSubmit}>
				<h1>{weigth.formCreate.header}</h1>
				<div className={classnames("field", {"field error": error})}>
					<label className="ui label">{weigth.formCreate.label.name}</label>
					<input
						value={columnName}
						type="text"
						name={columnName}
						className="ui input"
						readOnly
					/>
				</div>
				<TextFieldGroup
					error={errors.columnWeigth}
					label={weigth.formCreate.label.weigth}
					onChange={this.handlerOnChange}
					value={columnWeigth}
					field="columnWeigth"
					type="number"
					onKeyUp={(e) => e.target.value = e.target.value.match(regexFloat)}
				/>
				<div className="field create-type-button">
					<div className="create-type-button">
						<button
							disabled={isLoading}
							className="ui orange basic right floated button"
						>{weigth.formCreate.button.save}</button>
					</div>
				</div>
			</form>
		);
	}
}

MarkWeigthForm.contextTypes = {
	router: PropTypes.object.isRequired
}
