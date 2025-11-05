import React, { useState } from "react";
import "./App.css";

function App() {
  const [licensePlate, setLicensePlate] = useState("");
  const [spot, setSpot] = useState("");
  const [serverMessage, setServerMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/parking-spaces", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          license_plate: licensePlate,
          spot: Number(spot),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      setServerMessage(`Success! Server response: ${JSON.stringify(data)}`);
    } catch (error) {
      console.error("Error:", error);
      setServerMessage("Something went wrong: " + error.message);
    }
  }

  return (
    <div style={{ margin: "40px" }}>
      <h1>Parking Lot App</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px" }}>
        <label>
          License Plate:
          <input
            type="text"
            value={licensePlate}
            onChange={(e) => setLicensePlate(e.target.value)}
            placeholder="e.g. ABC-1234"
          />
        </label>

        <label>
          Parking Spot:
          <input
            type="number"
            value={spot}
            onChange={(e) => setSpot(e.target.value)}
            placeholder="e.g. 42"
          />
        </label>

        <button type="submit">Submit</button>
      </form>

      {serverMessage && (
        <div style={{ marginTop: "20px", color: "green" }}>
          {serverMessage}
        </div>
      )}
    </div>
  );
}

export default App;

