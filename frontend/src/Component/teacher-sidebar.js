import React from 'react';
import { Drawer, List, ListItem, ListItemText, Divider, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

export default function Sidebar({ selectedSection, setSelectedSection }) {
  const navigate = useNavigate();

  const handleNav = (section) => {
    setSelectedSection(section);
    if (section === 'Dashboard') navigate('/teacherinterface');
    if (section === 'Courses') navigate('/teacher-view-course');
      if (section === 'Manage Students') navigate('/teacher-add-student');
      if (section === 'Add Marks') navigate('/teacher-add-marks');
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          background: 'linear-gradient(to top, #1d2f81, #3b5998)',
          color: '#fff',
          boxSizing: 'border-box',
          pt: '64px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        },
      }}
    >
      <Box>
        <List>
          {['Dashboard', 'Courses', 'Manage Students','Add Marks'].map((text) => (
            <ListItem
              button
              key={text}
              onClick={() => handleNav(text)}
              sx={{
                mb: 1,
                backgroundColor: selectedSection === text ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
              }}
            >
              <ListItemText
                primary={text}
                primaryTypographyProps={{
                  fontSize: '18px',
                  fontWeight: selectedSection === text ? 'bold' : 'normal',
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      <Box>
        <Divider sx={{ backgroundColor: '#fff' }} />
        <ListItem button onClick={() => { navigate('/adminlogin'); localStorage.removeItem('AdminName'); }} sx={{ mt: 2 }}>
          <ListItemText primary="Logout" primaryTypographyProps={{ fontSize: '18px' }} />
        </ListItem>
      </Box>
    </Drawer>
  );
}
