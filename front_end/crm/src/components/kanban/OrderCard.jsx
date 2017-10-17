import React, {Component} from 'react';
import ControlPanel from './controlPanel';
import ClientInfo from './ClientInfo';
import {connect} from 'react-redux';
import {getCustomersInfo} from '../../actions/kanbanActions';
import PropTypes from 'prop-types';
import OrderContent from './orderContent';
import Products from '../data/products';

class OrderCard extends Component {
	componentWillMount() {
		this.props.getCustomersInfo();
	}

	render() {
		const customers = this.props.customers;
		for (var i = 0; i < customers.length; i++) {
			if (Products[i].name !== undefined) {
					customers[i].product = {"name": Products[i].name};
			} else {
				customers[i].product = Products[i].map(prod => prod.name);
			}
		}
// console.log(customers);
		// Products.map(product => {
		// 	if (product.name !== undefined) {
		// 		console.log(product.name);
		// 	} else {
		// 		product.map(prod => console.log(prod.name));
		// 	}
		// });
		return (
			<div>
				{customers.map((user, key) => <div className="order-card-container" key={key}>
					<ControlPanel />
					<ClientInfo
						name={user.username}
						phone={user.phones}
						email={user.email}
					/>
					<OrderContent
						product={user.product}
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
