import React, { useState } from "react";
import { TextField, Button, Container, Typography, CircularProgress } from "@mui/material";
import axios from "axios";
import ResponseDisplay from "../components/ResponseDisplay";

const AskAI = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await axios.post("http://127.0.0.1:8000/ask-ai", { query });
      setResponse(res.data.answer);
    } catch (err) {
      setResponse("Error getting AI response.");
    }
    setLoading(false);
  };

  return (
    <Container style={{ marginTop: 20 }}>
      <Typography variant="h4" gutterBottom>Ask AI</Typography>
      <TextField
        fullWidth
        label="Type your query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ marginBottom: 10 }}
      />
      <Button variant="contained" color="primary" onClick={handleAsk}>Ask</Button>
      {loading && <CircularProgress style={{ marginTop: 20 }} />}
      <ResponseDisplay response={response} />
    </Container>
  );
};

export default AskAI;
