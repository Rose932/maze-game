import React from "react";
import Login from "./Login";
import Signup from "./Signup"; // Add this line
import "./App.css";

function App() {
  return (
    <div className="App">
      {/* Comment or uncomment the following lines to switch between Login and Signup */}
      <span className="d-flex">
        <Login />
        <Signup />
      </span>
    </div>
  );
}

export default App;
