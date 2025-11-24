const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed...");

  // ===============================
  // ESTADOS
  // ===============================
  console.log("→ Inserindo estados...");

  const estadosData = [
    { nome: "Acre", sigla: "AC" },
    { nome: "Alagoas", sigla: "AL" },
    { nome: "Amapá", sigla: "AP" },
    { nome: "Amazonas", sigla: "AM" },
    { nome: "Bahia", sigla: "BA" },
    { nome: "Ceará", sigla: "CE" },
    { nome: "Distrito Federal", sigla: "DF" },
    { nome: "Espírito Santo", sigla: "ES" },
    { nome: "Goiás", sigla: "GO" },
    { nome: "Maranhão", sigla: "MA" },
    { nome: "Mato Grosso", sigla: "MT" },
    { nome: "Mato Grosso do Sul", sigla: "MS" },
    { nome: "Minas Gerais", sigla: "MG" },
    { nome: "Pará", sigla: "PA" },
    { nome: "Paraíba", sigla: "PB" },
    { nome: "Paraná", sigla: "PR" },
    { nome: "Pernambuco", sigla: "PE" },
    { nome: "Piauí", sigla: "PI" },
    { nome: "Rio de Janeiro", sigla: "RJ" },
    { nome: "Rio Grande do Norte", sigla: "RN" },
    { nome: "Rio Grande do Sul", sigla: "RS" },
    { nome: "Rondônia", sigla: "RO" },
    { nome: "Roraima", sigla: "RR" },
    { nome: "Santa Catarina", sigla: "SC" },
    { nome: "São Paulo", sigla: "SP" },
    { nome: "Sergipe", sigla: "SE" },
    { nome: "Tocantins", sigla: "TO" }
  ];

  await prisma.estado.createMany({
    data: estadosData,
    skipDuplicates: true,
  });

  // Buscar estados usados depois
  const sp = await prisma.estado.findFirst({ where: { sigla: "SP" } });
  const rj = await prisma.estado.findFirst({ where: { sigla: "RJ" } });

  // ===============================
  // CIDADES
  // ===============================
  console.log("→ Inserindo cidades...");

  await prisma.cidade.createMany({
    data: [
      { nome: "São Paulo", estadoId: sp.id },
      { nome: "Campinas", estadoId: sp.id },
      { nome: "Santos", estadoId: sp.id },
      { nome: "Rio de Janeiro", estadoId: rj.id },
      { nome: "Niterói", estadoId: rj.id },
      { nome: "Volta Redonda", estadoId: rj.id },
    ],
    skipDuplicates: true,
  });

  const cidadeSP = await prisma.cidade.findFirst({ where: { nome: "São Paulo" } });

  // ===============================
  // TIPOS DE INSTITUIÇÃO
  // ===============================
  console.log("→ Inserindo tipos de instituição...");

  await prisma.tipoInstituicao.createMany({
    data: [
      { nome: "Universidade" },
      { nome: "Faculdade" },
      { nome: "Escola Técnica" },
      { nome: "Centro Universitário" },
      { nome: "Instituto Federal" },
    ],
    skipDuplicates: true,
  });

  // ===============================
  // MODALIDADES
  // ===============================
  console.log("→ Inserindo modalidades...");

  await prisma.modalidade.createMany({
    data: [
      { nome: "Presencial" },
      { nome: "Semipresencial" },
      { nome: "EAD" },
    ],
    skipDuplicates: true,
  });

  // ===============================
  // CATEGORIAS
  // ===============================
  console.log("→ Inserindo categorias...");

  await prisma.categoria.createMany({
    data: [
      { nome: "Tecnologia" },
      { nome: "Saúde" },
      { nome: "Ciências Humanas" },
      { nome: "Engenharia" },
      { nome: "Administração" },
    ],
    skipDuplicates: true,
  });

  // ===============================
  // TIPO DE CURSO
  // ===============================
  console.log("→ Inserindo tipos de curso...");

  await prisma.tipoCurso.createMany({
    data: [
      { nome: "Bacharelado" },
      { nome: "Licenciatura" },
      { nome: "Tecnólogo" },
      { nome: "Curso Técnico" },
      { nome: "Pós-graduação" },
    ],
    skipDuplicates: true,
  });

  // ===============================
  // ENDEREÇO
  // ===============================
  console.log("→ Inserindo endereço...");

  const endereco1 = await prisma.endereco.create({
    data: {
      logradouro: "Av. Paulista",
      numero: "1000",
      bairro: "Bela Vista",
      cep: "01310-000",
      cidadeId: cidadeSP.id,
      estadoId: sp.id,
    },
  });

  // ===============================
  // USUÁRIO TESTE
  // ===============================
  console.log("→ Inserindo usuário...");

  await prisma.usuario.create({
    data: {
      nome: "Usuário Teste",
      email: "teste@example.com",
      senha: "123456",
      enderecoId: endereco1.id,
    },
  });

  // ===============================
  // INSTITUIÇÃO TESTE
  // ===============================
  console.log("→ Inserindo instituição...");

  await prisma.instituicao.create({
    data: {
      nome: "Universidade XPTO",
      tipo: 1,
      email: "contato@xpto.edu",
      descricao: "A maior universidade fictícia do Brasil.",
      enderecoId: endereco1.id,
    },
  });

  console.log("🌱 SEED FINALIZADO!");
}

main()
  .catch((e) => {
    console.error("❌ ERRO NO SEED:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
