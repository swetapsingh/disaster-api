import React from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Chip,
  Stack,
} from "@mui/material";

const Coordination = () => {
  const teams = [
    { name: "Medical Team", status: "Dispatched" },
    { name: "Rescue Team", status: "En Route" },
    { name: "Food & Water Supply", status: "Pending Approval" },
    { name: "Logistics Team", status: "Standby" },
  ];

  const getColor = (status) => {
    switch (status) {
      case "Dispatched":
        return "success";
      case "En Route":
        return "warning";
      case "Pending Approval":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Container style={{ marginTop: 20 }}>
      <Typography variant="h4" gutterBottom>
        Disaster Response Coordination
      </Typography>
      <Paper style={{ padding: 20 }}>
        <List>
          {teams.map((team, index) => (
            <ListItem key={index}>
              <ListItemText primary={team.name} />
              <Chip label={team.status} color={getColor(team.status)} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default Coordination;
