const express = require('express');
const router = express.Router();
const { verificarToken } = require('../utils/midle');

module.exports = function (connection) {

    // Cadastrar curso com base na instituição logada
    router.post('/cadastro', verificarToken, (req, res) => {
        const instituicao_id = req.userId;

        const { nome, area, tipo, descricao, periodo, custo, duracao } = req.body;

        if (!nome || !area || !tipo || !descricao || !periodo || !custo || !duracao) {
            return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
        }

        const sql = `
      INSERT INTO curso (instituicao_id, nome, area, tipo, descricao, periodo, custo, duracao)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

        const values = [instituicao_id, nome, area, tipo, descricao, periodo, custo, duracao];

        connection.query(sql, values, (err, result) => {
            if (err) {
                console.error('Erro ao cadastrar curso:', err);
                return res.status(500).json({ mensagem: 'Erro ao cadastrar curso.' });
            }

            return res.status(201).json({ mensagem: 'Curso cadastrado com sucesso!', cursoId: result.insertId });
        });
    });

    // Ver todos os cursos (público)
    router.get('/', (req, res) => {
        connection.query('SELECT * FROM curso', (err, results) => {
            if (err) {
                console.error('Erro ao buscar cursos:', err);
                return res.status(500).json({ mensagem: 'Erro ao buscar cursos.' });
            }

            return res.json(results);
        });
    });

    // Ver cursos da instituição logada
    router.get('/meus', verificarToken, (req, res) => {
        const instituicao_id = req.userId;

        connection.query('SELECT * FROM curso WHERE instituicao_id = ?', [instituicao_id], (err, results) => {
            if (err) {
                console.error('Erro ao buscar cursos da instituição:', err);
                return res.status(500).json({ mensagem: 'Erro ao buscar cursos.' });
            }

            return res.json(results);
        });
    });

    // Atualizar curso da instituição logada
    router.put('/editar/:id', verificarToken, (req, res) => {
        const instituicao_id = req.userId;
        const curso_id = req.params.id;
        const { nome, area, tipo, descricao, periodo, custo, duracao } = req.body;

        // Primeiro, verifica se o curso pertence à instituição
        const checkSql = 'SELECT * FROM curso WHERE curso_id = ? AND instituicao_id = ?';
        connection.query(checkSql, [curso_id, instituicao_id], (err, results) => {
            if (err) return res.status(500).json({ mensagem: 'Erro ao verificar curso.' });
            if (results.length === 0) return res.status(404).json({ mensagem: 'Curso não encontrado ou não pertence à instituição.' });

            const updateSql = `
        UPDATE curso SET nome = ?, area = ?, tipo = ?, descricao = ?, periodo = ?, custo = ?, duracao = ?
        WHERE curso_id = ? AND instituicao_id = ?
      `;

            const values = [nome, area, tipo, descricao, periodo, custo, duracao, curso_id, instituicao_id];

            connection.query(updateSql, values, (err, result) => {
                if (err) {
                    console.error('Erro ao atualizar curso:', err);
                    return res.status(500).json({ mensagem: 'Erro ao atualizar curso.' });
                }

                return res.json({ mensagem: 'Curso atualizado com sucesso!' });
            });
        });
    });

    // Deletar curso da instituição logada
    router.delete('/deletar/:id', verificarToken, (req, res) => {
        const instituicao_id = req.userId;
        const curso_id = req.params.id;

        const checkSql = 'SELECT * FROM curso WHERE curso_id = ? AND instituicao_id = ?';
        connection.query(checkSql, [curso_id, instituicao_id], (err, results) => {
            if (err) return res.status(500).json({ mensagem: 'Erro ao verificar curso.' });
            if (results.length === 0) return res.status(404).json({ mensagem: 'Curso não encontrado ou não pertence à instituição.' });

            const deleteSql = 'DELETE FROM curso WHERE curso_id = ? AND instituicao_id = ?';

            connection.query(deleteSql, [curso_id, instituicao_id], (err, result) => {
                if (err) {
                    console.error('Erro ao deletar curso:', err);
                    return res.status(500).json({ mensagem: 'Erro ao deletar curso.' });
                }

                return res.json({ mensagem: 'Curso deletado com sucesso!' });
            });
        });
    });

    return router;
};
