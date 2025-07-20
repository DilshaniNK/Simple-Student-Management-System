import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Container,
  Paper,
  Box,
} from "@mui/material";
import axios from "axios";

function AddTeacher() {
  const [teacherId, setTeacherId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [assignedClass, setAssignedClass] = useState(""); // New state for Class

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!teacherId || !name || !age || !gender || !password || !assignedClass) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8070/admin/add-teacher", {
        teacherId,
        name,
        age: Number(age),
        gender,
        password,
       assignedClass, // Include class in POST data
      });
      alert(response.data.status || "Teacher added successfully");
      setTeacherId("");
      setName("");
      setAge("");
      setGender("");
      setPassword("");
      setAssignedClass(""); // Reset class input
    } catch (error) {
      console.error("Error adding teacher:", error);
      alert("Failed to add teacher.");
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h5" gutterBottom>
            Add Teacher
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Teacher ID"
              variant="outlined"
              fullWidth
              value={teacherId}
              onChange={(e) => setTeacherId(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Age"
              type="number"
              variant="outlined"
              fullWidth
              value={age}
              onChange={(e) => setAge(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Gender"
              variant="outlined"
              fullWidth
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Class"
              variant="outlined"
              fullWidth
              value={assignedClass}
              onChange={(e) => setAssignedClass(e.target.value)}
              sx={{ mb: 2 }}
              placeholder="e.g. 11A"
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Teacher
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}

export default AddTeacher;
