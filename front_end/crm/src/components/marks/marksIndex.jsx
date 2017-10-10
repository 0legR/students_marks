import React, {Component} from 'react';
import validateInput from '../../utils/validations/marks';
import {saveMark, getMarks, deleteMarks} from '../../actions/marksActions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addFlashMessages} from '../../actions/flashMessages';
import Table from './Table';
import Errors from './errors';
import classnames from 'classnames';
import {getMarkSettings} from '../../actions/markSettingsAction';

class MarksIndex extends Component {
	constructor(props) {
		super(props);
		this.state = {
			marks: [],
			isLoading: false,
			invalid: false,
			errors: {}
		}
		this.handlerOnChange = this.handlerOnChange.bind(this);
		this.handlerOnSubmit = this.handlerOnSubmit.bind(this);
		this.handlerAddRow = this.handlerAddRow.bind(this);
		this.handlerRemoveMarks = this.handlerRemoveMarks.bind(this);
		this.markUpdateToRedux = this.markUpdateToRedux.bind(this);
		this.columnTypeGet = this.columnTypeGet.bind(this);
	}

	componentDidMount()	{
		this.props.getMarks()
		.then(res => this.setState({marks: res.marks, isLoading: false}))
		.then(this.markUpdateToRedux);
	}

	componentWillMount() {
		this.props.getMarkSettings();
	}

	markUpdateToRedux() {
		let marksTemp = this.state.marks;
		marksTemp.forEach(function(mark) {
			mark['isChecked'] = false;
			if (mark['current_rating'] < 1 || mark['current_rating'] === null) {
				mark['current_rating_class'] = "current-rating-0";
				mark['current_rating'] = "0";
			}
			if (mark['current_rating'] < 2 && mark['current_rating'] >= 1) {
				mark['current_rating_class'] = "current-rating-1";
			}
			if (mark['current_rating'] < 3 && mark['current_rating'] >= 2) {
				mark['current_rating_class'] = "current-rating-2";
			}
			if (mark['current_rating'] < 4 && mark['current_rating'] >= 3) {
				mark['current_rating_class'] = "current-rating-3";
			}
			if (mark['current_rating'] < 5 && mark['current_rating'] >= 4) {
				mark['current_rating_class'] = "current-rating-4";
			}
			if (mark['current_rating'] >= 5) {
				mark['current_rating_class'] = "current-rating-5";
			}
		});
		this.setState({
			marks: marksTemp
		});
	}

	handlerOnChange(e) {
		let marksTemp = this.state.marks;

		marksTemp.forEach(function(mark) {
			if (String(mark.id) === String(e.target.id) || !mark.id) {
				let name = String(e.target.name);
				if (e.target.type === 'checkbox') {
					if (mark[`${name}`] !== "on") {
						mark[`${name}`] = e.target.checked;
					}else{
						mark[`${name}`] = false;
					}
				}else {
					mark[`${name}`] = e.target.value;
				}
			}
		});
		this.setState({
			marks: marksTemp
		});
	}

	isValid() {
		const {marks} = this.state;
		const COLUMN_TYPE = this.columnTypeGet();
		const {errors, isValid} = validateInput(marks, COLUMN_TYPE);
		if (!isValid) {
			return this.setState({errors});
		}
		return isValid;
	}

	handlerOnSubmit(e) {
		e.preventDefault();
		if (this.isValid()) {
			const {marks} = this.state;
			this.setState({errors: {}, isLoading: true});
			this.props.saveMark({marks})
				.then(() => {
					this.props.addFlashMessages({
						type: "success",
						text: "You have created/updated new student`s mark successful"
					});
					this.props.getMarks()
						.then(res => this.setState({marks: res.marks}))
						.then(this.markUpdateToRedux);
				})
				.catch(
					(error) => this.setState({errors: error.response.data, isLoading: false})
				);
		};
		setTimeout(() => {this.setState({isLoading: false})}, 2000);
	}

	columnTypeGet() {
		let columnType = {};
		for(let prop in this.props.markSettings.settings) {
			let settings = this.props.markSettings.settings[prop];
			columnType[settings.name] = settings.type;
		}
		return columnType;
	}

	handlerAddRow() {
		let marksTemp = this.state.marks;
		const COLUMN_TYPE = this.columnTypeGet();
		let row = {};
		marksTemp.map((mark, key) => 
			Object.keys(mark).map((columnName, k) => {
				row['id'] = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
				if (COLUMN_TYPE[columnName] === 'string' || COLUMN_TYPE[columnName] === 'float' || COLUMN_TYPE[columnName] === 'text') {
							row[columnName] = "";
				}
				if (COLUMN_TYPE[columnName] === 'boolean') {
					row[columnName] = false;
				}
			})
		);
		marksTemp.push(row);

		this.setState({
			marks: marksTemp
		});
	}

	handlerRemoveMarks() {
		let marksTemp = this.state.marks;
		let marksDestroy = [];
		marksTemp.forEach(function(mark) {
			if (mark.isChecked) {
				marksDestroy.push(mark);
			}
		});
		this.props.deleteMarks(marksDestroy)
		.then(() => {
			this.props.addFlashMessages({
				type: "success",
				text: "You have deleted student`s marks successful"
			});
			this.props.getMarks()
			.then(res => this.setState({marks: res.marks}))
			.then(this.markUpdateToRedux);
		})
		.catch(
			(error) => this.setState({errors: error.response.data, isLoading: false})
		);
	}

	render() {
		const {isLoading, invalid, errors, marks} = this.state;
		return (
			<div className="marks-outside-container">
				<form
					className={classnames("ui", "form", {loading: this.state.isLoading})}
					onSubmit={this.handlerOnSubmit}
				>
					<div className="marks-index-container">
						<Errors
							errors={errors}
							marks={marks}
						/>
						<Table
							marks={marks}
							isLoading={isLoading}
							invalid={invalid}
							handlerAddRow={this.handlerAddRow}
							handlerRemoveMarks={this.handlerRemoveMarks}
							handlerOnChange={this.handlerOnChange}
							markSettings={this.props.markSettings}
							columnTypeGet={this.columnTypeGet}
						/>
					</div>	
				</form>
			</div>
		);
	}
}

MarksIndex.propTypes = {
	saveMark: PropTypes.func.isRequired,
	getMarks: PropTypes.func.isRequired,
	marks: PropTypes.array.isRequired,
	addFlashMessages: PropTypes.func.isRequired,
	deleteMarks: PropTypes.func.isRequired,
	getMarkSettings: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	return {
		marks: state.marks,
		markSettings: state.markSettings
	};
}

export default connect(mapStateToProps, {saveMark, getMarks, addFlashMessages, deleteMarks, getMarkSettings})(MarksIndex);
