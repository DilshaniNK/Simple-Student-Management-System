import React, { useEffect, useState, useCallback } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, Alert } from '@mui/material';
import axios from 'axios';

function ViewAssignmentdetails() {
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState("");
  const courseName = localStorage.getItem('SelectedCourseName');
  const courseId = localStorage.getItem('SelectedCourseId');

  const fetchAssignments = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8070/assignment/getass?courseId=${courseId}`);
      setAssignments(response.data);
    } catch (error) {
      setError('Failed to retrieve assignments');
    }
  }, [courseId]);

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Formats the date in 'MM/DD/YYYY' format by default
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ marginBottom: 3 }}>
        {courseName} - Assignments
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Assignment ID</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>PDF</TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}

export default ViewAssignmentdetails;
