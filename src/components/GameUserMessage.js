import React from "react";
export default ({ name, message, time }) => (
  <div className="userGameMessage">
    <div>
      <strong>{name}</strong>
    </div>{" "}
    {message}
  </div>
);