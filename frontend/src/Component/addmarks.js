import React, { useState } from "react";
import {
  Typography,
  Select,
  MenuItem,
  TextField,
  Button,
  Container,
  Paper,
  Box,
} from "@mui/material";
import axios from "axios";
import Navbar from "./navbar"; // Import Navbar component
import Sidebar from "./teacher-sidebar";

function Addmarks() {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [studentId, setStudentId] = useState("");
  const [marks, setMarks] = useState("");
const [selectedSection, setSelectedSection] = useState('');
const handleSectionChange = (section) => setSelectedSection(section);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedSubject || !studentId || !marks) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8070/teacher/add-marks", {
        subject: selectedSubject,
        studentId: studentId,
        marks: marks,
      });
      alert(response.data.message);
      setStudentId("");
      setMarks("");
    } catch (error) {
      console.error("Error submitting marks:", error);
      alert("Failed to submit marks.");
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>

<Navbar/>
 <Box sx={{ display: "flex", flexGrow: 1 ,mt: '64px',backgroundColor: '#f0f2f5'}}>
              <Sidebar
                selectedSection={selectedSection}
                setSelectedSection={handleSectionChange}
              />
      


      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h5" gutterBottom>
            Add Student Marks
          </Typography>

          <Select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            fullWidth
            displayEmpty
            sx={{ mb: 2 }}
          >
            <MenuItem value="" disabled>
              Select Subject
            </MenuItem>
            <MenuItem value="Maths">Maths</MenuItem>
            <MenuItem value="Science">Science</MenuItem>
            <MenuItem value="English">English</MenuItem>
          </Select>

          {selectedSubject && (
            <form onSubmit={handleSubmit}>
              <TextField
                label="Student ID"
                variant="outlined"
                fullWidth
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Marks"
                type="number"
                variant="outlined"
                fullWidth
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Submit Marks
              </Button>
            </form>
          )}
        </Paper>
      </Container>
      </Box>
      </Box>
  );
}

export default Addmarks;
