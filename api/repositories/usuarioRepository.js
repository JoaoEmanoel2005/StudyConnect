const prisma = require('../config/prisma');

class UsuarioRepository {
  async criar(dados) {
    return await prisma.usuario.create({ data: dados });
  }

  async buscarPorEmail(email) {
    return await prisma.usuario.findUnique({
      where: { email },
      include: { endereco: { include: { cidade: true, estado: true } } },
    });
  }

  async buscarPorToken(token) {
    return await prisma.usuario.findFirst({ where: { tokenVerificado: token } });
  }

  async verificarEmail(id) {
    return await prisma.usuario.update({
      where: { id },
      data: { emailVerificado: true, tokenVerificado: null },
    });
  }

  async atualizar(id, dados) {
    return await prisma.usuario.update({ where: { id }, data: dados });
  }

  async deletar(id) {
    return await prisma.usuario.delete({ where: { id } });
  }

  async salvarInstituicao(usuarioId, instituicaoId) {
    return await prisma.instiSalvo.create({ data: { usuarioId, instituicaoId } });
  }

  async removerInstituicaoSalva(usuarioId, instituicaoId) {
    return await prisma.instiSalvo.deleteMany({ where: { usuarioId, instituicaoId } });
  }

  async listarInstituicoesSalvas(usuarioId, skip = 0, take = 20) {
    return await prisma.instiSalvo.findMany({
      where: { usuarioId },
      include: {
        instituicao: {
          select: {
            id: true,
            nome: true,
            imagem: true,
            descricao: true,
            tipoInstituicao: true,
            endereco: {
              select: {
                logradouro: true,
                numero: true,
                bairro: true,
                cep: true,
                cidade: { select: { nome: true } },
                estado: { select: { sigla: true, nome: true } },
              },
            },
          },
        },
      },
      skip,
      take,
    });
  }

  async salvarCurso(usuarioId, cursoId) {
    return await prisma.cursoSalvo.create({ data: { usuarioId, cursoId } });
  }

  async removerCursoSalvo(usuarioId, cursoId) {
    return await prisma.cursoSalvo.deleteMany({ where: { usuarioId, cursoId } });
  }

  async listarCursosSalvos(usuarioId, skip = 0, take = 20) {
    return await prisma.cursoSalvo.findMany({
      where: { usuarioId },
      include: {
        curso: {
          select: {
            id: true,
            nome: true,
            categoria: { select: { nome: true } },
            modalidade: { select: { nome: true } },
            tipoCurso: { select: { nome: true } },
            instituicao: {
              select: {
                id: true,
                nome: true,
                endereco: {
                  select: {
                    cidade: { select: { nome: true } },
                    estado: { select: { sigla: true, nome: true } },
                  },
                },
              },
            },
            imagem: true,
          },
        },
      },
      skip,
      take,
    });
  }

  async listarTodos(skip = 0, take = 20, ordem = 'asc') {
    return await prisma.usuario.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        emailVerificado: true,
        createdAt: true,
      },
      orderBy: { nome: ordem },
      skip,
      take,
    });
  }

  async buscarPorId(id) {
    return await prisma.usuario.findUnique({
      where: { id },
      include: { endereco: { include: { cidade: true, estado: true } } },
    });
  }
}

module.exports = new UsuarioRepository();
