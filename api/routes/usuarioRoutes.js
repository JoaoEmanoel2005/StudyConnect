const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.post('/register', usuarioController.registrar);
router.get('/verify-email', usuarioController.verificarEmail);
router.post('/login', usuarioController.login);
router.post('/forgot-password', usuarioController.forgotPassword);
router.post('/reset-password', usuarioController.resetPassword);



module.exports = router;
