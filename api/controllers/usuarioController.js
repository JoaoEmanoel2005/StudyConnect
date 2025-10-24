const UsuarioService = require('../services/usuarioService');

exports.registrar = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const userId = await UsuarioService.cadastrar(nome, email, senha);
    res.status(201).json({
      message: 'Usuário cadastrado. Agora valide seu email em até 15 minutos.',
      userId
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.verificarEmail = async (req, res) => {
  try {
    const { token } = req.query;
    const success = await UsuarioService.verificarEmail(token);
    if (!success) return res.status(400).json({ error: 'Token inválido ou expirou.' });
    res.json({ message: 'Email verificado com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const data = await UsuarioService.login(email, senha);
    if (!data) return res.status(400).json({ error: 'Credenciais inválidas.' });

    res.json({
      message: 'Login realizado com sucesso!',
      user: data.user.nome,
      token: data.token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    await UsuarioService.enviarCodigoRecuperacao(email);
    res.json({ message: 'Código de recuperação enviado para seu E-mail.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;
    await UsuarioService.redefinirSenha(email, code, newPassword);
    res.json({ message: 'Senha alterada com sucesso!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.alterarSenha = async (req, res) => {
  try {
    const { senhaAtual, novaSenha } = req.body;
    const userId = req.user.id;

    await UsuarioService.alterarSenha(userId, senhaAtual, novaSenha);

    res.json({ message: 'Senha alterada com sucesso!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await UsuarioService.buscarPorId(req.user.id);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });
    const { senha, emailVerificado, tokenVerificado, codigoReset, codigoExpira, createdAt, updatedAt, ...userSafe } = user;
    res.json(userSafe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.atualizarDados = async (req, res) => {
  try {
    const userId = req.user.id;
    const dados = req.body;
    const updated = await UsuarioService.atualizarDados(userId, dados);
    res.json({ message: 'Dados atualizados com sucesso!', usuario: updated });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletarConta = async (req, res) => {
  try {
    const userId = req.user.id;
    await UsuarioService.deletarConta(userId);
    res.json({ message: 'Conta deletada com sucesso.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.salvarInstituicao = async (req, res) => {
  try {
    const userId = req.user.id;
    const { instituicaoId } = req.body;
    const saved = await UsuarioService.salvarInstituicao(userId, instituicaoId);
    res.status(201).json({ message: 'Instituição salva com sucesso!', saved });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.removerInstituicao = async (req, res) => {
  try {
    const userId = req.user.id;
    const { instituicaoId } = req.body;
    await UsuarioService.removerInstituicaoSalva(userId, instituicaoId);
    res.json({ message: 'Instituição removida dos salvos.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listarInstituicoes = async (req, res) => {
  try {
    const userId = req.user.id;
    const instituicoes = await UsuarioService.listarInstituicoesSalvas(userId);
    res.json(instituicoes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.salvarCurso = async (req, res) => {
  try {
    const userId = req.user.id;
    const { cursoId } = req.body;
    const saved = await UsuarioService.salvarCurso(userId, cursoId);
    res.status(201).json({ message: 'Curso salvo com sucesso!', saved });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.removerCurso = async (req, res) => {
  try {
    const userId = req.user.id;
    const { cursoId } = req.body;
    await UsuarioService.removerCursoSalvo(userId, cursoId);
    res.json({ message: 'Curso removido dos salvos.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listarCursos = async (req, res) => {
  try {
    const userId = req.user.id;
    const cursos = await UsuarioService.listarCursosSalvos(userId);
    res.json(cursos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await UsuarioService.listarTodosUsuarios();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

