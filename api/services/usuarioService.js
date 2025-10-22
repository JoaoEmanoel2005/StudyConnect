const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const transporter = require('../config/mailer');
const UsuarioRepository = require('../repositories/usuarioRepository');

const JWT_SECRET = process.env.JWT_SECRET || 'chave_secreta';

class UsuarioService {
  async cadastrar(nome, email, senha) {
    const senhaHash = await bcrypt.hash(senha, 10);
    const token = crypto.randomBytes(32).toString('hex');

    const user = await UsuarioRepository.criar({
      nome,
      email,
      senha: senhaHash,
      tokenVerificado: token,
    });

    const url = `${process.env.BASE_URL}/verify-email?token=${token}`;

    await transporter.sendMail({
      from: `"Suporte" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Verificação de e-mail',
      html: `<p>Olá ${nome},</p><p>Clique no link para verificar seu e-mail:</p><a href="${url}">${url}</a>`,
    });

    return user.id;
  }

async validarCPF(cpf) {
  if (!cpf) return false;

  cpf = cpf.replace(/[^\d]/g, '');

  if (cpf.length !== 11) return false;

  if (/^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf[i]) * (10 - i);
  }
  let resto = (soma * 10) % 11;
  if (resto === 10) resto = 0;
  if (resto !== parseInt(cpf[9])) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf[i]) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10) resto = 0;
  if (resto !== parseInt(cpf[10])) return false;

  return true;
}


  async verificarEmail(token) {
    const user = await UsuarioRepository.buscarPorToken(token);
    if (!user) return false;

    await UsuarioRepository.verificarEmail(user.id);
    return true;
  }

  async login(email, senha) {
    const user = await UsuarioRepository.buscarPorEmail(email);
    if (!user) return null;

    if (!user.email_verificado) {
      throw new Error('E-mail não verificado');
    }

    const senhaValida = await bcrypt.compare(senha, user.senha);
    if (!senhaValida) return null;

     // gerar token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email }, // payload
      JWT_SECRET,
      { expiresIn: "1d" } // expira em 1 dia
    );

    // devolver usuário sem senha
    const { senha: _, ...userSafe } = user;

    return { user: userSafe, token };

  }

  async enviarCodigoRecuperacao(email) {
    const user = await UsuarioRepository.buscarPorEmail(email);
    if (!user) throw new Error('Usuário não encontrado');

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expira = new Date(Date.now() + 15 * 60 * 1000);

    await UsuarioRepository.atualizar(user.id, {
      codigo_reset: code,
      codigo_expira: expira,
    });

    await transporter.sendMail({
      from: `"Suporte" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Código de recuperação de senha',
      html: `<p>Seu código é: <b>${code}</b><br>Ele expira em 15 minutos.</p>`,
    });
  }

  async redefinirSenha(email, code, novaSenha) {
    const user = await UsuarioRepository.buscarPorEmail(email);
    if (!user || user.codigo_reset !== code || user.codigo_expira < new Date()) {
      throw new Error('Código inválido ou expirado');
    }

    const senhaHash = await bcrypt.hash(novaSenha, 10);

    await UsuarioRepository.atualizar(user.id, {
      senha: senhaHash,
      codigoReset: null,
      codigoExpira: null,
    });

    await transporter.sendMail({
      from: `"Suporte" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Senha alterada com sucesso',
      html: `<p>Sua senha foi alterada com sucesso. Se não foi você, contate o suporte imediatamente.</p>`,
    });
  }

async alterarSenha(userId, senhaAtual, novaSenha) {
  const user = await UsuarioRepository.buscarPorId(userId);
  if (!user) throw new Error('Usuário não encontrado');

  const senhaValida = await bcrypt.compare(senhaAtual, user.senha);
  if (!senhaValida) throw new Error('Senha atual inválida');

  const senhaHash = await bcrypt.hash(novaSenha, 10);
  await UsuarioRepository.atualizar(userId, { senha: senhaHash });

  return true;
}



}

module.exports = new UsuarioService();
