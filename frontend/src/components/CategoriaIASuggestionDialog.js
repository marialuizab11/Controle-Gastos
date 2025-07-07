import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

export default function CategoriaIASuggestionDialog({ open, onClose, categoria, loading }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Sugestão de Categoria pela IA</DialogTitle>
      <DialogContent>
        {loading ? (
          <DialogContentText>Consultando a IA...</DialogContentText>
        ) : categoria ? (
          <DialogContentText>
            A categoria da despesa é: <b>{categoria}</b>
          </DialogContentText>
        ) : (
          <DialogContentText>Preencha descrição e valor, e clique no botão para consultar a IA.</DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Fechar</Button>
      </DialogActions>
    </Dialog>
  );
}
