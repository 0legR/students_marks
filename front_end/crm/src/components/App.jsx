import React, {Component} from 'react';
import Footer from './layout/footer';
import FlashMessageList from './layout/flashMessageList';
import HomeHeader from './layout/header';
import {MainHeader} from './layout/MainHeader';


export default class App extends Component {
	render() {
		const Header = window.location.pathname === "/" ? <MainHeader /> : <HomeHeader />;

		return (
			<div>
				<div className="container-main">
					{Header}
					<div className="ui container main-content">
							<FlashMessageList />
							{this.props.children}
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}
