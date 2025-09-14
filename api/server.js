const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors()); // Libera o acesso para todas as origens
app.use(express.json());

// Rotas
const usuarioRoutes = require('./routes/usuarioRoutes');
app.use('/api/usuarios', usuarioRoutes);

const instituicaoRoutes = require('./routes/instituicaoRoutes');
app.use('/api/instituicoes', instituicaoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
  console.log("http://localhost:3000");
});
