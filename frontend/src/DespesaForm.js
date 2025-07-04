import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "./components/Form";

/**
 * Formulário para cadastrar nova despesa.
 * - Usa o componente reutilizável Form.
 * - Busca categorias para o select.
 * - Faz POST para o backend ao submeter.
 * - Dispara evento para atualizar listas após cadastro.
 */
export default function DespesaForm() {
  // Estados dos campos do formulário
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [data, setData] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);

  // Busca categorias do backend
  function fetchCategorias() {
    axios.get("http://localhost:8000/categorias").then(res => setCategorias(res.data));
  }

  // Atualiza categorias ao montar e quando houver mudanças
  useEffect(() => {
    fetchCategorias();
    window.addEventListener("categoriasUpdated", fetchCategorias);
    return () => window.removeEventListener("categoriasUpdated", fetchCategorias);
  }, []);

  // Handler de envio do formulário
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      // Envia nova despesa para o backend
      await axios.post("http://localhost:8000/despesas", {
        descricao,
        valor: parseFloat(valor),
        data,
        categoria_id: Number(categoriaId)
      });
      // Limpa campos
      setDescricao("");
      setValor("");
      setData("");
      setCategoriaId("");
      // Dispara evento para atualizar listas
      window.dispatchEvent(new Event("despesasUpdated"));
    } catch (err) {
      alert("Erro ao criar despesa");
    }
    setLoading(false);
  }

  return (
    <Form
      fields={[
        {
          label: "Descrição",
          value: descricao,
          onChange: e => setDescricao(e.target.value),
          required: true,
          size: "small"
        },
        {
          label: "Valor",
          value: valor,
          onChange: e => setValor(e.target.value),
          required: true,
          size: "small",
          type: "number",
          inputProps: { step: "0.01" }
        },
        {
          label: "Data",
          value: data,
          onChange: e => setData(e.target.value),
          required: true,
          size: "small",
          type: "date",
          InputLabelProps: { shrink: true }
        },
        {
          select: true,
          label: "Categoria",
          value: categoriaId,
          onChange: e => setCategoriaId(e.target.value),
          required: true,
          size: "small",
          sx: { minWidth: 120 },
          options: categorias.map(cat => ({ value: cat.id, label: cat.nome }))
        }
      ]}
      onSubmit={handleSubmit}
      loading={loading}
      submitLabel="Adicionar"
    />
  );
}
