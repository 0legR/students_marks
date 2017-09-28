import React, {Component} from 'react';
import main from '../../le/ukr/marks/table';
import validateInput from '../../utils/validations/marks';
import {saveMark, getMarks} from '../../actions/marksActions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addFlashMessages} from '../../actions/flashMessages';

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
	}

	componentDidMount()	{
		this.props.getMarks()
		.then(res => this.setState({marks: res.marks}));
	}

	handlerOnChange(e) {
		let marksTemp = this.state.marks;
		marksTemp.forEach(function(mark) {
			if (mark.id === Number(e.target.id)) {
				let name = String(e.target.name);
				mark[`${name}`] = e.target.value;
			}
		});
		this.setState({
			marks: marksTemp
		});
	}

	isValid() {
		const {marks} = this.state;
		const {errors, isValid} = validateInput(marks);
		if (!isValid) {
			return this.setState({errors});
		}
		return isValid;
	}

	handlerOnSubmit(e) {
		e.preventDefault();
		// console.log(this.isValid());

		if (this.isValid()) {
			// const {allName, visually, code, explanation, stability} = this.state;
			// const {presentation, questions, favoritePlace, favoritism, printOut} = this.state;
			// const {englishPD, git, notes} = this.state;
			const {marks} = this.state;
			console.log("submit", marks);
			this.setState({errors: {}, isLoading: true});

			this.props.saveMark({marks})
				.then(() => {
					this.props.addFlashMessages({
						type: "success",
						text: "You have created/updated new student`s mark successful"
					});
					// this.context.router.history.push('/users/types/');
				})
				.catch(
					(error) => this.setState({errors: error.response.data, isLoading: false})
				);
		};
		setTimeout(() => {this.setState({isLoading: false})}, 2000);
	}

	render() {
		const {isLoading, invalid, errors} = this.state;
		const {marks} = this.state;
		const ROW = marks.map((mark, key) => <tr key={key}>
				      <td>
				      	<input
				      		id={mark.id}
				      		type="text"
				      		defaultValue={mark.all_name}
				      		onChange={this.handlerOnChange}
				      		name="all_name"
				      		onBlur=""
				      		ref={(input) => this.all_name = input}
				      		onKeyUp={(e) => e.target.value = e.target.value.match(/^[a-zA-Z ]+$/)}
				      	/>
				      </td>
				      <td>
				      	{mark.current_rating}
				      </td>
				      <td>
				      	<input
				      		id={mark.id}
				      		type="number"
				      		defaultValue={mark.visually}
				      		onChange={this.handlerOnChange}
				      		name="visually"
				      		onBlur=""
				      		ref={(input) => this.visually = input}
				      		onKeyUp={(e) => e.target.value = e.target.value.match(/^[0-5]$/)}
				      		max="5"
				      		min="0"
				      	/>
				      </td>
				      <td>
				      	<input
				      		id={mark.id}
				      		type="number"
				      		defaultValue={mark.code}
				      		onChange={this.handlerOnChange}
				      		name="code"
				      		onBlur=""
				      		ref={(input) => this.code = input}
				      		onKeyUp={(e) => e.target.value = e.target.value.match(/^[0-5]$/)}
				      		max="5"
				      		min="0"
				      	/>
				      </td>
				      <td>
				      	<input
				      		id={mark.id}
				      		type="number"
				      		defaultValue={mark.explanation}
				      		onChange={this.handlerOnChange}
				      		name="explanation"
				      		onBlur=""
				      		ref={(input) => this.explanation = input}
				      		onKeyUp={(e) => e.target.value = e.target.value.match(/^[0-5]$/)}
				      		max="5"
				      		min="0"
				      	/>
				      </td>
				      <td>
				      	<input
				      		id={mark.id}
				      		type="number"
				      		defaultValue={mark.stability}
				      		onChange={this.handlerOnChange}
				      		name="stability"
				      		onBlur=""
				      		ref={(input) => this.stability = input}
				      		onKeyUp={(e) => e.target.value = e.target.value.match(/^[0-5]$/)}
				      		max="5"
				      		min="0"
				      	/>
				      </td>
				      <td>
				      	<input
				      		id={mark.id}
				      		type="number"
				      		defaultValue={mark.presentation}
				      		onChange={this.handlerOnChange}
				      		name="presentation"
				      		onBlur=""
				      		ref={(input) => this.presentation = input}
				      		onKeyUp={(e) => e.target.value = e.target.value.match(/^[0-5]$/)}
				      		max="5"
				      		min="0"
				      	/>
				      </td>
				      <td>
				      	<input
				      		id={mark.id}
				      		type="number"
				      		defaultValue={mark.questions}
				      		onChange={this.handlerOnChange}
				      		name="questions"
				      		onBlur=""
				      		ref={(input) => this.questions = input}
				      		onKeyUp={(e) => e.target.value = e.target.value.match(/^[0-5]$/)}
				      		max="5"
				      		min="0"
				      	/>
				      </td>
				      <td>
				      	<input
				      		id={mark.id}
				      		type="number"
				      		defaultValue={mark.favorite_place}
				      		onChange={this.handlerOnChange}
				      		name="favorite_place"
				      		onBlur=""
				      		ref={(input) => this.favorite_place = input}
				      		onKeyUp={(e) => e.target.value = e.target.value.match(/^[0-5]$/)}
				      		max="5"
				      		min="0"
				      	/>
				      </td>
				      <td>
				      	<input
				      		id={mark.id}
				      		type="text"
				      		defaultValue={mark.favoritism}
				      		onChange={this.handlerOnChange}
				      		name="favoritism"
				      		onBlur=""
				      		ref={(input) => this.favoritism = input}
				      		onKeyUp={(e) => e.target.value = e.target.value.match(/^[!@#$%^&*()_+=<>|./?,-]/)}
				      	/>
				      </td>
				      <td>
				      	<input
				      		id={mark.id}
				      		type="text"
				      		defaultValue={mark.print_out}
				      		onChange={this.handlerOnChange}
				      		name="print_out"
				      		onBlur=""
				      		ref={(input) => this.print_out = input}
				      		onKeyUp={(e) => e.target.value = e.target.value.match(/^[!@#$%^&*()_+=<>|./?,-]/)}
				      	/>
				      </td>
				      <td>
				      	<input
				      		id={mark.id}
				      		type="text"
				      		defaultValue={mark.english_pd}
				      		onChange={this.handlerOnChange}
				      		name="english_pd"
				      		onBlur=""
				      		ref={(input) => this.english_pd = input}
				      		onKeyUp={(e) => e.target.value = e.target.value.match(/^[!@#$%^&*()_+=<>|./?,-]/)}
				      	/>
				      </td>
				      <td>
				      	<input
				      		id={mark.id}
				      		type="text"
				      		defaultValue={mark.git}
				      		onChange={this.handlerOnChange}
				      		name="git"
				      		onBlur=""
				      		ref={(input) => this.git = input}
				      		onKeyUp={(e) => e.target.value = e.target.value.match(/^[!@#$%^&*()_+=<>|./?,-]/)}
				      	/>
				      </td>
				      <td>
				      	<input
				      		id={mark.id}
				      		type="text"
				      		defaultValue={mark.notes}
				      		onChange={this.handlerOnChange}
				      		name="notes"
				      		onBlur=""
				      		ref={(input) => this.notes = input}
				      	/>
				      </td>
				    </tr>);
		return (
			<div className="marks-outside-container">
				<form onSubmit={this.handlerOnSubmit}>
				<div className="marks-index-container">
				<div className="errors-block">{errors.allName && <span className="ui negative message">{errors.allName}</span>}</div>
				<div className="errors-block">{errors.currentRating && <span className="ui negative message">{errors.currentRating}</span>}</div>
				<div className="errors-block">{errors.visually && <span className="ui negative message">{errors.visually}</span>}</div>
				<div className="errors-block">{errors.code && <span className="ui negative message">{errors.code}</span>}</div>
				<div className="errors-block">{errors.explanation && <span className="ui negative message">{errors.explanation}</span>}</div>
				<div className="errors-block">{errors.stability && <span className="ui negative message">{errors.stability}</span>}</div>
				<div className="errors-block">{errors.presentation && <span className="ui negative message">{errors.presentation}</span>}</div>
				<div className="errors-block">{errors.questions && <span className="ui negative message">{errors.questions}</span>}</div>
				<div className="errors-block">{errors.favoritePlace && <span className="ui negative message">{errors.favoritePlace}</span>}</div>
				<div className="errors-block">{errors.favoritism && <span className="ui negative message">{errors.favoritism}</span>}</div>
					<table className="ui compact celled definition table">
					  <thead className="full-width">
					    <tr>
					      <th colSpan="1">{main.head.firstColumn}</th>
					      <th colSpan="1">{main.head.secondColumn}</th>
					      <th colSpan="1">{main.head.thirdColumn}</th>
					      <th colSpan="1">{main.head.forthColumn}</th>
					      <th colSpan="1">{main.head.fifthColumn}</th>
					      <th colSpan="1">{main.head.sixthColumn}</th>
					      <th colSpan="1">{main.head.seventhColumn}</th>
					      <th colSpan="1">{main.head.eighthColumn}</th>
					      <th colSpan="1">{main.head.ninthColumn}</th>
					      <th colSpan="1">{main.head.tenthColumn}</th>
					      <th colSpan="1">{main.head.eleventhColumn}</th>
					      <th colSpan="1">{main.head.twelfthColumn}</th>
					      <th colSpan="1">{main.head.thirteenthColumn}</th>
					      <th colSpan="1">{main.head.fourteenthColumn}</th>
					    </tr>
					  </thead>
					  <tbody>
					    {ROW}
					  </tbody>
					</table>
				</div>
				<table>
					<tfoot className="full-width">
						<tr>
							<th>
								<button className="ui right floated small primary labeled icon button" disabled={isLoading || invalid }>
									<i className="user icon"></i> Add User
								</button>
								<div className="ui small  button">
									Approve
								</div>
								<div className="ui small  disabled button">
									Approve All
								</div>
							</th>
						</tr>
					</tfoot>
				</table>
				</form>
			</div>
		);
	}
}

MarksIndex.propTypes = {
	saveMark: PropTypes.func.isRequired,
	getMarks: PropTypes.func.isRequired,
	marks: PropTypes.array.isRequired,
	addFlashMessages: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	return {
		marks: state.marks
	};
}

export default connect(mapStateToProps, {saveMark, getMarks, addFlashMessages})(MarksIndex);
