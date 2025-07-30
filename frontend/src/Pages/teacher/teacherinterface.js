import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Button,
  Paper,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "./teacher-sidebar";
// import Navbar from "./navbar";
import { useNavigate } from "react-router-dom";

function Teacherinterface() {
  const [teacherId, setTeacherId] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  const [students, setStudents] = useState([]);
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editAge, setEditAge] = useState("");
  const [editGender, setEditGender] = useState("");
  const [editClass, setEditClass] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem("TeacherName");
    const id = localStorage.getItem("TeacherId");
    if (name && id) {
      setTeacherName(name);
      setTeacherId(id);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios
      .get("http://localhost:8070/student/")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error("Error fetching students:", err));
  };

  const handleEditClick = (student) => {
    setEditingStudentId(student.studentId);  // <-- Use studentId, NOT _id
    setEditName(student.name);
    setEditAge(student.age);
    setEditGender(student.gender);
    setEditClass(student.class);
  };

  const handleEditCancel = () => {
    setEditingStudentId(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedStudent = {
        name: editName,
        age: Number(editAge),  // Convert to number
        gender: editGender,
        class: editClass,
      };

      const response = await axios.put(
        `http://localhost:8070/teacher/student/update/${editingStudentId}`,
        updatedStudent
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Student updated successfully!",
        });
        setEditingStudentId(null);
        fetchStudents();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update student",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while updating student",
      });
      console.error(err);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* <Navbar /> */}

      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Sidebar
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
        />

        <Box sx={{ flexGrow: 1, bgcolor: "background.default", p: 3, mt: "64px" }}>
          {selectedSection === "" && (
            <>
              <Typography variant="h4" gutterBottom>
                Welcome....! {teacherName.toUpperCase()}
              </Typography>

              <TableContainer
                component={Paper}
                sx={{
                  maxWidth: "90%",
                  margin: "30px auto",
                  bgcolor: "#f9fbfd",
                  borderRadius: 3,
                  boxShadow: 4,
                  mt: 3,
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: "#1d2f81" }}>
                      <TableCell
                        sx={{ color: "#fff", fontWeight: "bold", fontSize: "1.1rem" }}
                      >
                        Student ID
                      </TableCell>
                      <TableCell
                        sx={{ color: "#fff", fontWeight: "bold", fontSize: "1.1rem" }}
                      >
                        Name
                      </TableCell>
                      <TableCell
                        sx={{ color: "#fff", fontWeight: "bold", fontSize: "1.1rem" }}
                      >
                        Age
                      </TableCell>
                      <TableCell
                        sx={{ color: "#fff", fontWeight: "bold", fontSize: "1.1rem" }}
                      >
                        Gender
                      </TableCell>
                      <TableCell
                        sx={{ color: "#fff", fontWeight: "bold", fontSize: "1.1rem" }}
                      >
                        Class
                      </TableCell>
                      <TableCell
                        sx={{ color: "#fff", fontWeight: "bold", fontSize: "1.1rem" }}
                      >
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {students.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                          No students found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      students.map((student) => (
                        <TableRow key={student._id} hover>
                          <TableCell>{student.studentId}</TableCell>
                          <TableCell>
                            {editingStudentId === student.studentId ? (
                              <TextField
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                size="small"
                              />
                            ) : (
                              student.name
                            )}
                          </TableCell>
                          <TableCell>
                            {editingStudentId === student.studentId ? (
                              <TextField
                                value={editAge}
                                onChange={(e) => setEditAge(e.target.value)}
                                size="small"
                                type="number"
                              />
                            ) : (
                              student.age
                            )}
                          </TableCell>
                          <TableCell>
                            {editingStudentId === student.studentId ? (
                              <TextField
                                value={editGender}
                                onChange={(e) => setEditGender(e.target.value)}
                                size="small"
                              />
                            ) : (
                              student.gender
                            )}
                          </TableCell>
                          <TableCell>
                            {editingStudentId === student.studentId ? (
                              <TextField
                                value={editClass}
                                onChange={(e) => setEditClass(e.target.value)}
                                size="small"
                              />
                            ) : (
                              student.class
                            )}
                          </TableCell>
                          <TableCell>
                            {editingStudentId === student.studentId ? (
                              <>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  size="small"
                                  onClick={handleEditSubmit}
                                  sx={{ mr: 1 }}
                                >
                                  Save
                                </Button>
                                <Button
                                  variant="outlined"
                                  color="secondary"
                                  size="small"
                                  onClick={handleEditCancel}
                                >
                                  Cancel
                                </Button>
                              </>
                            ) : (
                              <Button
                                variant="contained"
                                size="small"
                                onClick={() => handleEditClick(student)}
                              >
                                Edit
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Teacherinterface;
