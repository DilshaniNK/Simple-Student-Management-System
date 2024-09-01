import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

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
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Register Student
      </Typography>
      <form onSubmit={sentData}>
        <Box marginBottom={2}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>
        <Box marginBottom={2}>
          <TextField
            label="Age"
            type="number"
            variant="outlined"
            fullWidth
            required
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </Box>
        <Box marginBottom={2}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Gender</InputLabel>
            <Select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              label="Gender"
            >
              <MenuItem value=""><em>Select Gender</em></MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box marginBottom={2}>
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginBottom: '10px' }}
        >
          Submit
        </Button>
        <Button
          type="button"
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={handleView}
        >
          View
        </Button>
      </form>
    </Container>
  );
}

export default Studentreg;
