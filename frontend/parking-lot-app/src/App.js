import React, { useState } from "react";

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
        // Just mark spots as taken or free based on input
        body: JSON.stringify({ taken: Number(currentState) % 2 === 0 }) 
      });

      if (!response.ok) {
        throw new Error("Server returned " + response.status);
      }

      const data = await response.json();
      setServerMessage("Spot submitted! Server response: " + JSON.stringify(data));
    } catch (error) {
      setServerMessage("Something went wrong: " + error.message);
    }
  }

  return (
    <div>
      <h1>Parking Lot App</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Insert Parking Spot:{" "}
          <input
            type="text"
            value={currentState}
            onChange={(e) => setState(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {serverMessage && <p>{serverMessage}</p>}
    </div>
  );
}

export default App;
