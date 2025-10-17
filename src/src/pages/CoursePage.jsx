import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { cursos } from "../data/Courses";
import NotFound from "./NotFound";
import {
  UserGroupIcon,
  ClockIcon,
  CurrencyDollarIcon,
  LinkIcon,
  AcademicCapIcon,
  BuildingOffice2Icon,
  ArrowLeftIcon,
  ShareIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

export default function CursoDetalhe() {
  const { id } = useParams();
  const curso = cursos.find((c) => c.id === Number(id));

  useEffect(() => {
    if (curso) {
      document.title = `${curso.nome} — StudyConnect`;
    }
    return () => {
      document.title = "StudyConnect";
    };
  }, [curso]);

  if (!curso) {
    return <NotFound />;
  }

  const safeLink = (url) => (url && url.startsWith("http") ? url : null);

  const handleShare = async () => {
    const shareData = {
      title: curso.nome,
      text: curso.descricao?.slice(0, 140) ?? "",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (e) {
        /* user cancelled or not supported */
      }
    } else {
      // fallback: copy url
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copiado para a área de transferência");
      } catch {
        alert("Não foi possível copiar o link.");
      }
    }
  };

  return (
    <div className="bg-slate-100">
      {/* HERO */}
      <header
        className="relative h-64 sm:h-80 md:h-96 flex items-center z-0"
        role="banner"
        aria-label={`Banner do curso ${curso.nome}`}
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.45)), url(${curso.imagem})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="flex items-center justify-between text-white">
            <nav aria-label="Breadcrumb" className="text-sm">
              <Link to="/catalogo" className="inline-flex items-center gap-2 text-white/80 hover:text-white">
                <ArrowLeftIcon className="h-4 w-4" />
                Voltar ao catálogo
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full text-sm hover:bg-white/20 transition"
                aria-label="Compartilhar curso"
              >
                <ShareIcon className="h-4 w-4" />
                Compartilhar
              </button>
              <a
                href={safeLink(curso.links?.site_oficial) ?? "#"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full text-sm hover:bg-white/20 transition"
                aria-label="Abrir site da instituição"
                title="Abrir site da instituição"
              >
                <GlobeAltIcon className="h-4 w-4" />
                Instituição
              </a>
            </div>
          </div>

          <div className="mt-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-lg">
              {curso.nome}
            </h1>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <span className="bg-blue-500/80 px-3 py-1 rounded-full text-sm">{curso.tipo}</span>
              <span className="bg-green-500/80 px-3 py-1 rounded-full text-sm">{curso.categoria}</span>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 ">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left / main column */}
          <article className="lg:col-span-2 bg-white rounded-xl shadow p-6">
            <section aria-labelledby="about-course" className="prose prose-slate max-w-none">
              <h2 id="about-course" className="text-2xl font-bold text-slate-800">Sobre o Curso</h2>
              <p className="text-gray-500">{curso.descricao}</p>
            </section>

            {/* Quick details */}
            <section aria-labelledby="course-details" className="mt-6">
              <h3 id="course-details" className="text-lg font-semibold text-slate-700 mb-3">Detalhes do curso</h3>

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <UserGroupIcon className="h-6 w-6 text-accent shrink-0" />
                  <div>
                    <dt className="text-sm font-bold text-slate-700">Vagas</dt>
                    <dd className="text-gray-500">{curso.vagas ?? "—"}</dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ClockIcon className="h-6 w-6 text-accent shrink-0" />
                  <div>
                    <dt className="text-sm font-bold text-slate-700">Horário</dt>
                    <dd className="text-gray-500">{curso.horario ?? "—"}</dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CurrencyDollarIcon className="h-6 w-6 text-accent shrink-0" />
                  <div>
                    <dt className="text-sm font-bold text-slate-700">Custo</dt>
                    <dd className="text-gray-500">{curso.custo ?? "Gratuito"}</dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <AcademicCapIcon className="h-6 w-6 text-accent shrink-0" />
                  <div>
                    <dt className="text-sm font-bold text-slate-700">Duração</dt>
                    <dd className="text-gray-500">{curso.duracao ?? "—"}</dd>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:col-span-2">
                  <BuildingOffice2Icon className="h-6 w-6 text-accent shrink-0" />
                  <div>
                    <dt className="text-sm font-bold text-slate-700">Instituição</dt>
                    <dd className="text-gray-500">{curso.instituicao ?? "—"}</dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <LinkIcon className="h-6 w-6 text-accent shrink-0" />
                  <div>
                    <dt className="text-sm font-bold text-slate-700">Links úteis</dt>
                    <dd className="text-gray-500 flex flex-wrap gap-2">
                      {safeLink(curso.links?.pagina_curso) ? (
                        <a href={curso.links.pagina_curso} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Página do curso</a>
                      ) : null}
                      - 
                      {safeLink(curso.links?.inscricao) ? (
                        <a href={curso.links.inscricao} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Inscrição</a>
                      ) : null}
                      {!safeLink(curso.links?.pagina_curso) && !safeLink(curso.links?.inscricao) && <span>—</span>}
                    </dd>
                  </div>
                </div>
              </dl>
            </section>

            {/* Onde trabalhar */}
            <section className="mt-8">
              <h3 className="text-lg font-semibold text-slate-700 mb-2">Onde você pode trabalhar?</h3>
              <p className="text-gray-500">{curso.onde_trabalhar}</p>
            </section>

            {/* Pré-requisitos */}
            <section className="mt-8">
              <h3 className="text-lg font-semibold text-slate-700 mb-3">Pré-requisitos</h3>
              {Array.isArray(curso.pre_requisitos) && curso.pre_requisitos.length > 0 ? (
                <ul className="list-disc list-inside space-y-2 text-gray-500">
                  {curso.pre_requisitos.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">Nenhum pré-requisito listado.</p>
              )}
            </section>

            {/* Matriz curricular */}
            <section className="mt-8">
              <h3 className="text-lg font-semibold text-slate-700 mb-3">Matriz Curricular</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(curso.matriz_curricular || {}).map(([semestre, disciplinas], idx) => (
                  <div key={idx} className="bg-gray-50 p-4 rounded-lg border">
                    <h4 className="font-semibold text-accent mb-2">{semestre}</h4>
                    <ul className="list-disc list-inside text-gray-500 space-y-1">
                      {disciplinas.map((disc, i) => (
                        <li key={i}>{disc}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Carga horária (table) */}
            <section className="mt-8">
              <h3 className="text-lg font-semibold text-slate-700 mb-3">Carga Horária</h3>
              <div className="overflow-x-auto bg-white rounded-lg border">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Atividade</th>
                      <th className="py-3 px-4 text-right text-sm font-semibold text-gray-700">Horas</th>
                      
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y">
                    <tr>
                      <td className="py-3 px-4 text-gray-600">Disciplinas</td>
                      <td className="py-3 px-4 text-right text-gray-600">2.400 Aulas</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-gray-600">AATG – Trabalho de Graduação</td>
                      <td className="py-3 px-4 text-right text-gray-600">160 Horas</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-gray-600">Estágio Supervisionado</td>
                      <td className="py-3 px-4 text-right text-gray-600">240 Horas</td>
                    </tr>
                    <tr className="font-semibold bg-green-50">
                      <td className="py-3 px-4 text-green-700">Total</td>
                      <td className="py-3 px-4 text-green-700 text-right">2.800 Horas (3.360 Aulas)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </article>

          {/* Right / sticky enroll panel */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="bg-white rounded-xl p-5 shadow-md border">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-slate-800">{curso.instituicao}</h4>
                    <p className="text-sm text-gray-600">{curso.localizacao ?? "Local não informado"}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Vagas</div>
                    <div className="font-bold text-lg">{curso.vagas ?? "—"}</div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <div className="text-sm text-gray-700 font-semibold">{curso.custo ?? "Gratuito"}</div>
                  {safeLink(curso.links?.inscricao) ? (
                    <a
                      href={curso.links.inscricao}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition"
                    >
                      Inscrever-se
                    </a>
                  ) : (
                    <Link to="/catalogo" className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition">
                      Ver opções
                    </Link>
                  )}
                </div>

                <div className="mt-3 text-sm text-gray-500">
                  <strong>Modalidade:</strong> {curso.modalidade ?? "—"}
                </div>

                <div className="mt-4 flex gap-2">
                  {safeLink(curso.links?.pagina_curso) && (
                    <a href={curso.links.pagina_curso} target="_blank" rel="noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 border border-gray-200 px-3 py-2 rounded-md hover:bg-gray-50">
                      <LinkIcon className="h-4 w-4" />
                      Ver detalhes
                    </a>
                  )}

                  {safeLink(curso.links?.site_oficial) && (
                    <a href={curso.links.site_oficial} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-200 hover:bg-gray-50">
                      <GlobeAltIcon className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Small institution card / CTA */}
              <div className="bg-white rounded-xl p-4 border shadow-sm">
                <h5 className="text-sm font-semibold text-slate-800">Precisa de ajuda?</h5>
                <p className="text-sm text-gray-600 mt-2">Fale com a instituição para dúvidas sobre inscrição ou financiamento.</p>
                <div className="mt-3 flex gap-2">
                  <a href={safeLink(curso.links?.contato) ?? "#"} className="flex-1 inline-flex items-center justify-center px-3 py-2 rounded-md border border-gray-200 hover:bg-gray-50 text-sm">
                    Contato
                  </a>
                  <Link to="/contato" className="inline-flex items-center justify-center px-3 py-2 rounded-md bg-primary text-white text-sm">
                    Suporte
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}