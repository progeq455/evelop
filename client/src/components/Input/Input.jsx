import React from "react";
import "./Input.css";

const Input = (props) => {
  return (
    <div class="group">
      <input
        onChange={(event) => props.setValue(event.target.value)}
        value={props.value}
        type={props.type}
        placeholder={props.placeholder}
        className="input_one"
        maxLength={props.max}
      />
      <span class="highlight"></span>
      <span class="bar"></span>
      <label className="input_label">{props.label}</label>
    </div>
  );
};

export default Input;
