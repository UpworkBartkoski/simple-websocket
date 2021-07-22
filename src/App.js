import React, { useState, useCallback, useRef, useEffect } from "react";
import "./App.css";
import { SocketInput } from "./components/SocketInput";
import { SocketOutput } from "./components/SocketOutput";

const ReadyState = { 0: "Connecting", 1: "Open", 2: "Closing", 3: "Closed" };

function App() {
  const [socketUrl, setSocketUrl] = useState();
  const [connectionStatus, setConnectionStatus] = useState();
  const [data, setData] = useState([]);

  const socket = useRef(null);

  useEffect(() => {
    if (socket.current) {
      socket.current.onopen = (e) => {
        setConnectionStatus(ReadyState[socket.current.readyState]);
        setData((state) => [...state, e]);
      };

      socket.current.onclose = (e) => {
        setData((state) => [...state, e]);
        setConnectionStatus(ReadyState[socket.current.readyState]);
        socket.current = undefined;
      };

      socket.current.onmessage = (e) => {
        setData((state) => [...state, e]);
        console.log("message received ", e);
      };
    }
  }, [socket.current]);

  const handleConnect = () => {
    if (!socketUrl) {
      alert("Enter a valid socket url");
    } else {
      socket.current = new WebSocket(socketUrl);
      setConnectionStatus(ReadyState[socket.current.readyState]);
    }
  };

  const handleDisconnect = () => {
    if (socket.current) {
      socket.current.close();
      setConnectionStatus(ReadyState[socket.current.readyState]);
    }
  };

  const handleClickSendMessage = useCallback(
    () => socket.current.send("Hello"),
    []
  );

  return (
    <div className="App">
      <SocketInput
        onChange={(value) => setSocketUrl(value)}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
      />
      <div className="middle">
        <button
          onClick={handleClickSendMessage}
          disabled={connectionStatus !== "Open"}
          className="send"
        >
          Click Me to send 'Hello'
        </button>
        {connectionStatus && (
          <span>The WebSocket is currently {connectionStatus}</span>
        )}
      </div>
      <SocketOutput connectionStatus={connectionStatus} data={data} />
    </div>
  );
}

export default App;
