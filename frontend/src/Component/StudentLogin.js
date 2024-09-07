import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./StudentLogin.css";

function StudentLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8070/student/login", {
        name: username,
        password: password,
      });

      console.log("Response:", response.data); // Debugging: Log the response

      if (response.data.status === "Login successful") {
        //save data in localstorage
        localStorage.setItem("StudentName", username);
        navigate("/studentinterface");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      console.error("Error:", err); // Debugging: Log the error
      setError("An error occurred during login");
    }
  };

  return (
    <div className="container">
      <div className="paper">
        <h2 className="header">Student Log In</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="btn">
            <button type="submit" className="button">
              Login
            </button>
          </div>

          <div className="link">
            <p>
              Don't have an account? <a href="/studentreg">Sign Up Now</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentLogin;
