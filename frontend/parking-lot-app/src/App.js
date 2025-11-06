import React, { useState } from "react";
import "./App.css";

function App() {
  const [currentState, setState] = useState("");
  const [serverMessage, setServerMessage] = useState("");

  let authToken = null;

  async function getAuthToken() {
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/token/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "your_dev_username",
          password: "your_dev_password",
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed with status " + response.status);
      }

      const data = await response.json();
      authToken = data.auth_token;
      console.log("Token received:", authToken);
      return authToken;
    } catch (error) {
      console.error("Error getting token:", error);
      setServerMessage("Error getting token: " + error.message);
      return null;
    }
  }

 
  async function handleSubmit(event) {
    event.preventDefault();
    setServerMessage("Submitting spot...");

   
    if (!authToken) {
      authToken = await getAuthToken();
      if (!authToken) {
        setServerMessage("Could not get auth token.");
        return;
      }
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/parking-spaces", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Token " + authToken,
        },
        body: JSON.stringify({ spot: Number(currentState) }),
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

