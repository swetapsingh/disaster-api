import React, { useState } from "react";
import { TextField, Button, Container, Typography, Snackbar } from "@mui/material";
import axios from "axios";

const RegisterVolunteer = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleRegister = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/volunteer", { name, contact });
      setSnackbarOpen(true);
      setName("");
      setContact("");
    } catch (error) {
      console.error("Failed to register volunteer:", error);
    }
  };

  return (
    <Container style={{ marginTop: 20 }}>
      <Typography variant="h4" gutterBottom>
        Volunteer Registration
      </Typography>
      <TextField
        fullWidth
        label="Full Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginBottom: 10 }}
      />
      <TextField
        fullWidth
        label="Contact Number"
        variant="outlined"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        style={{ marginBottom: 10 }}
      />
      <Button variant="contained" color="primary" onClick={handleRegister}>
        Register
      </Button>

      <Snackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        autoHideDuration={3000}
        message="Volunteer Registered!"
      />
    </Container>
  );
};

export default RegisterVolunteer;
