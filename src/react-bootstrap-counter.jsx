import React from 'react';

export default class CounterInput extends React.Component {

	constructor(props) {
		super(props);
		
		this.state = {
			value: this.props.value || '',
			min: this.props.min || 0,
			max: this.props.max || -1
		}

	}

	set = (value) => {
		this.setState({
			value
		})
		this.props.onChange(value);
	}

	_onChange = (e) => {
		let new_value = e.target.value;

		// check for empty string or invalid values
		if( new_value === '' || new_value < this.state.min ) {
			this.set(this.state.min) // fallback to min value
		} else if (typeof new_value != 'number') {
			var parsed = parseInt(new_value, 10); // try to parse the number

			// if parsed is not a number
			if(isNaN(parsed)) {
				this.set(this.state.min) // fallback to min value
			} else {
				// if parsed succesfully update the value
				this.set(parsed);
			}
		}
	}

	render () {

		const { value } = this.state;

		return (
			<div className="input-group counter-input">
				<span className="input-group-addon" onClick={() => {this._increaseValue(value)}}>
					<i className="fa fa-plus" />
				</span>
				<input className="form-control" type="text" onChange={this._onChange} value={value} />
				<span className="input-group-addon" onClick={() => {this._decreaseValue(value)}}>
					<i className="fa fa-minus"/>
				</span>
			</div>
		)
	}
}