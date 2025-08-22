import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../Component/StudentLogin.css";

function TeacherLogin() {
  const navigate = useNavigate();
  const [step, setStep] = useState("email"); // email | firstLogin | login
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:8070/teacher/check", { email });
      if (res.data.isFirstLogin) {
        setStep("firstLogin"); // Show OTP + new password form
      } else {
        setStep("login"); // Show normal login form
      }
    } catch (err) {
      setError("Email not found!");
    }
  };

  const handleFirstLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:8070/teacher/first-login", {
        email,
        otp,
        password,
      });
      if (res.status === 200) {
        // Save teacher info in localStorage
        localStorage.setItem("TeacherEmail", email);
        localStorage.setItem("TeacherId", res.data.teacherId); // <-- save teacherId
        setStep("loggedIn");
        navigate("/teacher/interface");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.status) {
        setError(err.response.data.status);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  const handleLoginSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const res = await axios.post("http://localhost:8070/teacher/login", {
      email,
      password,
    });

    if (res.status === 200) {
      // Store teacher info in localStorage for later use
      // localStorage.setItem("TeacherEmail", email);
      localStorage.setItem("TeacherId", res.data.teacherId); // MongoDB _id
      localStorage.setItem("TeacherName", res.data.teacherName || ""); // fallback
      localStorage.setItem("TeacherClass", res.data.teacherClass || ""); // fallback

      setStep("loggedIn"); // optional step state for UI
      navigate("/teacher/interface"); // redirect to teacher interface
    }
  } catch (err) {
    setError("Invalid email or password.");
  }
};


  return (
    <div className="container">
      <div className="paper">
        <h2 className="header">Teacher Log In</h2>

        {error && <p className="error-message">{error}</p>}

        {step === "email" && (
          <form onSubmit={handleEmailSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>
            <div className="btn">
              <button type="submit" className="button">Next</button>
            </div>
          </form>
        )}

        {step === "firstLogin" && (
          <form onSubmit={handleFirstLoginSubmit}>
            <div className="form-group">
              <label htmlFor="otp">OTP</label>
              <input
                id="otp"
                type="text"
                className="form-control"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                placeholder="Enter OTP"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Create Password</label>
              <input
                id="password"
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Create a new password"
              />
            </div>
            <div className="btn">
              <button type="submit" className="button">Submit</button>
            </div>
          </form>
        )}

        {step === "login" && (
          <form onSubmit={handleLoginSubmit}>
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
            <div className="btn">
              <button type="submit" className="button">Login</button>
            </div>
          </form>
        )}

        {step === "loggedIn" && <h3>✅ Successfully Logged In!</h3>}
      </div>
    </div>
  );
}

export default TeacherLogin;
