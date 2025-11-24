import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  MapPinIcon,
  PhoneIcon,
  GlobeAltIcon,
  ShareIcon,
  AcademicCapIcon,
  BuildingLibraryIcon,
  ArrowLeftIcon,
  EnvelopeIcon,
  StarIcon,
  HeartIcon,
  CheckBadgeIcon,
  SparklesIcon,
  UserGroupIcon,
  ClockIcon,
  CurrencyDollarIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolid, HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { instituicao } from "../../data/Institution";
import { cursos } from "../../data/Courses";
import { useAuth } from "../../context/AuthContext";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const MotionDiv = motion.div;
const MotionLink = motion(Link);

export default function InstitutionPage() {
  const { id } = useParams();
  const { usuario, toggleInstituicaoFavorita } = useAuth();

  const inst = instituicao.find((i) => i.id === Number(id));
  const cursosRelacionados = cursos.filter((c) => c.instituicao_id === Number(id));

  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    if (inst && usuario) {
      const favs = usuario?.instituicoesFavoritas ?? usuario?.favoritas ?? [];
      setIsFavorited(Array.isArray(favs) ? favs.includes(inst.id) : false);
    }
  }, [usuario, inst]);

  if (!inst) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BuildingLibraryIcon className="h-20 w-20 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Instituição não encontrada</h2>
          <p className="text-gray-600 mb-6">A instituição que você procura não existe.</p>
          <Link
            to="/instituicoes"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            Voltar ao catálogo
          </Link>
        </div>
      </div>
    );
  }

  const safeLink = (link) => {
    if (!link) return null;
    return link.startsWith("http") ? link : `https://${link}`;
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: inst.nome,
          text: `Conheça a instituição ${inst.nome}`,
          url,
        });
      } catch (err) {
        console.error("Erro ao compartilhar:", err);
      }
    } else if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
        toast.success("Link copiado para a área de transferência!", { icon: "🔗" });
      } catch (err) {
        console.error("Erro ao copiar:", err);
      }
    }
  };

  const handleToggleFavorite = () => {
    if (!usuario) {
      toast.error("Faça login para favoritar instituições");
      return;
    }
    const wasAlreadyFavorited = isFavorited;
    setIsFavorited(!isFavorited);
    
    try {
      if (typeof toggleInstituicaoFavorita === "function") {
        toggleInstituicaoFavorita(inst.id);
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

  const lat = inst.latitude ?? -23.2237;
  const lon = inst.longitude ?? -45.9009;
  const telHref = inst.telefone ? `tel:${inst.telefone.replace(/\D/g, "")}` : null;
  const mailHref = inst.email_contato ? `mailto:${inst.email_contato}` : null;

  const rating = typeof inst.avaliacao === "number" ? inst.avaliacao : null;
  const fullStars = rating ? Math.floor(rating) : 0;
  const emptyStars = 5 - fullStars;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Hero Section com imagem e overlay */}
      <div className="relative">
        {/* Imagem de fundo */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${inst.imagem ?? "/images/default-institution.jpg"})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/70 to-slate-900/90" />
        </div>

        {/* Conteúdo do Hero */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
          {/* Navegação superior */}
          <div className="flex items-center justify-between mb-12">
            <Link
              to="/instituicoes"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white transition group"
            >
              <div className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition">
                <ArrowLeftIcon className="h-4 w-4" />
              </div>
              <span className="font-medium">Voltar</span>
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
                  <HeartSolid className="h-5 w-5 text-red-400" />
                ) : (
                  <HeartIcon className="h-5 w-5" />
                )}
                <span className="hidden sm:inline">{isFavorited ? "Salvo" : "Salvar"}</span>
              </button>
            </div>
          </div>

          {/* Informações principais */}
          <div className="max-w-4xl">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
                inst.tipo === "Público" 
                  ? "bg-green-500/20 text-green-300 border border-green-500/30"
                  : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
              }`}>
                <BuildingLibraryIcon className="h-4 w-4" />
                {inst.tipo}
              </span>
              {inst.area && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  <AcademicCapIcon className="h-4 w-4" />
                  {inst.area}
                </span>
              )}
              {inst.verified && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-primary/20 text-blue-300 border border-primary/30">
                  <CheckBadgeIcon className="h-4 w-4" />
                  Verificado
                </span>
              )}
            </div>

            {/* Título */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              {inst.nome}
            </h1>

            {/* Localização e avaliação */}
            <div className="flex flex-wrap items-center gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <MapPinIcon className="h-5 w-5" />
                <span>{inst.cidade}, {inst.estado}</span>
              </div>
              {rating !== null && (
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(fullStars)].map((_, i) => (
                      <StarSolid key={`full-${i}`} className="h-5 w-5 text-yellow-400" />
                    ))}
                    {[...Array(emptyStars)].map((_, i) => (
                      <StarIcon key={`empty-${i}`} className="h-5 w-5 text-yellow-400/40" />
                    ))}
                  </div>
                  <span className="font-semibold">{rating.toFixed(1)}</span>
                </div>
              )}
            </div>

            {/* Descrição curta */}
            <p className="mt-6 text-lg text-white/80 leading-relaxed max-w-2xl">
              {inst.descricao?.substring(0, 200)}...
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
            <p className="text-sm text-gray-600 mb-1">Matrícula</p>
            <p className="text-xl font-bold text-gray-900">{inst.custo_matricula ?? "Consultar"}</p>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-md p-6 border-t-4 border-blue-500"
          >
            <div className="flex items-center justify-between mb-2">
              <AcademicCapIcon className="h-8 w-8 text-blue-500" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Cursos disponíveis</p>
            <p className="text-xl font-bold text-gray-900">{cursosRelacionados.length}</p>
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
            <p className="text-sm text-gray-600 mb-1">Parcerias</p>
            <p className="text-xl font-bold text-gray-900">{inst.parcerias?.length ?? 0}</p>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-md p-6 border-t-4 border-yellow-500"
          >
            <div className="flex items-center justify-between mb-2">
              <SparklesIcon className="h-8 w-8 text-yellow-500" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Especializações</p>
            <p className="text-xl font-bold text-gray-900">{inst.especializacoes?.length ?? 0}</p>
          </MotionDiv>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Coluna principal (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Sobre */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BuildingLibraryIcon className="h-6 w-6 text-primary" />
                Sobre a Instituição
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {inst.descricao}
              </p>
              {inst.impacto_social && (
                <div className="mt-6 p-4 bg-blue-50 border-l-4 border-primary rounded-r-lg">
                  <p className="text-sm font-semibold text-primary mb-2">Impacto Social</p>
                  <p className="text-gray-700 italic">{inst.impacto_social}</p>
                </div>
              )}
            </MotionDiv>

            {/* Especializações */}
            {inst.especializacoes && inst.especializacoes.length > 0 && (
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <AcademicCapIcon className="h-6 w-6 text-primary" />
                  Áreas de Especialização
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {inst.especializacoes.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                    >
                      <CheckBadgeIcon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </MotionDiv>
            )}

            {/* Cursos relacionados */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <AcademicCapIcon className="h-6 w-6 text-primary" />
                Cursos Disponíveis
                <span className="text-sm font-normal text-gray-500">({cursosRelacionados.length})</span>
              </h2>
              {cursosRelacionados.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <AcademicCapIcon className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p>Nenhum curso cadastrado ainda.</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {cursosRelacionados.map((curso) => (
                    <MotionLink
                      key={curso.id}
                      to={`/curso/${curso.id}`}
                      className="group border-2 border-gray-100 rounded-xl p-4 hover:border-primary hover:shadow-md transition bg-gradient-to-br from-white to-gray-50"
                      whileHover={{ scale: 1.02 }}
                    >
                      <h3 className="font-bold text-gray-900 group-hover:text-primary transition mb-2">
                        {curso.nome}
                      </h3>
                      <span className="inline-block px-2 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded mb-3">
                        {curso.categoria}
                      </span>
                      <div className="space-y-1 text-sm text-gray-600 mb-3">
                        {curso.modalidade && (
                          <p className="flex items-center gap-2">
                            <ClockIcon className="h-4 w-4" />
                            {curso.modalidade}
                          </p>
                        )}
                        {curso.duracao && (
                          <p className="flex items-center gap-2">
                            <ClockIcon className="h-4 w-4" />
                            {curso.duracao}
                          </p>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">{curso.descricao}</p>
                    </MotionLink>
                  ))}
                </div>
              )}
            </MotionDiv>

            {/* Mapa */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPinIcon className="h-6 w-6 text-primary" />
                Localização
              </h2>
              <div className="h-96 rounded-xl overflow-hidden border-2 border-gray-100">
                <MapContainer center={[lat, lon]} zoom={13} style={{ height: "100%", width: "100%" }}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  />
                  <Marker position={[lat, lon]}>
                    <Popup>
                      <div className="p-2">
                        <p className="font-semibold mb-1">{inst.nome}</p>
                        <p className="text-sm text-gray-600 mb-2">{inst.endereco}</p>
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${lat},${lon}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary hover:underline text-sm font-medium"
                        >
                          Abrir no Google Maps →
                        </a>
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Endereço completo:</p>
                <p className="text-gray-900 font-medium">{inst.endereco}</p>
                <p className="text-gray-700">{inst.cidade}, {inst.estado}</p>
              </div>
            </MotionDiv>
          </div>

          {/* Sidebar (1/3) */}
          <div className="space-y-6">
            {/* Contato */}
            <MotionDiv
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-md p-6 top-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Informações de Contato</h3>
              <div className="space-y-4">
                {telHref && (
                  <a
                    href={telHref}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition group"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition">
                      <PhoneIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500">Telefone</p>
                      <p className="font-medium text-gray-900 truncate">{inst.telefone}</p>
                    </div>
                  </a>
                )}

                {mailHref && (
                  <a
                    href={mailHref}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition group"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition">
                      <EnvelopeIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="font-medium text-gray-900 truncate">{inst.email_contato}</p>
                    </div>
                  </a>
                )}

                {inst.site && (
                  <a
                    href={safeLink(inst.site)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition group"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition">
                      <GlobeAltIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500">Site oficial</p>
                      <p className="font-medium text-gray-900 truncate flex items-center gap-1">
                        Visitar site
                        <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                      </p>
                    </div>
                  </a>
                )}
              </div>

              {/* CTA Button */}
              {inst.site && (
                <a
                  href={safeLink(inst.site)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 w-full flex items-center justify-center gap-2 bg-primary text-white font-semibold py-3 px-6 rounded-lg hover:from-primary-dark hover:to-indigo-700 transition shadow-md hover:shadow-md"
                >
                  Visitar Site Oficial
                  <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                </a>
              )}
            </MotionDiv>

            {/* Parcerias */}
            {inst.parcerias && inst.parcerias.length > 0 && (
              <MotionDiv
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <UserGroupIcon className="h-5 w-5 text-primary" />
                  Parcerias
                </h3>
                <div className="flex flex-wrap gap-2">
                  {inst.parcerias.map((p, i) => (
                    <span
                      key={i}
                      className="inline-block px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </MotionDiv>
            )}

            {/* Projetos em andamento */}
            {inst.projetos_em_andamento && inst.projetos_em_andamento.length > 0 && (
              <MotionDiv
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <SparklesIcon className="h-5 w-5 text-primary" />
                  Projetos Ativos
                </h3>
                <ul className="space-y-2">
                  {inst.projetos_em_andamento.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </MotionDiv>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}