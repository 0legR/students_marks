import React, {Component} from 'react';
import {ICONS} from './ICONS';


export default class ControlPanel extends Component {
	constructor(props) {
		super(props);
		this.handlerOnClick = this.handlerOnClick.bind(this);
	}

	handlerOnClick(e) {
		let target = e.target;
		target.className = "svg-rotate-y";

		setTimeout(() => target.className = "control-panel-svg", 4000);

	}

	render() {
		return (
			<div>
				{ICONS.map((icon, key) => <img
					src={icon.src}
					alt={icon.alt}
					className="control-panel-svg"
					key={key}
					onClick={this.handlerOnClick}
				 />)}
			</div>
		);
	}
}