import React, {Component} from 'react';
import ControlPanel from './controlPanel';
import ClientInfo from './ClientInfo';
import {connect} from 'react-redux';
import {getCustomersInfo} from '../../actions/kanbanActions';
import PropTypes from 'prop-types';

class OrderCard extends Component {
	componentWillMount() {
		this.props.getCustomersInfo();
	}

	render() {
		const customers = this.props.customers;
		return (
			<div>
				{customers.map((user, key) => <div className="order-card-container" key={key}>
					<ControlPanel />
					<ClientInfo
						name={user.name}
						phone={user.phones}
						email={user.email}
					/>
				</div>)}
			</div>
		);
	}
}

OrderCard.propTypes = {
	getCustomersInfo: PropTypes.func.isRequired,
	customers: PropTypes.array.isRequired
}

function mapStateToProps(state) {
	return {
		customers: state.kanban
	}
}

export default connect(mapStateToProps, {getCustomersInfo})(OrderCard);
