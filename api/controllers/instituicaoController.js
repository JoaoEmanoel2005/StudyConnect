const InstituicaoService = require('../services/instituicaoService');

class InstituicaoController {

  // ============================
  // 🔹 Cadastro
  // ============================
  async criar(req, res) {
    try {
      const nova = await InstituicaoService.criarInstituicao(req.body);
      res.status(201).json({ message: 'Instituição cadastrada com sucesso.', instituicao: nova });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // ============================
  // 🔹 Login
  // ============================
  async login(req, res) {
    try {
      const { email, senha } = req.body;
      const data = await InstituicaoService.loginInstituicao(email, senha);
      res.json({ message: 'Login realizado com sucesso!', instituicao: data.instituicao.nome, token: data.token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

// controllers/InstituicaoController.js
  async perfil(req, res) {
    try {
      if (req.user.userType !== "instituicao") {
        return res.status(403).json({ error: "Apenas instituições podem acessar este recurso." });
      }

      const instituicaoId = req.user.id;
      const perfil = await InstituicaoService.buscarPerfil(instituicaoId);

      res.json(perfil);
    } catch (error) {
      console.error("Erro ao buscar perfil da instituição:", error);
      res.status(500).json({ error: error.message });
    }
  }

  // ============================
  // 🔹 Atualizar instituição logada
  // ============================
  async atualizar(req, res) {
    try {
      const instituicaoId = req.instituicao.id;
      const updated = await InstituicaoService.atualizarInstituicao(instituicaoId, req.body);
      res.json({ message: 'Dados atualizados com sucesso.', instituicao: updated });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // ============================
  // 🔹 Deletar instituição logada
  // ============================
  async deletar(req, res) {
    try {
      const instituicaoId = req.instituicao.id;
      await InstituicaoService.deletarInstituicao(instituicaoId);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // ============================
  // 🔹 Cursos da instituição logada
  // ============================
  async criarCurso(req, res) {
    try {
      const instituicaoId = req.instituicao.id;
      const curso = await InstituicaoService.criarCurso(instituicaoId, req.body);
      res.status(201).json({ message: 'Curso criado com sucesso.', curso });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async atualizarCurso(req, res) {
    try {
      const instituicaoId = req.instituicao.id;
      const cursoId = Number(req.params.id);
      const updated = await InstituicaoService.atualizarCurso(instituicaoId, cursoId, req.body);
      res.json({ message: 'Curso atualizado com sucesso.', curso: updated });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deletarCurso(req, res) {
    try {
      const instituicaoId = req.instituicao.id;
      const cursoId = Number(req.params.id);
      await InstituicaoService.deletarCurso(instituicaoId, cursoId);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async listarCursos(req, res) {
    try {
      const instituicaoId = req.instituicao.id;
      const cursos = await InstituicaoService.listarCursos(instituicaoId);
      res.json(cursos);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // ============================
  // 🔹 Listar todas instituições (público)
  // ============================
  async listar(req, res) {
    try {
      const lista = await InstituicaoService.listarInstituicoes();
      res.json(lista);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new InstituicaoController();
