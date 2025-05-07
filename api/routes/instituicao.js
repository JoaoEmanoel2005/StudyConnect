const express = require('express');
const router = express.Router();
const { encrypt, comcrypt } = require("../utils/bcrypt");
const jwt = require('jsonwebtoken');
const { verificarToken } = require('../utils/midle');

module.exports = function(connection) {

  router.get('/todos', (req, res) => {
    const query = 'SELECT instituicao_id, nome, email, cnpj, local, descricao, tipo, data_registro FROM instituicao';

    connection.query(query, (error, results) => {
      if (error) {
        console.error('Erro ao buscar instituições:', error);
        res.status(500).json({ erro: 'Erro ao buscar instituições' });
        return;
      }

      res.json(results); // results é o array de instituições
    });
  });

 router.post('/cadastro', async (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "O conteúdo não pode estar vazio!"
      });
      return;
    }

    try {
      const cripto_senha = await encrypt(req.body.senha);

      const instituicao = {
        nome: req.body.nome,
        email: req.body.email,
        senha: cripto_senha,
        cnpj: req.body.cnpj,
        local: req.body.local,
        descricao: req.body.descricao,
        tipo: req.body.tipo,
        foto_perfil: null
      };

      connection.query('INSERT INTO instituicao SET ?', instituicao, (err, result) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).send({
              message: "Email, CNPJ ou Local já estão em uso."
            });
          }
          return res.status(500).send({
            message: err.message || "Ocorreu um erro ao criar a instituição."
          });
        }

        res.send({
          id: result.insertId,
          ...instituicao,
          message: 'instituica criada com sucesso!'
        });
      });
    } catch (error) {
      res.status(500).send({
        message: "Erro ao criptografar a senha: " + error.message
      });
    }
  });

   router.post('/login', async (req, res) => {
      const { email, senha } = req.body;
  
      try {
        const [results] = await connection.promise().query('SELECT * FROM instituicao WHERE email = ?', [email]);
  
        if (results.length === 0) {
          return res.status(404).send({ message: "Email ou Senha incorretos." });
        }
  
        const user = results[0];
        const isMatch = await comcrypt(senha, user.senha);
  
        if (!isMatch) {
          return res.status(401).send({ message: "Email ou senha incorretos." });
        }
  
        const token = jwt.sign({
          id: user.instituicao_id,
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
      // Aqui você não precisa fazer nada com o token no servidor, apenas retorna um sucesso
      res.json({ message: "Logout bem-sucedido", auth: false, token: null });
    });

router.get('/perfil', verificarToken, async (req, res) => {
    try {
      const instituicaoId = req.userId;

      const [results] = await connection.promise().query('SELECT * FROM instituicao WHERE instituicao_id = ?', [instituicaoId]);

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

    return router;
};