import React, {Component} from 'react';
import main from '../../le/eng/marks/table';
import {TD_STRING, TD_FLOAT, TD_BOOLEAN, TD_IS_CHEKCED, TD_CURRENT_RATING} from './tableRowComponent';

export default class Table extends Component {
	theadMarkGet() {
		let theadMark = [];
		for(let prop in this.props.markSettings.settings) {
			let settings = this.props.markSettings.settings[prop];
			main.head[settings.name] = settings.name.replace(/_/g, " ");
			theadMark.push(<th colSpan="1" className="mark-table-thead-th" key={settings.name+prop}>{main.head[settings.name]}</th>);
		}
		return theadMark;
	}

	render() {
		const THEADMARK = this.theadMarkGet();
		const COLUMN_TYPE = this.props.columnTypeGet();
		let self = this.props;

		const ROW = this.props.marks.map((mark, key) => <tr key={key}>
				<TD_IS_CHEKCED 
						id={mark.id}
						defaultValue={mark.isChecked}
						onChange={self.handlerOnChange}
						name={"isChecked"}
				/>
				{Object.keys(mark).map((columnName, k) => 
					(COLUMN_TYPE[columnName] === 'string' ?  
						<TD_STRING
						id={mark.id}
						defaultValue={mark[columnName]}
						onChange={self.handlerOnChange}
						name={columnName}
						key={k}
					/> : 
					columnName === 'current_rating' ? <TD_CURRENT_RATING
						data={mark[columnName]}
						nameClass={mark.current_rating_class}
						key={k}
					/> :
					COLUMN_TYPE[columnName] === 'float' && columnName !== 'current_rating' ? <TD_FLOAT
						id={mark.id}
						defaultValue={mark[columnName]}
						onChange={self.handlerOnChange}
						name={columnName}
						key={k}
					/> : 
					COLUMN_TYPE[columnName] === 'boolean' ? <TD_BOOLEAN
						id={mark.id}
						defaultValue={mark[columnName]}
						onChange={self.handlerOnChange}
						name={columnName}
						key={k}
					/> : 
					columnName === 'updated_at' ? null : 
					columnName === 'created_at' ? null : 
					columnName === 'id' ? null : 
					columnName === 'columns_amount' ? null :
					columnName === "columns_summ" ? null : 
					columnName === "isChecked" ? null : null
					)
				)}
			</tr>);
	
		return (
			<div>
				<table className="ui compact celled definition table">
					<thead className="full-width">
					    <tr>
					    	<th colSpan="1"></th>
					    	{THEADMARK}
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
