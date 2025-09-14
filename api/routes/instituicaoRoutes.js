const express = require('express');
const router = express.Router();
const InstituicaoController = require('../controllers/instituicaoController');

router.post('/register', InstituicaoController.criar);
router.get('/all', InstituicaoController.listar);
router.get('/perfil/:id', InstituicaoController.exibir);
router.put('/update/:id', InstituicaoController.atualizar);
router.delete('/delete/:id', InstituicaoController.deletar);

module.exports = router;
