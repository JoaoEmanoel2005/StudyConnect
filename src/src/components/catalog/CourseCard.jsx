import { UserGroupIcon, ClockIcon, CurrencyDollarIcon, BookmarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function CourseCard({ curso, className }) {
  return (
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
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-accent hover:text-white transition-all duration-300 shadow-md"
        >
          <BookmarkIcon className="h-5 w-5 text-gray-500 group-hover:text-white" />
        </button>
      </div>

      {/* Conteúdo */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-textprimary mb-2 line-clamp-2">{curso.nome}</h3>

        <div className="flex flex-wrap gap-2 mb-3">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">{curso.tipo}</span>
          <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">{curso.categoria}</span>
        </div>

        {/* Descrição cresce/encolhe de acordo com o espaço */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">{curso.descricao}</p>

        {/* Detalhes rápidos */}
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

        {/* Botão sempre grudado no fim */}
        <Link
          to={`/curso/${curso.id}`}
          className="mt-auto inline-block bg-primary text-white text-center px-4 py-2 rounded-lg hover:bg-primary-dark transition-all duration-300 font-semibold"
        >
          Ver curso
        </Link>
      </div>
    </div>
  );
}
