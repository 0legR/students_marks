import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {getMarkWeigth, deleteMarkWeigth} from '../../../actions/markWeigthAction';
import {addFlashMessages} from '../../../actions/flashMessages';
import weigth from '../../../le/eng/marks/weigth';

class MarksWeigthIndex extends Component {
	constructor(props) {
		super(props);
		this.state = {
			columnName: "",
			columnWeigth: "",
			isLoading: {
				columnName: false,
				columnWeigth: false
			}
		}
		this.handlerOnChange = this.handlerOnChange.bind(this);
		this.handlerFilter = this.handlerFilter.bind(this);
		this.handlerOnBlur = this.handlerOnBlur.bind(this);
		this.handlerDestroy = this.handlerDestroy.bind(this);
	}

	componentDidMount()	{
		this.props.getMarkWeigth();
	}

	handlerOnChange(e) {
		this.setState({
			[e.target.name]: e.target.value,
			isLoading: {[e.target.name]: true}
		});
	}

	handlerFilter() {
		const {columnName, columnWeigth} = this.state;
		let resultFilter = [];
		let resultAll = [];
		let self = this;
		
		this.props.markWeigth.forEach(
			function(settingsWeigth) {
				if (settingsWeigth.weigth === parseFloat(columnWeigth) || settingsWeigth.name === columnName) {
					resultFilter.push(<tr key={settingsWeigth.weigth}>
				      <td><div className="usertype-th">{settingsWeigth.name}</div></td>
				      <td><div className="usertype-th">{settingsWeigth.weigth}</div></td>
				    </tr>);
				} else {
					resultAll.push(<tr key={settingsWeigth.weigth}>	
				      <td>
				      	<Link to={`/marks/settings/weigth/${settingsWeigth.id}`}>
				      		<div className="usertype-th">{settingsWeigth.name}</div>
				      	</Link>
				      </td>
				      <td>
				      	<Link to={`/marks/settings/weigth/${settingsWeigth.id}`}>
				      		<div className="usertype-th">{settingsWeigth.weigth}</div>
				      	</Link>
				      </td>
				      <td>
				    	<div className="usertype-th-destroy">
				    		<button className="ui negative basic button" onClick={() => self.handlerDestroy(settingsWeigth.id)}>
					    			<div className="usertype-destroy">
					    				<i className="trash outline icon"></i>
					    			</div>
				    		</button>
				    	</div>
				    	</td>
				    </tr>);
				}
			}
		);

		return resultFilter.length !== 0 ? resultFilter : resultAll;
	}

	handlerOnBlur(e) {
		this.setState({
			isLoading: {[e.target.name]: false}
		});
	}

	handlerDestroy(id) {
		this.props.deleteMarkWeigth(id)
		.then(() => {
			this.props.addFlashMessages({
				type: "success",
				text: "You have deleted column weigth successful"
			});
			this.props.getMarkWeigth();
		})
		.catch(
			(error) => this.setState({errors: error.response.data, isLoading: false})
		);
	}

	render() {
		const {columnName, columnWeigth, isLoading} = this.state;
		const settingsWeigth = this.handlerFilter();
		return (
			<div className="marks-settings-outside-container">
				<table className="ui striped table">
				  <thead>
				    <tr>
				      <th>{weigth.table.thead.columnName}</th>
				      <th>{weigth.table.thead.columnType}</th>
				      <th>{weigth.table.thead.destroy}</th>
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
				    		<div className={classnames("ui", "icon input", {loading: isLoading.columnWeigth})}>
					    		<input
					    			type="text"
					    			name="columnWeigth"
					    			value={columnWeigth}
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
				    {settingsWeigth}
				  </tbody>
				</table>
			</div>
		);
	}
}

MarksSettingsIndex.propTypes = {
	getMarkWeigth: PropTypes.func.isRequired,
	markSettings: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
	deleteMarkWeigth: PropTypes.func.isRequired,
	addFlashMessages: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	return {
		markWeigth: state.markWeigth
	};
}

export default connect(mapStateToProps, {getMarkWeigth, deleteMarkWeigth, addFlashMessages})(MarksWeigthIndex);
