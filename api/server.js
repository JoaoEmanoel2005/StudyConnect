const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');


// Carregar variáveis de ambiente
dotenv.config();

// Criar aplicação Express
const app = express();

const path = require('path');

/*

app.use(express.static(path.join(__dirname, '..', 'src', 'html')));

isto serve para mim puxar os html la do src

// Rota padrão (localhost:3000) - Serve o arquivo index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'src', 'html', 'index.html'));
});

isto faz com q o html index seja o primeiro a aparecer quando inicar a API

*/


// Configurar middlewares
app.use(cors());
app.use(express.json()); // para analisar requisições com JSON
app.use(express.urlencoded({ extended: true })); // para analisar requisições url-encoded

// Configuração do banco de dados
const connection = mysql.createConnection({
  host: process.env.DB_HOST || '127.1.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'minha_api_db'
});

// Conectar ao banco de dados
connection.connect(error => {
  if (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    return;
  }
  console.log('Conexão com o banco de dados MySQL estabelecida com sucesso!');
});

// Rota inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'teste.html'));
});

// Importar e configurar rotas
const userRoutes = require('./routes/users')(connection);
app.use('/users', userRoutes);

const instituicoesRoutes = require('./routes/instituicoes')(connection);
app.use('/instituicoes', instituicoesRoutes);

const vestibularRoutes = require('./routes/vestibular')(connection);
app.use('/vestibular', vestibularRoutes);

const cursosRoutes = require('./routes/cursos')(connection);
app.use('/cursos', cursosRoutes);

// Definir porta e iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});
