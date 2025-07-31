import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Collapse, TextField, Typography,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import axios from 'axios';
import { Box } from '@mui/material';
import Sidebar from '../../Component/admin-sidebar';
    // adjust path as needed
import { useNavigate } from 'react-router-dom';





function Addminviewcourses() {
  const [selectedSection, setSelectedSection] = useState('Courses');
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [expanded, setExpanded] = useState({});
//   const [showAssignmentForm, setShowAssignmentForm] = useState({});
  const [showUpdateForm, setShowUpdateForm] = useState({});
  const [message, setMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false); // For the confirmation dialog
  const [selectedCourseId, setSelectedCourseId] = useState(''); // To track which course is being deleted



  // Update state
  const [courseId, setCourseId] = useState('');
  const [newcoursename, setCourseName] = useState('');
  const [newNoofstudents, setNoOfStudents] = useState('');
  const [newcoursefee, setCourseFee] = useState('');
  const [newlecturename, setLectureName] = useState('');
  const [newduration, setDuration] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8070/course/view')
      .then(response => {
        // Add a 'deleted' property to each course
        const coursesWithDeleteFlag = response.data.map(course => ({ ...course, deleted: false }));
        setCourses(coursesWithDeleteFlag);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });
  }, []);

  const handleExpandClick = (courseId) => {
    setExpanded(prevState => ({
      ...prevState,
      [courseId]: !prevState[courseId],
    }));
  };

  const handleProfileClick = () => {
  setSelectedSection('Profile'); // Or whatever you want to do when Profile is clicked
};


  const handleUpdateClick = (courseId) => {
    setCourseId(courseId); // Set courseId for update
    setShowUpdateForm(prevState => ({
      ...prevState,
      [courseId]: !prevState[courseId],
    }));
  };

  const handleDeleteClick = (courseId) => {
    setSelectedCourseId(courseId);
    setOpenDialog(true); // Open the confirmation dialog
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete(`http://localhost:8070/course/delete`,{
        data:{
          courseId: selectedCourseId,
        }
      });
      if (response.status === 200) {
        
        setCourses(courses.map(course =>
          course.courseId === selectedCourseId ? { ...course, deleted: true } : course
        ));
      } else {
        setMessage('Failed to delete course');
      }
    } catch (err) {
      console.error('Error deleting course:', err);
      setMessage('An error occurred while deleting the course');
    }
    setOpenDialog(false); // Close the confirmation dialog
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };



  const handleUpdateCourseSubmit = async (e) => {
    e.preventDefault();

    const updatedCourse = {};
    if (newcoursename) updatedCourse.newcoursename = newcoursename;
    if (newNoofstudents) updatedCourse.newNoofstudents = newNoofstudents;
    if (newcoursefee) updatedCourse.newcoursefee = newcoursefee;
    if (newlecturename) updatedCourse.newlecturename = newlecturename;
    if (newduration) updatedCourse.newduration = newduration;

    try {
      const response = await axios.put('http://localhost:8070/course/update', {
        courseId,
        ...updatedCourse
      });
      if (response.status === 200) {
        setMessage('Course updated successfully');
        setCourses(courses.map(course =>
          course.courseId === courseId ? { ...course, ...updatedCourse } : course
        ));
        setShowUpdateForm(prevState => ({
          ...prevState,
          [courseId]: false,
        }));
        setCourseName('');
        setNoOfStudents('');
        setCourseFee('');
        setLectureName('');
        setDuration('');
      } else {
        setMessage('Failed to update course');
      }
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      setMessage('An error occurred while updating the course');
    }
  };

  return (

  <Box sx={{ display: 'flex', bgcolor: '#f0f2f5', minHeight: '100vh' }}>
        


<Box sx={{ flexGrow: 1, p: 3, mt: '64px' }}>
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>

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
              onClick={() => navigate("/admin/add_courses")}
            >
              Add Course
            </Button>
            </Box>

   <TableContainer
  component={Paper}
  sx={{
    maxWidth: '90%',
    margin: '30px auto',
    bgcolor: '#f9fbfd',
    borderRadius: 3,
    boxShadow: 4,
    mt:'75px'
  }}
>
  <Table>
    <TableHead>
      <TableRow sx={{ bgcolor: '#1d2f81' }}>
        <TableCell sx={{ color: '#fff', fontWeight: 'bold', fontSize: '1.1rem' }}>Course ID</TableCell>
        <TableCell sx={{ color: '#fff', fontWeight: 'bold', fontSize: '1.1rem' }}>Course Name</TableCell>
        <TableCell sx={{ color: '#fff', fontWeight: 'bold', fontSize: '1.1rem' }}>More Details</TableCell>
        <TableCell sx={{ color: '#fff', fontWeight: 'bold', fontSize: '1.1rem' }}>Update</TableCell>
        <TableCell sx={{ color: '#fff', fontWeight: 'bold', fontSize: '1.1rem' }}>Delete</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {courses.map((course) => (
        <React.Fragment key={course._id}>
          <TableRow hover>
            {course.deleted ? (
              <TableCell colSpan={5} sx={{ bgcolor: '#fdecea', textAlign: 'center' }}>
                <Typography color="error">Course deleted successfully</Typography>
              </TableCell>
            ) : (
              <>
                <TableCell>{course.courseId}</TableCell>
                <TableCell>{course.courseName}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    color="secondary"
                    onClick={() => handleExpandClick(course._id)}
                  >
                    {expanded[course._id] ? 'Hide' : 'Details'}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      bgcolor: '#3f51b5',
                      color: '#fff',
                      '&:hover': { bgcolor: '#1d2f81' },
                    }}
                    onClick={() => handleUpdateClick(course.courseId)}
                  >
                    Update
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    color="error"
                    onClick={() => handleDeleteClick(course.courseId)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </>
            )}
          </TableRow>

          {/* Details Section */}
          {!course.deleted && (
            <>
              <TableRow>
                <TableCell colSpan={5} sx={{ py: 0 }}>
                  <Collapse in={expanded[course._id]} timeout="auto" unmountOnExit>
                    <Box sx={{ p: 2, bgcolor: '#e3f2fd', borderRadius: 2 }}>
                      <Typography><strong>No. of Students:</strong> {course.NoOfStudent}</Typography>
                      <Typography><strong>Course Fee:</strong> {course.courseFee} LKR</Typography>
                      <Typography><strong>Lecture Name:</strong> {course.lectureName}</Typography>
                      <Typography><strong>Duration:</strong> {course.Duration}</Typography>
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>

              {/* Update Section */}
              <TableRow>
                <TableCell colSpan={5}>
                  <Collapse in={showUpdateForm[course.courseId]} timeout="auto" unmountOnExit>
                    <Box sx={{ p: 2, bgcolor: '#f0f4f8', borderRadius: 2 }}>
                      <form onSubmit={handleUpdateCourseSubmit}>
                        <TextField label="Course Name" value={newcoursename} onChange={(e) => setCourseName(e.target.value)} fullWidth sx={{ mb: 2 }} />
                        <TextField label="No. of Students" value={newNoofstudents} onChange={(e) => setNoOfStudents(e.target.value)} fullWidth sx={{ mb: 2 }} />
                        <TextField label="Course Fee" value={newcoursefee} onChange={(e) => setCourseFee(e.target.value)} fullWidth sx={{ mb: 2 }} />
                        <TextField label="Lecture Name" value={newlecturename} onChange={(e) => setLectureName(e.target.value)} fullWidth sx={{ mb: 2 }} />
                        <TextField label="Duration" value={newduration} onChange={(e) => setDuration(e.target.value)} fullWidth sx={{ mb: 2 }} />
                        <Button type="submit" variant="contained" color="primary">Update Course</Button>
                      </form>
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </>
          )}
        </React.Fragment>
      ))}
    </TableBody>
  </Table>

  {/* Dialog & Message */}
  <Dialog open={openDialog} onClose={handleDialogClose}>
    <DialogTitle>Confirm Delete</DialogTitle>
    <DialogContent>
      <DialogContentText>Are you sure you want to delete this course?</DialogContentText>
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
    ,</Box>
  );
}

export default Addminviewcourses;
