import React, { useState } from 'react';
import { Button, TextField, Typography, Paper, Container, Box } from '@mui/material';
import axios from 'axios';

function Deletecourse() {
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [courseId, setCourseId] = useState('');
  const [message, setMessage] = useState('');

  const handleDeleteCourseSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.delete('http://localhost:8070/course/delete', {
        data: {
          courseId: courseId,
          
        },
      });

      if (response.data.status === "Course deleted") {
        setMessage("Course deleted successfully");
        setCourseId(''); // Clear the input field after successful deletion
        // setShowDeleteForm(false); // Optionally hide the form after deletion
      } else {
        setMessage("Failed to delete course");
      }
    } catch (err) {
      console.error(err);
      setMessage("An error occurred while deleting the course");
    }
  };

  const handleDeleteCourseClick = () => {
    setShowDeleteForm(true);
  };

  return (
    <Container>
      <Box display="flex" justifyContent="center" mt={5}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDeleteCourseClick}
        >
          Delete Course
        </Button>
      </Box>

      {showDeleteForm && (
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h6">
            Delete Course
          </Typography>
          <form onSubmit={handleDeleteCourseSubmit}>
            <TextField
              label="Course ID"
              variant="outlined"
              fullWidth
              margin="normal"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
              style={{ marginTop: '10px' }}
            >
              Delete
            </Button>
            {message && (
              <Typography variant="body2" color="error" style={{ marginTop: '10px' }}>
                {message}
              </Typography>
            )}
          </form>
        </Paper>
      )}
    </Container>
  );
}

export default Deletecourse;
