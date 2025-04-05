import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { getInventory, addInventoryItem } from "../api";

const Inventory = () => {
  const [resources, setResources] = useState([]);
  const [filter, setFilter] = useState("");
  const [newItem, setNewItem] = useState({ name: "", quantity: "" });

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    const data = await getInventory();
    setResources(data);
  };

  const handleAdd = async () => {
    if (!newItem.name || !newItem.quantity) return;

    const item = {
      name: newItem.name,
      quantity: parseInt(newItem.quantity),
    };

    await addInventoryItem(item);
    setResources([...resources, item]);
    setNewItem({ name: "", quantity: "" });
  };

  const filteredResources = resources.filter((res) =>
    res.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Container style={{ marginTop: 20 }}>
      <Typography variant="h4" gutterBottom>
        Resource Inventory
      </Typography>

      <TextField
        label="Search Resource"
        variant="outlined"
        fullWidth
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ marginBottom: 15 }}
      />

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item Name</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredResources.map((resource, idx) => (
              <TableRow
                key={idx}
                style={{
                  backgroundColor: resource.quantity < 100 ? "#ffebee" : "inherit",
                }}
              >
                <TableCell>{resource.name}</TableCell>
                <TableCell>{resource.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Typography variant="h6" style={{ marginTop: 30 }}>
        Add New Item
      </Typography>
      <TextField
        label="Item Name"
        variant="outlined"
        fullWidth
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        style={{ marginTop: 10 }}
      />
      <TextField
        label="Quantity"
        type="number"
        variant="outlined"
        fullWidth
        value={newItem.quantity}
        onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
        style={{ marginTop: 10 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAdd}
        style={{ marginTop: 10 }}
      >
        Add Resource
      </Button>
    </Container>
  );
};

export default Inventory;
