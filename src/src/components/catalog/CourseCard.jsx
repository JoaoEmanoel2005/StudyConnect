import { useState } from "react";
import { UserGroupIcon, ClockIcon, CurrencyDollarIcon, BookmarkIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkSolidIcon } from "@heroicons/react/24/solid"; // preenchido

import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function CourseCard({ curso, className }) {
  const { usuario, toggleCursoFavorito } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSalvar = () => {
    if (!usuario) {
      setShowModal(true); // abre modal se não logado
    } else {
      toggleCursoFavorito(curso.id);
    }
  };

  return (
    <>
      <div
        className={`bg-white shadow-md border rounded-xl overflow-hidden group transition-all duration-300 flex flex-col min-h-[520px] ${className}`}
      >
        {/* Imagem + Favoritar */}
        <div className="relative">
          <img
            src={curso.imagem}
            alt={curso.nome}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <button
            aria-label="Adicionar aos favoritos"
            onClick={handleSalvar}
            className="absolute top-3 right-3 p-2 rounded-full bg-accent/65 hover:bg-accent transition-all duration-300 shadow-md"
          >
            {usuario?.cursosSalvos?.includes(curso.id) ? (
              <BookmarkSolidIcon className="h-5 w-5 text-white" />
            ) : (
              <BookmarkIcon className="h-5 w-5 text-white/80 group-hover:text-white" />
            )}
          </button>

        </div>

        {/* Conteúdo */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-xl font-bold text-textprimary mb-2 line-clamp-2">{curso.nome}</h3>

          <div className="flex flex-wrap gap-2 mb-3">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">{curso.tipo}</span>
            <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">{curso.categoria}</span>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">{curso.descricao}</p>

          <div className="grid grid-cols-1 gap-y-2 text-gray-700 text-sm mb-4">
            <div className="flex items-center gap-1">
              <UserGroupIcon className="h-5 w-5 text-gray-500" /> {curso.vagas}
            </div>
            <div className="flex items-center gap-1">
              <ClockIcon className="h-5 w-5 text-gray-500" /> {curso.horario}
            </div>
            <div className="flex items-center gap-1">
              <CurrencyDollarIcon className="h-5 w-5 text-gray-500" /> {curso.custo}
            </div>
          </div>

          <Link
            to={`/curso/${curso.id}`}
            className="mt-auto inline-block bg-primary text-white text-center px-4 py-2 rounded-lg hover:bg-primary-dark transition-all duration-300 font-semibold"
          >
            Ver curso
          </Link>
        </div>
      </div>

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
