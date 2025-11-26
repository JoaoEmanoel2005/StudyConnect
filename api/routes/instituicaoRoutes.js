const express = require('express');
const router = express.Router();
const InstituicaoController = require('../controllers/instituicaoController');
const authMiddleware = require('../middlewares/auth'); // pega id da instituição logada

// públicas
router.post('/register', InstituicaoController.criar);
router.post('/login', InstituicaoController.login);

// protegidas (necessitam Authorization: Bearer <token>)
router.put('/update', authMiddleware, InstituicaoController.atualizar);
router.delete('/delete', authMiddleware, InstituicaoController.deletar);

// Cursos da própria instituição
router.post('/curso', authMiddleware, InstituicaoController.criarCurso);
router.put('/curso/:id', authMiddleware, InstituicaoController.atualizarCurso);
router.delete('/curso/:id', authMiddleware, InstituicaoController.deletarCurso);
router.get('/cursos', authMiddleware, InstituicaoController.listarCursos); // lista cursos da instituição logada

// opcional: listar todas as instituições
router.get('/all', InstituicaoController.listar);

module.exports = router;
