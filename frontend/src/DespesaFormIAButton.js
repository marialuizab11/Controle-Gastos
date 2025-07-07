import React, { useState } from "react";
import Button from "@mui/material/Button";
import CategoriaIASuggestionDialog from "./components/CategoriaIASuggestionDialog";
import axios from "axios";

export default function DespesaFormIAButton({ descricao, valor }) {
  const [open, setOpen] = useState(false);
  const [categoria, setCategoria] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAskIA = async () => {
    setOpen(true);
    setCategoria("");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/despesas/sugestaoCategoriaIA", {
        descricao,
        valor: parseFloat(valor)
      });
      setCategoria(res.data.categoria_sugerida);
    } catch (err) {
      setCategoria("Erro ao consultar IA");
    }
    setLoading(false);
  };

  return (
    <>
      <Button variant="outlined" color="secondary" onClick={handleAskIA} disabled={!descricao || !valor} sx={{ ml: 2 }}>
        Pergunte à IA
      </Button>
      <CategoriaIASuggestionDialog
        open={open}
        onClose={() => setOpen(false)}
        categoria={categoria}
        loading={loading}
      />
    </>
  );
}
