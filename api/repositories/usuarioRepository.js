const prisma = require('../config/prisma');

class UsuarioRepository {

//criar usuario
  async criar(dados) {
    return await prisma.usuario.create({ data: dados });
  }

  //caçar usuario por email
  async buscarPorEmail(email) {
    return await prisma.usuario.findUnique({ where: { email } });
  }

  //caçar o token pra verificação de email
  async buscarPorToken(token) {
    return await prisma.usuario.findFirst({ where: { tokenVerificado: token } });
  }

  //atualiza o estado do email verificado para verdadeiro
  async verificarEmail(id) {
    return await prisma.usuario.update({
      where: { id },
      data: { emailVerificado: true, tokenVerificado: null },
    });
  }

//atualiza os dados do usuario
  async atualizar(id, dados) {
    return await prisma.usuario.update({
      where: { id },
      data: dados,
    });
  }

  //deleta o caboco
  async deletar(id) {
    return await prisma.usuario.delete({ where: { id } });
  }

  //mostra as intituições salvas do usuario
  async salvarInstituicao(usuarioId, instituicaoId) {
    return await prisma.instiSalvo.create({
    data: {
        usuarioId, instituicaoId},
    });
  }

  //dessalva a instituição do usuario
  async removerInstituicaoSalva(usuarioId, instituicaoId) {
    return await prisma.instiSalvo.deleteMany({
      where: { usuarioId, instituicaoId },
    });
  }

  //mostra as instituicoes salvas do usuario
async listarInstituicoesSalvas(usuarioId) {
    return await prisma.instiSalvo.findMany({
      where: { usuarioId },
      include: {
        instituicao: {
          select: {
            id: true,
            nome: true,
            cidade: true,
            estado: true,
            imagem: true,
          },
        },
      },
    });
  }


  //salva o curso
 async salvarCurso(usuarioId, cursoId) {
    return await prisma.cursoSalvo.create({
      data: {
        usuarioId,
        cursoId,
      },
    });
  }

  //remove o curso dos salvos
  async removerCursoSalvo(usuarioId, cursoId) {
    return await prisma.cursoSalvo.deleteMany({
      where: { usuarioId, cursoId },
    });
  }

  //mostras os cursos que o usuario salvo
async listarCursosSalvos(usuarioId) {
    return await prisma.cursoSalvo.findMany({
      where: { usuarioId },
      include: {
        curso: {
          select: {
            id: true,
            nome: true,
            categoria: { select: { nome: true } },
            instituicao: { select: { nome: true, cidade: true } },
            imagem: true,
          },
        },
      },
    });
  }

  //mostra todos os usuarios cadastrados no sistema
  async listarTodos() {
    return await prisma.usuario.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        emailVerificado: true,
        createdAt: true,
      },
      orderBy: { nome: 'asc' },
    });
  }

  //mostra o usuario pelo id
async buscarPorId(id) {
  return await prisma.usuario.findUnique({ where: { id } });
}


}

module.exports = new UsuarioRepository();
