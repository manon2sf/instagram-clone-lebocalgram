import React from "react";

import "./infobar.css";

const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <h3>{room} LeMessenger</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/"></a>
    </div>
  </div>
);

export default InfoBar;
