import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getOneMarkWeigth, updateMarkWeigth} from '../../../actions/markWeigthAction';
import {addFlashMessages} from '../../../actions/flashMessages';
import MarkWeigthForm from './MarkWeigthForm';
import {Redirect} from 'react-router-dom';

class MarkWeigthFormPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false
		}
	}

	componentDidMount() {
		if (this.props.match.params.id) {
			this.props.getOneMarkWeigth(this.props.match.params.id);
		}
	}

	saveMarkWeigth = ({id, name, weigth}) => {
		return this.props.updateMarkWeigth({id, name, weigth})
			.then(() => {this.setState({redirect: true})});
	}

	render() {
		return (
			<div>
				{this.state.redirect ? <Redirect to="/marks/weigth" /> :
					<MarkWeigthForm
						addFlashMessages={this.props.addFlashMessages}
						saveMarkWeigth={this.saveMarkWeigth}
						markWeigth={this.props.markWeigth}
					/>}
			</div>
		);
	}
}

MarkWeigthFormPage.propTypes = {
	addFlashMessages: PropTypes.func.isRequired,
	getOneMarkWeigth: PropTypes.func.isRequired,
	updateMarkWeigth: PropTypes.func.isRequired,
	markWeigth: PropTypes.object
}

function mapStateToProps(state, props) {
	let radix = false;
	if (props.match.params.id) {
		return {
			markWeigth: state.markWeigth.find(item => item.id === parseInt(props.match.params.id, radix))
		};
	}
	return {markWeigth: null};
}

export default connect(mapStateToProps, {getOneMarkWeigth, addFlashMessages, updateMarkWeigth})(MarkWeigthFormPage);
