import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Paper } from "@mui/material";
import axios from "axios";

export default function DespesaList() {
  const [despesas, setDespesas] = useState([]);

  //Transforma data aaaa-mm-dd para dd/mm/aaaa
  function formatDate (date) {
    if(!date) return '';
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }

  function fetchDespesas() {
    axios.get("http://localhost:8000/despesas").then(res => {
      const despesasFormatadas = res.data.map(desp => ({
        ...desp,
        data: formatDate(desp.data)
      }));
      setDespesas(despesasFormatadas);
    });
  }

  useEffect(() => {
    fetchDespesas();
    window.addEventListener("despesasUpdated", fetchDespesas);
    window.addEventListener("categoriasUpdated", fetchDespesas);
    return () => {
      window.removeEventListener("despesasUpdated", fetchDespesas);
      window.removeEventListener("categoriasUpdated", fetchDespesas);
    };
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
