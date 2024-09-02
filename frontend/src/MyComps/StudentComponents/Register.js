import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Studentreg() {
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
      password
    };
    axios.post("http://localhost:8070/student/add", newStudent)
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
  };

  const handleView = () => {
    navigate("/viewstudent");
  };

  return (
    <div className='container-base'>
      <div className="heading">
        <h1>Student Registration</h1>
      </div>
      <form onSubmit={sentData}>
        <div className="inputs">
        <div>
            <input
              type="text"
              required
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <input
              type="text"
              required
              value={age}
              placeholder="Age"
              onChange={(e) => setAge(e.target.value)} />

          </div>
          <div>
            <select className='col-inputs'
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value=""><span>Select Gender</span></option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
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
            <button type='submit'>Register</button>
          </div>
        </div>
      </form>
    </div>
  );
}


