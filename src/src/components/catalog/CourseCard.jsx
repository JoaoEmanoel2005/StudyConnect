import { useState } from "react";
import {
  UserGroupIcon,
  ClockIcon,
  CurrencyDollarIcon,
  BookmarkIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkSolidIcon } from "@heroicons/react/24/solid"; // preenchido
import { StarIcon } from "@heroicons/react/24/solid";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function CourseCard({ curso, className = "" }) {
  const { usuario, toggleCursoFavorito } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSalvar = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!usuario) {
      setShowModal(true); // abre modal se não logado
    } else {
      toggleCursoFavorito(curso.id);
    }
  };

  const rating = curso.avaliacao ?? 4.6;
  const priceLabel = curso.custo ?? "Gratuito";

  return (
    <>
      <Link
        to={`/curso/${curso.id}`}
        className={`block group ${className}`}
        aria-label={`Abrir ${curso.nome}`}
      >
        <article className="bg-white rounded-2xl shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col min-h-[520px]">
          {/* Top image */}
          <div className="relative overflow-hidden">
            <img
              src={curso.imagem}
              alt={curso.nome}
              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Favorite button */}
            <button
              aria-label="Adicionar aos favoritos"
              onClick={handleSalvar}
              className="absolute top-3 right-3 p-2 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 shadow"
            >
              {usuario?.cursosSalvos?.includes(curso.id) ? (
                <BookmarkSolidIcon className="h-5 w-5 text-white" />
              ) : (
                <BookmarkIcon className="h-5 w-5 text-white/90" />
              )}
            </button>

            {/* Rating badge */}
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow">
              <StarIcon className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-medium text-gray-800">{rating.toFixed(1)}</span>
            </div>           
          </div>

          {/* Content */}
          <div className="pt-8 px-3 pb-5 flex flex-col flex-1">
            <div className="flex items-start justify-between gap-3">
              <div className="pr-2">
                <h3 className="text-lg font-semibold text-textprimary mb-1 line-clamp-2">
                  {curso.nome}
                </h3>
                <div className="text-sm text-indigo-500 mb-2">{curso.categoria}</div>

                <p className="text-gray-600 text-sm line-clamp-3">{curso.descricao}</p>

                
              </div>
            </div>

            <div className="grid grid-cols-1 gap-y-2 text-gray-700 text-sm mt-4">
              <div className="flex items-center gap-2">
                <UserGroupIcon className="h-5 w-5 text-gray-500" />
                <span>{curso.vagas ?? "—"} vagas</span>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="h-5 w-5 text-gray-500" />
                <span>{curso.horario}</span>
              </div>
              <div className="flex items-center gap-2">
                <CurrencyDollarIcon className="h-5 w-5 text-gray-500" />
                <span>{priceLabel}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <Link
                to={`/curso/${curso.id}`}
                className="flex-1 inline-flex items-center justify-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-all duration-300 font-semibold shadow"
              >
                Ver curso
              </Link>

              <button
                onClick={handleSalvar}
                className="p-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
                aria-label="Salvar curso"
              >
                {usuario?.cursosSalvos?.includes(curso.id) ? (
                  <BookmarkSolidIcon className="h-5 w-5 text-primary" />
                ) : (
                  <BookmarkIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </article>
      </Link>

      {/* Modal estilizado */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>

            <h2 className="text-lg font-semibold text-gray-800 mb-2">Faça login para salvar cursos</h2>
            <p className="text-sm text-gray-600 mb-4">
              Crie uma conta ou entre na sua para salvar cursos no seu perfil.
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => navigate("/login")}
                className="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-all"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/cadastro")}
                className="flex-1 border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary/10 transition-all"
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
