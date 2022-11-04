import React from "react";

function InputCustom(props) {
  const { label, name, placeholder, type, onChange, value,multiple } = props
  return (
    <>
          <label htmlFor="">{label}</label><br/>
          <input
            type={type}
            placeholder={placeholder}
            name={name}
            onChange={onChange}
            value={value}
            multiple={multiple}
            accept="image/*"
          />
    </>
  );
}
export default InputCustom;
