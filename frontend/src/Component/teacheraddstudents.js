import React, { useState } from "react";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";
import axios from "axios";
import Sidebar from "./teacher-sidebar"; // Adjust path as needed
import Navbar from "./navbar";

export default function AddStudent() {
  const [selectedSection, setSelectedSection] = useState(""); // Defined here

  const [student, setStudent] = useState({
    studentId: "",
    name: "",
    age: "",
    gender: "",
    password: "",
    class: "",
  });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8070/teacher/add-student", student);
      alert("Student added successfully!");
      setStudent({
        studentId: "",
        name: "",
        age: "",
        gender: "",
        password: "",
        class: "",
      });
    } catch (err) {
      alert("Error adding student");
      console.error(err);
    }
  };

  // Helper to prettify labels
  const prettifyLabel = (field) => {
    if (field === "studentId") return "Student ID";
    if (field === "class") return "Class";
    if (field === "password") return "Password";
    return field.charAt(0).toUpperCase() + field.slice(1);
  };

  return (
    <Box sx={{ backgroundColor: "#fefefe", minHeight: "100vh" }}>
      <Navbar />
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Sidebar selectedSection={selectedSection} setSelectedSection={setSelectedSection} />

        <Paper
          sx={{
            p: 4,
            maxWidth: 500,
            mx: "auto",
            mt: 10,
            borderRadius: 3,
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.12)",
            bgcolor: "#fafafa",
            width: "100%",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Add Student
          </Typography>
          <form onSubmit={handleSubmit}>
            {["studentId", "name", "age", "gender", "password", "class"].map((field) => (
              <TextField
                key={field}
                label={prettifyLabel(field)}
                name={field}
                value={student[field]}
                onChange={handleChange}
                fullWidth
                margin="normal"
                type={field === "password" ? "password" : field === "age" ? "number" : "text"}
                required={field !== "class"} // Make class optional
              />
            ))}
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
              Add Student
            </Button>
          </form>
        </Paper>
      </Box>
    </Box>
  );
}
