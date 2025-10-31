import { useState, useEffect, useMemo } from "react";
import {
  FunnelIcon,
  XMarkIcon,
  AcademicCapIcon,
  UserGroupIcon,
  BookOpenIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";
import CourseCard from "../../components/catalog/CourseCard";
import SearchBar from "../../components/catalog/SearchBar";
import FilterSection from "../../components/catalog/FilterSection";
import { filtrosCursos } from "../../data/FiltersConfig";
import { cursos } from "../../data/Courses";

export default function CatalogoCursos() {
  const [searchQuery, setSearchQuery] = useState("");
  const [ordenacao, setOrdenacao] = useState("name-asc");
  const [filtrosAtivos, setFiltrosAtivos] = useState({});
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const cursosPorPagina = 9;

// --- Função auxiliar para normalizar textos e valores ---
const normalize = (val) => {
  if (!val) return "";
  return val
    .toString()
    .trim()
    .toLowerCase()
    .normalize("NFD") // remove acentos
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
};

// Filtragem principal
const cursosFiltrados = useMemo(() => {
  let filtered = [...cursos];

  // Aplica filtros
  Object.entries(filtrosAtivos).forEach(([key, valores]) => {
    if (valores?.length) {
      filtered = filtered.filter((c) => {
        const normalizedValue = normalize(c[key]);
        return valores.some((v) => normalizedValue === normalize(v));
      });
    }
  });

  // Aplica busca
  if (searchQuery.trim()) {
    const query = normalize(searchQuery);
    filtered = filtered.filter(
      (c) =>
        normalize(c.nome).includes(query) ||
        normalize(c.categoria).includes(query) ||
        normalize(c.instituicao).includes(query)
    );
  }

  // Ordenação
  const sortFunctions = {
    "name-asc": (a, b) => a.nome.localeCompare(b.nome),
    "name-desc": (a, b) => b.nome.localeCompare(a.nome),
    "price-asc": (a, b) =>
      Number(a.custo.replace(/[^\d]/g, "")) -
      Number(b.custo.replace(/[^\d]/g, "")),
    "price-desc": (a, b) =>
      Number(b.custo.replace(/[^\d]/g, "")) -
      Number(a.custo.replace(/[^\d]/g, "")),
  };

  return filtered.sort(sortFunctions[ordenacao]);
}, [filtrosAtivos, searchQuery, ordenacao]);


  // Paginação
  const totalPaginas = Math.ceil(cursosFiltrados.length / cursosPorPagina);
  const cursosVisiveis = cursosFiltrados.slice(
    (paginaAtual - 1) * cursosPorPagina,
    paginaAtual * cursosPorPagina
  );

  // Atualiza filtros
  const handleFiltroChange = (sectionId, value) => {
    setFiltrosAtivos((prev) => {
      const prevOptions = prev[sectionId] || [];
      const normalizedValue = normalize(value);
      const normalizedPrev = prevOptions.map(normalize);

      return {
        ...prev,
        [sectionId]: normalizedPrev.includes(normalizedValue)
          ? prevOptions.filter((v) => normalize(v) !== normalizedValue)
          : [...prevOptions, value],
      };
    });
    setPaginaAtual(1);
  };


  const totalFiltrosAtivos = Object.values(filtrosAtivos).flat().length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-20">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
              <BookOpenIcon className="h-4 w-4" />
              <span className="text-sm font-semibold tracking-wide">
                Catálogo Completo
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Encontre o curso ideal para{" "}
              <span className="text-amber-400">sua jornada</span>
            </h1>

            <p className="text-lg text-slate-300 mb-8">
              Explore centenas de cursos de graduação e pós-graduação em
              instituições reconhecidas
            </p>

            {/* Search bar conectada à lógica */}
            <div className="relative max-w-2xl mx-auto">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <BookOpenIcon className="h-5 w-5 text-white" />
              <span className="text-sm">+10 Cursos</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <AcademicCapIcon className="h-5 w-5 text-white" />
              <span className="text-sm">Certificados pelo MEC</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <UserGroupIcon className="h-5 w-5 text-white" />
              <span className="text-sm">+10 Instituições</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

        {/* Onda decorativa */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 30C240 10 480 50 720 30C960 10 1200 50 1440 30V60H0V30Z" fill="#f8fafc" fillOpacity="0.3"/>
            <path d="M0 45C240 25 480 65 720 45C960 25 1200 65 1440 45V60H0V45Z" fill="#f8fafc"/>
          </svg>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header com resultados e ordenação */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">
              {cursosFiltrados.length}{" "}
              {cursosFiltrados.length === 1 ? "curso" : "cursos"}
            </h2>
            <p className="text-sm text-slate-600">
              {totalFiltrosAtivos > 0 &&
                `${totalFiltrosAtivos} filtro(s) aplicado(s)`}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Botão mobile filtros */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border-2 border-slate-200 rounded-lg hover:border-blue-300 transition-colors"
            >
              <FunnelIcon className="h-5 w-5" />
              <span className="font-semibold">Filtros</span>
              {totalFiltrosAtivos > 0 && (
                <span className="px-2 py-0.5 bg-blue-600 text-white text-xs font-bold rounded-full">
                  {totalFiltrosAtivos}
                </span>
              )}
            </button>

            {/* Ordenação */}
            <div className="flex items-center gap-2">
              <AdjustmentsHorizontalIcon className="h-5 w-5 text-slate-400" />
              <select
                value={ordenacao}
                onChange={(e) => setOrdenacao(e.target.value)}
                className="px-4 py-2 bg-white border-2 border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="name-asc">Nome (A-Z)</option>
                <option value="name-desc">Nome (Z-A)</option>
                <option value="price-asc">Menor Preço</option>
                <option value="price-desc">Maior Preço</option>
              </select>
            </div>
          </div>
        </div>

        {/* Layout principal */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filtros */}
          <aside className={`lg:block ${showMobileFilters ? "block" : "hidden"}`}>
            <div className="sticky top-4 bg-white rounded-2xl border-2 border-slate-200 p-6 shadow-md">
              <div className="flex items-center justify-between mb-6">
                <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                  <FunnelIcon className="h-5 w-5 text-blue-600" />
                  Filtros
                </h3>

                {totalFiltrosAtivos > 0 && (
                  <button
                    onClick={() => {
                      setFiltrosAtivos({});
                      setPaginaAtual(1);
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <XMarkIcon className="h-4 w-4" />
                    Limpar
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {filtrosCursos.map((section) => (
                  <FilterSection
                    key={section.id}
                    section={section}
                    filtrosAtivos={filtrosAtivos}
                    handleFiltroChange={handleFiltroChange}
                  />
                ))}
              </div>
            </div>
          </aside>

          {/* Grid de Cursos */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-48 bg-slate-200 rounded-t-2xl" />
                    <div className="p-6 space-y-3 bg-white rounded-b-2xl border-2 border-slate-200">
                      <div className="h-4 bg-slate-200 rounded w-3/4" />
                      <div className="h-4 bg-slate-200 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : cursosVisiveis.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {cursosVisiveis.map((curso) => (
                    <CourseCard key={curso.id} curso={curso} />
                  ))}
                </div>

                {/* Paginação */}
                {totalPaginas > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12">
                    <button
                      onClick={() => setPaginaAtual((p) => Math.max(1, p - 1))}
                      disabled={paginaAtual === 1}
                      className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white border-2 border-slate-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-300 hover:bg-blue-50 transition-all"
                    >
                      Anterior
                    </button>

                    {[...Array(totalPaginas)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setPaginaAtual(i + 1)}
                        className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                          paginaAtual === i + 1
                            ? "bg-blue-600 text-white shadow-lg"
                            : "bg-white text-slate-700 border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}

                    <button
                      onClick={() => setPaginaAtual((p) => Math.min(totalPaginas, p + 1))}
                      disabled={paginaAtual === totalPaginas}
                      className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white border-2 border-slate-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-300 hover:bg-blue-50 transition-all"
                    >
                      Próxima
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-300">
                <div className="max-w-md mx-auto">
                  <div className="inline-flex p-4 bg-slate-100 rounded-full mb-4">
                    <MagnifyingGlassIcon className="h-10 w-10 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Nenhum curso encontrado
                  </h3>
                  <p className="text-slate-600 mb-6">
                    Tente ajustar seus filtros ou termos de busca
                  </p>
                  <button
                    onClick={() => {
                      setFiltrosAtivos({});
                      setSearchQuery("");
                      setPaginaAtual(1);
                    }}
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Limpar filtros
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
