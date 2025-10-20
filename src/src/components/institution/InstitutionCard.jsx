import { Link } from "react-router-dom";
import {
  StarIcon,
  CheckBadgeIcon,
  ArrowTopRightOnSquareIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";

export default function InstitutionCard({ item }) {
  const rating = item.avaliacao ?? 4.5;
  const priceLabel = item.custo_matricula ?? "Gratuito";

  return (
    <Link
      to={item.id ? `/instituicao/${item.id}` : "#"}
      className="block group"
      aria-label={`Abrir ${item.nome}`}
    >
      <article className="bg-white rounded-2xl shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col min-h-[520px]">
        <div className="relative">
          <img
            src={item.imagem}
            alt={item.nome}
            className="w-full h-44 object-cover"
          />

          {/* Top-right tags */}
          <div className="absolute top-3 right-3 flex items-center gap-2">
            {item.tipo && (
              <span className="px-2 py-1 rounded-full text-xs font-semibold bg-primary text-white shadow">
                {item.tipo}
              </span>
            )}
            {item.custo_matricula && (
              <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-600 text-white shadow">
                {item.custo_matricula}
              </span>
            )}
          </div>
        </div>

        <div className="pt-8 px-4 pb-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                {item.nome}
                {item.verified && (
                  <CheckBadgeIcon className="h-5 w-5 text-primary" />
                )}
              </h3>
              <p className="text-sm text-indigo-600 font-medium mt-1">
                {item.area}
              </p>

              <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                <MapPinIcon className="h-4 w-4 text-gray-400" />
                <span>
                  {item.cidade}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg">
                <StarIcon className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-semibold text-gray-800">
                  {rating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-3 line-clamp-3">
            {item.descricao ?? "Descrição não disponível."}
          </p>

          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {(item.tags ?? []).slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Link
                to={item.id ? `/instituicao/${item.id}` : "#"}
                className="px-3 py-2 text-sm bg-primary text-white rounded-lg shadow hover:bg-primary/90 transition"
              >
                Ver cursos
              </Link>

              {item.site && (
                <a
                  href={item.site}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
                  aria-label="Abrir site"
                >
                  <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          <div className="mt-3 pt-3 border-t text-sm text-gray-600 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <PhoneIcon className="h-4 w-4 text-gray-400" />
              <span>{item.telefone ?? "—"}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
