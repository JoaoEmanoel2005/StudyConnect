const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const dotenv = require('dotenv');

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

// Rota inicial
app.get('/', (req, res) => {
  res.json({ message: 'Bem-vindo à API!' });
});

// Rotas de usuários

// Buscar todos os usuários
app.get('/api/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Ocorreu um erro ao buscar os usuários."
      });
      return;
    }
    res.send(results);
  });
});

// Buscar usuário por ID
app.get('/api/users/:id', (req, res) => {
  connection.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, results) => {
    if (err) {
      res.status(500).send({
        message: err.message || `Erro ao buscar usuário com id ${req.params.id}`
      });
      return;
    }
    
    if (results.length === 0) {
      res.status(404).send({
        message: `Usuário com id ${req.params.id} não encontrado.`
      });
      return;
    }
    
    res.send(results[0]);
  });
});

// Criar um novo usuário
app.post('/api/users', (req, res) => {
  // Validar requisição
  if (!req.body) {
    res.status(400).send({
      message: "O conteúdo não pode estar vazio!"
    });
    return;
  }

  // Criar um usuário
  const user = {
    name: req.body.name,
    email: req.body.email,
    age: req.body.age
  };

  // Inserir no banco de dados
  connection.query('INSERT INTO users SET ?', user, (err, result) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Ocorreu um erro ao criar o usuário."
      });
      return;
    }
    
    res.send({
      id: result.insertId,
      ...user
    });
  });
});

// Atualizar um usuário
app.put('/api/users/:id', (req, res) => {
  // Validar requisição
  if (!req.body) {
    res.status(400).send({
      message: "O conteúdo não pode estar vazio!"
    });
    return;
  }

  connection.query(
    'UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?',
    [req.body.name, req.body.email, req.body.age, req.params.id],
    (err, result) => {
      if (err) {
        res.status(500).send({
          message: err.message || `Erro ao atualizar usuário com id ${req.params.id}`
        });
        return;
      }
      
      if (result.affectedRows === 0) {
        res.status(404).send({
          message: `Usuário com id ${req.params.id} não encontrado.`
        });
        return;
      }
      
      res.send({
        id: req.params.id,
        ...req.body
      });
    }
  );
});

// Excluir um usuário
app.delete('/api/users/:id', (req, res) => {
  connection.query('DELETE FROM users WHERE id = ?', [req.params.id], (err, result) => {
    if (err) {
      res.status(500).send({
        message: err.message || `Erro ao excluir usuário com id ${req.params.id}`
      });
      return;
    }
    
    if (result.affectedRows === 0) {
      res.status(404).send({
        message: `Usuário com id ${req.params.id} não encontrado.`
      });
      return;
    }
    
    res.send({ message: "Usuário excluído com sucesso!" });
  });
});

// Definir porta e iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});