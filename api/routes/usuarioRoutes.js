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

module.exports = router;
