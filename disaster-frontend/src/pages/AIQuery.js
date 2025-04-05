import React, { useState } from "react";
import { Container, Typography, TextField, Button, Paper, CircularProgress } from "@mui/material";

const AIQuery = () => {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/ask?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      setAnswer(data.response || "No response received.");
    } catch (error) {
      setAnswer("Error fetching response from AI.");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={{ marginTop: 20 }}>
      <Typography variant="h4" gutterBottom>
        Ask Gemini AI (Disaster-Related)
      </Typography>

      <TextField
        label="Enter your question"
        fullWidth
        multiline
        rows={4}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ marginBottom: 10 }}
      />

      <Button variant="contained" color="secondary" onClick={handleSubmit} disabled={loading}>
        {loading ? <CircularProgress size={24} color="inherit" /> : "Ask"}
      </Button>

      {answer && (
        <Paper style={{ marginTop: 20, padding: 15 }}>
          <Typography variant="h6">AI Response:</Typography>
          <Typography component="div" dangerouslySetInnerHTML={{ __html: answer }} />
        </Paper>
      )}
    </Container>
  );
};

export default AIQuery;
