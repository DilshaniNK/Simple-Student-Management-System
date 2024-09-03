import React, { useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

function Addcourses() {
  const [courseName, setName] = useState("");
  const [courseId, setId] = useState("");
  const [NoOfStudent, setNoOfStudent] = useState("");
  const [courseFee, setcoursefee] = useState("");
  const [lectureName,setlectureName] = useState("");
  const [Duration,setduration] = useState("");

//   const navigate = useNavigate();

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

//   const handleView = () => {
//     navigate("/viewstudent");
//   };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Add courses
      </Typography>
      <form onSubmit={sentData}>
        <Box marginBottom={2}>
          <TextField
            label="CourseId"
            
            variant="outlined"
            fullWidth
            required
            value={courseId}
            onChange={(e) => setId(e.target.value)}
          />
        </Box>
        <Box marginBottom={2}>
          <TextField
            label="courseName"
            
            variant="outlined"
            fullWidth
            required
            value={courseName}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>
       
        <Box marginBottom={2}>
          <TextField
            label="No-Of-Student"
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
            label="CourseFee"
            
            variant="outlined"
            fullWidth
            required
            value={courseFee}
            onChange={(e) => setcoursefee(e.target.value)}
          />
        </Box>
        <Box marginBottom={2}>
          <TextField
            label="lectureName"
            
            variant="outlined"
            fullWidth
            required
            value={lectureName}
            onChange={(e) => setlectureName(e.target.value)}
          />
        </Box>
        <Box marginBottom={2}>
          <TextField
            label="Course-Duration"
            
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
          style={{ marginBottom: '10px' }}
        >
          Submit
        </Button>
       
      </form>
    </Container>
  );
}

export default Addcourses;
