const prisma = require('../config/prisma');

class CursoRepository {
  // ==============================
  // 🔹 Criar curso
  // ==============================
  async criar(dados) {
    return await prisma.curso.create({
      data: dados,
      include: {
        tipoCurso: true,
        categoria: true,
        modalidade: true,
        instituicao: true,
      },
    });
  }

  // ==============================
  // 🔹 Buscar curso por ID
  // ==============================
  async buscarPorId(id) {
    return await prisma.curso.findUnique({
      where: { id },
      include: {
        tipoCurso: true,
        categoria: true,
        modalidade: true,
        instituicao: true,
        preRequisitos: true,
        matrizCurricular: {
          include: {
            disciplinas: true,
          },
        },
        links: true,
      },
    });
  }

  // ==============================
  // 🔹 Buscar todos os cursos
  // ==============================
  async listarTodos() {
    return await prisma.curso.findMany({
      include: {
        categoria: true,
        tipoCurso: true,
        modalidade: true,
        instituicao: {
          select: { id: true, nome: true, cidade: true, estado: true },
        },
      },
      orderBy: { nome: 'asc' },
    });
  }

  // ==============================
  // 🔹 Buscar cursos por Instituição
  // ==============================
  async buscarPorInstituicao(idInstituicao) {
    return await prisma.curso.findMany({
      where: { instituicaoId: idInstituicao },
      include: {
        categoria: true,
        tipoCurso: true,
        modalidade: true,
      },
      orderBy: { nome: 'asc' },
    });
  }

  // ==============================
  // 🔹 Buscar cursos por Categoria
  // ==============================
  async buscarPorCategoria(categoriaId) {
    return await prisma.curso.findMany({
      where: { categoriaId },
      include: {
        tipoCurso: true,
        instituicao: true,
      },
    });
  }

  // ==============================
  // 🔹 Buscar cursos por Modalidade
  // ==============================
  async buscarPorModalidade(modalidadeId) {
    return await prisma.curso.findMany({
      where: { modalidadeId },
      include: {
        tipoCurso: true,
        categoria: true,
        instituicao: true,
      },
    });
  }

  // ==============================
  // 🔹 Atualizar curso
  // ==============================
  async atualizar(id, dados) {
    return await prisma.curso.update({
      where: { id },
      data: dados,
      include: {
        categoria: true,
        tipoCurso: true,
        modalidade: true,
        instituicao: true,
      },
    });
  }

  // ==============================
  // 🔹 Deletar curso
  // ==============================
  async deletar(id) {
    return await prisma.curso.delete({
      where: { id },
    });
  }

  // ==============================
  // 🔹 Buscar cursos por nome (busca parcial)
  // ==============================
  async buscarPorNome(nome) {
    return await prisma.curso.findMany({
      where: {
        nome: {
          contains: nome,
          mode: 'insensitive',
        },
      },
      include: {
        categoria: true,
        tipoCurso: true,
        modalidade: true,
        instituicao: true,
      },
    });
  }
}

module.exports = new CursoRepository();
