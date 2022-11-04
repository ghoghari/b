import React from "react";

function InputTextArea(props) {
	const { label, name, placeholder, type, onChange, value } = props
	return (
		<>
			
		<label htmlFor="">{label}</label>
		<textarea
			type={type}
			className="form-control"
			placeholder={placeholder}
			name={name}
			onChange={onChange}
			value={value}
			rows="3"
		/>
				
		</>
	);
}
export default InputTextArea;
