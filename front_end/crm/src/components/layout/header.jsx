import React from 'react';
import logo from '../img/logo.png';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/authActions';
import {NavLink} from 'react-router-dom';
import header from '../../le/eng/layout/header';

class HomeHeader extends React.Component {
	handleLogout(e) {
		e.preventDefault();
		this.props.logout();
		this.context.router.history.push('/');
	}

	render() {
		const userLinks = (
			<div className="right menu">
				<button onClick={this.handleLogout.bind(this)} className="ui item">Logout</button>
			</div>
		);
		const mainLinks = (
			<div className="ui secondary pointing menu">
				<NavLink className="item" activeClassName="active" exact to="/settings">{header.navLinkSettings}</NavLink>
				<NavLink className="item" activeClassName="active" exact to="/marks">{header.navLinkMarks}</NavLink>
			</div>
		);
		return (
			<div className="home-header-container">
				<div className="ui block header">
					<div className="ui secondary pointing menu">
						<div className="ui container">
							<div className="">
								<img src={logo} alt="Logo" className="item ui medium circular image header-block" />
								<h1 className="item header-block">Header</h1>
							</div>
							{mainLinks}
							{userLinks}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

HomeHeader.propTypes = {
	logout: PropTypes.func.isRequired
}

HomeHeader.contextTypes = {
	router: PropTypes.object.isRequired
}

export default connect(null, {logout}, null, {pure:false})(HomeHeader);
