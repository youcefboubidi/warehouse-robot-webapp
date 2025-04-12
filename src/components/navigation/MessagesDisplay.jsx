// MessagesDisplay.js
import React from "react";
import useWebSocket from "./UseWebClient";
import CanvasMap from "./Map";
const MessagesDisplay = () => {
  const { messages } = useWebSocket();

  return (
    <div>
      <CanvasMap location={messages} />
    </div>
  );
};

export default MessagesDisplay;
