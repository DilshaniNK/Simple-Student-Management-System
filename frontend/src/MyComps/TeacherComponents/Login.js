import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import '../compsCss.css';

export default function TeacherLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8070/teacher/teacherlogin", {
        name: username,
        password: password
      });

      console.log('Response:', response.data);

      if (response.data.status === "Login successful") {
        localStorage.setItem('TeacherName', username);
        navigate('/teacherinterface');
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      console.error('Error:', err);
      setError("An error occurred during login");
    }
  };

  return (
    <div className='container-base'>
      <div className="heading">
        <h1>Teacher Login</h1>
      </div>
      <form onSubmit={handleLogin}>
        <div className="inputs">
          <div>
            <input
              type="text"
              required
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <input
              type="password"
              required
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <button type='submit'>Login</button>
            {error && <p className="error">{error}</p>}
          </div>
          <div>
            <Link to="/teacherreg" className="link">
              Don't have an account?<span> Register Now</span>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
