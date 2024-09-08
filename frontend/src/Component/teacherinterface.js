import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Drawer, List, ListItem, ListItemText, Divider, Button, Container, Paper, TextField } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const drawerWidth = 240;

function Teacherinterface() {
  const [teacherId, setTeacherId] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [selectedSection, setSelectedSection] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [message, setMessage] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newTeacherAge, setNewTeacherAge] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the teacher's name from localStorage
    const name = localStorage.getItem('TeacherName');
    const id = localStorage.getItem('TeacherId');
    if (name && id) {
      setTeacherName(name);
      setTeacherId(id);
    }
  }, []);

  const handleSectionChange = (section) => {
    setSelectedSection(section);
    setIsDrawerOpen(false); // Close the drawer when a section is selected
  };

  const handleLogout = () => {
    navigate('/teacherlogin');
    localStorage.removeItem('TeacherName');
    // Redirect to login page or wherever necessary
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
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
    if (newTeacherAge) updatedFields.newage = newTeacherAge;
    if (newPassword) updatedFields.newpassword = newPassword;

    if (Object.keys(updatedFields).length === 0) {
      setMessage("Please fill in at least one field to update.");
      return;
    }
    try {
      const response = await axios.put("http://localhost:8070/teacher/update", {
        teacherId: teacherId,
        ...updatedFields
      });

      if (response.data.status === "Update successful") {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Profile updated successfully!',
        });
        if (newUsername) {
          setTeacherName(newUsername);
          localStorage.setItem('TeacherName', newUsername);
        }
        setShowUpdateForm(false);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to update profile',
        });
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred',
      });
    }
  };

  const handleDeleteAccountSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete('http://localhost:8070/teacher/delete', {
        data: {
          teacherId: teacherId,
          password: newPassword,
        },
      });
      if (response.data.status === "Teacher deleted") {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Account deleted successfully!',
        }).then(() => {
          localStorage.removeItem('TeacherName');
          navigate('/teacherlogin');
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to delete account',
        });
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while deleting the account',
      });
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Navbar */}
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Teacher Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main content area with sidebar and content */}
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        {/* Sidebar */}
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              mt: '64px', // Adjust for the height of the AppBar
            },
          }}
          variant="temporary"
          anchor="left"
          open={isDrawerOpen}
          onClose={toggleDrawer}
        >
          <List>
            <ListItem button onClick={() => handleSectionChange('Courses')}>
              <ListItemText primary="Courses" />
            </ListItem>
            {/* <ListItem button onClick={() => handleSectionChange('Assignments')}>
              <ListItemText primary="Assignments" />
            </ListItem> */}
            <ListItem button onClick={() => handleSectionChange('Other')}>
              <ListItemText primary="Other" />
            </ListItem>
            <Divider />
            <ListItem button onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Drawer>

        {/* Main Content */}
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          {/* Display content based on the selected section */}
          {selectedSection === '' && (
            <Typography variant="h4" gutterBottom>
              Welcome....! {teacherName.toUpperCase()}
            </Typography>
          )}
          {selectedSection === 'Courses' && (
            <Box>
              <Button variant="contained" color="primary" onClick={() => navigate('/view-courses')}>
                View Courses
              </Button>
            </Box>
          )}

          {/* Other section */}
          {selectedSection === 'Other' && (
            <Container className='teacher-interface'>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
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
                <Paper className='update-profile-paper' sx={{ p: 3 }}>
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
                      value={newTeacherAge}
                      onChange={(e) => setNewTeacherAge(e.target.value)}
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
                <Paper className='delete-account-paper' sx={{ p: 3 }}>
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
                <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                  {message}
                </Typography>
              )}
            </Container>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Teacherinterface;
