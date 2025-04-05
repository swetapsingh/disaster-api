import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  CircularProgress,
  Divider,
  Chip,
} from "@mui/material";
import { fetchWeatherAlerts } from "../api";

// Coordinates for key cities (add as needed)
const locations = [
  { name: "Delhi", lat: 28.6139, lon: 77.209 },
  { name: "Kerala", lat: 10.8505, lon: 76.2711 },
  { name: "Mumbai", lat: 19.076, lon: 72.8777 },
];

const formatTime = (unix) => {
  return new Date(unix * 1000).toLocaleString();
};

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllAlerts = async () => {
      setLoading(true);
      let allAlerts = [];

      for (let loc of locations) {
        const data = await fetchWeatherAlerts(loc.lat, loc.lon);
        const formatted = data.map((alert) => ({
          location: loc.name,
          type: alert.event,
          severity: alert.severity || "Unknown",
          description: alert.description,
          start: alert.start,
          end: alert.end,
          sender: alert.sender_name || "Unknown Agency",
        }));
        allAlerts = [...allAlerts, ...formatted];
      }

      setAlerts(allAlerts);
      setLoading(false);
    };

    fetchAllAlerts();
  }, []);

  return (
    <Container style={{ marginTop: 20 }}>
      <Typography variant="h4" gutterBottom>
        🚨 Real-Time Disaster Alerts
      </Typography>
      <Paper style={{ padding: 20 }}>
        {loading ? (
          <CircularProgress />
        ) : alerts.length === 0 ? (
          <Typography>No current alerts 🌤️</Typography>
        ) : (
          <List>
            {alerts.map((alert, index) => (
              <React.Fragment key={index}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={
                      <>
                        <Typography variant="h6">
                          ⚠️ {alert.type} in {alert.location}
                        </Typography>
                        <Chip
                          label={`Severity: ${alert.severity}`}
                          color={
                            alert.severity === "Extreme"
                              ? "error"
                              : alert.severity === "Severe"
                              ? "warning"
                              : "default"
                          }
                          style={{ marginTop: 5 }}
                        />
                      </>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" style={{ marginTop: 5 }}>
                          📝 <strong>Description:</strong> {alert.description}
                        </Typography>
                        <Typography variant="body2" style={{ marginTop: 5 }}>
                          🕒 <strong>From:</strong> {formatTime(alert.start)}{" "}
                          <strong>To:</strong> {formatTime(alert.end)}
                        </Typography>
                        <Typography variant="body2" style={{ marginTop: 5 }}>
                          🏢 <strong>Issued by:</strong> {alert.sender}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                {index < alerts.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}
      </Paper>
    </Container>
  );
};

export default Alerts;
