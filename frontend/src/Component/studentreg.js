import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./StudentLogin.css";

function Studentreg() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const sentData = (e) => {
    e.preventDefault();
    const newStudent = {
      name,
      age,
      gender,
      password,
    };
    axios
      .post("http://localhost:8070/student/add", newStudent)
      .then(() => {
        alert("Student added");
        setName("");
        setAge("");
        setGender("");
        setPassword("");
      })
      .catch((err) => {
        alert(err);
      });
      navigate('/home');
  };

  // const handleView = () => {
  //   navigate("/viewstudent");
  // };

  return (
    <div className="container">
      <div className="paper">
        <h1 className="header">Register Student</h1>
        <form onSubmit={sentData} className="form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              className="form-control"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              placeholder="Enter your age"
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              className="form-control"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
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
          <button type="submit" className="button">
            Submit
          </button>
          {/* <button type="button" className="viewbutton" onClick={handleView}>
            View
          </button> */}
        </form>
      </div>
    </div>
  );
}

export default Studentreg;
