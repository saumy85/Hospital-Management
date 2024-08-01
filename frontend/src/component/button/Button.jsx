import React from "react";
import "./ButtonCss.css";

const Button = ({ isOutline, text, image, ...rest }) => {
  return (
    <button {...rest} className={isOutline ? "outline_btn1" : "primary_btn1"}>
      {image}
      {text}
    </button>
  );
};
export default Button;
