import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Collapse, TextField, Typography, Snackbar, Alert,
} from '@mui/material';
import axios from 'axios';

function Viewcourse() {
  const [courses, setCourses] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [activeForm, setActiveForm] = useState({ courseId: null, formType: null });
  const [alert, setAlert] = useState({ open: false, severity: '', message: '' });

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

  const handleFormClick = (courseId, formType) => {
    setActiveForm(prevState => {
      if (prevState.courseId === courseId && prevState.formType === formType) {
        return { courseId: null, formType: null }; // Close form if already active
      } else {
        return { courseId, formType }; // Open the selected form
      }
    });
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
        setAlert({ open: true, severity: 'success', message: 'Assignment added successfully' });
        setAssignmentId('');
        setDescription('');
        setDueDate('');
        setFile(null);
        setActiveForm({ courseId: null, formType: null });
      } else {
        setAlert({ open: true, severity: 'error', message: 'Failed to add assignment' });
      }
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      setAlert({ open: true, severity: 'error', message: 'An error occurred while adding the assignment' });
    }
  };

  const handleAssignmentUpdateSubmit = async (e, courseId) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('assignmentId', updateAssignmentId);
    formData.append('description', updateDescription);
    formData.append('dueDate', updateDueDate);
    if (updateFile) {
      formData.append('file', updateFile);
    }

    try {
      const response = await axios.put('http://localhost:8070/assignment/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        setAlert({ open: true, severity: 'success', message: 'Assignment updated successfully' });
        setUpdateAssignmentId('');
        setUpdateDescription('');
        setUpdateDueDate('');
        setUpdateFile(null);
        setActiveForm({ courseId: null, formType: null });
      } else {
        setAlert({ open: true, severity: 'error', message: 'Failed to update assignment' });
      }
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      setAlert({ open: true, severity: 'error', message: 'An error occurred while updating the assignment' });
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
            <TableCell>Delete Assignment</TableCell>
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
                    onClick={() => handleFormClick(course.courseId, 'addAssignment')}
                  >
                    Add Assignment
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleFormClick(course.courseId, 'updateAssignment')}
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
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    // onClick={() => handleDeleteClick(course.courseId)}
                    >
                      Delete Assignment
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
                  <Collapse in={activeForm.courseId === course.courseId && activeForm.formType === 'addAssignment'} timeout="auto" unmountOnExit>
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
                  <Collapse in={activeForm.courseId === course.courseId && activeForm.formType === 'updateAssignment'} timeout="auto" unmountOnExit>
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
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={() => setAlert({ ...alert, open: false })}
      >
        <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
    </TableContainer>
  );
}

export default Viewcourse;
