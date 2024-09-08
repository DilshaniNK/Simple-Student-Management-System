import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';  // Import SweetAlert2
import "./StudentLogin.css";

function Studentreg() {
  const[studentId,setId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const sentData = (e) => {
    e.preventDefault();
    const newStudent = {
      studentId,
      name,
      age,
      gender,
      password,
    };
    axios
      .post("http://localhost:8070/student/add", newStudent)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Student Registered',
          text: 'Student has been successfully registered!',
        }).then(() => {
          setName("");
          setAge("");
          setGender("");
          setPassword("");
          navigate('/home');  // Navigate after the SweetAlert is closed
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      });
  };

  return (
    <div className="container">
      <div className="paper">
        <h1 className="header">Register Student</h1>
        <form onSubmit={sentData} className="form">
        <div className="form-group">
            <label htmlFor="studentId">Student Id</label>
            <input
              type="text"
              id="studentId"
              className="form-control"
              value={studentId}
              onChange={(e) => setId(e.target.value)}
              required
              placeholder="Enter Student ID"
            />
          </div>
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
        </form>
      </div>
    </div>
  );
}

export default Studentreg;
