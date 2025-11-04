import React, { useState } from "react";
import "./App.css";

function App() {
  const [currentState, setState] = useState(""); 
  const [serverMessage, setServerMessage] = useState(""); 

  async function handleSubmit(event) {
    event.preventDefault();

    const token = "5148ec3bfe0905aceab79049c56a9752847ad243";

    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/parking-spaces", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Token " + token
        },
        body: JSON.stringify({ taken: Number(currentState) % 2 === 0 }) 
      });

      if (!response.ok) {
        throw new Error("Server returned " + response.status);
      }

      const data = await response.json();
      console.log("Server says:", data);

      setServerMessage("Spot submitted! Server response: " + JSON.stringify(data));
    } catch (error) {
      console.error("Error talking to the server:", error);
      setServerMessage("Something went wrong: " + error.message);
    }
  }

  return (
    <div>
      <h1>Parking Lot App</h1>
      <form style={{ margin: "20px" }} onSubmit={handleSubmit}>
        <label>
          Insert Parking Spot:{" "}
          <input
            type="text"
            value={currentState}
            onChange={(event) => setState(event.target.value)}
          />
        </label>
        <button type="submit" style={{ marginLeft: "10px" }}>
          Submit
        </button>
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
