import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Collapse, Typography,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Box
} from '@mui/material';
import axios from 'axios';
import Sidebar from './admin-sidebar';
import AdminNavbar from './navbar';
import { useNavigate } from 'react-router-dom'; // import useNavigate

function AdminViewTeachers() {
  const [selectedSection, setSelectedSection] = useState('Teachers');
  const [teachers, setTeachers] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // useNavigate hook

  useEffect(() => {
    axios.get('http://localhost:8070/admin/teachers/view')
      .then(response => {
        const teachersWithDeleteFlag = response.data.map(teacher => ({ ...teacher, deleted: false }));
        setTeachers(teachersWithDeleteFlag);
      })
      .catch(error => {
        console.error('Error fetching teachers:', error);
      });
  }, []);

  const handleExpandClick = (teacherId) => {
    setExpanded(prev => ({ ...prev, [teacherId]: !prev[teacherId] }));
  };

  const handleDeleteClick = (teacherId) => {
    setSelectedTeacherId(teacherId);
    setOpenDialog(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete(`http://localhost:8070/admin/teachers/delete`, {
        data: { teacherId: selectedTeacherId }
      });
      if (response.status === 200) {
        setTeachers(teachers.map(teacher =>
          teacher.teacherId === selectedTeacherId ? { ...teacher, deleted: true } : teacher
        ));
        setMessage('Teacher deleted successfully');
      } else {
        setMessage('Failed to delete teacher');
      }
    } catch (err) {
      console.error('Error deleting teacher:', err);
      setMessage('An error occurred while deleting the teacher');
    }
    setOpenDialog(false);
  };

  const handleDialogClose = () => setOpenDialog(false);


  const handleProfileClick = () => setSelectedSection('Profile');

  return (
    <Box sx={{ display: 'flex', bgcolor: '#f0f2f5', minHeight: '100vh' }}>
      <AdminNavbar onProfileClick={handleProfileClick} />
      <Sidebar selectedSection={selectedSection} setSelectedSection={setSelectedSection} />
      <Box sx={{ flexGrow: 1, p: 3, mt: '64px' }}>
        {/* Header with Title and Add Teacher Button */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '90%', margin: '0 auto 20px' }}>
          <Typography variant="h4" component="h2"></Typography>
           <Button
                        variant="contained"
                        sx={{
                          background: "linear-gradient(to right, #1d2f81, #3b5998)",
                          color: "#fff",
                          px: 4,
                          py: 1,
                          mt:'64px',
                          fontWeight: "bold",
                          "&:hover": {
                            background: "linear-gradient(to right, #3b5998, #1d2f81)",
                          },
                        }}
                        onClick={() => navigate("/addteacher")}
                      >
                        Add Teacher
                      </Button>
        </Box>

        <TableContainer component={Paper} sx={{ maxWidth: '90%', margin: '0 auto', borderRadius: 3, boxShadow: 4 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#1d2f81' }}>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>Teacher ID</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>Name</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>More Details</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teachers.map((teacher) => (
                <React.Fragment key={teacher._id}>
                  <TableRow hover>
                    {teacher.deleted ? (
                      <TableCell colSpan={4} sx={{ bgcolor: '#fdecea', textAlign: 'center' }}>
                        <Typography color="error">Teacher deleted successfully</Typography>
                      </TableCell>
                    ) : (
                      <>
                        <TableCell>{teacher.teacherId}</TableCell>
                        <TableCell>{teacher.name}</TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            size="small"
                            color="secondary"
                            onClick={() => handleExpandClick(teacher._id)}
                          >
                            {expanded[teacher._id] ? 'Hide' : 'Details'}
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            size="small"
                            color="error"
                            onClick={() => handleDeleteClick(teacher.teacherId)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </>
                    )}
                  </TableRow>

                  {/* Details Section */}
                  {!teacher.deleted && (
                    <TableRow>
                      <TableCell colSpan={4} sx={{ py: 0 }}>
                        <Collapse in={expanded[teacher._id]} timeout="auto" unmountOnExit>
                          <Box sx={{ p: 2, bgcolor: '#e3f2fd', borderRadius: 2 }}>
                            <Typography><strong>Gender:</strong> {teacher.gender}</Typography>
                            <Typography><strong>Age:</strong> {teacher.age}</Typography>
                            <Typography><strong>Class:</strong> {teacher.assignedClass}</Typography>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>

          {/* Delete Confirmation Dialog */}
          <Dialog open={openDialog} onClose={handleDialogClose}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              <DialogContentText>Are you sure you want to delete this teacher?</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>No</Button>
              <Button onClick={handleDeleteConfirm} color="error">Yes</Button>
            </DialogActions>
          </Dialog>

          {message && (
            <Typography align="center" color={message.includes('successfully') ? 'primary' : 'error'} sx={{ mt: 2 }}>
              {message}
            </Typography>
          )}
        </TableContainer>
      </Box>
    </Box>
  );
}

export default AdminViewTeachers;
