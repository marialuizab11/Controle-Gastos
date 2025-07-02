import React from "react";
import { Container, Typography, Box, Paper, Tabs, Tab } from "@mui/material";
import CategoriaForm from "./CategoriaForm";
import CategoriaList from "./CategoriaList";
import DespesaForm from "./DespesaForm";
import DespesaList from "./DespesaList";

export default function App() {
  const [tab, setTab] = React.useState(0);
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Controle de Gastos
        </Typography>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} centered sx={{ mb: 2 }}>
          <Tab label="Categorias" />
          <Tab label="Despesas" />
        </Tabs>
        <Box hidden={tab !== 0}>
          <CategoriaForm />
          <CategoriaList />
        </Box>
        <Box hidden={tab !== 1}>
          <DespesaForm />
          <DespesaList />
        </Box>
      </Paper>
    </Container>
  );
}
