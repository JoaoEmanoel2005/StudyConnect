const prisma = require('../config/prisma');

class InstituicaoRepository {
  async criar(dados) {
    return await prisma.instituicao.create({ data: dados });
  }

  async buscarPorId(id) {
    return await prisma.instituicao.findUnique({
      where: { id },
      include: {
        tipoInstituicao: true,
        endereco: { include: { cidade: true, estado: true } },
      },
    });
  }

  async buscarPorEmail(email) {
    return await prisma.instituicao.findFirst({ where: { email } });
  }

  async atualizar(id, dados) {
    return await prisma.instituicao.update({
      where: { id },
      data: dados,
      include: {
        tipoInstituicao: true,
        endereco: { include: { cidade: true, estado: true } },
      },
    });
  }

  async deletar(id) {
    return await prisma.instituicao.delete({ where: { id } });
  }

  async exibirTodos({ cidadeId, estadoId, tipoId, skip = 0, take = 20, ordem = 'asc' } = {}) {
    const where = {};
    if (cidadeId) where.endereco = { cidadeId };
    if (estadoId) where.endereco = { ...where.endereco, estadoId };
    if (tipoId) where.tipoInstituicaoId = tipoId;

    return await prisma.instituicao.findMany({
      where,
      include: {
        tipoInstituicao: true,
        endereco: { include: { cidade: true, estado: true } },
      },
      skip,
      take,
      orderBy: { nome: ordem },
    });
  }
}

module.exports = new InstituicaoRepository();
