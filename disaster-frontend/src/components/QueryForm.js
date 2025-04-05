import React, { useState } from "react";
import { TextField, Button, Container, CircularProgress } from "@mui/material";
import axios from "axios";

const QueryForm = ({ onResponse }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await axios.post("http://127.0.0.1:8000/ask", {
        query,
      });
      onResponse(res.data.response || "No response received.");
    } catch (error) {
      console.error("Error:", error);
      onResponse("Error contacting AI service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={{ marginTop: 20 }}>
      <TextField
        fullWidth
        label="Ask AI about a disaster situation"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ marginBottom: 10 }}
        multiline
        rows={4}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
        {loading ? <CircularProgress size={24} color="inherit" /> : "Get AI Response"}
      </Button>
    </Container>
  );
};

export default QueryForm;
