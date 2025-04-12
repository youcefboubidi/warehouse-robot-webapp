// WebSocketClient.js
import React from "react";
import useWebSocket from "./UseWebClient";

const WebSocketClient = () => {
  const { input, setInput, sendMessage } = useWebSocket();

  return (
    <div>
      <input
        type="text"
        placeholder="Send message"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default WebSocketClient;
