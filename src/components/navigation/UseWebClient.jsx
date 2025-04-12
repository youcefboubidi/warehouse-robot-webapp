// useWebSocket.js
import { useEffect, useRef, useState } from "react";

const useWebSocket = ({
  url = "ws://localhost:8080",
  onMessage = () => {},
  onOpen = () => {},
  onClose = () => {},
  onError = () => {},
} = {}) => {
  const [messages, setMessages] = useState();
  const [input, setInput] = useState("");
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = new WebSocket(url);

    socketRef.current.onopen = (e) => {
      console.log("WebSocket connected");
      onOpen(e);
    };

    socketRef.current.onmessage = (event) => {
      let parsed;
      try {
        parsed = JSON.parse(event.data);
      } catch {
        parsed = event.data;
      }
      setMessages(parsed);
      onMessage(parsed);
    };

    socketRef.current.onclose = (e) => {
      console.log("WebSocket disconnected");
      onClose(e);
    };

    socketRef.current.onerror = (err) => {
      console.error("WebSocket error:", err);
      onError(err);
    };

    return () => {
      socketRef.current?.close();
    };
  }, [url, onMessage, onOpen, onClose, onError]);

  const sendMessage = () => {
    if (socketRef.current?.readyState === WebSocket.OPEN && input.trim()) {
      socketRef.current.send(input);
      setInput("");
    }
  };

  return {
    messages,
    input,
    setInput,
    sendMessage,
  };
};

export default useWebSocket;
