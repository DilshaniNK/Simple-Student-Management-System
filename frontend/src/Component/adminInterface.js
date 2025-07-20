import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const drawerWidth = 240;

function AdminInterface() {
  const [selectedSection, setSelectedSection] = useState("Dashboard");


  const [totalTeachers, setTotalTeachers] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const teacherRes = await axios.get("http://localhost:8070/admin/teacher/count");
      const studentRes = await axios.get("http://localhost:8070/admin/student/count");
      setTotalTeachers(teacherRes.data.count);
      setTotalStudents(studentRes.data.count);
    } catch (err) {
      console.error(err);
    }
  };


 
  const glassStyle = {
    backdropFilter: "blur(10px)",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    color: "#fff",
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Top AppBar */}
      <AppBar
        position="fixed"
        sx={{
          background: "#f1f3faff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ minHeight: "100px", px: 5 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <span
              style={{ color: "#1E2A5E", fontSize: "40px", fontWeight: "bold" }}
            >
              Chalkboard{" "}
            </span>
            <span
              style={{ color: "gray", fontSize: "40px", fontWeight: "regular" }}
            >
              LMS
            </span>
          </Typography>
          <Button
            sx={{ color: "#1E2A5E", fontWeight: "bold" }}
            onClick={() => setSelectedSection("Profile")}
          >
            Profile
          </Button>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            background: "linear-gradient(to top, #1d2f81, #3b5998)",
            color: "#fff",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            pt: "64px", // Use padding-top instead of margin-top
          },
        }}
      >
        <Box>
      <List>
  {["Dashboard", "Courses", "Manage Teachers"].map((text) => (
    <ListItem
      button
      key={text}
      onClick={() => {
        if (text === "Courses") navigate("/admin-view-courses");
        else if (text === "Manage Teachers") navigate("/adminviewteachers");
        else setSelectedSection(text);
      }}
      sx={{
        mb: 1,
        backgroundColor:
          selectedSection === text ? "rgba(255, 255, 255, 0.2)" : "transparent",
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.1)",
        },
      }}
    >
      <ListItemText
        primary={text}
        primaryTypographyProps={{
          fontSize: "18px",
          fontWeight: selectedSection === text ? "bold" : "normal",
        }}
      />
    </ListItem>
  ))}
</List>

        </Box>

        <Box>
          <Divider sx={{ backgroundColor: "#fff" }} />
          <ListItem
            button
            onClick={() => {
              navigate("/adminlogin");
              localStorage.removeItem("AdminName");
            }}
            sx={{ mt: 2 }}
          >
            <ListItemText
              primary="Logout"
              primaryTypographyProps={{ fontSize: "18px" }}
            />
          </ListItem>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, bgcolor: "#c0c9ffff", mt: "64px" }}
      >
        {selectedSection === "Dashboard" && (
          <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
  <Card
     sx={{
    backdropFilter: "blur(10px)",
    background: "rgba(255, 255, 255)",  // Transparent glass feel
    border: "2px solid rgba(30, 42, 94, 0.4)", // Blue-ish stroke
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
    color: "#1e2a5e",  // Dark text for readability
    textAlign: "center",
  }}
  >
    <CardContent>
      <Typography variant="h5" gutterBottom>
        Total Teachers
      </Typography>
      <Typography variant="h3">{totalTeachers}</Typography>
    </CardContent>
  </Card>
</Grid>

<Grid item xs={12} sm={6} md={4}>
  <Card
     sx={{
    backdropFilter: "blur(10px)",
    background: "rgba(255, 255, 255)",  // Transparent glass feel
    border: "2px solid rgba(30, 42, 94, 0.4)", // Blue-ish stroke
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
    color: "#1e2a5e",  // Dark text for readability
    textAlign: "center",
  }}
  >
    <CardContent>
      <Typography variant="h5" gutterBottom>
        Total Students
      </Typography>
      <Typography variant="h3">{totalStudents}</Typography>
    </CardContent>
  </Card>
</Grid>

          </Grid>
        )}

        {selectedSection === "Courses" && (
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              mt: 3,
            }}
          >
            <Button
              variant="contained"
              sx={{
                background: "linear-gradient(to right, #1d2f81, #3b5998)",
                color: "#fff",
                px: 4,
                py: 1,
                fontWeight: "bold",
                "&:hover": {
                  background: "linear-gradient(to right, #3b5998, #1d2f81)",
                },
              }}
              onClick={() => navigate("/admin-view-courses")}
            >
              View Courses
            </Button>
          </Box>
        )}

       

        {selectedSection === "Profile" && (
          <Typography variant="h5">Profile Section (Coming Soon)</Typography>
        )}
      </Box>
    </Box>
  );
}

export default AdminInterface;
