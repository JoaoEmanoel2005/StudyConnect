const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');
require("dotenv-safe").config();



// Carregar variáveis de ambiente
dotenv.config();

// Criar aplicação Express
const app = express();

const path = require('path');



// Configurar middlewares
app.use(cors());
app.use(express.json()); // para analisar requisições com JSON
app.use(express.urlencoded({ extended: true })); // para analisar requisições url-encoded



// Configuração do banco de dados
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
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


// Rota padrão (localhost:3000) - Serve o arquivo index.html

// app.use(express.static(path.join(__dirname, '..', 'src', 'html')));
app.use(express.static(path.join(__dirname, '..', 'src', 'html', 'style')));
app.use(express.static(path.join(__dirname, '..', 'src', 'html', 'script')));

// Supondo que seu CSS e JS estejam em src/public/style e src/public/script

app.use('/style', express.static(path.join(__dirname, '..', 'src', 'html', 'style')));
app.use('/script', express.static(path.join(__dirname, '..', 'src', 'html', 'script')));


// app.use(express.static(path.join(__dirname, 'testes')));

// Rota padrão (localhost:3000) - Serve o arquivo index.html

app.get('/', (req, res) => {
  //res.sendFile(path.join(__dirname, 'testes', 'perfil.html'));
  res.sendFile(path.join(__dirname, 'testes', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'src', 'html', 'login.html'));
});

app.get('/cadastro', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'src', 'html', 'cadastro.html'));
});


app.get('/perfil', (req, res) => {
  //res.sendFile(path.join(__dirname, 'testes', 'perfil.html'));
  res.sendFile(path.join(__dirname, '..', 'src', 'html', 'perfil.html'));
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
