import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Alerts", path: "/alerts" },
    { label: "Inventory", path: "/inventory" },
    { label: "Coordination", path: "/coordination" },
    { label: "Volunteer", path: "/volunteer" },
    { label: "Ask AI", path: "/ask-ai" },
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: "#6a1b9a" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Disaster Response Dashboard
        </Typography>
        {navLinks.map((link) => (
          <Button key={link.path} color="inherit" component={Link} to={link.path}>
            {link.label}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
