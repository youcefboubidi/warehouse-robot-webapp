// App.jsx
import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // 1. Load initial data from data.json
  useEffect(() => {
    fetch("/data.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load data.json");
        }
        return res.json();
      })
      .then((json) => setData(json))
      .catch((err) => {
        console.error("Error loading data.json:", err);
        setError(err);
      });
  }, []);

  // 2. Setup WebSocket connection to listen for RFID messages
  useEffect(() => {
    let ws;

    const connect = () => {
      // Try connecting to your WS server (adjust the URL if needed)
      ws = new WebSocket("ws://localhost:8080");

      ws.onopen = () => {
        console.log("✅ WebSocket connection established.");
      };

      ws.onmessage = (event) => {
        console.log("⬅️ Raw WebSocket message:", event.data);

        try {
          // Attempt to parse the incoming message as JSON
          const msg = JSON.parse(event.data);
          console.log("✅ Parsed message:", msg);

          // Look for the expected currentRFID field in the message
          if (msg.currentRFID) {
            // Use functional state update so we don't depend on data in the effect
            setData((prevData) => {
              if (!prevData) return prevData; // If data hasn't loaded yet, ignore

              // Find the shelf that matches the incoming RFID
              const foundShelf = prevData.shelves.find(
                (shelf) => shelf.rfid === msg.currentRFID
              );

              if (foundShelf) {
                console.log(
                  `Updating robot position to Shelf ${foundShelf.id}`
                );
                // Return new state with updated robot position (currentShelf)
                return {
                  ...prevData,
                  robot: {
                    ...prevData.robot,
                    currentShelf: foundShelf.id,
                  },
                };
              }
              // If no matching shelf found, return the current state
              return prevData;
            });
          }
        } catch (err) {
          console.error("❌ Error parsing WebSocket message:", err.message);
        }
      };

      ws.onerror = (err) => {
        console.error("❌ WebSocket error:", err);
      };

      ws.onclose = () => {
        console.warn("⚠️ WebSocket closed. Reconnecting in 3 seconds...");
        setTimeout(connect, 3000);
      };
    };

    connect();

    return () => {
      if (ws) ws.close();
    };
  }, []);

  // 3. If there's an error or data is not loaded, display appropriate message.
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-600">Error loading data: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        Shelf Visualization
      </h1>
      <div className="container mx-auto">
        {data ? (
          <>
            <div className="mb-8 text-center">
              <p className="text-xl">
                Robot is currently at Shelf:{" "}
                <span className="font-bold">{data.robot.currentShelf}</span>
              </p>
            </div>
            {data.shelves.map((shelf, shelfIndex) => (
              <div
                key={shelfIndex}
                className="bg-white shadow rounded-md p-6 mb-6 border border-gray-200"
              >
                <h2 className="text-2xl font-semibold mb-4">
                  Shelf {shelf.id} - {shelf.location}
                </h2>
                {shelf.rows.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex space-x-4 mb-4">
                    {row.map((pkg, slotIndex) => (
                      <div
                        key={slotIndex}
                        className={`flex-1 border rounded p-4 text-center ${pkg.loaded
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                          }`}
                      >
                        <p className="font-medium">
                          {pkg.loaded ? `ID: ${pkg.packageId}` : "Empty"}
                        </p>
                        <p>{pkg.loaded ? "Loaded" : "Not loaded"}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </>
        ) : (
          <p className="text-center">Loading data...</p>
        )}
      </div>
    </div>
  );
}

export default App;
