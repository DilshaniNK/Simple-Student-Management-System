import React, { useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

function Adminreg() {
  const[adminId,setId] = useState("");  
  const [adminName, setName] = useState("");
  const [adminAge, setAge] = useState("");
  const [adminGender, setGender] = useState("");
  const [adminPassword, setPassword] = useState("");
 

  const sendData = (e) => {
    e.preventDefault();
    const newAdmin = {
      adminId,  
      adminName,
      adminAge,
      adminGender,
      adminPassword
    };
    axios.post("http://localhost:8070/admin/add", newAdmin)
      .then(() => {
        alert("Admin added");
        setId("");
        setName("");
        setAge("");
        setGender("");
        setPassword("");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Register Admin
      </Typography>
      <form onSubmit={sendData}>
      <Box marginBottom={2}>
          <TextField
            label="Admin Id"
            variant="outlined"
            fullWidth
            required
            value={adminId}
            onChange={(e) => setId(e.target.value)}
          />
        </Box>
        <Box marginBottom={2}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            required
            value={adminName}
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
            value={adminAge}
            onChange={(e) => setAge(e.target.value)}
          />
        </Box>
        <Box marginBottom={2}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Gender</InputLabel>
            <Select
              value={adminGender}
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
            value={adminPassword}
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
       
       
      </form>
    </Container>
  );
}

export default Adminreg;
