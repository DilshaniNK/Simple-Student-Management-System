import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';
import Swal from 'sweetalert2';  // Import SweetAlert

function Addcourses() {
  const [courseName, setName] = useState("");
  const [courseId, setId] = useState("");
  const [NoOfStudent, setNoOfStudent] = useState("");
  const [courseFee, setcoursefee] = useState("");
  const [lectureName, setlectureName] = useState("");
  const [Duration, setduration] = useState("");

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
        Swal.fire({
          icon: 'success',
          title: 'Course Added',
          text: 'Successfully added the course!'
        });

        // Clear form fields after success
        setId("");
        setName("");
        setNoOfStudent("");
        setcoursefee("");
        setlectureName("");
        setduration("");
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.message
        });
      });
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Add Course
        </Typography>
        <form onSubmit={sentData}>
          <Box marginBottom={2}>
            <TextField
              label="Course ID"
              variant="outlined"
              fullWidth
              required
              value={courseId}
              onChange={(e) => setId(e.target.value)}
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
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ backgroundColor: '#7C93C3', '&:hover': { backgroundColor: '#1E2A5E' } }}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Addcourses;
