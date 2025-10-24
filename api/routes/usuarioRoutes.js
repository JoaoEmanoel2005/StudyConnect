const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middlewares/auth'); // importa o middleware

// públicas
router.post('/register', usuarioController.registrar);
router.get('/verify-email', usuarioController.verificarEmail);
router.post('/login', usuarioController.login);
router.post('/forgot-password', usuarioController.forgotPassword);
router.post('/reset-password', usuarioController.resetPassword);

// protegidas (precisam de Authorization: Bearer <token>)
router.post('/change-password', authMiddleware, usuarioController.alterarSenha);
router.get('/me', authMiddleware, usuarioController.getMe);
router.put('/update', authMiddleware, usuarioController.atualizarDados);
router.delete('/delete', authMiddleware, usuarioController.deletarConta);

// Favoritos - instituições
router.post('/salvar-instituicao', authMiddleware, usuarioController.salvarInstituicao);
router.delete('/remover-instituicao', authMiddleware, usuarioController.removerInstituicao);
router.get('/instituicoes-salvas', authMiddleware, usuarioController.listarInstituicoes);

// Favoritos - cursos
router.post('/salvar-curso', authMiddleware, usuarioController.salvarCurso);
router.delete('/remover-curso', authMiddleware, usuarioController.removerCurso);
router.get('/cursos-salvos', authMiddleware, usuarioController.listarCursos);

// Admin
router.get('/all', authMiddleware, usuarioController.listarUsuarios);


module.exports = router;
