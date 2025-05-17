const express = require('express');
const router = express.Router();
const { encrypt, comcrypt } = require("../utils/bcrypt");
const jwt = require('jsonwebtoken');
const { verificarToken } = require('../utils/midle');

module.exports = function (connection) {
 


  // Buscar todos os usuários
  router.get('/todos', (req, res) => {  // Rota protegida
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

  router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

  

    try {
      const [results] = await connection.promise().query('SELECT * FROM users WHERE email = ?', [email]);

      if (results.length === 0) {
        return res.status(404).send({ message: "Email ou senha incorretos." });
      }

      const user = results[0];
      const isMatch = await comcrypt(senha, user.senha);

      if (!isMatch) {
        return res.status(401).send({ message: "Email ou senha incorretos." });
      }

      
      
      const token = jwt.sign({
        id: user.id,
      }, process.env.SECRET, {
        expiresIn: 600 // 5 minutos ou 300 segundos
      });

      return res.json({
        auth: true,
        token: token,
        expiresIn: 600
      });

    } catch (err) {
      return res.status(500).send({
        message: err.message || "Erro ao processar a requisição."
      });
    }
  });

  // Rota de logout
  router.post('/logout', (req, res) => {
    
    res.json({ message: "Logout bem-sucedido", auth: false, token: null });
  });

  router.get('/perfil', verificarToken, async (req, res) => {
    try {
      const userId = req.userId;

      const [results] = await connection.promise().query('SELECT * FROM users WHERE id = ?', [userId]);

      if (results.length === 0) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }

      const user = results[0];

      return res.json({
        message: 'Acesso autorizado à rota protegida!',
        user: user
      });

    } catch (err) {
      console.error('Erro no servidor:', err); // Log de erro
      return res.status(500).json({
        message: err.message || "Erro ao acessar a rota protegida."
      });
    }
  });



  // Criar um novo usuário
  router.post('/cadastro', async (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "O conteúdo não pode estar vazio!"
      });
      return;
    }

    try {
      const cripto_senha = await encrypt(req.body.senha);

      const user = {
        nome: req.body.nome,
        username: req.body.username,
        email: req.body.email,
        senha: cripto_senha,
        cpf: req.body.cpf,
        codigo_recuperacao: req.body.codigo_recuperacao,
        nascimento: req.body.nascimento,
        cidade: req.body.cidade,
        escolaridade: req.body.escolaridade,
      };

      connection.query('INSERT INTO users SET ?', user, (err, result) => {
        if (err) {
          res.status(500).send({
            message: err.message || "Ocorreu um erro ao criar o usuário."
          });
          return;
        }

        res.send({
          id: result.insertId,
          ...user,
          message: 'Usuário criado com sucesso!'
        });
      });
    } catch (error) {
      res.status(500).send({
        message: "Erro ao criptografar a senha: " + error.message
      });
    }
  });
  
  //    const cripto_senha = await encrypt(req.body.senha);
  
  // Atualizar um usuário
  router.put('/atualizar', verificarToken, async (req, res) => {
    const userId = req.userId;

    const {
      nome,
      username,
      email,
      senha,
      cpf,
      codigo_recuperacao,
      nascimento,
      cidade,
      escolaridade
    } = req.body;

    try {
      const cripto_senha = await encrypt(senha); // 🔒 Criptografando a senha

      const sql = `
            UPDATE users 
            SET 
                nome = ?, 
                username = ?, 
                email = ?, 
                senha = ?, 
                cpf = ?, 
                codigo_recuperacao = ?, 
                nascimento = ?, 
                cidade = ?, 
                escolaridade = ?
            WHERE id = ?
        `;

      const values = [
        nome,
        username,
        email,
        cripto_senha,
        cpf,
        codigo_recuperacao,
        nascimento,
        cidade,
        escolaridade,
        userId
      ];

      connection.query(sql, values, (err, result) => {
        if (err) {
          console.error('Erro ao atualizar usuário:', err);
          return res.status(500).json({ mensagem: 'Erro ao atualizar os dados.' });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
        }

        return res.status(200).json({ mensagem: 'Dados atualizados com sucesso.' });
      });
    } catch (error) {
      console.error('Erro ao criptografar senha:', error);
      return res.status(500).json({ mensagem: 'Erro ao processar a senha.' });
    }
  });

  // Excluir um usuário
  router.delete('/delete', (req, res) => {
    const { cpf } = req.body;

    if (!cpf) {
      return res.status(400).send({ message: 'CPF é obrigatório no corpo da requisição.' });
    }

    connection.query('DELETE FROM users WHERE cpf = ?', [cpf], (err, result) => {
      if (err) {
        return res.status(500).send({
          message: 'Erro ao tentar excluir o usuário.',
          error: err.message
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).send({ message: 'Usuário não encontrado com esse CPF.' });
      }

      res.send({ message: 'Usuário excluído com sucesso!' });
    });
  });



  return router;
};
