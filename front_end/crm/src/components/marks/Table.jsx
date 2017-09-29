import React, {Component} from 'react';
import main from '../../le/ukr/marks/table';

export default class Table extends Component {
	render() {
		const ROW = this.props.marks.map((mark, key) => <tr key={key}>
			<td className="collapsing">
				<div className="ui fitted slider checkbox">
					<input
						id={mark.id}
						type="checkbox"
						name="isChecked"
						defaultChecked={mark.isChecked}
						onChange={this.props.handlerOnChange}
					 /> <label></label>
				</div>
			</td>
			<td>
				<input
					id={mark.id}
					type="text"
					defaultValue={mark.all_name}
					onChange={this.props.handlerOnChange}
					name="all_name"
					onBlur=""
					ref={(input) => this.all_name = input}
					onKeyUp={(e) => e.target.value = e.target.value.match(/^[a-zA-Z ]+$/)}
				/>
			</td>
			<td className={mark.current_rating_class}>
				{mark.current_rating}
			</td>
			<td>
				<input
					id={mark.id}
					type="number"
					defaultValue={mark.visually}
					onChange={this.props.handlerOnChange}
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
					onChange={this.props.handlerOnChange}
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
					onChange={this.props.handlerOnChange}
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
					onChange={this.props.handlerOnChange}
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
					onChange={this.props.handlerOnChange}
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
					onChange={this.props.handlerOnChange}
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
					onChange={this.props.handlerOnChange}
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
					onChange={this.props.handlerOnChange}
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
					onChange={this.props.handlerOnChange}
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
					onChange={this.props.handlerOnChange}
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
					onChange={this.props.handlerOnChange}
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
					onChange={this.props.handlerOnChange}
					name="notes"
					onBlur=""
					ref={(input) => this.notes = input}
				/>
			</td>
		</tr>);
		return (
			<div>
				<table className="ui compact celled definition table">
					<thead className="full-width">
					    <tr>
					      <th colSpan="1"></th>
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
				<table>
					<tfoot className="full-width">
						<tr>
							<th>
								<button className="ui small primary button" disabled={this.props.isLoading || this.props.invalid }>
									{main.buttons.save}
								</button>
								<div
									className="ui right floated small secondary labeled icon button"
									onClick={this.props.handlerAddRow}
								>
									<i className="user icon"></i> {main.buttons.add}
								</div>
								<div
									className="ui small negative button"
									onClick={this.props.handlerRemoveMarks}
								>
									{main.buttons.remove}
								</div>
							</th>
						</tr>
					</tfoot>
				</table>
				</div>
		);
	};
};
