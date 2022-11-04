import React from "react";

function InputText(props) {
  const { label, name, placeholder, maxLength, type, onChange, onKeyUp, value ,min, reaonly} = props
  return (
    <>
      <label htmlFor="">{label}</label>
      <input
        type={type}
        className="form-control"
        placeholder={placeholder}
        maxLength={maxLength}
        name={name}
        onChange={onChange}
        value={value}
        min={min}
      />
    </>
  );
}
export default InputText;
