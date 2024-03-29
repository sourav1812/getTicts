import React from "react";

const TextInput = props => {
  const {name,type,value,onChange,label,placeholder} = props;
  return (
    <div className="form-group">
    {label && <label htmlFor="input-field">{label}</label>}
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        className="form-control"
      />
      {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
    </div>
  );
};

export default TextInput;