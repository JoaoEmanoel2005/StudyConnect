const express = require('express');
const router = express.Router();
const { encrypt, comcrypt } = require("../utils/bcrypt");
const jwt = require('jsonwebtoken');
const { verificarToken } = require('../utils/midle');

module.exports = function(connection) {
  // Middleware para verificar se o usuário está autenticado

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
      },process.env.SECRET, {
        expiresIn: 300 // 5 minutos ou 300 segundos
      });
  
      return res.json({
        auth: true,
        token: token,
        expiresIn: 300
      });
  
    } catch (err) {
      return res.status(500).send({
        message: err.message || "Erro ao processar a requisição."
      });
    }
  });
  
  // Rota de logout
router.post('/logout', (req, res) => {
  // Aqui você não precisa fazer nada com o token no servidor, apenas retorna um sucesso
  res.json({ message: "Logout bem-sucedido", auth: false, token: null });
});

router.get('/perfil', verificarToken, async (req, res) => {
  try {
    const userId = req.userId;

    console.log('ID do usuário autenticado:', userId); // Log do ID do usuário

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
        email: req.body.email,
        senha: cripto_senha,
        cpf: req.body.cpf,
        codigo_recuperacao: req.body.codigo_recuperacao,
        nascimento: req.body.nascimento,
        cidade: req.body.cidade,
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

  // Atualizar um usuário
  router.put('/atualizar/:id', async (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "O conteúdo não pode estar vazio!"
      });
      return;
    }

    try {
      const cripto_senha = await encrypt(req.body.senha);

      connection.query(
        'UPDATE users SET nome = ?, email = ?, senha = ?, cpf = ?, codigo_recuperacao = ?, nascimento = ?, cidade = ? WHERE id = ?', 
        [req.body.nome, req.body.email, cripto_senha, req.body.cpf, req.body.codigo_recuperacao, req.body.nascimento, req.body.cidade, req.params.id],
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
            ...req.body,
            message: "Usuário atualizado com sucesso!"
          });
        }
      );
    } catch (error) {
      res.status(500).send({
        message: "Erro ao criptografar a senha: " + error.message
      });
    }
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
