import React from 'react';

const regexFloat = /^(?=.+)(?:[0-5])?(?:\.[0-9]{0,2})?$/;

export const TDSTRING = ({id, defaultValue, onChange, name}) => <td>
			<input
				id={id}
				type="text"
				defaultValue={defaultValue}
				onChange={onChange}
				name={name}
				onKeyUp={(e) => e.target.value = e.target.value.match(/^[a-zA-Z ]+$/)}
			/>
		</td>;
export const TDTEXT = ({id, defaultValue, onChange, name}) => <td>
			<input
				id={id}
				type="text"
				defaultValue={defaultValue}
				onChange={onChange}
				name={name}
				onKeyUp={(e) => e.target.value = e.target.value.match(/^[!@#$%^&*()_+=<>|./?,-]$/)}
			/>
		</td>;
export const TDFLOAT = ({id, defaultValue, onChange, name}) => <td className="float-input">
			<input
				id={id}
				type="number"
				defaultValue={defaultValue}
				onChange={onChange}
				name={name}
				onKeyUp={(e) => e.target.value = e.target.value.match(regexFloat)}
			/>
		</td>;
export const TDBOOLEAN = ({id, defaultValue, onChange, name}) => <td className="collapsing">
			<div className="ui fitted slider checkbox">
				<input
					id={id}
					type="checkbox"
					name={name}
					defaultChecked={defaultValue}
					onChange={onChange}
				 /> <label></label>
			</div>
		</td>;
export const TDISCHEKCED = ({id, name, onChange, defaultValue}) => <td className="collapsing">
				<div className="ui fitted slider checkbox">
					<input
						id={id}
						type="checkbox"
						name={name}
						defaultChecked={defaultValue}
						onChange={onChange}
					 /> <label></label>
				</div>
			</td>;
export const TDCURRENTRATING = ({data, nameClass}) => <td className={nameClass}>
				{data}
			</td>;