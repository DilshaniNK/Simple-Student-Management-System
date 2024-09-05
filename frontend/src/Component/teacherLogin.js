import React, { useState } from "react";
import { Container, Paper, Typography, TextField, Button, Link, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
 

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
        password: password
      });

      console.log('Response:', response.data);

      if (response.data.status === "Login successful") {
        // Save data in localStorage
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
    <Container className='container'>
      <Paper className='paper'>
        <Typography variant="h5" className='header'>
          Log In
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            required
            className='textField'
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            className='textField'
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className='button'
            margin="normal"
          >
            Login
          </Button>
          <Box className='link'>
            <Typography variant="body2">
              Don't have an account? <Link href="/teacherreg">Sign Up Now</Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

export default TeacherLogin;
