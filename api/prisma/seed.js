import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed...");

  // Usuários
  const usuario = await prisma.usuario.create({
    data: {
      nome: "João da Silva",
      email: "joao@email.com",
      senha: "123456", // em produção: bcrypt.hashSync("123456", 10)
      imagem: null
    },
  });

  // Instituição
  const instituicao = await prisma.instituicao.create({
    data: {
      nome: "Universidade Exemplo",
      cnpj: "12.345.678/0001-99",
      email: "contato@exemplo.com",
      senha: "senha123",
      telefone: "11999999999",
      cidade: "São Paulo",
      estado: "SP",
      site: "https://universidadeexemplo.com",
      descricao: "Instituição de ensino referência na área de tecnologia.",
    },
  });

  // Curso
  const curso = await prisma.curso.create({
    data: {
      nome: "Análise e Desenvolvimento de Sistemas",
      tipo: "GRADUACAO",
      categoria: "Tecnologia da Informação",
      vagas: 40,
      modalidade: "PRESENCIAL",
      horario: "Noturno",
      duracao: "3 anos",
      custo: 1200.00,
      descricao: "Curso voltado para formação de desenvolvedores fullstack.",
      onde_trabalhar: "Empresas de tecnologia, startups, indústrias.",
      imagem: "curso_ads.png",
      instituicaoId: instituicao.id,
      preRequisitos: {
        create: [{ texto: "Ensino médio completo" }],
      },
      matrizCurricular: {
        create: [
          {
            semestre: "1º Semestre",
            disciplinas: {
              create: [
                { nome: "Algoritmos e Programação" },
                { nome: "Banco de Dados I" },
              ],
            },
          },
        ],
      },
      links: {
        create: {
          site_oficial: "https://universidadeexemplo.com/ads",
          pagina_curso: "https://universidadeexemplo.com/cursos/ads",
          inscricao: "https://universidadeexemplo.com/inscricao/ads",
        },
      },
    },
  });

  console.log("✅ Seed finalizado!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
