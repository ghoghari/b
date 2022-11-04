import React from "react";

function InputDropdown(props) {
  const { label, name, options, onChange, value } = props;

  const renderOption = (data) => {
    return (
      <option value={data.value} key={data.value}>
        {data.option}
      </option>
    );
  };

  return (
    <>
      <label htmlFor="">{label}</label>
      <select
        className="form-control"
        name={name}
        onChange={onChange}
        value={value}
      >
        <option>Select</option>
        {options.map((option) => {
          return renderOption(option);
        })}
      </select>
    </>
  );
}
export default InputDropdown;
