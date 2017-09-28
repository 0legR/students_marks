import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export const TextFieldGroup = ({field, value, label, error, type, onChange, isUserExists}) => 
<div>
{error && <span className="inline field error text-field-group">{error}</span>}
<div className={classnames("field", {"field error": error})}>
		<label className="ui label">{label}</label>
		<input
			value={value}
			onChange={onChange}
			onBlur={isUserExists}
			type={type}
			name={field}
			className="ui input"
		/>
		</div>
</div>;

TextFieldGroup.propTypes = {
	field: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	error: PropTypes.string,
	isUserExists: PropTypes.func
};

TextFieldGroup.defaultProps = {
	type: "text"
}
