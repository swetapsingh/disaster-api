import React from "react";
import { Container, Typography, Paper } from "@mui/material";

const Home = () => {
  return (
    <Container style={{ marginTop: 20, maxWidth: "800px" }}>
      <Paper style={{ padding: 30 }}>
        <Typography variant="h3" gutterBottom>
          🧭 Welcome to the Disaster Management Dashboard
        </Typography>
        <Typography variant="body1">
          A centralized platform to monitor disaster alerts, manage resources,
          coordinate teams, and utilize AI to assist in decision-making during
          critical moments. Built for hackathons, driven by purpose.
        </Typography>
      </Paper>
    </Container>
  );
};

export default Home;
