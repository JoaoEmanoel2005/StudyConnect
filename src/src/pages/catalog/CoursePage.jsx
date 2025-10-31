import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { cursos } from "../../data/Courses";
import { instituicao } from "../../data/Institution";
import NotFound from "../NotFound";
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
  BookmarkIcon,
  CheckBadgeIcon,
  MapPinIcon,
  CalendarIcon,
  ArrowTopRightOnSquareIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkSolid, HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const MotionDiv = motion.div;

export default function CursoDetalhe() {
  const { id } = useParams();
  const { usuario, toggleCursoFavorito } = useAuth();
  const curso = cursos.find((c) => c.id === Number(id));
  const instituicaoData = curso ? instituicao.find((i) => i.id === curso.instituicao_id) : null;

  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    if (curso) {
      document.title = `${curso.nome} — StudyConnect`;
    }
    return () => {
      document.title = "StudyConnect";
    };
  }, [curso]);

  useEffect(() => {
    if (curso && usuario) {
      const favs = usuario?.cursosFavoritos ?? usuario?.favoritos ?? [];
      setIsFavorited(Array.isArray(favs) ? favs.includes(curso.id) : false);
    }
  }, [usuario, curso]);

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
        /* user cancelled */
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copiado para a área de transferência!", { icon: "🔗" });
      } catch {
        toast.error("Não foi possível copiar o link.");
      }
    }
  };

  const handleToggleFavorite = () => {
    if (!usuario) {
      toast.error("Faça login para favoritar cursos");
      return;
    }
    const wasAlreadyFavorited = isFavorited;
    setIsFavorited(!isFavorited);
    
    try {
      if (typeof toggleCursoFavorito === "function") {
        toggleCursoFavorito(curso.id);
      }
      toast.success(
        wasAlreadyFavorited ? "Removido dos favoritos" : "Adicionado aos favoritos",
        { icon: wasAlreadyFavorited ? "💔" : "❤️" }
      );
    } catch (err) {
      console.error("Erro ao alternar favorito:", err);
      setIsFavorited(wasAlreadyFavorited);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50">
      {/* Hero Section */}
      <div className="relative">
        {/* Imagem de fundo */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${curso.imagem ?? "/images/default-course.jpg"})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/70 to-slate-900/90" />
        </div>

        {/* Conteúdo do Hero */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
          {/* Navegação superior */}
          <div className="flex items-center justify-between mb-12">
            <Link
              to="/catalogo"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white transition group"
            >
              <div className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition">
                <ArrowLeftIcon className="h-4 w-4" />
              </div>
              <span className="font-medium">Voltar ao catálogo</span>
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg text-white hover:bg-white/20 transition"
              >
                <ShareIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Compartilhar</span>
              </button>

              <button
                onClick={handleToggleFavorite}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg text-white hover:bg-white/20 transition"
              >
                {isFavorited ? (
                  <BookmarkSolid className="h-5 w-5 text-yellow-400" />
                ) : (
                  <BookmarkIcon className="h-5 w-5" />
                )}
                <span className="hidden sm:inline">{isFavorited ? "Salvo" : "Salvar"}</span>
              </button>
            </div>
          </div>

          {/* Informações principais */}
          <div className="max-w-4xl">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
                <AcademicCapIcon className="h-4 w-4" />
                {curso.tipo}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-green-500/20 text-green-300 border border-green-500/30">
                <SparklesIcon className="h-4 w-4" />
                {curso.categoria}
              </span>
              {curso.modalidade && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  <GlobeAltIcon className="h-4 w-4" />
                  {curso.modalidade}
                </span>
              )}
            </div>

            {/* Título */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              {curso.nome}
            </h1>

            {/* Info rápida */}
            <div className="flex flex-wrap items-center gap-4 text-white/90">
              {instituicaoData && (
                <div className="flex items-center gap-2">
                  <BuildingOffice2Icon className="h-5 w-5" />
                  <span>{instituicaoData.nome}</span>
                </div>
              )}
              {curso.duracao && (
                <div className="flex items-center gap-2">
                  <ClockIcon className="h-5 w-5" />
                  <span>{curso.duracao}</span>
                </div>
              )}
            </div>

            {/* Descrição curta */}
            <p className="mt-6 text-lg text-white/80 leading-relaxed max-w-2xl">
              {curso.descricao?.substring(0, 200)}...
            </p>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 pb-16">
        {/* Cards de informação rápida */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-md p-6 border-t-4 border-green-500"
          >
            <div className="flex items-center justify-between mb-2">
              <CurrencyDollarIcon className="h-8 w-8 text-green-500" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Investimento</p>
            <p className="text-xl font-bold text-gray-900">{curso.custo ?? "Gratuito"}</p>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-md p-6 border-t-4 border-blue-500"
          >
            <div className="flex items-center justify-between mb-2">
              <ClockIcon className="h-8 w-8 text-blue-500" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Duração</p>
            <p className="text-xl font-bold text-gray-900">{curso.duracao ?? "—"}</p>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-md p-6 border-t-4 border-purple-500"
          >
            <div className="flex items-center justify-between mb-2">
              <UserGroupIcon className="h-8 w-8 text-purple-500" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Vagas disponíveis</p>
            <p className="text-xl font-bold text-gray-900">{curso.vagas ?? "—"}</p>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-md p-6 border-t-4 border-yellow-500"
          >
            <div className="flex items-center justify-between mb-2">
              <CalendarIcon className="h-8 w-8 text-yellow-500" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Horário</p>
            <p className="text-xl font-bold text-gray-900">{curso.horario ?? "—"}</p>
          </MotionDiv>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Coluna principal (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Sobre o curso */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <AcademicCapIcon className="h-6 w-6 text-primary" />
                Sobre o Curso
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {curso.descricao}
              </p>
            </MotionDiv>

            {/* Onde trabalhar */}
            {curso.onde_trabalhar && (
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <BuildingOffice2Icon className="h-6 w-6 text-primary" />
                  Onde Você Pode Trabalhar
                </h2>
                <p className="text-gray-700 leading-relaxed">{curso.onde_trabalhar}</p>
              </MotionDiv>
            )}

            {/* Pré-requisitos */}
            {curso.pre_requisitos && curso.pre_requisitos.length > 0 && (
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CheckBadgeIcon className="h-6 w-6 text-primary" />
                  Pré-requisitos
                </h2>
                <ul className="space-y-2">
                  {curso.pre_requisitos.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-700">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </MotionDiv>
            )}

            {/* Matriz curricular */}
            {curso.matriz_curricular && Object.keys(curso.matriz_curricular).length > 0 && (
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <AcademicCapIcon className="h-6 w-6 text-primary" />
                  Matriz Curricular
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(curso.matriz_curricular).map(([semestre, disciplinas], idx) => (
                    <div key={idx} className="border-2 border-gray-100 rounded-xl p-4 bg-gradient-to-br from-white to-gray-50">
                      <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                        <SparklesIcon className="h-4 w-4" />
                        {semestre}
                      </h3>
                      <ul className="space-y-2">
                        {disciplinas.map((disc, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                            <CheckBadgeIcon className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                            {disc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </MotionDiv>
            )}

            {/* Carga horária */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ClockIcon className="h-6 w-6 text-primary" />
                Carga Horária
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="py-3 px-4 text-left text-sm font-bold text-gray-700">Atividade</th>
                      <th className="py-3 px-4 text-right text-sm font-bold text-gray-700">Carga Horária</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-700">Disciplinas</td>
                      <td className="py-3 px-4 text-right text-gray-700">2.400 Aulas</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-700">AATG – Trabalho de Graduação</td>
                      <td className="py-3 px-4 text-right text-gray-700">160 Horas</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-700">Estágio Supervisionado</td>
                      <td className="py-3 px-4 text-right text-gray-700">240 Horas</td>
                    </tr>
                    <tr className="bg-green-50 font-bold">
                      <td className="py-3 px-4 text-green-700">Total</td>
                      <td className="py-3 px-4 text-right text-green-700">2.800 Horas (3.360 Aulas)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </MotionDiv>
          </div>

          {/* Sidebar (1/3) */}
          <div className="space-y-6">
            {/* Card de inscrição */}
            <MotionDiv
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-md p-6 top-6"
            >
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <AcademicCapIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{curso.custo ?? "Gratuito"}</h3>
                <p className="text-sm text-gray-600">Investimento total do curso</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Vagas</span>
                  <span className="font-semibold text-gray-900">{curso.vagas ?? "—"}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Modalidade</span>
                  <span className="font-semibold text-gray-900">{curso.modalidade ?? "—"}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Duração</span>
                  <span className="font-semibold text-gray-900">{curso.duracao ?? "—"}</span>
                </div>
              </div>

              {safeLink(curso.links?.inscricao) ? (
                <a
                  href={curso.links.inscricao}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-primary text-white font-semibold py-4 px-6 rounded-lg hover:from-primary-dark hover:to-indigo-700 transition shadow-md hover:shadow-md mb-3"
                >
                  Inscrever-se Agora
                  <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                </a>
              ) : (
                <Link
                  to="/catalogo"
                  className="w-full flex items-center justify-center gap-2 bg-primary text-white font-semibold py-4 px-6 rounded-lg hover:from-primary-dark hover:to-indigo-700 transition shadow-md hover:shadow-md mb-3"
                >
                  Ver Mais Cursos
                </Link>
              )}

              <div className="flex gap-2">
                {safeLink(curso.links?.pagina_curso) && (
                  <a
                    href={curso.links.pagina_curso}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 p-3 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition text-gray-700 hover:text-primary"
                  >
                    <LinkIcon className="h-4 w-4" />
                    <span className="text-sm font-medium">Página do curso</span>
                  </a>
                )}
              </div>
            </MotionDiv>

            {/* Card da instituição */}
            {instituicaoData && (
              <MotionDiv
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <BuildingOffice2Icon className="h-5 w-5 text-primary" />
                  Instituição
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-gray-900">{instituicaoData.nome}</p>
                    <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                      <MapPinIcon className="h-4 w-4" />
                      {instituicaoData.cidade}, {instituicaoData.estado}
                    </p>
                  </div>
                  <Link
                    to={`/instituicao/${instituicaoData.id}`}
                    className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-2 px-4 rounded-lg transition"
                  >
                    Ver Instituição
                    <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                  </Link>
                </div>
              </MotionDiv>
            )}

            {/* Card de ajuda */}
            <MotionDiv
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-primary/10 rounded-xl p-6 border-2 border-primary/20"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">Precisa de Ajuda?</h3>
              <p className="text-sm text-gray-700 mb-4">
                Entre em contato com a instituição para dúvidas sobre inscrição, financiamento ou requisitos.
              </p>
              <div className="space-y-2">
                {safeLink(curso.links?.contato) && (
                  <a
                    href={curso.links.contato}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-white border-2 border-primary text-primary font-medium py-2 px-4 rounded-lg hover:bg-primary hover:text-white transition"
                  >
                    Contatar Instituição
                  </a>
                )}
                <Link
                  to="/contato"
                  className="w-full flex items-center justify-center gap-2 bg-primary text-white font-medium py-2 px-4 rounded-lg hover:bg-primary-dark transition"
                >
                  Suporte da Plataforma
                </Link>
              </div>
            </MotionDiv>
          </div>
        </div>
      </div>
    </div>
  );
}