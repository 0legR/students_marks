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
		if (this.props.match.params.name) {
			this.props.getOneMarkSet(this.props.match.params.name);
		}
	}

	saveMarkSettings = ({name, type, prevName, prevType}) => {
		if (prevName !== "") {
			return this.props.updateMarkSettings({name, type, prevName, prevType})
				.then(() => {this.setState({redirect: true})});
		} else {
			return this.props.markSettingsRequest({name, type})
				.then(() => {this.setState({redirect: true})});
		}
	}

	render() {
		let settings = {};
		for(let prop in this.props.markSettings) {
			settings[prop] = this.props.markSettings[prop];
		}
		return (
			<div>
				{this.state.redirect ? <Redirect to="/marks/settings" /> :
					<MarkSettingsForm
						addFlashMessages={this.props.addFlashMessages}
						saveMarkSettings={this.saveMarkSettings}
						isMarkSettingsExists={this.props.isMarkSettingsExists}
						markSettings={settings}
					/>}
			</div>
		);
	}
}

MarkSettingsFormPage.propTypes = {
	markSettingsRequest: PropTypes.func.isRequired,
	isMarkSettingsExists: PropTypes.func.isRequired,
	addFlashMessages: PropTypes.func.isRequired,
	getOneMarkSet: PropTypes.func.isRequired,
	updateMarkSettings: PropTypes.func.isRequired,
	markSettings: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
}

function mapStateToProps(state, props) {
	if (props.match.params.name) {
		let settings = [state.markSettings];
		return {
			markSettings: settings.find(item => item.name === props.match.params.name)
		};
	}
	return {markSettings: null};
}

export default connect(mapStateToProps, {getOneMarkSet, addFlashMessages, updateMarkSettings, markSettingsRequest, isMarkSettingsExists})(MarkSettingsFormPage);
