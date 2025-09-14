const InstituicaoService = require('../services/instituicaoService');

class InstituicaoController {
  async criar(req, res) {
   try {
      const nova = await InstituicaoService.criarInstituicao(req.body);
      return res.status(201).json(nova);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async listar(req, res) {
    const lista = await InstituicaoService.listarInstituicoes();
    return res.json(lista);
  }

  async exibir(req, res) {
    try {
      const { id } = req.params;
      const inst = await InstituicaoService.obterInstituicao(Number(id));
      return res.json(inst);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const inst = await InstituicaoService.atualizarInstituicao(Number(id), req.body);
      return res.json(inst);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async deletar(req, res) {
    try {
      const { id } = req.params;
      await InstituicaoService.deletarInstituicao(Number(id));
      return res.status(204).send();
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new InstituicaoController();
