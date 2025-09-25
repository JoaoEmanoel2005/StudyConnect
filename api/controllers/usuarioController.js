const UsuarioService = require('../services/usuarioService');

exports.registrar = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const userId = await UsuarioService.cadastrar(nome, email, senha);
    res.status(201).json({ message: 'Usuário cadastrado. Agora valide seu email em até 15 minutos.', userId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verificarEmail = async (req, res) => {
  try {
    const { token } = req.query;
    const success = await UsuarioService.verificarEmail(token);
    if (!success) return res.status(400).json({ error: 'Token inválido.' });
    res.json({ message: 'Email verificado com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const user = await UsuarioService.login(email, senha);
    if (!user) return res.status(400).json({ error: 'Credenciais inválidas.' });
    res.json({ message: 'Login realizado com sucesso!', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    await UsuarioService.enviarCodigoRecuperacao(email);
    res.json({ message: 'Código de recuperação enviado.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;
    await UsuarioService.redefinirSenha(email, code, newPassword);
    res.json({ message: 'Senha alterada com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
