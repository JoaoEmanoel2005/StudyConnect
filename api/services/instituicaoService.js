const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const InstituicaoRepository = require('../repositories/instituicaoRepository');
const CursoRepository = require('../repositories/cursoRepository');

const JWT_SECRET = process.env.JWT_SECRET || 'chave_secreta';

class InstituicaoService {

  // ============================
  // 🔹 Cadastro de Instituição
  // ============================
  async criarInstituicao(dados) {
    const existente = await InstituicaoRepository.buscarPorEmail(dados.email);
    if (existente) throw new Error('Já existe uma instituição com esse e-mail.');

    // Criptografa senha
    const senhaHash = await bcrypt.hash(dados.senha, 10);

    const nova = await InstituicaoRepository.criar({
      ...dados,
      senha: senhaHash
    });

    return { id: nova.id, nome: nova.nome, email: nova.email };
  }

  // ============================
  // 🔹 Login
  // ============================
  async loginInstituicao(email, senha) {
    const inst = await InstituicaoRepository.buscarPorEmail(email);
    if (!inst) throw new Error('Instituição não encontrada.');

    const senhaValida = await bcrypt.compare(senha, inst.senha);
    if (!senhaValida) throw new Error('Senha inválida.');

    const token = jwt.sign(
      { id: inst.id, email: inst.email, tipo: 'instituicao' }, // payload
      JWT_SECRET,
      { expiresIn: '1d' }
    );
    console.log(token);

    const { senha: _, ...instSafe } = inst;
    return { instituicao: instSafe, token };
  }

  // ============================
  // 🔹 Atualizar dados da instituição logada
  // ============================
  async atualizarInstituicao(instituicaoId, dados) {
    // Se houver senha nova, criptografa
    if (dados.senha) {
      dados.senha = await bcrypt.hash(dados.senha, 10);
    }
    return InstituicaoRepository.atualizar(instituicaoId, dados);
  }

  // ============================
  // 🔹 Deletar instituição logada
  // ============================
  async deletarInstituicao(instituicaoId) {
    await InstituicaoRepository.buscarPorId(instituicaoId); // garante que existe
    return InstituicaoRepository.deletar(instituicaoId);
  }

  // ============================
  // 🔹 Cursos da própria instituição
  // ============================
  async criarCurso(instituicaoId, dadosCurso) {
  return CursoRepository.criar(dadosCurso, instituicaoId);
}


  async atualizarCurso(instituicaoId, cursoId, dadosCurso) {
    const curso = await CursoRepository.buscarPorId(cursoId);
    if (!curso || curso.instituicaoId !== instituicaoId) {
      throw new Error('Curso não encontrado ou não pertence à instituição.');
    }
    return CursoRepository.atualizar(cursoId, dadosCurso);
  }

  async deletarCurso(instituicaoId, cursoId) {
    const curso = await CursoRepository.buscarPorId(cursoId);
    if (!curso || curso.instituicaoId !== instituicaoId) {
      throw new Error('Curso não encontrado ou não pertence à instituição.');
    }
    return CursoRepository.deletar(cursoId);
  }

  async listarCursos(instituicaoId) {
    return CursoRepository.buscarPorInstituicao(instituicaoId);
  }

  // ============================
  // 🔹 Listar todas instituições (público)
  // ============================
  async listarInstituicoes() {
    return InstituicaoRepository.exibirTodos();
  }

}

module.exports = new InstituicaoService();
