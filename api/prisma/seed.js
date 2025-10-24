import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed...');

  // ==============================
  // 1️⃣ Estados e Cidades
  // ==============================
  const sp = await prisma.estado.create({
    data: {
      nome: 'São Paulo',
      sigla: 'SP',
      cidades: {
        create: [
          { nome: 'São Paulo', regiao: 'Sudeste' },
          { nome: 'Campinas', regiao: 'Sudeste' },
          { nome: 'Santos', regiao: 'Sudeste' },
        ],
      },
    },
  });

  const rj = await prisma.estado.create({
    data: {
      nome: 'Rio de Janeiro',
      sigla: 'RJ',
      cidades: {
        create: [
          { nome: 'Rio de Janeiro', regiao: 'Sudeste' },
          { nome: 'Niterói', regiao: 'Sudeste' },
        ],
      },
    },
  });

  // ==============================
  // 2️⃣ Tipos de Instituição
  // ==============================
  const tiposInstituicao = await prisma.tipoInstituicao.createMany({
    data: [
      { nome: 'Universidade' },
      { nome: 'Centro Universitário' },
      { nome: 'Faculdade' },
      { nome: 'Instituto Federal' },
    ],
  });

  // ==============================
  // 3️⃣ Categorias, Modalidades e Tipos de Curso
  // ==============================
  const [catTec, catGrad, catPos] = await prisma.$transaction([
    prisma.categoria.create({ data: { nome: 'Técnico' } }),
    prisma.categoria.create({ data: { nome: 'Graduação' } }),
    prisma.categoria.create({ data: { nome: 'Pós-Graduação' } }),
  ]);

  const [presencial, ead, hibrido] = await prisma.$transaction([
    prisma.modalidade.create({ data: { nome: 'Presencial' } }),
    prisma.modalidade.create({ data: { nome: 'EAD' } }),
    prisma.modalidade.create({ data: { nome: 'Híbrido' } }),
  ]);

  const [bacharelado, licenciatura, tecnologo] = await prisma.$transaction([
    prisma.tipoCurso.create({ data: { nome: 'Bacharelado' } }),
    prisma.tipoCurso.create({ data: { nome: 'Licenciatura' } }),
    prisma.tipoCurso.create({ data: { nome: 'Tecnólogo' } }),
  ]);

  // ==============================
  // 4️⃣ Instituições
  // ==============================
  const usp = await prisma.instituicao.create({
    data: {
      nome: 'Universidade de São Paulo (USP)',
      cidade: 'São Paulo',
      estado: 'São Paulo',
      email: 'contato@usp.br',
      senha: await bcrypt.hash('123456', 10),
      telefone: '(11) 3091-0000',
      endereco: 'Av. Prof. Luciano Gualberto, 374 - Butantã, São Paulo - SP',
      descricao: 'A USP é uma das mais prestigiadas universidades do Brasil.',
      area: 'Educação Superior',
      tipo: 1, // Universidade
      imagem: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Logo_usp.svg',
      custoMatricula: 0,
      latitude: -23.561399,
      longitude: -46.730789,
    },
  });

  const unip = await prisma.instituicao.create({
    data: {
      nome: 'Universidade Paulista (UNIP)',
      cidade: 'Campinas',
      estado: 'São Paulo',
      email: 'contato@unip.br',
      senha: await bcrypt.hash('123456', 10),
      telefone: '(19) 3343-5000',
      endereco: 'Av. Comendador Enzo Ferrari, 280 - Swift, Campinas - SP',
      descricao: 'A UNIP é uma instituição privada com foco em ensino acessível e de qualidade.',
      area: 'Educação Superior',
      tipo: 2, // Centro Universitário
      imagem: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Unip_logo.png',
      custoMatricula: 250.00,
      latitude: -22.9243,
      longitude: -47.0626,
    },
  });

  // ==============================
  // 5️⃣ Cursos
  // ==============================
  const cursoSI = await prisma.curso.create({
    data: {
      nome: 'Sistemas de Informação',
      tipoId: tecnologo.id,
      categoriaId: catGrad.id,
      modalidadeId: presencial.id,
      vagas: 50,
      horario: 'Noturno',
      turno: 'Noite',
      duracao: '4 anos',
      custo: 980.00,
      descricao: 'Curso voltado para o desenvolvimento e gestão de sistemas de informação empresariais.',
      instituicaoId: usp.id,
      ondeTrabalhar: 'Empresas de tecnologia, bancos, startups, órgãos públicos.',
      imagem: 'https://img.freepik.com/free-photo/software-developer-coding-office_53876-127806.jpg',
      preRequisitos: {
        create: [
          { descricao: 'Ensino médio completo' },
          { descricao: 'Conhecimentos básicos de informática' },
        ],
      },
      matrizCurricular: {
        create: [
          {
            semestre: 1,
            disciplina: 'Fundamentos de Computação',
            disciplinas: {
              create: [
                { nome: 'Lógica de Programação' },
                { nome: 'Matemática Discreta' },
              ],
            },
          },
          {
            semestre: 2,
            disciplina: 'Desenvolvimento Web',
            disciplinas: {
              create: [
                { nome: 'HTML e CSS' },
                { nome: 'JavaScript' },
              ],
            },
          },
        ],
      },
      links: {
        create: {
          siteOficial: 'https://www5.usp.br/',
          paginaCurso: 'https://www.ime.usp.br/graduacao/sistemas-de-informacao/',
          inscricao: 'https://uspdigital.usp.br/jupiterweb/',
        },
      },
    },
  });

  const cursoADM = await prisma.curso.create({
    data: {
      nome: 'Administração de Empresas',
      tipoId: bacharelado.id,
      categoriaId: catGrad.id,
      modalidadeId: hibrido.id,
      vagas: 60,
      horario: 'Matutino',
      turno: 'Manhã',
      duracao: '4 anos',
      custo: 890.00,
      descricao: 'Forma profissionais capazes de planejar, gerenciar e otimizar recursos empresariais.',
      instituicaoId: unip.id,
      ondeTrabalhar: 'Empresas privadas, órgãos públicos e startups.',
      imagem: 'https://img.freepik.com/free-photo/business-meeting-office_23-2148894151.jpg',
    },
  });

  // ==============================
  // 6️⃣ Usuários
  // ==============================
  const user1 = await prisma.usuario.create({
    data: {
      nome: 'Ana Souza',
      email: 'ana@example.com',
      senha: await bcrypt.hash('123456', 10),
      cpf: '123.456.789-00',
      emailVerificado: true,
      instituicoesSalvas: {
        create: { instituicaoId: usp.id },
      },
      cursosSalvos: {
        create: { cursoId: cursoSI.id },
      },
    },
  });

  const user2 = await prisma.usuario.create({
    data: {
      nome: 'Carlos Pereira',
      email: 'carlos@example.com',
      senha: await bcrypt.hash('123456', 10),
      cpf: '987.654.321-00',
      emailVerificado: false,
    },
  });

  console.log('✅ Seed concluída com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
