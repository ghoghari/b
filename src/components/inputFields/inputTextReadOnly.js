import React from "react";

function InputTextReadOnly(props) {
  const { label, name, placeholder, type, onChange, value, readOnly , id} = props
  return (
    <>
          <label htmlFor="">{label}</label>
          <input
            type={type}
            className="form-control"
            placeholder={placeholder}
            name={name}
            value={value}
            readOnly = {true}
            id={id}
          />
    </>
  );
}
export default InputTextReadOnly;
