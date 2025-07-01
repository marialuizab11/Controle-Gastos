import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import axios from "axios";

export default function CategoriaForm() {
  const [nome, setNome] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:8000/categorias", { nome });
      setNome("");
      window.dispatchEvent(new Event("categoriasUpdated"));
    } catch (err) {
      alert("Erro ao criar categoria");
    }
    setLoading(false);
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2, display: "flex", gap: 2 }}>
      <TextField
        label="Nome da Categoria"
        value={nome}
        onChange={e => setNome(e.target.value)}
        required
        size="small"
      />
      <Button type="submit" variant="contained" disabled={loading}>
        Adicionar
      </Button>
    </Box>
  );
}
