import { useParams, Link } from "react-router-dom";
import { cursos } from "../data/Courses";
import NotFound from "./NotFound";
import { 
  UserGroupIcon, ClockIcon, CurrencyDollarIcon, LinkIcon,
  AcademicCapIcon, BuildingOffice2Icon, ArrowLeftIcon 
} from "@heroicons/react/24/outline";

export default function CursoDetalhe() {
  const { id } = useParams();
  const curso = cursos.find(c => c.id === Number(id));

  if (!curso) {
    // caso não encontre o curso, renderiza a "error page"
    return <NotFound />;
  }

  return (
      <div className="bg-slate-100 container mx-auto space-y-12">

        {/* HERO */}
          <section
            className="relative w-full py-12 flex items-center justify-center"
            style={{
              backgroundImage: `url(${curso.imagem})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/70" />

            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-6">
              <Link
                to="/catalogo"
                className="flex items-center gap-2 mb-14 text-white hover:text-gray-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gray-300 after:transition-all after:duration-300 hover:after:w-full transition-all"
              >
                <ArrowLeftIcon className="h-4 w-4" />
                Voltar ao catálogo
              </Link>

              <h1 className="text-4xl font-extrabold drop-shadow-lg">
                {curso.nome}
              </h1>

              <div className="flex justify-center gap-3 mt-4 flex-wrap">
                <span className="bg-blue-500/80 px-3 py-1 rounded-full text-sm">
                  {curso.tipo}
                </span>
                <span className="bg-green-500/80 px-3 py-1 rounded-full text-sm">
                  {curso.categoria}
                </span>
              </div>
            </div>
          </section>

        {/* DESCRIÇÃO */}
      <div className="bg-white max-w-7xl mx-auto space-y-12 p-8 rounded-xl">
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Sobre o Curso
          </h2>
          <p className="text-gray-700 leading-relaxed mb-8">
            {curso.descricao}
          </p>

          {/* DETALHES RÁPIDOS */}
          <div className="bg-gray-50 border  rounded-lg p-6">
            <h3 className="text-lg font-semibold text-slate-700 mb-2 border-b pb-2">
              Detalhes do curso
            </h3>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              <div className="flex items-center gap-3">
                <UserGroupIcon className="h-6 w-6 text-accent shrink-0" />
                <div>
                  <dt className="text-sm font-bold text-slate-700">Vagas</dt>
                  <dd className="text-gray-800">{curso.vagas}</dd>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <ClockIcon className="h-6 w-6 text-accent shrink-0" />
                <div>
                  <dt className="text-sm font-bold text-slate-700">Horário</dt>
                  <dd className="text-gray-800">{curso.horario}</dd>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <CurrencyDollarIcon className="h-6 w-6 text-accent shrink-0" />
                <div>
                  <dt className="text-sm font-bold text-slate-700">Custo</dt>
                  <dd className="text-gray-800">{curso.custo}</dd>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <AcademicCapIcon className="h-6 w-6 text-accent shrink-0" />
                <div>
                  <dt className="text-sm font-bold text-slate-700">Duração</dt>
                  <dd className="text-gray-800">{curso.duracao}</dd>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:col-span-2">
                <BuildingOffice2Icon className="h-6 w-6 text-accent shrink-0" />
                <div>
                  <dt className="text-sm font-bold text-slate-700">Instituição</dt>
                  <dd className="text-gray-800">{curso.instituicao}</dd>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <AcademicCapIcon className="h-6 w-6 text-accent shrink-0" />
                <div>
                  <dt className="text-sm font-bold text-slate-700">Localização</dt>
                  <dd className="text-gray-800">{curso.localizacao}</dd>
                </div>
              </div>
            </dl>
          </div>
        </section>

        {/* INSCRIÇÃO */}
        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Inscrição para o Curso
          </h2>
          <p className="text-gray-700 mb-8">
            Para se inscrever neste curso, clique em um dos botões abaixo:
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card - Site Oficial */}
            <a
              href={curso.links.site_oficial}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col items-start p-5 rounded-lg border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-400 transition"
            >
              <LinkIcon className="h-7 w-7 text-blue-500 mb-3 group-hover:scale-110 transition" />
              <h3 className="text-lg font-semibold text-slate-700 group-hover:text-blue-600">
                Site Oficial da Instituição
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Acesse a página principal da instituição para conhecer mais sobre ela.
              </p>
            </a>

            {/* Card - Página do Curso */}
            <a
              href={curso.links.pagina_curso}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col items-start p-5 rounded-lg border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-400 transition"
            >
              <LinkIcon className="h-7 w-7 text-blue-500 mb-3 group-hover:scale-110 transition" />
              <h3 className="text-lg font-semibold text-slate-700 group-hover:text-blue-600">
                Página do Curso
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Veja a descrição detalhada, disciplinas e informações sobre este curso.
              </p>
            </a>

            {/* Card - Inscrição */}
            <a
              href={curso.links.inscricao}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col items-start p-5 rounded-lg border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-400 transition"
            >
              <LinkIcon className="h-7 w-7 text-blue-500 mb-3 group-hover:scale-110 transition" />
              <h3 className="text-lg font-semibold text-slate-700 group-hover:text-blue-600">
                Inscrição para o Curso
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Faça sua inscrição e garanta sua vaga de forma rápida e segura.
              </p>
            </a>

          </div>
        </section>

        {/* ONDE TRABALHAR */}
        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Onde você pode trabalhar?
          </h2>
          <p className="text-gray-700">
            {curso.onde_trabalhar}
          </p>
        </section>

        {/* PRÉ-REQUISITOS */}
        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Pré-requisitos
          </h2>
          <p className="text-gray-700 mb-8">
            Para se inscrever neste curso, é necessário atender aos seguintes pré-requisitos:
          </p>
          <ul className="list-disc list-inside space-y-2 text-accent">
            {curso.pre_requisitos.map((req, idx) => (
              <li key={idx}>{req}</li>
            ))}
          </ul>
        </section>

        {/* MATRIZ CURRICULAR */}
        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Matriz Curricular
          </h2>
          <p className="text-gray-700 mb-8">
            Confira as disciplinas que você irá estudar ao longo do curso:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(curso.matriz_curricular).map(([semestre, disciplinas], idx) => (
              <div key={idx} className="bg-gray-50 p-4 rounded-xl border">
                <h3 className="font-semibold text-accent mb-2">{semestre}</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {disciplinas.map((disc, i) => (
                    <li key={i}>{disc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* CARGA HORÁRIA DO CURSO */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Carga Horária do Curso
          </h2>
          <p className="text-gray-700 leading-relaxed mb-8">
            A carga horária total do curso é de <strong>2.800 horas</strong>, distribuídas entre disciplinas teóricas, práticas, estágio supervisionado e atividades complementares. Abaixo está a distribuição detalhada da carga horária:
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Atividade</th>
                  <th className="py-3 px-4 text-right text-sm font-semibold text-gray-700">Horas</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Observações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-3 px-4 text-gray-500">Disciplinas</td>
                  <td className="py-3 px-4 text-gray-500 text-right">2.400</td>
                  <td className="py-3 px-4 text-gray-500">2.880 aulas</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-500">AATG – Trabalho de Graduação</td>
                  <td className="py-3 px-4 text-gray-500 text-right">160</td>
                  <td className="py-3 px-4 text-gray-500">—</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-500">Estágio Supervisionado</td>
                  <td className="py-3 px-4 text-gray-500 text-right">240</td>
                  <td className="py-3 px-4 text-gray-500">—</td>
                </tr>
                <tr className="font-semibold bg-green-50">
                  <td className="py-3 px-4 text-green-700">Total</td>
                  <td className="py-3 px-4 text-green-700 text-right">2.800</td>
                  <td className="py-3 px-4 text-green-700">—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}