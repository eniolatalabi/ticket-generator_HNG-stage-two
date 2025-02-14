import React from "react";
import "../css/InputField.css";

const InputField = ({ label, type = "text", name, value, onChange, placeholder, required = false }) => {
  return (
    <div className="input-group">
      {label && <label htmlFor={name} className="input-label">{label}</label>}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="input-field"
      />
    </div>
  );
};

export default InputField;
