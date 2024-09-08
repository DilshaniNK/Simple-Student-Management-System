import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Collapse, TextField, Typography,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import axios from 'axios';

function Viewcourse() {
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
        setMessage('Course deleted successfully');
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
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Course ID</TableCell>
            <TableCell>Course Name</TableCell>
            {/* <TableCell>Add Assignment</TableCell> */}
            <TableCell>More Details</TableCell>
            <TableCell>Update Course</TableCell>
            <TableCell>Delete Course</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.map((course) => (
            <React.Fragment key={course._id}>
              <TableRow>
                {course.deleted ? (
                  <TableCell colSpan={6} style={{ backgroundColor: '#f8d7da', textAlign: 'center' }}>
                    <Typography variant="body1" color="error">
                      Course deleted successfully
                    </Typography>
                  </TableCell>
                ) : (
                  <>
                    <TableCell>{course.courseId}</TableCell>
                    <TableCell>{course.courseName}</TableCell>
                    {/* <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleAddAssignmentClick(course._id)}
                      >
                        Add Assignment
                      </Button>
                    </TableCell> */}
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleExpandClick(course._id)}
                      >
                        {expanded[course._id] ? 'Hide Details' : 'More Details'}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleUpdateClick(course.courseId)}
                      >
                        Update Course
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDeleteClick(course.courseId)}
                      >
                        Delete Course
                      </Button>
                    </TableCell>
                  </>
                )}
              </TableRow>

              {/* Only show additional rows if the course is not deleted */}
              {!course.deleted && (
                <>
                  {/* Details Row */}
                  <TableRow>
                    <TableCell colSpan={6} style={{ paddingBottom: 0, paddingTop: 0 }}>
                      <Collapse in={expanded[course._id]} timeout="auto" unmountOnExit>
                        <div style={{ margin: '20px' }}>
                          <Typography><strong>No. of Students:</strong> {course.NoOfStudent}</Typography>
                          <Typography><strong>Course Fee:</strong> {course.courseFee} LKR</Typography>
                          <Typography><strong>Lecture Name:</strong> {course.lectureName}</Typography>
                          <Typography><strong>Course Duration:</strong> {course.Duration}</Typography>
                        </div>
                      </Collapse>
                    </TableCell>
                  </TableRow>

                  {/* Assignment Form Row
                  <TableRow>
                    <TableCell colSpan={6}>
                      <Collapse in={showAssignmentForm[course._id]} timeout="auto" unmountOnExit>
                        <form onSubmit={(e) => handleAssignmentSubmit(e, course._id)} style={{ margin: '20px' }}>
                          <TextField
                            label="Assignment ID"
                            value={assignmentId}
                            onChange={(e) => setAssignmentId(e.target.value)}
                            fullWidth
                            margin="normal"
                            required
                          />
                          <TextField
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            fullWidth
                            margin="normal"
                            required
                          />
                          <TextField
                            label="Due Date"
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            required
                          />
                          <input
                            accept=".pdf"
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                            style={{ marginTop: '20px' }}
                            required
                          />
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            style={{ marginTop: '20px' }}
                          >
                            Submit
                          </Button>
                        </form>
                      </Collapse>
                    </TableCell>
                  </TableRow> */}

                  {/* Update Form Row */}
                  <TableRow>
                    <TableCell colSpan={6}>
                      <Collapse in={showUpdateForm[course.courseId]} timeout="auto" unmountOnExit>
                        <form onSubmit={handleUpdateCourseSubmit} style={{ margin: '20px' }}>
                          <TextField
                            label="New Course Name"
                            value={newcoursename}
                            onChange={(e) => setCourseName(e.target.value)}
                            fullWidth
                            margin="normal"
                          />
                          <TextField
                            label="New No. of Students"
                            value={newNoofstudents}
                            onChange={(e) => setNoOfStudents(e.target.value)}
                            fullWidth
                            margin="normal"
                          />
                          <TextField
                            label="New Course Fee"
                            value={newcoursefee}
                            onChange={(e) => setCourseFee(e.target.value)}
                            fullWidth
                            margin="normal"
                          />
                          <TextField
                            label="New Lecture Name"
                            value={newlecturename}
                            onChange={(e) => setLectureName(e.target.value)}
                            fullWidth
                            margin="normal"
                          />
                          <TextField
                            label="New Course Duration"
                            value={newduration}
                            onChange={(e) => setDuration(e.target.value)}
                            fullWidth
                            margin="normal"
                          />
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            style={{ marginTop: '20px' }}
                          >
                            Update
                          </Button>
                        </form>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this course?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            No
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success/Error Message */}
      {message && <Typography variant="subtitle1" color={message.includes('successfully') ? 'primary' : 'error'} style={{ margin: '20px' }}>{message}</Typography>}
    </TableContainer>
  );
}

export default Viewcourse;
