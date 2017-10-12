import React, {Component} from 'react';

export default class Errors extends Component {
	render() {
		return (
			<div>
				{this.props.marks.map((mark, key) => (
					mark.id === this.props.errors.id ? 
						Object.keys(mark).map((columnName) => 
							(columnName === 'id' ? null : 
								<div className="errors-block">
									{this.props.errors[columnName] && 
										<span className="ui negative message">
											{this.props.errors[columnName]}
										</span>
									}
								</div>)
						) : null
					)
				)}
			</div>
		);
	}
};