import { useState, useEffect, useMemo } from "react";
import {
  FunnelIcon,
  XMarkIcon,
  BuildingLibraryIcon,
  AcademicCapIcon,
  MapPinIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";

import InstitutionCard from "../../components/institution/InstitutionCard";
import SearchBar from "../../components/institution/SearchBar"; 
import FilterSection from "../../components/institution/FilterSection"; 
import { filtrosInstituicoes } from "../../data/InstituionFilters";
import { instituicao as sampleInstituicoes } from "../../data/Institution";

export default function CatalogoInstituicoes() {
  const [searchQuery, setSearchQuery] = useState("");
  const [ordenacao, setOrdenacao] = useState("name-asc");
  const [filtrosAtivos, setFiltrosAtivos] = useState({});
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const itensPorPagina = 9;

  // Sempre resetar página ao alterar filtros ou busca
  useEffect(() => setPaginaAtual(1), [searchQuery, filtrosAtivos]);

  // Simulação de loading (opcional)
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [searchQuery, filtrosAtivos, ordenacao]);

  // Filtragem, busca e ordenação
  const instituicoesFiltradas = useMemo(() => {
  let filtered = [...sampleInstituicoes];

  // Filtros ativos (tipo, estado, cidade, etc.)
  Object.entries(filtrosAtivos).forEach(([key, valores]) => {
    if (valores?.length) {
      filtered = filtered.filter((inst) =>
        valores.some((v) => inst[key]?.toLowerCase() === v.toLowerCase())
      );
    }
  });

  // Pesquisa
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (inst) =>
        inst.nome.toLowerCase().includes(query) ||
        inst.sigla?.toLowerCase().includes(query) ||
        inst.cidade?.toLowerCase().includes(query) ||
        inst.tipo?.toLowerCase().includes(query)
    );
  }

  // Ordenação
  const sortFunctions = {
    "name-asc": (a, b) => a.nome.localeCompare(b.nome),
    "name-desc": (a, b) => b.nome.localeCompare(a.nome),
    "city-asc": (a, b) => a.cidade.localeCompare(b.cidade),
    "courses-desc": (a, b) => b.cursosDisponiveis - a.cursosDisponiveis,
  };

  return filtered.sort(sortFunctions[ordenacao]);
}, [filtrosAtivos, searchQuery, ordenacao]);

  // Paginação
  const totalPaginas = Math.ceil(instituicoesFiltradas.length / itensPorPagina);
  const visiveis = instituicoesFiltradas.slice(
    (paginaAtual - 1) * itensPorPagina,
    paginaAtual * itensPorPagina
  );

  const handleFiltroChange = (sectionId, value) => {
    setFiltrosAtivos((prev) => {
      const prevOptions = prev[sectionId] || [];
      return {
        ...prev,
        [sectionId]: prevOptions.includes(value)
          ? prevOptions.filter((v) => v !== value)
          : [...prevOptions, value],
      };
    });
  };

  const totalFiltrosAtivos = Object.values(filtrosAtivos).flat().length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/30 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-amber-600 via-amber-500 to-orange-600 text-white overflow-hidden">
        {/* Padrão decorativo */}
        <div className="absolute inset-0">
          <svg className="w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1.5" fill="currentColor"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-700/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-20">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full mb-6">
              <BuildingLibraryIcon className="h-4 w-4" />
              <span className="text-sm font-semibold tracking-wide">Instituições Parceiras</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Conheça nossas <span className="text-amber-900">instituições de excelência</span>
            </h1>
            <p className="text-lg text-amber-50 mb-8">
              Universidades e faculdades reconhecidas pelo MEC, comprometidas com educação de qualidade
            </p>

            {/* Search bar */}
            <div className="relative max-w-2xl mx-auto">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <BuildingLibraryIcon className="h-5 w-5 text-white" />
              <div className="text-sm">+10 Instituições</div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <AcademicCapIcon className="h-5 w-5 text-white" />
              <div className="text-sm">+10 Cursos Ofertados</div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <MapPinIcon className="h-5 w-5 text-white" />
              <div className="text-sm">26 Estados e um Distrito Federal</div>
            </div>
          </div>
        </div>

        {/* Onda decorativa */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 30C240 10 480 50 720 30C960 10 1200 50 1440 30V60H0V30Z" fill="white" fillOpacity="0.3"/>
            <path d="M0 45C240 25 480 65 720 45C960 25 1200 65 1440 45V60H0V45Z" fill="white"/>
          </svg>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 pb-6 border-b-2 border-amber-200">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">
              {instituicoesFiltradas.length} {instituicoesFiltradas.length === 1 ? "instituição" : "instituições"}
            </h2>
            <p className="text-sm text-slate-600">
              {totalFiltrosAtivos > 0 && `${totalFiltrosAtivos} filtro(s) aplicado(s)`}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border-2 border-amber-200 rounded-lg hover:border-amber-400 transition-colors"
            >
              <FunnelIcon className="h-5 w-5 text-amber-600" />
              <span className="font-semibold text-amber-900">Filtros</span>
              {totalFiltrosAtivos > 0 && (
                <span className="px-2 py-0.5 bg-amber-600 text-white text-xs font-bold rounded-full">
                  {totalFiltrosAtivos}
                </span>
              )}
            </button>

            <div className="flex items-center gap-2">
              <AdjustmentsHorizontalIcon className="h-5 w-5 text-amber-600" />
              <select
                value={ordenacao}
                onChange={(e) => setOrdenacao(e.target.value)}
                className="px-4 py-2 bg-white border-2 border-amber-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="name-asc">Nome (A-Z)</option>
                <option value="name-desc">Nome (Z-A)</option>
                <option value="city-asc">Cidade (A-Z)</option>
                <option value="courses-desc">Mais Cursos</option>
              </select>
            </div>
          </div>
        </div>

        {/* Layout principal */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className={`lg:block ${showMobileFilters ? 'block' : 'hidden'}`}>
            <div className="sticky top-4 bg-white rounded-2xl border-2 border-amber-200 p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                  <FunnelIcon className="h-5 w-5 text-amber-600" />
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
                {filtrosInstituicoes.map((section) => (
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


          {/* Grid de instituições */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-48 bg-amber-100 rounded-t-2xl" />
                    <div className="p-6 space-y-3 bg-white rounded-b-2xl border-2 border-amber-100">
                      <div className="h-4 bg-amber-100 rounded w-3/4" />
                      <div className="h-4 bg-amber-100 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : visiveis.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {visiveis.map((inst) => (
                    <InstitutionCard key={inst.id} instituicao={inst} />
                  ))}
                </div>

                {/* Paginação */}
                {totalPaginas > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12">
                    <button
                      onClick={() => setPaginaAtual((p) => Math.max(1, p - 1))}
                      disabled={paginaAtual === 1}
                      className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white border-2 border-amber-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-amber-400 hover:bg-amber-50 transition-all"
                    >
                      Anterior
                    </button>

                    {[...Array(totalPaginas)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setPaginaAtual(i + 1)}
                        className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                          paginaAtual === i + 1
                            ? "bg-amber-600 text-white shadow-lg"
                            : "bg-white text-slate-700 border-2 border-amber-200 hover:border-amber-400 hover:bg-amber-50"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}

                    <button
                      onClick={() => setPaginaAtual((p) => Math.min(totalPaginas, p + 1))}
                      disabled={paginaAtual === totalPaginas}
                      className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white border-2 border-amber-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-amber-400 hover:bg-amber-50 transition-all"
                    >
                      Próxima
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-amber-300">
                <div className="max-w-md mx-auto">
                  <div className="inline-flex p-4 bg-amber-50 rounded-full mb-4">
                    <BuildingLibraryIcon className="h-10 w-10 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Nenhuma instituição encontrada
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
                    className="inline-flex items-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
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
