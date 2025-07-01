import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Paper } from "@mui/material";
import axios from "axios";

export default function CategoriaList() {
  const [categorias, setCategorias] = useState([]);

  function fetchCategorias() {
    axios.get("http://localhost:8000/categorias").then(res => {
      setCategorias(res.data);
    });
  }

  useEffect(() => {
    fetchCategorias();
    window.addEventListener("categoriasUpdated", fetchCategorias);
    return () => window.removeEventListener("categoriasUpdated", fetchCategorias);
  }, []);

  return (
    <Paper sx={{ mb: 2, maxHeight: 200, overflow: "auto" }}>
      <List>
        {categorias.map(cat => (
          <ListItem key={cat.id}>
            <ListItemText primary={cat.nome} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
