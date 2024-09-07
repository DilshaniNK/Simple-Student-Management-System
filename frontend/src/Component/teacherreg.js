import React, { useState } from "react";
import axios from "axios";
import "./StudentLogin.css"; // Import the CSS file
import Swal from "sweetalert2"; // Import SweetAlert2

function TeacherReg() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const sentData = (e) => {
    e.preventDefault();

    const newTeacher = {
      name,
      age,
      gender,
      password,
    };

    axios
      .post("http://localhost:8070/teacher/add", newTeacher)
      .then(() => {
        // SweetAlert success message
        Swal.fire({
          icon: "success",
          title: "Teacher Successfully Registered!",
          showConfirmButton: false,
          timer: 2000, // Auto close after 2 seconds
        });

        // Clear form fields
        setName("");
        setAge("");
        setGender("");
        setPassword("");
      })
      .catch((err) => {
        // SweetAlert error message
        Swal.fire({
          icon: "error",
          title: "Oops... Something went wrong!",
          text: err.message || "Please try again.",
        });
      });
  };

  return (
    <div className="container">
      <div className="paper">
        <h2 className="header">Register Teacher</h2>
        <form onSubmit={sentData} className="form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              id="age"
              type="number"
              required
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter your age"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              required
              value={gender}
              className="form-control"
              onChange={(e) => setGender(e.target.value)}
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
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="form-control"
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

export default TeacherReg;
