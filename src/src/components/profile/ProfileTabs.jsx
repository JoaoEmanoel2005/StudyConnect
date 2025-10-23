import {
  BookmarkIcon,
  TrashIcon,
  ArrowRightIcon,
  StarIcon,
  TagIcon,
  RocketLaunchIcon,
  CogIcon,
  BuildingOfficeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function ProfileTabs({
  activeTab,
  setActiveTab,
  savedCursos = [],
  savedInstitutions = [], // Add this prop
  toggleCursoFavorito,
  toggleInstituicaoFavorita, // Add this prop
}) {
  const tabs = [
    { id: "saved", label: "Cursos Salvos", icon: BookmarkIcon },
    { id: "institutions", label: "Instituições Salvas", icon: BookmarkIcon },
    { id: "progress", label: "Progresso", icon: RocketLaunchIcon },
    { id: "certificates", label: "Certificados", icon: StarIcon },
    { id: "settings", label: "Configurações", icon: CogIcon },
  ];

  const handleRemoveAll = () => {
    if (savedCursos.length === 0) return;
    if (confirm("Remover todos os cursos salvos?")) {
      savedCursos.forEach((curso) => toggleCursoFavorito(curso.id));
    }
  };

  const handleRemoveAllInstitutions = () => {
    if (savedInstitutions.length === 0) return;
    if (confirm("Remover todas as instituições salvas?")) {
      savedInstitutions.forEach((inst) => toggleInstituicaoFavorita(inst.id));
    }
  };

  return (
    <>
      <tab className="flex border-b mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1 px-6 py-3 font-medium text-sm border-b-2 -mb-px transition ${
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.icon && <tab.icon className="h-5 w-5" />}
            {tab.label}
          </button>
        ))}
      </tab>

      <div className="pb-12">
        {activeTab === "saved" && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg text-textprimary font-semibold flex items-center gap-2">
                <BookmarkIcon className="h-5 w-5 text-primary" />
                Cursos Salvos
              </h2>
              {savedCursos.length > 0 && (
                <button
                  onClick={handleRemoveAll}
                  className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
                >
                  <TrashIcon className="h-4 w-4" /> Limpar todos
                </button>
              )}
            </div>

            {savedCursos.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed">
                <BookmarkIcon className="h-12 w-12 text-gray-400 mx-auto" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  Nenhum curso salvo
                </h3>
                <p className="mt-2 text-gray-500">
                  Explore nosso catálogo e salve os cursos do seu interesse.
                </p>
                <Link
                  to="/catalogo"
                  className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:opacity-90 transition"
                >
                  Explorar Cursos
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 rounded-xl border-2 border-dashed p-4">
                {savedCursos.map((curso) => (
                  <CourseCard
                    key={curso.id}
                    curso={curso}
                    onRemove={() => toggleCursoFavorito(curso.id)}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === "institutions" && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg text-textprimary font-semibold flex items-center gap-2">
                <BuildingOfficeIcon className="h-5 w-5 text-primary" />
                Instituições Salvas
              </h2>
              {savedInstitutions.length > 0 && (
                <button
                  onClick={handleRemoveAllInstitutions}
                  className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
                >
                  <TrashIcon className="h-4 w-4" /> Limpar todas
                </button>
              )}
            </div>

            {savedInstitutions.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed">
                <BuildingOfficeIcon className="h-12 w-12 text-gray-400 mx-auto" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  Nenhuma instituição salva
                </h3>
                <p className="mt-2 text-gray-500">
                  Explore nossa rede de instituições parceiras e salve as de seu interesse.
                </p>
                <Link
                  to="/instituicoes"
                  className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:opacity-90 transition"
                >
                  Ver Instituições
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 rounded-xl border-2 border-dashed p-4">
                {savedInstitutions.map((institution) => (
                  <InstitutionCard
                    key={institution.id}
                    institution={institution}
                    onRemove={() => toggleInstituicaoFavorita(institution.id)}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === "progress" && (
          <section className="space-y-6">
            <div className="">
              <h3 className="text-lg text-textprimary font-semibold flex items-center gap-2 mb-4">
                <RocketLaunchIcon className="h-5 w-5 text-primary" />
                Progresso Geral
            </h3>
              <div className="space-y-4 text-gray-500">
                {/* Aqui entram gráficos, barras de progresso, etc */}
                <p>Em breve: estatísticas detalhadas de aprendizado 🚀</p>
              </div>
            </div>
          </section>
        )}

        {activeTab === "certificates" && (
          <section className="space-y-6">
            <div className="">
              <h3 className="text-lg text-textprimary font-semibold flex items-center gap-2 mb-4">
                <StarIcon className="h-5 w-5 text-primary" />
                Certificados Conquistados
              </h3>
              <p className="text-gray-500">
                Nenhum certificado ainda. Continue estudando! 💪
              </p>
            </div>
          </section>
        )}

        {activeTab === "settings" && (
          <section className="space-y-6">
            <div className="">
              <h3 className="text-lg text-textprimary font-semibold flex items-center gap-2 mb-4">
                <CogIcon className="h-5 w-5 text-primary" />
                Configurações da Conta
              </h3>
              <p className="text-gray-500">Ajustes de preferências e privacidade.</p>
            </div>
          </section>
        )}
      </div>
    </>
  );
}

// Subcomponente seguro
const CourseCard = ({ curso, onRemove }) => {
  if (!curso) return null;
  return (
    <div className="bg-white rounded-xl border shadow-sm hover:shadow-md transition overflow-hidden flex">
      <div className="w-32 h-32 flex-shrink-0">
        <img
          src={curso.imagem || "/placeholder.jpg"}
          alt={curso.nome || "Curso"}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 p-4">
        <div className="flex items-start justify-between">
          <div>
            <Link
              to={`/curso/${curso.id}`}
              className="font-medium text-gray-900 hover:text-primary"
            >
              {curso.nome ?? "Curso sem nome"}
            </Link>
            <p className="text-sm text-gray-500">{curso.instituicao ?? "—"}</p>
          </div>

          <button
            onClick={onRemove}
            className="text-gray-400 hover:text-red-500"
            title="Remover dos salvos"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <TagIcon className="h-4 w-4" />
            {curso.categoria ?? "Sem categoria"}
          </span>
          <span className="flex items-center gap-1">
            <StarIcon className="h-4 w-4" />
            {curso.avaliacao ?? "N/A"}
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-900">
            {curso.custo ?? "Gratuito"}
          </span>
          <Link
            to={`/curso/${curso.id}`}
            className="text-sm text-primary hover:text-primary-dark font-medium"
          >
            Ver detalhes
          </Link>
        </div>
      </div>
    </div>
  );
};

// Add new InstitutionCard component
const InstitutionCard = ({ institution, onRemove }) => {
  if (!institution) return null;
  return (
    <div className="bg-white rounded-xl border shadow-sm hover:shadow-md transition overflow-hidden flex">
      <div className="w-32 h-32 flex-shrink-0">
        <img
          src={institution.imagem || "/placeholder-institution.jpg"}
          alt={institution.nome || "Instituição"}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 p-4">
        <div className="flex items-start justify-between">
          <div>
            <Link
              to={`/instituicao/${institution.id}`}
              className="font-medium text-gray-900 hover:text-primary"
            >
              {institution.nome ?? "Instituição sem nome"}
            </Link>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <MapPinIcon className="h-4 w-4" />
              {institution.cidade ?? "—"}, {institution.estado ?? "—"}
            </p>
          </div>

          <button
            onClick={onRemove}
            className="text-gray-400 hover:text-red-500"
            title="Remover dos salvos"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <BuildingOfficeIcon className="h-4 w-4" />
            {institution.tipo ?? "Não especificado"}
          </span>
          <span className="flex items-center gap-1">
            <StarIcon className="h-4 w-4" />
            {institution.avaliacao ?? "N/A"}
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-900">
            {institution.custo_matricula ?? "Gratuito"}
          </span>
          <Link
            to={`/instituicao/${institution.id}`}
            className="text-sm text-primary hover:text-primary-dark font-medium"
          >
            Ver detalhes
          </Link>
        </div>
      </div>
    </div>
  );
};
