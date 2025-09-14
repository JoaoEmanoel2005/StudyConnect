const express = require('express');
const dotenv = require('dotenv');
const usuarioRoutes = require('./routes/usuarioRoutes');
const instituicaoRoutes = require('./routes/instituicaoRoutes');

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/instituicoes', instituicaoRoutes);

module.exports = app;
