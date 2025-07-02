import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Snackbar, Alert } from "@mui/material";
import axios from "axios";

export default function CategoriaEditDialog({ open, onClose, categoria, onUpdated }) {
  const [nome, setNome] = useState(categoria ? categoria.nome : "");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  React.useEffect(() => {
    setNome(categoria ? categoria.nome : "");
  }, [categoria]);

  async function handleSave() {
    setLoading(true);
    try {
      await axios.patch(`http://localhost:8000/categorias/${categoria.id}`, { nome });
      setShowSuccess(true);
      if (onUpdated) onUpdated();
      window.dispatchEvent(new Event("categoriasUpdated"));
      onClose();
    } catch {
      alert("Erro ao editar categoria");
    }
    setLoading(false);
  }

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Editar Categoria</DialogTitle>
        <DialogContent>
          <TextField
  label="Nome da Categoria"
  value={nome}
  onChange={e => setNome(e.target.value)}
  fullWidth
  autoFocus
  margin="normal"
/>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={loading}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained" disabled={loading || !nome}>Salvar</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={showSuccess} autoHideDuration={2500} onClose={() => setShowSuccess(false)}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Categoria editada com sucesso
        </Alert>
      </Snackbar>
    </>
  );
}
