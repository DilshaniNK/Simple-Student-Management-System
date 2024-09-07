import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./StudentLogin.css";


function TeacherLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8070/teacher/login", {
        name: username,
        password: password,
      });

      console.log("Response:", response.data);

      if (response.data.status === "Login successful") {
        // Save data in localStorage
        localStorage.setItem("TeacherName", username);
        navigate("/teacherinterface");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred during login");
    }
  };

  return (
    <div className="container">
      <div className="paper">
        <h1 className="header">Teacher Log In</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
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
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="button">
            Login
          </button>
          <div className="link">
            <p>
              Don't have an account? <a href="/teacherreg">Sign Up Now</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TeacherLogin;
