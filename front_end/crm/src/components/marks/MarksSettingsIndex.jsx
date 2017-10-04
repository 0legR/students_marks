import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {getMarkSettings, deleteMarkSettings} from '../../actions/markSettingsAction';
import settings from '../../le/eng/marks/settings';

class MarksSettingsIndex extends Component {
	constructor(props) {
		super(props);
		this.state = {
			columnName: "",
			columnType: "",
			isLoading: {
				columnName: false,
				columnType: false
			}
		}
		this.handlerOnChange = this.handlerOnChange.bind(this);
		this.handlerFilter = this.handlerFilter.bind(this);
		this.handlerOnBlur = this.handlerOnBlur.bind(this);
	}

	componentDidMount()	{
		this.props.getMarkSettings();
	}

	handlerOnChange(e) {
		this.setState({
			[e.target.name]: e.target.value,
			isLoading: {[e.target.name]: true}
		});
	}

	handlerFilter() {
		const {columnName, columnType} = this.state;
		let resultFilter = [];
		let resultAll = [];
		let self = this.props;

		for(let prop in this.props.markSettings.settings) {

			let settings = this.props.markSettings.settings[prop];

			if (settings.type === columnType || settings.name === columnName) {
					resultFilter.push(<tr key={prop}>
				      <td><div className="usertype-th">{settings.name}</div></td>
				      <td><div className="usertype-th">{settings.type}</div></td>
				    </tr>);
				} else {
					resultAll.push(<tr key={prop}>	
				      <td>
				      	<Link to={`/marks/settings/update/${settings.name}`}>
				      		<div className="usertype-th">{settings.name}</div>
				      	</Link>
				      </td>
				      <td>
				      	<Link to={`/marks/settings/update/${settings.name}`}>
				      		<div className="usertype-th">{settings.type}</div>
				      	</Link>
				      </td>
				      <td>
				    	<div className="usertype-th-destroy">
				    		<button className="ui negative basic button" onClick={() => self.deleteMarkSettings(settings.name)}>
					    			<div className="usertype-destroy">
					    				<i className="trash outline icon"></i>
					    			</div>
				    		</button>
				    	</div>
				    	</td>
				    </tr>);
				}
		}

		return resultFilter.length !== 0 ? resultFilter : resultAll;
	}

	handlerOnBlur(e) {
		this.setState({
			isLoading: {[e.target.name]: false}
		});
	}

	render() {
		const {columnName, columnType, isLoading} = this.state;
		const markSettings = this.handlerFilter();
		return (
			<div className="marks-settings-outside-container">
				<button
					className="ui orange basic right floated button create-button"
				><Link to="/marks/settings/create">{settings.header.buttonCreateColumn}</Link></button>
				<table className="ui striped table">
				  <thead>
				    <tr>
				      <th>{settings.table.thead.columnName}</th>
				      <th>{settings.table.thead.columnType}</th>
				      <th>{settings.table.thead.destroy}</th>
				    </tr>
				    <tr className="table-filter">
				    	<th>
					    	<div className={classnames("ui", "icon input", {loading: isLoading.columnName})} >
					    		<input
					    			type="text"
					    			name="columnName"
					    			value={columnName}
					    			onChange={this.handlerOnChange}
					    			onBlur={this.handlerOnBlur}
					    		/>
					    		<i className="search icon"></i>
				    		</div>
				    	</th>
				    	<th>
				    		<div className={classnames("ui", "icon input", {loading: isLoading.columnType})}>
					    		<input
					    			type="text"
					    			name="columnType"
					    			value={columnType}
					    			onChange={this.handlerOnChange}
					    			onBlur={this.handlerOnBlur}
					    		/>
					    		<i className="search icon"></i>
				    		</div>
				    	</th>
				    	<th><div className="usertype-destroy"><i className="trash outline icon"></i></div></th>
				    </tr>
				  </thead>
				  <tbody>
				    {markSettings}
				  </tbody>
				</table>
			</div>
		);
	}
}

MarksSettingsIndex.propTypes = {
	getMarkSettings: PropTypes.func.isRequired,
	markSettings: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
	deleteMarkSettings: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	return {
		markSettings: state.markSettings
	};
}

export default connect(mapStateToProps, {getMarkSettings, deleteMarkSettings})(MarksSettingsIndex);
