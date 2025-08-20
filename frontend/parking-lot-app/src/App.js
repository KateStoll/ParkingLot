import React, { useState } from 'react';
import './App.css';

function App() { 
  const [currentState, setState] = useState("");  

  async function handleSubmit(event) {
    event.preventDefault(); 

    const response = await fetch("http://localhost:8000/parking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ currentState: currentState })
    });

    const data = await response.json();

    console.log("Server says:", data);
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
            onChange={function(event) { setState(event.target.value); }}
          />
        </label>
        <button type="submit" style={{ marginLeft: "10px" }}>
          Submit
        </button>
      </form>
    </div>
  );
}



export default App;

