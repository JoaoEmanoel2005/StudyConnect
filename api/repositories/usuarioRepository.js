const prisma = require('../config/prisma');

class UsuarioRepository {
  async criar(dados) {
    return await prisma.usuario.create({ data: dados });
  }

  async buscarPorEmail(email) {
    return await prisma.usuario.findUnique({ where: { email } });
  }

  async buscarPorToken(token) {
    return await prisma.usuario.findUnique({ where: { token_verificacao: token } });
  }

  async verificarEmail(id) {
    return await prisma.usuario.update({
      where: { id },
      data: { email_verificado: true, token_verificacao: null },
    });
  }

  async atualizar(id, dados) {
    return await prisma.usuario.update({
      where: { id },
      data: dados,
    });
  }

async buscarPorId(id) {
  return await prisma.usuario.findUnique({ where: { id } });
}


}

module.exports = new UsuarioRepository();
