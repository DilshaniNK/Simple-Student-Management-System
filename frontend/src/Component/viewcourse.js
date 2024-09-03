import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Collapse, TextField, Typography } from '@mui/material';
import axios from 'axios';

function Viewcourse() {
  const [courses, setCourses] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [showAssignmentForm, setShowAssignmentForm] = useState({});
  const [showUpdateForm, setShowUpdateForm] = useState({});
  const [message, setMessage] = useState('');

  // Assignment state
  const [assignmentId, setAssignmentId] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [file, setFile] = useState(null);

  // Update state
  const [courseId, setCourseId] = useState('');
  const [courseName, setCourseName] = useState('');
  const [noOfStudents, setNoOfStudents] = useState('');
  const [courseFee, setCourseFee] = useState('');
  const [lectureName, setLectureName] = useState('');
  const [duration, setDuration] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8070/course/view')
      .then(response => {
        setCourses(response.data);
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

  const handleAddAssignmentClick = (courseId) => {
    setShowAssignmentForm(prevState => ({
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

  const handleDeleteCourse = async (courseId) => {
    try {
      const response = await axios.delete('http://localhost:8070/course/delete', {
        data: { courseId }
      });
      if (response.status === 200) {
        setMessage('Course deleted successfully');
        setCourses(courses.filter(course => course._id !== courseId));
      } else {
        setMessage('Failed to delete course');
      }
    } catch (err) {
      console.error('Error deleting course:', err);
      setMessage('An error occurred while deleting the course');
    }
  };

  const handleAssignmentSubmit = async (e, courseId) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('assignmentId', assignmentId);
    formData.append('description', description);
    formData.append('dueDate', dueDate);
    formData.append('file', file);
    formData.append('courseId', courseId);

    try {
      const response = await axios.post('http://localhost:8070/assignment/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        setMessage('Assignment added successfully');
        setAssignmentId('');
        setDescription('');
        setDueDate('');
        setFile(null);
        setShowAssignmentForm(prevState => ({
          ...prevState,
          [courseId]: false,
        }));
      } else {
        setMessage('Failed to add assignment');
      }
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      setMessage('An error occurred while adding the assignment');
    }
  };

  const handleUpdateCourseSubmit = async (e) => {
    e.preventDefault();

    const updatedCourse = {};
    if (courseName) updatedCourse.courseName = courseName;
    if (noOfStudents) updatedCourse.NoOfStudent = noOfStudents;
    if (courseFee) updatedCourse.courseFee = courseFee;
    if (lectureName) updatedCourse.lectureName = lectureName;
    if (duration) updatedCourse.Duration = duration;

    try {
      const response = await axios.put('http://localhost:8070/course/update', {
        courseId,
        ...updatedCourse
      });
      if (response.status === 200) {
        setMessage('Course updated successfully');
        setCourses(courses.map(course =>
          course._id === courseId ? { ...course, ...updatedCourse } : course
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
            <TableCell>Add Assignment</TableCell>
            <TableCell>More Details</TableCell>
            <TableCell>Update Course</TableCell>
            <TableCell>Delete Course</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.map((course) => (
            <React.Fragment key={course._id}>
              <TableRow>
                <TableCell>{course.courseId}</TableCell>
                <TableCell>{course.courseName}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddAssignmentClick(course._id)}
                  >
                    Add Assignment
                  </Button>
                </TableCell>
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
                    onClick={() => handleUpdateClick(course._id)}
                  >
                    Update Course
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteCourse(course._id)}
                  >
                    Delete Course
                  </Button>
                </TableCell>
              </TableRow>
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
                      />
                      <TextField
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        margin="normal"
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
                      />
                      <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        style={{ margin: '10px 0' }}
                      />
                      <Button type="submit" variant="contained" color="primary">
                        Submit Assignment
                      </Button>
                      {message && <Typography variant="body2" color="error">{message}</Typography>}
                    </form>
                  </Collapse>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={6}>
                  <Collapse in={showUpdateForm[course._id]} timeout="auto" unmountOnExit>
                    <form onSubmit={handleUpdateCourseSubmit} style={{ margin: '20px' }}>
                      <TextField
                        label="Course ID"
                        value={courseId}
                        onChange={(e) => setCourseId(e.target.value)}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        label="Course Name"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        label="No. of Students"
                        value={noOfStudents}
                        onChange={(e) => setNoOfStudents(e.target.value)}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        label="Course Fee"
                        value={courseFee}
                        onChange={(e) => setCourseFee(e.target.value)}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        label="Lecture Name"
                        value={lectureName}
                        onChange={(e) => setLectureName(e.target.value)}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        label="Duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        fullWidth
                        margin="normal"
                      />
                      <Button type="submit" variant="contained" color="primary">
                        Update Course
                      </Button>
                      {message && <Typography variant="body2" color="error">{message}</Typography>}
                    </form>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Viewcourse;
