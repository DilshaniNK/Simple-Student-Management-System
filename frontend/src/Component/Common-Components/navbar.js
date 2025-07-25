// AdminNavbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function AdminNavbar({ onProfileClick }) {
  return (
    <AppBar position="fixed" sx={{ background: "#f1f3faff", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ minHeight: "100px", px: 5 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <span style={{ color: "#1E2A5E", fontSize: "40px", fontWeight: "bold" }}>Chalkboard </span>
          <span style={{ color: "gray", fontSize: "40px", fontWeight: "regular" }}>LMS</span>
        </Typography>
        <Button sx={{ color: "#1E2A5E", fontWeight: "bold" }} onClick={onProfileClick}>
          Profile
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default AdminNavbar;
