import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Drawer, List, ListItem, ListItemText, Divider, Button, Container,Paper, TextField } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const drawerWidth = 240;

function Teacherinterface() {
  const [teacherName, setTeacherName] = useState("");
  const [selectedSection, setSelectedSection] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [message,setMessage] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newTeachertAge, setNewTeacherAge] = useState("");

 



  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the student's name from localStorage
    const name = localStorage.getItem('TeacherName');
    if (name) {
      setTeacherName(name);
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
  const handleUpdateProfile = () =>{
    setShowUpdateForm(true);
    setShowDeleteForm(false);
  }

  const handleDeleteAccountClick = () =>{
    setShowDeleteForm(true);
    setShowUpdateForm(false);

  }

  const handleFormSubmit = async (e) => {
    e.preventDefault() ;
    const updatedFields = {} ;
    if (newUsername) updatedFields.newUsername = newUsername;
    if (newTeachertAge) updatedFields.newage = newTeachertAge;
    if (newPassword) updatedFields.newpassword = newPassword;

    if (Object.keys(updatedFields).length === 0 ){
      setMessage("Please fill in at least one fiels to update .");
      return ;
    }
    try {
      const response = await axios.put("http://localhost:8070/teacher/update", {
        name : teacherName,
        ...updatedFields
      });

      if(response.data.status === "Update successful"){
        setMessage("Profile updated succesfully");

        if(newUsername){
          setTeacherName(newUsername);
          localStorage.setItem('TeacherName',newUsername);
        }
        setShowUpdateForm(false);
      }else{
        setMessage('Failed to update profile');
      }
    } catch (err){
      setMessage('An error occurred');
    }
  };
  const handleDeleteAccountSubmit = async (e) =>{
    e.preventDefault();
    try {
      const response = await axios.delete('http://localhost:8070/teacher/delete',
        {
          data : {
            name: newUsername,
            password: newPassword,
          },
        }
      );
      if (response.data.status === "User deleted"){
        setMessage("Account delete succesfully");
        localStorage.removeItem('TeacherName')
        navigate('/teacherlogin');

      }else{
        setMessage('Failed to delete account');
      }

    }catch (err){
      setMessage('An error occured while deleting the account');
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
             <Typography variant="h2" gutterBottom>
                Welcome....!   {teacherName}
                 </Typography>
           )}
          {selectedSection === 'Courses' && (
            <Box>
              <Button variant="contained" color="primary" onClick={() => navigate('/add-course')}>
                Add Course
              </Button>
              <Button variant="contained" color="primary" onClick={() => navigate('/view-courses')}>
                View Courses
              </Button>
              <Button variant="contained" color="primary" onClick={() => navigate('/update-course')}>
                Update Course
              </Button>
              <Button variant="contained" color="primary" onClick={() => navigate('/delete-course')}>
                Delete Course
              </Button>
            </Box>
          )}
          

          {/* other section */}
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
                    value={newTeachertAge} // Corrected variable name
                    onChange={(e) => setNewTeacherAge(e.target.value)} // Corrected function name
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
        )
      }
        
        </Box>
      </Box>
    </Box>
  );
}

export default Teacherinterface;
