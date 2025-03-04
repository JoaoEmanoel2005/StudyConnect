const express = require('express');
const router = express.Router();

module.exports = function(connection) {
  // Buscar todos os usuários
  router.get('/todos', (req, res) => {
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
  router.get('/:id', (req, res) => {
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
  router.post('/cadastro', (req, res) => {
    // Validar requisição
    if (!req.body) {
      res.status(400).send({
        message: "O conteúdo não pode estar vazio!"
      });
      return;
    }

    // Criar um usuário
    const user = {
      nome: req.body.nome,
      email: req.body.email,
      senha: req.body.senha,
      cpf: req.body.cpf,
      codigo_recuperacao: req.body.codigo_recuperacao,
      nascimento: req.body.nascimento,
      cidade: req.body.cidade, 
    };

/*

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    codigo_recuperacao VARCHAR(50),
    nascimento DATE,
    cidade VARCHAR(100),
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

*/

    // Inserir no banco de dados
    connection.query('INSERT INTO usuarios SET ?', user, (err, result) => {
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
  router.put('/atualizar/:id', (req, res) => {
    // Validar requisição
    if (!req.body) {
      res.status(400).send({
        message: "O conteúdo não pode estar vazio!"
      });
      return;
    }

    connection.query(
      'UPDATE usuarios SET nome = ?, email = ?, senha = ?, cpf = ?, codigo_recuperacao = ?, nascimento = ?, cidade = ? WHERE id = ?', 
      [req.body.nome, req.body.email, req.body.senha, req.body.cpf, req.body.codigo_recuperacao, req.body.nascimento, req.body.cidade, req.params.id
      ],
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
  router.delete('/deletar/:id', (req, res) => {
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

  return router;
};