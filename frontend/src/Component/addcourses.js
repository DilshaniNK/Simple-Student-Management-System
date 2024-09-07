import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
// import './Addcourses.css'; // Import the CSS file

function Addcourses() {
  const [courseName, setName] = useState("");
  const [courseId, setId] = useState("");
  const [NoOfStudent, setNoOfStudent] = useState("");
  const [courseFee, setcoursefee] = useState("");
  const [lectureName,setlectureName] = useState("");
  const [Duration,setduration] = useState("");

  const sentData = (e) => {
    e.preventDefault();
    const newCourse = {
     courseId,
     courseName,
     NoOfStudent,
     courseFee,
     lectureName,
     Duration
    };
    axios.post("http://localhost:8070/course/add", newCourse)
      .then(() => {
        alert("Course Added");
        setId("");
        setName("");
        setNoOfStudent("");
        setcoursefee("");
        setlectureName("");
        setduration("");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <Container maxWidth="sm" className="container">
      <Typography variant="h4" gutterBottom className="title">
        Add Courses
      </Typography>
      <form onSubmit={sentData} className="form">
        <Box marginBottom={2}>
          <TextField
            label="Course ID"
            variant="outlined"
            fullWidth
            required
            value={courseId}
            onChange={(e) => setId(e.target.value)}
            className="inputField"
          />
        </Box>
        <Box marginBottom={2}>
          <TextField
            label="Course Name"
            variant="outlined"
            fullWidth
            required
            value={courseName}
            onChange={(e) => setName(e.target.value)}
            className="inputField"
          />
        </Box>
        <Box marginBottom={2}>
          <TextField
            label="No of Students"
            type="number"
            variant="outlined"
            fullWidth
            required
            value={NoOfStudent}
            onChange={(e) => setNoOfStudent(e.target.value)}
            className="inputField"
          />
        </Box>
        <Box marginBottom={2}>
          <TextField
            label="Course Fee"
            variant="outlined"
            fullWidth
            required
            value={courseFee}
            onChange={(e) => setcoursefee(e.target.value)}
            className="inputField"
          />
        </Box>
        <Box marginBottom={2}>
          <TextField
            label="Lecture Name"
            variant="outlined"
            fullWidth
            required
            value={lectureName}
            onChange={(e) => setlectureName(e.target.value)}
            className="inputField"
          />
        </Box>
        <Box marginBottom={2}>
          <TextField
            label="Course Duration"
            variant="outlined"
            fullWidth
            required
            value={Duration}
            onChange={(e) => setduration(e.target.value)}
            className="inputField"
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          className="submitButton"
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default Addcourses;
