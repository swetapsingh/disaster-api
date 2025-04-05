import React from "react";
import { Container, Grid, Paper, Typography } from "@mui/material";

const Dashboard = () => {
  const alerts = ["🚨 Flood in Kerala"];
  const resourcesStatus = "🩺 Medical Supplies: 80%";
  const responseEfforts = "🚑 Rescue Teams Dispatched";

  return (
    <Container style={{ marginTop: 20 }}>
      <Typography variant="h4" gutterBottom>
        Overview
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper style={{ padding: 20, backgroundColor: "#ffebee" }}>
            <Typography variant="h6" color="error">
              Current Disaster Alerts
            </Typography>
            {alerts.map((alert, i) => (
              <Typography key={i}>{alert}</Typography>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper style={{ padding: 20, backgroundColor: "#e8f5e9" }}>
            <Typography variant="h6" color="primary">
              Resource Availability
            </Typography>
            <Typography>{resourcesStatus}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper style={{ padding: 20, backgroundColor: "#e3f2fd" }}>
            <Typography variant="h6">Ongoing Response Efforts</Typography>
            <Typography>{responseEfforts}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
