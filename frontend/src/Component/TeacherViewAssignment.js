import React, { useEffect, useState, useCallback } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, Alert, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import Swal from 'sweetalert2';

function ViewAssignment() {
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const courseName = localStorage.getItem('selectedCourseName');
  const courseId = localStorage.getItem('selectedCourseID');

  const fetchAssignments = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8070/assignment/getass?courseId=${courseId}`);
      setAssignments(response.data);
    } catch (error) {
    //   setError('Failed to retrieve assignments');
    }
  }, [courseId]);

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Formats the date in 'MM/DD/YYYY' format by default
  };

  const deleteAssignment = async (assignmentId) => {
    try {
      await axios.delete(`http://localhost:8070/assignment/delete?assignmentId=${assignmentId}`);
      // Immediately update the assignments state
      setAssignments(prevAssignments => prevAssignments.filter(assignment => assignment.assignmentId !== assignmentId));
    //   setSuccess('Assignment deleted successfully');
    } catch (error) {
      setError('Failed to delete assignment');
    }
  };
  
  const handleDeleteClick = (assignmentId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAssignment(assignmentId)
          .then(() => {
            Swal.fire('Deleted!', 'The assignment has been deleted.', 'success');
          })
          .catch(() => {
            Swal.fire('Error!', 'Failed to delete the assignment.', 'error');
          });
      }
    });
  };
  

  return (
    <Container>
      <Typography variant="h4" sx={{ marginBottom: 3 }}>
        {courseName} - Assignments
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Assignment ID</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>PDF</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignments.map((assignment) => (
              <TableRow key={assignment.assignmentId}>
                <TableCell>{assignment.assignmentId}</TableCell>
                <TableCell>{assignment.description}</TableCell>
                <TableCell>{formatDate(assignment.dueDate)}</TableCell>
                <TableCell>
                  {assignment.pdfFile ? (
                    <a href={`http://localhost:8070/${assignment.pdfFile}`} target="_blank" rel="noopener noreferrer">
                      View PDF
                    </a>
                  ) : (
                    "No PDF"
                  )}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDeleteClick(assignment.assignmentId)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}

export default ViewAssignment;
