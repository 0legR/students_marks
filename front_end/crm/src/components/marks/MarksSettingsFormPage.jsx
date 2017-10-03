import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getOneMarkSet, updateMarkSettings, markSettingsRequest, isMarkSettingsExists} from '../../actions/markSettingsAction';
import {addFlashMessages} from '../../actions/flashMessages';
import MarkSettingsForm from './MarkSettingsForm';
import {Redirect} from 'react-router-dom';

class MarkSettingsFormPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false
		}
	}

	componentDidMount() {
		console.log(this.props.match.params);
		if (this.props.match.params.name) {
			this.props.getOneMarkSet(this.props.match.params.name);
		}
	}

	saveMarkSettings = ({name, type}) => {console.log('here');
		// if (name) {
		// 	return this.props.updateMarkSettings({name, type})
		// 		.then(() => {this.setState({redirect: true})});
		// } else {
			return this.props.markSettingsRequest({name, type})
				.then(() => {this.setState({redirect: true})});
		// }
	}

	render () {
		return (
			<div>
				{this.state.redirect ? <Redirect to="/users/types" /> :
					<MarkSettingsForm
						addFlashMessages={this.props.addFlashMessages}
						saveMarkSettings={this.saveMarkSettings}
						isMarkSettingsExists={this.props.isMarkSettingsExists}
					/>}
			</div>
		);
	}
}

MarkSettingsFormPage.propTypes = {
	markSettingsRequest: PropTypes.func.isRequired,
	// isTypeExists: PropTypes.func.isRequired,
	addFlashMessages: PropTypes.func.isRequired,
	getOneMarkSet: PropTypes.func.isRequired,
	updateMarkSettings: PropTypes.func.isRequired,
	markSettings: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
}

function mapStateToProps(state, props) {
	console.log(state);
	if (props.match.params.name) {
		return {
			markSettings: state.markSettings.find(item => item.name === props.match.params.name)
		};
	}
	return {markSettings: null};
}

export default connect(mapStateToProps, {getOneMarkSet, addFlashMessages, updateMarkSettings, markSettingsRequest, isMarkSettingsExists})(MarkSettingsFormPage);
