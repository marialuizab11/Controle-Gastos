import React from "react";
import { Box, TextField, Button, MenuItem } from "@mui/material";

/**
 * Componente de formulário reutilizável para React + Material UI.
 *
 * Props:
 * - fields: Array de objetos descrevendo cada campo do formulário.
 *     Cada campo pode ter:
 *       - label: string (texto do label)
 *       - value: valor do campo
 *       - onChange: função chamada ao alterar o campo
 *       - required: boolean (se é obrigatório)
 *       - size: string (tamanho do campo, ex: 'small')
 *       - type: string (tipo do input, ex: 'text', 'number', 'date')
 *       - inputProps: props extras para o input
 *       - InputLabelProps: props extras para o label
 *       - select: boolean (se é um campo select)
 *       - options: array de opções para selects ({value, label})
 *       - sx/style/fullWidth/margin: estilos e props extras
 * - onSubmit: função chamada ao enviar o formulário
 * - loading: boolean, desabilita o botão ao enviar
 * - submitLabel: texto do botão de submit
 */
export default function Form({ fields, onSubmit, loading, submitLabel }) {
  return (
    // Box do Material UI para organizar o layout do formulário
    <Box component="form" onSubmit={onSubmit} sx={{ mb: 2, display: "flex", gap: 2, flexWrap: "wrap" }}>
      {/* Renderiza dinamicamente cada campo do formulário */}
      {fields.map((field, idx) => {
        // Campo do tipo select (dropdown)
        if (field.select) {
          return (
            <TextField
              key={idx}
              select
              label={field.label}
              value={field.value}
              onChange={field.onChange}
              required={field.required}
              size={field.size || "small"}
              sx={field.sx}
              style={field.style}
              fullWidth={field.fullWidth}
            >
              {/* Renderiza as opções do select */}
              {field.options && field.options.map(opt => (
                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
              ))}
            </TextField>
          );
        }
        // Campo padrão (text, number, date, etc)
        return (
          <TextField
            key={idx}
            label={field.label}
            value={field.value}
            onChange={field.onChange}
            required={field.required}
            size={field.size || "small"}
            type={field.type}
            inputProps={field.inputProps}
            InputLabelProps={field.InputLabelProps}
            sx={field.sx}
            style={field.style}
            fullWidth={field.fullWidth}
            margin={field.margin}
          />
        );
      })}
      {/* Botão de submit do formulário */}
      <Button type="submit" variant="contained" disabled={loading}>
        {submitLabel}
      </Button>
    </Box>
  );
}
