const InstituicaoRepository = require('../repositories/instituicaoRepository');

class InstituicaoService {
  async criarInstituicao(dados) {
  const existente = await InstituicaoRepository.buscarPorEmail(dados.email);
    if (existente) {
      throw new Error('Já existe uma instituição com esse e-mail.');
    }
    return InstituicaoRepository.criar(dados);
  }

  async listarInstituicoes() {
    return InstituicaoRepository.exibirTodos();
  }

  async obterInstituicao(id) {
    const inst = await InstituicaoRepository.buscarPorId(id);
    if (!inst) throw new Error('Instituição não encontrada.');
    return inst;
  }

  async atualizarInstituicao(id, dados) {
    await this.obterInstituicao(id); // garante que existe
    return InstituicaoRepository.atualizar(id, dados);
  }

  async deletarInstituicao(id) {
    await this.obterInstituicao(id); // garante que existe
    return InstituicaoRepository.deletar(id);
  }
}

module.exports = new InstituicaoService();
