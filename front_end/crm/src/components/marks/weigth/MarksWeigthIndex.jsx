import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {getMarkWeigth} from '../../../actions/markWeigthAction';
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
		
		this.props.markWeigth.forEach(
			function(settingsWeigth) {
				if (settingsWeigth.weigth === parseFloat(columnWeigth) || settingsWeigth.name === columnName) {
					resultFilter.push(<tr key={settingsWeigth.weigth+settingsWeigth.name}>	
				      <td>
				      	<Link to={`/marks/weigth/${settingsWeigth.id}`}>
				      		<div className="usertype-th">{settingsWeigth.name}</div>
				      	</Link>
				      </td>
				      <td>
				      	<Link to={`/marks/weigth/${settingsWeigth.id}`}>
				      		<div className="usertype-th">{settingsWeigth.weigth}</div>
				      	</Link>
				      </td>
				    </tr>);
				} else {
					resultAll.push(<tr key={settingsWeigth.weigth+settingsWeigth.name}>	
				      <td>
				      	<Link to={`/marks/weigth/${settingsWeigth.id}`}>
				      		<div className="usertype-th">{settingsWeigth.name}</div>
				      	</Link>
				      </td>
				      <td>
				      	<Link to={`/marks/weigth/${settingsWeigth.id}`}>
				      		<div className="usertype-th">{settingsWeigth.weigth}</div>
				      	</Link>
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

	render() {
		const {columnName, columnWeigth, isLoading} = this.state;
		const settingsWeigth = this.handlerFilter();
		return (
			<div className="marks-settings-outside-container">
				<h1>{weigth.header.header}</h1>
				<table className="ui striped table">
				  <thead>
				    <tr>
				      <th>{weigth.table.thead.columnName}</th>
				      <th>{weigth.table.thead.columnType}</th>
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

MarksWeigthIndex.propTypes = {
	getMarkWeigth: PropTypes.func.isRequired,
	markWeigth: PropTypes.array.isRequired,
	addFlashMessages: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	return {
		markWeigth: state.markWeigth
	};
}

export default connect(mapStateToProps, {getMarkWeigth, addFlashMessages})(MarksWeigthIndex);
