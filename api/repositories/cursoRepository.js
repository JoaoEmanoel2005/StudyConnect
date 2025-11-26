const prisma = require('../config/prisma');

class CursoRepository {
  async criar(dados, instituicaoId) {
      
    if (!instituicaoId) throw new Error('InstituiçãoId é obrigatório para criar um curso.');

      return await prisma.curso.create({
        data: {
          nome: dados.nome,
          descricao: dados.descricao,
          imagem: dados.imagem,
          tipoCurso: { connect: { id: dados.tipoCursoId } },
          categoria: { connect: { id: dados.categoriaId } },
          modalidade: { connect: { id: dados.modalidadeId } },
          instituicao: { connect: { id: instituicaoId } },
          preRequisitos: {
            create: dados.preRequisitos || []
          },
          matrizCurricular: {
            create: dados.matrizCurricular || []
          },
          links: {
            create: dados.links || []
          }
        },
        include: {
          tipoCurso: true,
          categoria: true,
          modalidade: true,
          instituicao: {
            include: {
              endereco: { include: { cidade: true, estado: true } },
              tipoInstituicao: true
            },
          },
          preRequisitos: true,
          matrizCurricular: { include: { disciplinas: true } },
          links: true
        },
      });
    }


  async buscarPorId(id) {
    return await prisma.curso.findUnique({
      where: { id },
      include: {
        tipoCurso: true,
        categoria: true,
        modalidade: true,
        instituicao: {
          include: { endereco: { include: { cidade: true, estado: true } }, tipoInstituicao: true },
        },
        preRequisitos: true,
        matrizCurricular: { include: { disciplinas: true } },
        links: true,
      },
    });
  }

  async listarTodos({ skip = 0, take = 20, ordem = 'asc' } = {}) {
    return await prisma.curso.findMany({
      include: {
        categoria: true,
        tipoCurso: true,
        modalidade: true,
        instituicao: {
          include: { endereco: { include: { cidade: true, estado: true } }, tipoInstituicao: true },
        },
      },
      orderBy: { nome: ordem },
      skip,
      take,
    });
  }

  async buscarPorInstituicao(instituicaoId, { skip = 0, take = 20, ordem = 'asc' } = {}) {
    return await prisma.curso.findMany({
      where: { instituicaoId },
      include: {
        categoria: true,
        tipoCurso: true,
        modalidade: true,
      },
      orderBy: { nome: ordem },
      skip,
      take,
    });
  }

  async buscarPorCategoria(categoriaId, { skip = 0, take = 20, ordem = 'asc' } = {}) {
    return await prisma.curso.findMany({
      where: { categoriaId },
      include: {
        tipoCurso: true,
        instituicao: { include: { endereco: { include: { cidade: true, estado: true } } } },
      },
      orderBy: { nome: ordem },
      skip,
      take,
    });
  }

  async buscarPorModalidade(modalidadeId, { skip = 0, take = 20, ordem = 'asc' } = {}) {
    return await prisma.curso.findMany({
      where: { modalidadeId },
      include: {
        tipoCurso: true,
        categoria: true,
        instituicao: { include: { endereco: { include: { cidade: true, estado: true } } } },
      },
      orderBy: { nome: ordem },
      skip,
      take,
    });
  }

  async atualizar(id, dados) {
    return await prisma.curso.update({
      where: { id },
      data: dados,
      include: {
        categoria: true,
        tipoCurso: true,
        modalidade: true,
        instituicao: { include: { endereco: { include: { cidade: true, estado: true } } } },
      },
    });
  }

  async deletar(id) {
    return await prisma.curso.delete({ where: { id } });
  }

  async buscarPorNome(nome, { skip = 0, take = 20, ordem = 'asc' } = {}) {
    return await prisma.curso.findMany({
      where: { nome: { contains: nome, mode: 'insensitive' } },
      include: {
        categoria: true,
        tipoCurso: true,
        modalidade: true,
        instituicao: { include: { endereco: { include: { cidade: true, estado: true } } } },
      },
      orderBy: { nome: ordem },
      skip,
      take,
    });
  }
}

module.exports = new CursoRepository();
