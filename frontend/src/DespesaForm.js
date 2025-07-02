import React, { useState, useEffect } from "react";
import { Box, TextField, Button, MenuItem } from "@mui/material";
import axios from "axios";

export default function DespesaForm() {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [data, setData] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);

  function fetchCategorias() {
    axios.get("http://localhost:8000/categorias").then(res => setCategorias(res.data));
  }

  useEffect(() => {
    fetchCategorias();
    window.addEventListener("categoriasUpdated", fetchCategorias);
    return () => window.removeEventListener("categoriasUpdated", fetchCategorias);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:8000/despesas", {
        descricao,
        valor: parseFloat(valor),
        data,
        categoria_id: Number(categoriaId)
      });
      setDescricao("");
      setValor("");
      setData("");
      setCategoriaId("");
      window.dispatchEvent(new Event("despesasUpdated"));
    } catch (err) {
      alert("Erro ao criar despesa");
    }
    setLoading(false);
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2, display: "flex", gap: 2, flexWrap: "wrap" }}>
      <TextField
        label="Descrição"
        value={descricao}
        onChange={e => setDescricao(e.target.value)}
        required
        size="small"
      />
      <TextField
        label="Valor"
        value={valor}
        onChange={e => setValor(e.target.value)}
        required
        size="small"
        type="number"
        inputProps={{ step: "0.01" }}
      />
      <TextField
        label="Data"
        value={data}
        onChange={e => setData(e.target.value)}
        required
        size="small"
        type="date"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        select
        label="Categoria"
        value={categoriaId}
        onChange={e => setCategoriaId(e.target.value)}
        required
        size="small"
        sx={{ minWidth: 120 }}
      >
        {categorias.map(cat => (
          <MenuItem key={cat.id} value={cat.id}>{cat.nome}</MenuItem>
        ))}
      </TextField>
      <Button type="submit" variant="contained" disabled={loading}>
        Adicionar
      </Button>
    </Box>
  );
}
