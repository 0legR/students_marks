import React, {Component} from 'react';

export default class Errors extends Component {
	render() {
		return (
			<div>
				<div className="errors-block">{this.props.errors.all_name && <span className="ui negative message">{this.props.errors.all_name}</span>}</div>
				<div className="errors-block">{this.props.errors.visually && <span className="ui negative message">{this.props.errors.visually}</span>}</div>
				<div className="errors-block">{this.props.errors.code && <span className="ui negative message">{this.props.errors.code}</span>}</div>
				<div className="errors-block">{this.props.errors.explanation && <span className="ui negative message">{this.props.errors.explanation}</span>}</div>
				<div className="errors-block">{this.props.errors.stability && <span className="ui negative message">{this.props.errors.stability}</span>}</div>
				<div className="errors-block">{this.props.errors.presentation && <span className="ui negative message">{this.props.errors.presentation}</span>}</div>
				<div className="errors-block">{this.props.errors.questions && <span className="ui negative message">{this.props.errors.questions}</span>}</div>
				<div className="errors-block">{this.props.errors.favorite_place && <span className="ui negative message">{this.props.errors.favorite_place}</span>}</div>
				<div className="errors-block">{this.props.errors.favoritism && <span className="ui negative message">{this.props.errors.favoritism}</span>}</div>
				<div className="errors-block">{this.props.errors.print_out && <span className="ui negative message">{this.props.errors.print_out}</span>}</div>
				<div className="errors-block">{this.props.errors.english_pd && <span className="ui negative message">{this.props.errors.english_pd}</span>}</div>
				<div className="errors-block">{this.props.errors.git && <span className="ui negative message">{this.props.errors.git}</span>}</div>
			</div>
		);
	}
};