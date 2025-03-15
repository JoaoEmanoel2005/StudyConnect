const express = require('express');
const router = express.Router();

module.exports = function(connection) {
  /**
   * @swagger
   * tags:
   *   name: Users
   *   description: Gerenciar usuários
   */

  /**
   * @swagger
   * /users/todos:
   *   get:
   *     summary: Retorna todos os usuários
   *     tags: [Users]
   *     responses:
   *       200:
   *         description: Lista de usuários
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: integer
   *                   nome:
   *                     type: string
   *                   email:
   *                     type: string
   *                   cpf:
   *                     type: string
   */
  router.get('/todos', (req, res) => {
    connection.query('SELECT * FROM usuarios', (err, results) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Ocorreu um erro ao buscar os usuários."
        });
        return;
      }
      res.send(results);
    });
  });

  /**
   * @swagger
   * /users/{id}:
   *   get:
   *     summary: Retorna um usuário pelo ID
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID do usuário
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Usuário encontrado
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                 nome:
   *                   type: string
   *                 email:
   *                   type: string
   *                 cpf:
   *                   type: string
   *       404:
   *         description: Usuário não encontrado
   */
  router.get('/:id', (req, res) => {
    connection.query('SELECT * FROM usuarios WHERE id = ?', [req.params.id], (err, results) => {
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
  
  /**
  * @swagger
  * /users/cadastro/{nome}/{email}/{senha}/{cpf}/{codigo_recuperacao}/{nascimento}/{cidade}:
  *   post:
  *     summary: Cria um novo usuário
  *     tags: [Users]
  *     parameters:
  *       - name: nome
  *         in: path
  *         description: Nome do usuário
  *         required: true
  *         schema:
  *           type: string
  *       - name: email
  *         in: path
  *         description: E-mail do usuário
  *         required: true
  *         schema:
  *           type: string
  *       - name: senha
  *         in: path
  *         description: Senha do usuário
  *         required: true
  *         schema:
  *           type: string
  *       - name: cpf
  *         in: path
  *         description: CPF do usuário
  *         required: true
  *         schema:
  *           type: string
  *       - name: codigo_recuperacao
  *         in: path
  *         description: Código de recuperação
  *         required: true
  *         schema:
  *           type: string
  *       - name: nascimento
  *         in: path
  *         description: Data de nascimento do usuário
  *         required: true
  *         schema:
  *           type: string
  *           format: date
  *       - name: cidade
  *         in: path
  *         description: Cidade do usuário
  *         required: true
  *         schema:
  *           type: string
  *     responses:
  *       201:
  *         description: Usuário criado com sucesso
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 id:
  *                   type: integer
  *                 nome:
  *                   type: string
  *                 email:
  *                   type: string
  *                 cpf:
  *                   type: string
  */

  router.post('/cadastro/:nome/:email/:senha/:cpf/:codigo_recuperacao/:nascimento/:cidade', (req, res) => {
    // Extrai os dados da URL (path parameters)
    const { nome, email, senha, cpf, codigo_recuperacao, nascimento, cidade } = req.params;

    // Verifica se algum dado está faltando
    if (!nome || !email || !senha || !cpf || !codigo_recuperacao || !nascimento || !cidade) {
      return res.status(400).send({
        message: "Todos os campos são obrigatórios!"
      });
    }

    const user = {
      nome,
      email,
      senha,
      cpf,
      codigo_recuperacao,
      nascimento,
      cidade
    };

    // Insere os dados na tabela 'usuarios' no banco de dados
    connection.query('INSERT INTO usuarios SET ?', user, (err, result) => {
      if (err) {
        return res.status(500).send({
          message: err.message || "Ocorreu um erro ao criar o usuário."
        });
      }

      // Retorna a resposta com o id gerado e os dados do usuário
      return res.status(201).send({
        id: result.insertId,
        nome,
        email,
        senha,
        cpf,
        codigo_recuperacao,
        nascimento,
        cidade
      });
    });
});

  /**
   * @swagger
   * /users/atualizar/{id}:
   *   put:
   *     summary: Atualiza um usuário
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID do usuário
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nome:
   *                 type: string
   *               email:
   *                 type: string
   *               senha:
   *                 type: string
   *               cpf:
   *                 type: string
   *               codigo_recuperacao:
   *                 type: string
   *               nascimento:
   *                 type: string
   *                 format: date
   *               cidade:
   *                 type: string
   *     responses:
   *       200:
   *         description: Usuário atualizado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                 nome:
   *                   type: string
   *                 email:
   *                   type: string
   *                 cpf:
   *                   type: string
   *       404:
   *         description: Usuário não encontrado
   */
  router.put('/atualizar/:id', (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "O conteúdo não pode estar vazio!"
      });
      return;
    }

    connection.query(
      'UPDATE usuarios SET nome = ?, email = ?, senha = ?, cpf = ?, codigo_recuperacao = ?, nascimento = ?, cidade = ? WHERE id = ?', 
      [req.body.nome, req.body.email, req.body.senha, req.body.cpf, req.body.codigo_recuperacao, req.body.nascimento, req.body.cidade, req.params.id],
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

  /**
   * @swagger
   * /users/deletar/{id}:
   *   delete:
   *     summary: Exclui um usuário
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID do usuário
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Usuário excluído com sucesso
   *       404:
   *         description: Usuário não encontrado
   */
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
