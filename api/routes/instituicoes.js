const express = require('express');
const router = express.Router();

module.exports = function(connection) {

    router.post('/cadastro', (req, res) => {
        // Validar requisição
        if (!req.body) {
          res.status(400).send({
            message: "O conteúdo não pode estar vazio!"
          });
          return;
        }
    
        // Criar um usuário
        const instituicao = {
          nome: req.body.nome,
          endereco: req.body.endereco,
          descricao: req.body.descricao,
          tipo: req.body.tipo,
        };
    
    /*
    
   CREATE TABLE instituicao (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100) NOT NULL UNIQUE,
        endereco VARCHAR(100) NOT NULL UNIQUE,
        descricao VARCHAR(255) NOT NULL,
        tipo VARCHAR(50) NOT NULL,
        data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    */
    
        // Inserir no banco de dados
        connection.query('INSERT INTO instituicao SET ?', instituicao, (err, result) => {
          if (err) {
            res.status(500).send({
              message: err.message || "Ocorreu um erro ao criar o usuário."
            });
            return;
          }
          
          res.send({
            id: result.insertId,
            ...instituicao
          });
        });
      });

      router.get('/todos', (req, res) => {
        connection.query('SELECT * FROM instituicao', (err, results) => {
          if (err) {
            res.status(500).send({
              message: err.message || "Ocorreu um erro ao buscar os usuários."
            });
            return;
          }
          res.send(results);
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
      'UPDATE instituicao SET nome = ?, endereco = ?, descricao = ?, tipo = ? WHERE id = ?', 
      [req.body.nome, req.body.endereco, req.body.descricao, req.body.tipo, req.params.id
      ],
      (err, result) => {
        if (err) {
          res.status(500).send({
            message: err.message || `Erro ao atualizar instituicao com id ${req.params.id}`
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





    return router;
};