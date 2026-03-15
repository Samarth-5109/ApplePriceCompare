import React from "react";

function Card({className, children }) {
  return (
    <div className={`shadow-xl rounded-lg p-5 ${className}`}>
      <div className="card-content">{children}</div>
    </div>
  );
}

export default Card;
