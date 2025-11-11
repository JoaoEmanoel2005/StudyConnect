import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  StarIcon,
  CheckBadgeIcon,
  ArrowTopRightOnSquareIcon,
  MapPinIcon,
  PhoneIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkSolidIcon } from "@heroicons/react/24/solid";

import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

export default function InstitutionCard({ instituicao }) {
  const { usuario, toggleInstituicaoFavorita } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Protege contra props indefinidas
  if (!instituicao) return null;

  const estaFavorita = Array.isArray(usuario?.instituicoesSalvas)
    ? usuario.instituicoesSalvas.includes(instituicao.id)
    : false;

  const rating = typeof instituicao.avaliacao === "number" ? instituicao.avaliacao : 4.5;

  const handleSalvar = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (!usuario) {
      setShowModal(true);
      return;
    }

    toggleInstituicaoFavorita(instituicao.id);

    toast.success(
      estaFavorita
        ? "Instituição removida dos favoritos 🗑️"
        : "Instituição adicionada aos favoritos ⭐",
      { duration: 3000 }
    );
  };

  return (
    <>
      <Link
        to={instituicao.id ? `/instituicao/${instituicao.id}` : "#"}
        className="block group"
        aria-label={`Abrir ${instituicao.nome ?? "Instituição"}`}
      >
        <article className="bg-white rounded-2xl shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col min-h-[520px]">
          <div className="relative">
            <img
              src={instituicao.imagem ?? "/placeholder.png"}
              alt={instituicao.nome ?? "Instituição"}
              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Botão de salvar no topo */}
            <button
              aria-label="Salvar instituição"
              onClick={handleSalvar}
              className="absolute top-3 right-3 p-2 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 shadow"
            >
              {estaFavorita ? (
                <BookmarkSolidIcon className="h-5 w-5 text-white" />
              ) : (
                <BookmarkIcon className="h-5 w-5 text-white/90" />
              )}
            </button>

            {/* Avaliação */}
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow">
              <StarIcon className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-medium text-gray-800">{rating.toFixed(1)}</span>
            </div>
          </div>

          <div className="pt-8 px-4 pb-5 flex flex-col flex-1">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  {instituicao.nome ?? "Instituição"}
                  {instituicao.verified && <CheckBadgeIcon className="h-5 w-5 text-accent" />}
                </h3>
                {instituicao.area && (
                  <p className="text-sm text-indigo-600 font-medium mt-1">{instituicao.area}</p>
                )}

                {instituicao.cidade && (
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                    <MapPinIcon className="h-4 w-4 text-gray-400" />
                    <span>{instituicao.cidade}</span>
                  </div>
                )}
              </div>
            </div>

            <p className="text-sm text-gray-600 mt-3 line-clamp-3 flex-1">
              {instituicao.descricao ?? "Descrição não disponível."}
            </p>

            <div className="mt-4 flex items-center justify-between gap-3">
              <Link
                to={instituicao.id ? `/instituicao/${instituicao.id}` : "#"}
                className="flex-1 inline-flex items-center justify-center bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent-dark transition-all duration-300 font-semibold shadow"
              >
                Ver cursos
              </Link>

              <button
                onClick={handleSalvar}
                className="p-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
                aria-label="Salvar instituição"
              >
                {estaFavorita ? (
                  <BookmarkSolidIcon className="h-5 w-5 text-accent" />
                ) : (
                  <BookmarkIcon className="h-5 w-5" />
                )}
              </button>

              {instituicao.site && (
                <a
                  href={instituicao.site}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
                  aria-label="Abrir site"
                >
                  <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                </a>
              )}
            </div>

            <div className="mt-3 pt-3 border-t text-sm text-gray-600 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <PhoneIcon className="h-4 w-4 text-gray-400" />
                <span>{instituicao.telefone ?? "—"}</span>
              </div>
            </div>
          </div>
        </article>
      </Link>

      {/* Modal de login */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>

            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Faça login para salvar instituições
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Crie uma conta ou entre na sua para salvar instituições no seu perfil.
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => navigate("/login")}
                className="flex-1 bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent-dark transition-all"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/cadastro")}
                className="flex-1 border border-accent text-accent px-4 py-2 rounded-lg hover:bg-accent/10 transition-all"
              >
                Criar conta
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
