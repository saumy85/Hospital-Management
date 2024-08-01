import React, { useState } from "react";
//import "../Css.css"

const ReadMoreLess = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p style={{ cursor: "pointer" }} className="text">
      {isReadMore ? text.slice(0, 400) : text}
      <span
        onClick={toggleReadMore}
        className="read-or-hide"
        style={{ color: "rgb(163, 21, 69)" }}
      >
        {isReadMore ? "...read more" : "    show less"}
      </span>
    </p>
  );
};

export default ReadMoreLess;
