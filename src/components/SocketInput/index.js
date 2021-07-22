import React from "react";
import "./index.css";

export const SocketInput = ({ onChange, onConnect, onDisconnect }) => {
  return (
    <div className="box-container">
      <h2>Address</h2>
      <input
        placeholder="socket address"
        onChange={(e) => onChange(e.target.value)}
      ></input>
      <div className="buttons">
        <button onClick={onDisconnect}>Disconnect</button>
        <button onClick={onConnect}>Connect</button>
      </div>
    </div>
  );
};
