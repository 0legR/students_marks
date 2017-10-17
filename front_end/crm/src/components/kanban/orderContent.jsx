import React, {Component} from 'react';
import Checkbox from './checkBox';

export default class OrderContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isChecked: false
		}
	}

	render() {
		const {isChecked} = this.state;
		const product = this.props.product;
		console.log(product.length);
		// product.map(item => console.log(item.name));
		return (
			<div className="order-content-container">
				<Checkbox
					label="Order:"
					name="Ordering"
					checked={isChecked}
					nameClass={isChecked ? "order-content-checkbox-checked" : "order-content-checkbox-unchecked"}
				/>
				{!product.length ?
					<Checkbox
						label={product.name}
						name={product.name}
						checked={isChecked}
						nameClass={isChecked ? "order-content-checkbox-checked" : "order-content-checkbox-unchecked"}
					/> : product.map((name, key) => <Checkbox
						key={key}
						label={name}
						name={name}
						checked={isChecked}
						nameClass={isChecked ? "order-content-checkbox-checked" : "order-content-checkbox-unchecked"}
					/>)}
			</div>
		);
	}
}