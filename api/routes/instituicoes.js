const express = require('express');
const router = express.Router();

module.exports = function(connection) {

  /**
   * @swagger
   * tags:
   *   name: Instituições
   *   description: Gerenciar instituições
   */

  /**
   * @swagger
   * /instituicoes/cadastro:
   *   post:
   *     summary: Cria uma nova instituição
   *     tags: [Instituições]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nome:
   *                 type: string
   *               endereco:
   *                 type: string
   *               descricao:
   *                 type: string
   *               tipo:
   *                 type: string
   *     responses:
   *       201:
   *         description: Instituição criada com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                 nome:
   *                   type: string
   *                 endereco:
   *                   type: string
   *                 descricao:
   *                   type: string
   *                 tipo:
   *                   type: string
   */
  router.post('/cadastro', (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "O conteúdo não pode estar vazio!"
      });
      return;
    }

    const instituicao = {
      nome: req.body.nome,
      endereco: req.body.endereco,
      descricao: req.body.descricao,
      tipo: req.body.tipo,
    };

    connection.query('INSERT INTO instituicao SET ?', instituicao, (err, result) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Ocorreu um erro ao criar a instituição."
        });
        return;
      }

      res.status(201).send({
        id: result.insertId,
        ...instituicao
      });
    });
  });

  /**
   * @swagger
   * /instituicoes/todos:
   *   get:
   *     summary: Retorna todas as instituições
   *     tags: [Instituições]
   *     responses:
   *       200:
   *         description: Lista de instituições
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
   *                   endereco:
   *                     type: string
   *                   descricao:
   *                     type: string
   *                   tipo:
   *                     type: string
   */
  router.get('/todos', (req, res) => {
    connection.query('SELECT * FROM instituicao', (err, results) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Ocorreu um erro ao buscar as instituições."
        });
        return;
      }
      res.send(results);
    });
  });

  /**
   * @swagger
   * /instituicoes/atualizar/{id}:
   *   put:
   *     summary: Atualiza uma instituição
   *     tags: [Instituições]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID da instituição
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
   *               endereco:
   *                 type: string
   *               descricao:
   *                 type: string
   *               tipo:
   *                 type: string
   *     responses:
   *       200:
   *         description: Instituição atualizada com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                 nome:
   *                   type: string
   *                 endereco:
   *                   type: string
   *                 descricao:
   *                   type: string
   *                 tipo:
   *                   type: string
   *       404:
   *         description: Instituição não encontrada
   */
  router.put('/atualizar/:id', (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "O conteúdo não pode estar vazio!"
      });
      return;
    }

    connection.query(
      'UPDATE instituicao SET nome = ?, endereco = ?, descricao = ?, tipo = ? WHERE id = ?', 
      [req.body.nome, req.body.endereco, req.body.descricao, req.body.tipo, req.params.id],
      (err, result) => {
        if (err) {
          res.status(500).send({
            message: err.message || `Erro ao atualizar instituição com id ${req.params.id}`
          });
          return;
        }

        if (result.affectedRows === 0) {
          res.status(404).send({
            message: `Instituição com id ${req.params.id} não encontrada.`
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
   * /instituicoes/deletar/{id}:
   *   delete:
   *     summary: Exclui uma instituição
   *     tags: [Instituições]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID da instituição
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Instituição excluída com sucesso
   *       404:
   *         description: Instituição não encontrada
   */
  router.delete('/deletar/:id', (req, res) => {
    connection.query('DELETE FROM instituicao WHERE id = ?', [req.params.id], (err, result) => {
      if (err) {
        res.status(500).send({
          message: err.message || `Erro ao excluir instituição com id ${req.params.id}`
        });
        return;
      }

      if (result.affectedRows === 0) {
        res.status(404).send({
          message: `Instituição com id ${req.params.id} não encontrada.`
        });
        return;
      }

      res.send({ message: "Instituição excluída com sucesso!" });
    });
  });

  return router;
};
