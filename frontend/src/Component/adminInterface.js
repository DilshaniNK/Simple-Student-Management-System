import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Drawer, List, ListItem, ListItemText, Divider, Button, Container, Paper, TextField } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const drawerWidth = 240;

function AdminInterface() {
  const [adminName, setAdminName] = useState("");
  const [selectedSection, setSelectedSection] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [message, setMessage] = useState("");
  const [newadminName, setNewUsername] = useState("");
  const [newadminPassword, setNewPassword] = useState("");
  const [newadminAge, setNewAdminAge] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem('AdminName');
    if (name) {
      setAdminName(name);
    }
  }, []);

  const handleSectionChange = (section) => {
    setSelectedSection(section);
    setIsDrawerOpen(false);
  };

  const handleLogout = () => {
    navigate('/adminlogin');
    localStorage.removeItem('AdminName');
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
    if (newadminName) updatedFields.newadminName = newadminName;
    if (newadminAge) updatedFields.newadminAge = newadminAge;
    if (newadminPassword) updatedFields.newadminPassword = newadminPassword;

    if (Object.keys(updatedFields).length === 0) {
      setMessage("Please fill in at least one field to update.");
      return;
    }

    try {
      const response = await axios.put("http://localhost:8070/admin/update", {
        name: adminName,
        ...updatedFields
      });

      if (response.data.status === "Update successful") {
        setMessage("Profile updated successfully");
        if (newadminName) {
          setAdminName(newadminName);
          localStorage.setItem('AdminName', newadminName);
        }
        setShowUpdateForm(false);
      } else {
        setMessage('Failed to update profile');
      }
    } catch (err) {
      setMessage('An error occurred');
    }
  };

  const handleDeleteAccountSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete('http://localhost:8070/admin/delete', {
        data: {
          name: newadminName,
          password: newadminPassword,
        },
      });

      if (response.data.status === "User deleted") {
        setMessage("Account deleted successfully");
        localStorage.removeItem('AdminName');
        navigate('/adminlogin');
      } else {
        setMessage('Failed to delete account');
      }
    } catch (err) {
      setMessage('An error occurred while deleting the account');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              mt: '64px',
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
            <ListItem button onClick={() => handleSectionChange('Other')}>
              <ListItemText primary="Other" />
            </ListItem>
            <Divider />
            <ListItem button onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Drawer>

        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          {selectedSection === '' && (
            <Typography variant="h2" gutterBottom>
              Welcome, {adminName}!
            </Typography>
          )}
          {selectedSection === 'Courses' && (
            <Box>
              <Button variant="contained" color="primary" onClick={() => navigate('/add-course')}>
                Add Course
              </Button>
              <Button variant="contained" color="primary" onClick={() => navigate('/addmin-view-courses')}>
                View Courses
              </Button>
              {/* <Button variant="contained" color="primary" onClick={() => navigate('/update-course')}>
                Update Course
              </Button>
              <Button variant="contained" color="primary" onClick={() => navigate('/delete-course')}>
                Delete Course
              </Button> */}
            </Box>
          )}

          {selectedSection === 'Other' && (
            <Container className='admin-interface'>
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
                      value={newadminName}
                      onChange={(e) => setNewUsername(e.target.value)}
                    />
                    <TextField
                      label="New Age"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={newadminAge}
                      onChange={(e) => setNewAdminAge(e.target.value)}
                    />
                    <TextField
                      label="New Password"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={newadminPassword}
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
                      value={newadminName}
                      onChange={(e) => setNewUsername(e.target.value)}
                    />
                    <TextField
                      label="Password"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      type="password"
                      value={newadminPassword}
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
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default AdminInterface;
