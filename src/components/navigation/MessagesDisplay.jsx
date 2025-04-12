// MessagesDisplay.js
import React from "react";
import useWebSocket from "./UseWebClient";

const MessagesDisplay = () => {
  const { messages } = useWebSocket();

  return (
    <div>
      <h4>Messages</h4>
      <ul>
        {messages.map((msg, i) => (
          <li key={i}>{typeof msg === "object" ? JSON.stringify(msg) : msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default MessagesDisplay;
