import React from "react";
import { Container, Paper, Typography, IconButton, Tooltip } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { marked } from "marked";

const ResponseDisplay = ({ response }) => {
  const handleCopy = () => navigator.clipboard.writeText(response);

  const getFormattedResponse = () => {
    if (!response) return "";
    return marked.parse(response);
  };

  return (
    <Container>
      {response && (
        <Paper style={{ padding: 20, marginTop: 20 }}>
          <Typography variant="h6" gutterBottom>
            AI Response:
            <Tooltip title="Copy to Clipboard">
              <IconButton onClick={handleCopy} size="small" style={{ marginLeft: 10 }}>
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Typography>
          <div
            className="markdown-content"
            dangerouslySetInnerHTML={{ __html: getFormattedResponse() }}
          />
        </Paper>
      )}
    </Container>
  );
};

export default ResponseDisplay;
