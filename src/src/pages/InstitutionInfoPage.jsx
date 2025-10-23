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
  StarIcon as StarOutline,
  HeartIcon as HeartOutline,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolid, HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { instituicao } from "../data/Institution";
import { cursos } from "../data/Courses";
import { useAuth } from "../context/AuthContext";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";
const MotionLink = motion(Link);

export default function InstitutionPage() {
  const { id } = useParams();
  const { usuario, toggleInstituicaoFavorita } = useAuth();

  const inst = instituicao.find((i) => i.id === Number(id));
  const cursosRelacionados = cursos.filter((c) => c.instituicao_id === Number(id));

  const [isFavorited, setIsFavorited] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const favs = usuario?.instituicoesFavoritas ?? usuario?.favoritas ?? [];
    setIsFavorited(Array.isArray(favs) ? favs.includes(inst?.id) : false);
  }, [usuario, inst]);

  if (!inst) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20 text-gray-500">
        Instituição não encontrada.
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
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Erro ao copiar link:", err);
        alert("Não foi possível copiar o link. Tente manualmente.");
      }
    } else {
      window.prompt("Copie a URL abaixo:", url);
    }
  };

  const handleToggleFavorite = () => {
    setIsFavorited((s) => !s);
    try {
      if (typeof toggleInstituicaoFavorita === "function") toggleInstituicaoFavorita(inst.id);
    } catch (err) {
      console.error("Erro ao alternar favorito:", err);
    }
  };

  const lat = inst.latitude ?? -23.2237;
  const lon = inst.longitude ?? -45.9009;
  const telHref = inst.telefone ? `tel:${inst.telefone.replace(/\D/g, "")}` : null;
  const mailHref = inst.email_contato ? `mailto:${inst.email_contato}` : null;

  const rating = typeof inst.avaliacao === "number" ? inst.avaliacao : null;
  const fullStars = rating ? Math.floor(rating) : 0;
  const showHalf = rating && rating - fullStars >= 0.5;

  // Exemplo de reviews fictícios
  const reviews = [
    { id: 1, nome: "João Silva", nota: 5, comentario: "Excelente instituição, recomendo!" },
    { id: 2, nome: "Maria Santos", nota: 4, comentario: "Ótimos cursos, professores muito bons." },
    { id: 3, nome: "Pedro Costa", nota: 4.5, comentario: "Infraestrutura moderna e bem organizada." },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header com banner */}
      <header
        className="relative h-64 sm:h-80 md:h-96 flex items-center z-0"
        role="banner"
        aria-label={`Banner da instituição ${inst.nome}`}
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.45)), url(${inst.imagem ?? "/images/default-institution.jpg"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between text-white">
            <nav aria-label="Breadcrumb" className="text-sm">
              <Link
                to="/instituicoes"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white transition"
              >
                <ArrowLeftIcon className="h-4 w-4" />
                Voltar ao catálogo
              </Link>
            </nav>
            <div className="flex items-center gap-3">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full text-sm hover:bg-white/20 transition"
                aria-label="Compartilhar instituição"
                title="Compartilhar"
              >
                <ShareIcon className="h-4 w-4" />
                {copied ? "Link copiado" : "Compartilhar"}
              </button>

              <button
                onClick={handleToggleFavorite}
                className="inline-flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full text-sm hover:bg-white/20 transition"
                aria-pressed={isFavorited}
                aria-label={isFavorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                title={isFavorited ? "Favorito" : "Adicionar aos favoritos"}
              >
                {isFavorited ? (
                  <HeartSolid className="h-4 w-4 text-red-400" />
                ) : (
                  <HeartOutline className="h-4 w-4" />
                )}
                {isFavorited ? "Favorito" : "Favoritar"}
              </button>

              {inst.site && (
                <a
                  href={safeLink(inst.site)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full text-sm hover:bg-white/20 transition"
                  aria-label="Abrir site da instituição"
                  title="Abrir site da instituição"
                >
                  <GlobeAltIcon className="h-4 w-4" />
                  Site oficial
                </a>
              )}
            </div>
          </div>

          {/* Título e categorias */}
          <div className="mt-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-lg">
              {inst.nome}
            </h1>
            <div className="mt-4 flex flex-wrap justify-center gap-3 items-center">
              <span className="bg-blue-500/80 px-3 py-1 rounded-full text-sm">
                {inst.tipo ?? "Instituição de Ensino"}
              </span>
              {inst.area && (
                <span className="bg-indigo-600/80 px-3 py-1 rounded-full text-sm">{inst.area}</span>
              )}
              {rating !== null && (
                <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full text-sm">
                  <span className="flex -space-x-1">
                    {[...Array(fullStars)].map((_, i) => (
                      <StarSolid key={i} className="h-4 w-4 text-yellow-400" />
                    ))}
                    {showHalf && <StarOutline className="h-4 w-4 text-yellow-400" />}
                    {fullStars === 0 && !showHalf && <StarOutline className="h-4 w-4 text-yellow-400" />}
                  </span>
                  <span className="text-white/90 text-sm">{rating.toFixed(1)}</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10 space-y-10">
        {/* Infos principais */}
        <section className="grid md:grid-cols-3 gap-6 bg-white rounded-2xl shadow p-6">
          <div className="space-y-2">
            <h2 className="font-semibold text-gray-800">Localização</h2>
            <p className="text-gray-600 flex items-center gap-2">
              <MapPinIcon className="h-5 w-5 text-primary" />
              {inst.endereco} - {inst.cidade}/{inst.estado}
            </p>
            <p className="mt-2">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${inst.endereco} ${inst.cidade} ${inst.estado}`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-primary hover:underline inline-flex items-center gap-2"
              >
                <ClipboardDocumentIcon className="h-4 w-4" />
                Abrir no Google Maps
              </a>
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="font-semibold text-gray-800">Contato</h2>
            {telHref ? (
              <p className="flex items-center gap-2 text-gray-600">
                <PhoneIcon className="h-5 w-5 text-primary" />
                <a href={telHref} className="hover:underline">
                  {inst.telefone}
                </a>
              </p>
            ) : (
              <p className="text-gray-600 flex items-center gap-2">
                <PhoneIcon className="h-5 w-5 text-primary" /> Não informado
              </p>
            )}

            {mailHref && (
              <p>
                <a
                  href={mailHref}
                  className="text-primary hover:underline inline-flex items-center gap-2"
                >
                  <EnvelopeIcon className="h-5 w-5" />
                  {inst.email_contato}
                </a>
              </p>
            )}
          </div>

          <div className="space-y-2">
            <h2 className="font-semibold text-gray-800">Site / Custo</h2>
            {inst.site ? (
              <a
                href={safeLink(inst.site)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-primary hover:underline"
                title="Abrir site da instituição"
              >
                <GlobeAltIcon className="h-5 w-5" />
                {inst.site}
              </a>
            ) : (
              <p className="text-gray-500">Não informado</p>
            )}
            <p className="text-gray-600 mt-2">
              <strong>Matrícula:</strong> {inst.custo_matricula ?? "Não informado"}
            </p>
          </div>
        </section>

        {/* Galeria */}
        {inst.galeria && inst.galeria.length > 0 && (
          <section className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Galeria</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {inst.galeria.map((img, i) => (
                <motion.img
                  key={i}
                  src={img}
                  loading="lazy"
                  alt={`${inst.nome} - imagem ${i + 1}`}
                  className="w-full h-40 object-cover rounded-lg hover:scale-[1.03] transition-transform"
                  whileHover={{ scale: 1.05 }}
                />
              ))}
            </div>
          </section>
        )}

        {/* Sobre a instituição */}
        <section className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Sobre a instituição</h2>
          <p className="text-gray-600 leading-relaxed">{inst.descricao}</p>
          {inst.impacto_social && (
            <p className="mt-4 text-gray-700 italic border-l-4 border-primary pl-3">
              {inst.impacto_social}
            </p>
          )}
        </section>

        {/* Especializações e projetos */}
        <section className="grid md:grid-cols-2 gap-6">
          {inst.especializacoes && (
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <AcademicCapIcon className="h-5 w-5 text-primary" />
                Áreas de especialização
              </h2>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {inst.especializacoes.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {inst.projetos_em_andamento && (
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <BuildingLibraryIcon className="h-5 w-5 text-primary" />
                Projetos em andamento
              </h2>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {inst.projetos_em_andamento.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* Parcerias */}
        {inst.parcerias && (
          <section className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Parcerias</h2>
            <div className="flex flex-wrap gap-2">
              {inst.parcerias.map((p, i) => (
                <span
                  key={i}
                  className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                >
                  {p}
                </span>
              ))}
            </div>
          </section>
        )}
                {/* Cursos relacionados */}
        <section className="bg-white rounded-2xl shadow p-6">
            {cursosRelacionados.length === 0 ? (
            <p className="text-gray-500">Nenhum curso cadastrado ainda.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cursosRelacionados.map((curso) => (
                <MotionLink
                  key={curso.id}
                  to={`/curso/${curso.id}`}
                  className="border rounded-xl p-4 hover:shadow-lg transition bg-gray-50"
                  whileHover={{ scale: 1.03 }}
                >
                  <h3 className="font-semibold text-gray-800">{curso.nome}</h3>
                  <p className="text-sm text-gray-500 mt-1">{curso.categoria}</p>
                  <div className="text-sm text-gray-600 mt-2 space-y-1">
                    {curso.modalidade && <p>Modalidade: {curso.modalidade}</p>}
                    {curso.turno && <p>Turno: {curso.turno}</p>}
                    {curso.duracao && <p>Duração: {curso.duracao}</p>}
                  </div>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">{curso.descricao}</p>
                </MotionLink>
              ))}
            </div>
          )}
        </section>

        {/* Mapa */}
        <section className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Localização no mapa</h2>
          <div className="h-80 rounded-xl overflow-hidden">
            <MapContainer center={[lat, lon]} zoom={12} style={{ height: "100%", width: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[lat, lon]}>
                <Popup>
                  <div className="space-y-2">
                    <div className="font-semibold">{inst.nome}</div>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${lat},${lon}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary hover:underline text-sm"
                    >
                      Abrir no Google Maps
                    </a>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </section>

        {/* Reviews */}
        <section className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Avaliações de alunos</h2>
          {reviews.length === 0 ? (
            <p className="text-gray-500">Nenhuma avaliação ainda.</p>
          ) : (
            <div className="space-y-4">
              {reviews.map((r) => {
                const full = Math.floor(r.nota);
                const half = r.nota - full >= 0.5;
                return (
                  <motion.div
                    key={r.id}
                    className="p-4 border rounded-lg bg-gray-50 hover:shadow-md transition"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-gray-800">{r.nome}</span>
                      <span className="flex items-center gap-0.5">
                        {[...Array(full)].map((_, i) => (
                          <StarSolid key={i} className="h-4 w-4 text-yellow-400" />
                        ))}
                        {half && <StarOutline className="h-4 w-4 text-yellow-400" />}
                        {full === 0 && !half && <StarOutline className="h-4 w-4 text-yellow-400" />}
                        <span className="text-gray-600 text-sm ml-1">{r.nota.toFixed(1)}</span>
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{r.comentario}</p>
                  </motion.div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
