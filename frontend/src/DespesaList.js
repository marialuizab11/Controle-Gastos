import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Paper } from "@mui/material";
import axios from "axios";

export default function DespesaList() {
  const [despesas, setDespesas] = useState([]);

  function fetchDespesas() {
    axios.get("http://localhost:8000/despesas").then(res => {
      setDespesas(res.data);
    });
  }

  useEffect(() => {
    fetchDespesas();
    window.addEventListener("despesasUpdated", fetchDespesas);
    return () => window.removeEventListener("despesasUpdated", fetchDespesas);
  }, []);

  return (
    <Paper sx={{ mb: 2, maxHeight: 250, overflow: "auto" }}>
      <List>
        {despesas.map(desp => (
          <ListItem key={desp.id}>
            <ListItemText
              primary={`${desp.descricao} - R$ ${Number(desp.valor).toFixed(2)}`}
              secondary={`Data: ${desp.data} | Categoria: ${desp.categoria?.nome || ""}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
