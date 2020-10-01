import React from "react";
export default ({ name, message, time }) => (
  <div className="usermessage">
    <div>
      <strong>{name}</strong>
    </div>{" "}
    {message}
    <br></br>
    <div className="time">{time}</div>
  </div>
);
