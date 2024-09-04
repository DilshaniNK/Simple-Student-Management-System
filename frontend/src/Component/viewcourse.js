import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Collapse, TextField, Typography,
} from '@mui/material';
import axios from 'axios';

function Viewcourse() {
  const [courses, setCourses] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [showAssignmentForm, setShowAssignmentForm] = useState({});
  const [showUpdateAssignmentForm, setShowUpdateAssignmentForm] = useState({});
  const [message, setMessage] = useState('');

  // Assignment state
  const [assignmentId, setAssignmentId] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [file, setFile] = useState(null);

  // Update Assignment state
  const [updateAssignmentId, setUpdateAssignmentId] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');
  const [updateDueDate, setUpdateDueDate] = useState('');
  const [updateFile, setUpdateFile] = useState(null);

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

  const handleUpdateAssignmentClick = (courseId) => {
    setShowUpdateAssignmentForm(prevState => ({
      ...prevState,
      [courseId]: !prevState[courseId],
    }));
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

  const handleAssignmentUpdateSubmit = async (e, courseId) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('assignmentId', updateAssignmentId);
    formData.append('description', updateDescription);
    formData.append('dueDate', updateDueDate);
    formData.append('file', updateFile);
    formData.append('courseId', courseId);

    try {
      const response = await axios.put('http://localhost:8070/assignment/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        setMessage('Assignment updated successfully');
        setUpdateAssignmentId('');
        setUpdateDescription('');
        setUpdateDueDate('');
        setUpdateFile(null);
        setShowUpdateAssignmentForm(prevState => ({
          ...prevState,
          [courseId]: false,
        }));
      } else {
        setMessage('Failed to update assignment');
      }
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      setMessage('An error occurred while updating the assignment');
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
            <TableCell>Update Assignment</TableCell>
            <TableCell>More Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.map((course) => (
            <React.Fragment key={course.courseId}>
              <TableRow>
                <TableCell>{course.courseId}</TableCell>
                <TableCell>{course.courseName}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddAssignmentClick(course.courseId)}
                  >
                    Add Assignment
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleUpdateAssignmentClick(course.courseId)}
                  >
                    Update Assignment
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
              </TableRow>

              <TableRow>
                <TableCell colSpan={5} style={{ paddingBottom: 0, paddingTop: 0 }}>
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
                <TableCell colSpan={5}>
                  <Collapse in={showAssignmentForm[course.courseId]} timeout="auto" unmountOnExit>
                    <form onSubmit={(e) => handleAssignmentSubmit(e, course.courseId)} style={{ margin: '20px' }}>
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
              </TableRow>

              <TableRow>
                <TableCell colSpan={5}>
                  <Collapse in={showUpdateAssignmentForm[course.courseId]} timeout="auto" unmountOnExit>
                    <form onSubmit={(e) => handleAssignmentUpdateSubmit(e, course.courseId)} style={{ margin: '20px' }}>
                      <TextField
                        label="Assignment ID"
                        value={updateAssignmentId}
                        onChange={(e) => setUpdateAssignmentId(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                      />
                      <TextField
                        label="Description"
                        value={updateDescription}
                        onChange={(e) => setUpdateDescription(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                      />
                      <TextField
                        label="Due Date"
                        type="date"
                        value={updateDueDate}
                        onChange={(e) => setUpdateDueDate(e.target.value)}
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
                        onChange={(e) => setUpdateFile(e.target.files[0])}
                        style={{ marginTop: '20px' }}
                        required
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        style={{ marginTop: '20px' }}
                      >
                        Update
                      </Button>
                    </form>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>

      {message && <Typography variant="subtitle1" color={message.includes('successfully') ? 'primary' : 'error'} style={{ margin: '20px' }}>{message}</Typography>}
    </TableContainer>
  );
}

export default Viewcourse;
