const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Carregar variáveis de ambiente
dotenv.config();

// Criar aplicação Express
const app = express();

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

// Configuração do Swagger
const options = {
  swaggerDefinition: {
    info: {
      title: 'Minha API',
      version: '1.0.0',
      description: 'Documentação da minha API',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
      },
    ],
  },
  apis: ['./routes/*.js'], // Ajuste o caminho conforme as rotas que você tem
};

const specs = swaggerJsdoc(options);

// Rota de documentação do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Rota inicial
app.get('/', (req, res) => {
  res.json({ message: 'Bem-vindo à API!' });
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
app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});
