import WebSocketClient from "../navigation/WebClient";
import MessagesDisplay from "../navigation/MessagesDisplay";

function RobotMap() {
  return (
    <div>
      <h1>Robot Map</h1>

      <WebSocketClient
        url="ws://localhost:8080"
        onMessage={(msg) => console.log("Received:", msg)}
      />
      <MessagesDisplay />
    </div>
  );
}

export default RobotMap;
