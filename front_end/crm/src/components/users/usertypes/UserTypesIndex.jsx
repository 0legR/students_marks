import React, {Component} from 'react';
import usertypes from '../../../le/eng/users/usertypes';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getTypes, deleteUserType} from '../../../actions/usertypeActions';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class UserTypesIndex extends Component {
	constructor(props) {
		super(props);
		this.state = {
			typename: "",
			typeId: "",
			isLoading: {
				typename: false,
				typeId: false
			}
		}
		this.handlerOnChange = this.handlerOnChange.bind(this);
		this.handlerFilter = this.handlerFilter.bind(this);
		this.handlerOnBlur = this.handlerOnBlur.bind(this);
	}

	componentDidMount()	{
		this.props.getTypes();
	}

	handlerOnChange(e) {
		this.setState({
			[e.target.name]: e.target.value,
			isLoading: {[e.target.name]: true}
		});
	}

	handlerFilter() {
		const {typename, typeId} = this.state;
		let resultFilter = [];
		let resultAll = [];
		let radix = false;
		let self = this.props;
		this.props.types.forEach(
			function(type) {
				if (type.typeId === parseInt(typeId, radix) || type.typename === typename) {
					resultFilter.push(<tr key={type.typeId}>
				      <td><div className="usertype-th">{type.typename}</div></td>
				      <td><div className="usertype-th">{type.typeId}</div></td>
				    </tr>);
				} else {
					resultAll.push(<tr key={type.typeId}>	
				      <td>
				      	<Link to={`/users/types/update/${type.id}`}>
				      		<div className="usertype-th">{type.typename}</div>
				      	</Link>
				      </td>
				      <td>
				      	<Link to={`/users/types/update/${type.id}`}>
				      		<div className="usertype-th">{type.typeId}</div>
				      	</Link>
				      </td>
				      <td>
				    	<div className="usertype-th-destroy">
				    		<button className="ui negative basic button" onClick={() => self.deleteUserType(type.id)}>
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

	render() {
		const {typename, typeId} = this.state;
		const userTypes = this.handlerFilter();
		return (
			<div>
				<button
					className="ui orange basic right floated button create-button"
				><Link to="/users/types/create">{usertypes.createUserType}</Link></button>
				<table className="ui striped table">
				  <thead>
				    <tr>
				      <th>{usertypes.thTypeName}</th>
				      <th>{usertypes.thTypeId}</th>
				      <th>{usertypes.thDestroy}</th>
				    </tr>
				    <tr className="table-filter">
				    	<th>
					    	<div className={classnames("ui", "icon input", {loading: this.state.isLoading.typename})} >
					    		<input
					    			type="text"
					    			name="typename"
					    			value={typename}
					    			onChange={this.handlerOnChange}
					    			onBlur={this.handlerOnBlur}
					    		/>
					    		<i className="search icon"></i>
				    		</div>
				    	</th>
				    	<th>
				    		<div className={classnames("ui", "icon input", {loading: this.state.isLoading.typeId})}>
					    		<input
					    			type="text"
					    			name="typeId"
					    			value={typeId}
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
				    {userTypes}
				  </tbody>
				</table>
			</div>
		);
	}
}

UserTypesIndex.propTypes = {
	getTypes: PropTypes.func.isRequired,
	types: PropTypes.array.isRequired,
	getOneType: PropTypes.func,
	deleteUserType: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	return {
		types: state.userTypes
	}
}

export default connect(mapStateToProps, {getTypes, deleteUserType})(UserTypesIndex);