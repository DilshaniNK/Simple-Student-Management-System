import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography, Paper, Container, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function StudentInterface() {
  const [studentName, setStudentName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newStudentAge, setNewStudentAge] = useState(""); // Corrected variable name
  const [showUpdateForm, setShowUpdateForm] = useState(false); // Corrected variable name
  const [newUsername, setNewUsername] = useState("");
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem('StudentName');
    if (name) {
      setStudentName(name);
    }
  }, []);

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
      setMessage("Please fill in at least one field to update.");
      return;
    }

    try {
      const response = await axios.put("http://localhost:8070/student/updateprofile", {
        name: studentName,
        ...updatedFields
      });

      if (response.data.status === "Update successful") {
        setMessage("Profile updated successfully");

        if (newUsername) {
          setStudentName(newUsername);
          localStorage.setItem('StudentName', newUsername);
        }

        setShowUpdateForm(false); 
      } else {
        setMessage("Failed to update profile");
      }
    } catch (err) {
      setMessage("An error occurred");
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
        setMessage("Account deleted successfully");
        localStorage.removeItem('StudentName');
        navigate('/studentlogin'); 
      } else {
        setMessage("Failed to delete account");
      }
    } catch (err) {
      setMessage("An error occurred while deleting the account");
    }
  };

  return (
    <Container className='student-interface'>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">
          Hi {studentName}
        </Typography>
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateProfile}
            sx={{ mr: 2 }}
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
              value={newStudentAge} // Corrected variable name
              onChange={(e) => setNewStudentAge(e.target.value)} // Corrected function name
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

      {message && (
        <Typography variant="h6" color="primary" style={{ marginTop: "20px" }}>
          {message}
        </Typography>
      )}
    </Container>
  );
}

export default StudentInterface;
