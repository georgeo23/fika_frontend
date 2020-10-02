import React from "react";
export default ({ name, message, time }) => (
  <div className="otherGameUsers">
    <div>
      <strong>{name}</strong>
    </div>{" "}
    {message}
  </div>
);