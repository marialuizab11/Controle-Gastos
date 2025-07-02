import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Paper, IconButton, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button, Snackbar, Alert } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from "axios";
import CategoriaEditDialog from "./CategoriaEditDialog";

export default function CategoriaList() {
  const [categorias, setCategorias] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCategoria, setSelectedCategoria] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

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

  // Menu de ações
  const handleMenuClick = (event, categoria) => {
    setAnchorEl(event.currentTarget);
    setSelectedCategoria(categoria);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  // Editar
  const handleEdit = () => {
    setEditOpen(true);
    handleMenuClose();
  };
  // Deletar
  const handleDelete = () => {
    setDeleteDialogOpen(true);
    handleMenuClose();
  };
  const handleDeleteConfirm = async () => {
    setDeleteLoading(true);
    try {
      await axios.delete(`http://localhost:8000/categorias/${selectedCategoria.id}`);
      setDeleteSuccess(true);
      window.dispatchEvent(new Event("categoriasUpdated"));
    } catch {
      alert("Erro ao excluir categoria");
    }
    setDeleteLoading(false);
    setDeleteDialogOpen(false);
  };
  return (
    <Paper sx={{ mb: 2, maxHeight: 200, overflow: "auto" }}>
      <List>
        {categorias.map(cat => (
          <ListItem key={cat.id} secondaryAction={
            <IconButton edge="end" onClick={e => handleMenuClick(e, cat)}>
              <MoreVertIcon />
            </IconButton>
          }>
            <ListItemText primary={cat.nome} />
          </ListItem>
        ))}
      </List>
      {/* Menu de ações */}
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleMenuClose}>
        <MenuItem onClick={handleEdit}>Editar</MenuItem>
        <MenuItem onClick={handleDelete}>Deletar</MenuItem>
      </Menu>
      {/* Dialog de editar */}
      <CategoriaEditDialog open={editOpen} onClose={() => setEditOpen(false)} categoria={selectedCategoria} onUpdated={fetchCategorias} />
      {/* Dialog de deletar */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Tem certeza que quer deletar a categoria &quot;{selectedCategoria?.nome}&quot;?</DialogTitle>
        <DialogContent>
          Essa ação não pode ser desfeita.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} disabled={deleteLoading}>Cancelar</Button>
          <Button color="error" variant="contained" onClick={handleDeleteConfirm} disabled={deleteLoading}>Excluir</Button>
        </DialogActions>
      </Dialog>
      {/* Snackbar de sucesso */}
      <Snackbar open={deleteSuccess} autoHideDuration={2500} onClose={() => setDeleteSuccess(false)}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Categoria excluída com sucesso
        </Alert>
      </Snackbar>
    </Paper>
  );
}
