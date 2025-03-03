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
  router.put('/atualizar/:id', (req, res) => {
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