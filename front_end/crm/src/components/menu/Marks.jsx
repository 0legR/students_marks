import React, {Component} from 'react';
import main from '../../le/eng/marks/main';
import MarksIndex from '../marks/marksIndex';

class Marks extends Component {
	render() {
		return (
			<div>
			<h1>{main.header}</h1>
				<MarksIndex />
			</div>
		);
	}
}

export default Marks;