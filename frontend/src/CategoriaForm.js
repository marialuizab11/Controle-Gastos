import React, { useState } from "react";
import axios from "axios";
import Form from "./components/Form";

/**
 * Formulário para cadastrar nova categoria.
 * - Usa o componente reutilizável Form.
 * - Faz POST para o backend ao submeter.
 * - Dispara evento para atualizar listas após cadastro.
 */
export default function CategoriaForm() {
  // Estado do campo e do botão
  const [nome, setNome] = useState("");
  const [loading, setLoading] = useState(false);

  // Handler de envio do formulário
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      // Envia nova categoria para o backend
      await axios.post("http://localhost:8000/categorias", { nome });
      setNome(""); // Limpa campo
      // Dispara evento para atualizar listas
      window.dispatchEvent(new Event("categoriasUpdated"));
    } catch (err) {
      alert("Erro ao criar categoria");
    }
    setLoading(false);
  }

  return (
    <Form
      fields={[
        {
          label: "Nome da Categoria",
          value: nome,
          onChange: e => setNome(e.target.value),
          required: true,
          size: "small"
        }
      ]}
      onSubmit={handleSubmit}
      loading={loading}
      submitLabel="Adicionar"
    />
  );
}
