import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography, Paper, Container, Box, Alert, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './studentInterface.css';

function StudentInterface() {
  const [studentName, setStudentName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newStudentAge, setNewStudentAge] = useState("");
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [alert, setAlert] = useState({ open: false, severity: '', message: '' });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem('StudentName');
    if (name) {
      setStudentName(name);
    }
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8070/course/view');
      setCourses(response.data);
    } catch (err) {
      setAlert({ open: true, severity: 'error', message: 'Failed to fetch courses' });
    }
  };

  const handleViewAssignmentsClick = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedCourse('');
  };

  const handleCourseSelect = async (event) => {
    const courseId = event.target.value;
    const selectedCourseData = courses.find(course => course.courseId === courseId);

    if (selectedCourseData) {
      setSelectedCourse(courseId);
      localStorage.setItem('SelectedCourseName', selectedCourseData.courseName); // Save selected course name
      localStorage.setItem('SelectedCourseId',selectedCourseData.courseId);
      // Navigate to the viewassignment page
      navigate('/viewassignment');
    }
  };

  const handleUpdateProfile = () => {
    setShowUpdateForm(true);
    setShowDeleteForm(false); 
  };

  const handleDeleteAccountClick = () => {
    setShowDeleteForm(true);
    setShowUpdateForm(false); 
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const updatedFields = {};

    if (newUsername) updatedFields.newUsername = newUsername;
    if (newStudentAge) updatedFields.newAge = newStudentAge;
    if (newPassword) updatedFields.newPassword = newPassword;

    if (Object.keys(updatedFields).length === 0) {
      setAlert({ open: true, severity: 'error', message: 'Please fill in at least one field to update' });
      return;
    }

    try {
      const response = await axios.put("http://localhost:8070/student/update", {
        name: studentName,
        ...updatedFields
      });

      if (response.data.status === "Update successful") {
        setAlert({ open: true, severity: 'success', message: 'Profile updated successfully' });

        if (newUsername) {
          setStudentName(newUsername);
          localStorage.setItem('StudentName', newUsername);
        }

        setShowUpdateForm(false); 
      } else {
        setAlert({ open: true, severity: 'error', message: 'Failed to update profile' });
      }
    } catch (err) {
      setAlert({ open: true, severity: 'error', message: 'An error occurred' });
    }
  };

  const handleDeleteAccountSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.delete('http://localhost:8070/student/delete', {
        data: {
          name: newUsername,
          password: newPassword,
        },
      });

      if (response.data.status === "User deleted") {
        setAlert({ open: true, severity: 'success', message: 'Account deleted successfully' });
        localStorage.removeItem('StudentName');
        navigate('/studentlogin'); 
      } else {
        setAlert({ open: true, severity: 'error', message: 'Failed to delete account' });
      }
    } catch (err) {
      setAlert({ open: true, severity: 'error', message: 'An error occurred while deleting the account' });
    }
  };

  return (
    <Container className='student-interface'>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' , flexDirection: 'column', mb: 2 }}>
        <Typography variant="h4">
          Hi, {studentName.toLocaleUpperCase()}
        </Typography>
        <Box className='button-container'>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateProfile}
            // sx={{ mr: 2 }}
          >
            Update Profile
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDeleteAccountClick}
          >
            Delete Account
          </Button>
          <Button
            variant="contained"
            color="info"
            onClick={handleViewAssignmentsClick}
          >
            View Assignments
          </Button>
        </Box>
      </Box>

      {showUpdateForm && (
        <Paper className='update-profile-paper'>
          <Typography variant="h6">
            Update Profile
          </Typography>
          <form onSubmit={handleFormSubmit}>
            <TextField
              label="New Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
            <TextField
              label="New Age"
              variant="outlined"
              fullWidth
              margin="normal"
              value={newStudentAge}
              onChange={(e) => setNewStudentAge(e.target.value)}
            />
            <TextField
              label="New Password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Update
            </Button>
          </form>
        </Paper>
      )}

      {showDeleteForm && (
        <Paper className='delete-account-paper'>
          <Typography variant="h6">
            Delete Account
          </Typography>
          <form onSubmit={handleDeleteAccountSubmit}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
            >
              Delete
            </Button>
          </form>
        </Paper>
      )}

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Select Course</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel>Course</InputLabel>
            <Select
              value={selectedCourse}
              onChange={handleCourseSelect}
              label="Course"
            >
              {courses.map(course => (
                <MenuItem key={course.courseId} value={course.courseId}>
                  {course.courseName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={() => setAlert({ ...alert, open: false })}
      >
        <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default StudentInterface;
