"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import InstitutionCard from "../../components/institution/InstitutionCard";
import SearchBar from "../../components/catalog/SearchBar"; 
import FilterSection from "../../components/catalog/FilterSection"; 
import { filtrosInstituicoes } from "../../data/InstituionFilters";
import { instituicao } from "../../data/Institution";
import {
  FunnelIcon,
  XMarkIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

export default function CatalogoInstituicoes() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Inicializa filtros a partir da URL
  const [filtrosAtivos, setFiltrosAtivos] = useState(() => {
    const params = Object.fromEntries(searchParams.entries());
    try {
      return Object.keys(params).length ? JSON.parse(params.filters || "{}") : {};
    } catch {
      return {};
    }
  });

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [ordenacao, setOrdenacao] = useState(searchParams.get("sort") || "name-asc");
  const [paginaAtual, setPaginaAtual] = useState(Number(searchParams.get("page")) || 1);
  const [isLoading, setIsLoading] = useState(true);

  const itensPorPagina = 9;

  // Atualiza URL quando filtros mudam
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (ordenacao !== "name-asc") params.set("sort", ordenacao);
    if (Object.keys(filtrosAtivos).length) {
      params.set("filters", JSON.stringify(filtrosAtivos));
    }
    if (paginaAtual > 1) params.set("page", paginaAtual.toString());
    setSearchParams(params, { replace: true });
  }, [filtrosAtivos, searchQuery, ordenacao, paginaAtual]);

  // Simula carregamento
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [filtrosAtivos, searchQuery, ordenacao]);

  // Filtragem e ordenação
  const instituicoesFiltradas = useMemo(() => {
    let filtered = [...instituicao];

    Object.entries(filtrosAtivos).forEach(([key, valores]) => {
      if (valores?.length) {
        filtered = filtered.filter((inst) =>
          Array.isArray(valores)
            ? valores.includes(inst[key])
            : inst[key] === valores
        );
      }
    });

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (inst) =>
          inst.nome?.toLowerCase().includes(query) ||
          inst.area?.toLowerCase().includes(query) ||
          inst.cidade?.toLowerCase().includes(query) ||
          inst.tipo?.toLowerCase().includes(query)
      );
    }

    const sortFunctions = {
      "name-asc": (a, b) => a.nome.localeCompare(b.nome),
      "name-desc": (a, b) => b.nome.localeCompare(a.nome),
      "city-asc": (a, b) => a.cidade.localeCompare(b.cidade),
      "state-asc": (a, b) => a.estado.localeCompare(b.estado),
    };

    return filtered.sort(sortFunctions[ordenacao] || sortFunctions["name-asc"]);
  }, [filtrosAtivos, searchQuery, ordenacao]);

  const totalPaginas = Math.ceil(instituicoesFiltradas.length / itensPorPagina);
  const visiveis = instituicoesFiltradas.slice(
    (paginaAtual - 1) * itensPorPagina,
    paginaAtual * itensPorPagina
  );

  const handleFiltroChange = (sectionId, value, type = "checkbox") => {
    setFiltrosAtivos((prev) => {
      if (type === "checkbox") {
        const prevOptions = prev[sectionId] || [];
        return {
          ...prev,
          [sectionId]: prevOptions.includes(value)
            ? prevOptions.filter((v) => v !== value)
            : [...prevOptions, value],
        };
      }
      return { ...prev, [sectionId]: value };
    });
    setPaginaAtual(1);
  };

  return (
    <main>
      <div className="relative w-full bg-gradient-to-r from-textprimary via-primary to-indigo-600 text-white py-20 px-6">
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-4xl font-bold mb-4 drop-shadow-lg">
            Instituições de Ensino Parceiras
          </h1>
          <p className="text-base mb-8 text-gray-100 max-w-2xl mx-auto">
            Juntas, promovemos a educação científica e tecnológica em todo o Brasil.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-xl">
              <BuildingOfficeIcon className="h-6 w-6" />
              <span>+10 Instituições Parceiras</span>
            </div>

            <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-xl">
              <AcademicCapIcon className="h-6 w-6" />
              <span>+5000 Estudantes Impactados</span>
            </div>

            <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-xl">
              <GlobeAltIcon className="h-6 w-6" />
              <span>Atuação em 15 Estados Brasileiros</span>
            </div>
          </div>

          <div className="mt-8 max-w-xl mx-auto">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
        </div>

        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0 opacity-20">
          <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="white"
              fillOpacity="1"
              d="M0,224L60,208C120,192,240,160,360,144C480,128,600,128,720,149.3C840,171,960,213,1080,213.3C1200,213,1320,171,1380,149.3L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            />
          </svg>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 pt-12 pb-20">
          {/* Results count + sorting */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <h2 className="text-lg font-medium text-gray-900">
              {instituicoesFiltradas.length} {instituicoesFiltradas.length === 1 ? 'instituição encontrada' : 'instituições encontradas'}
            </h2>

            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm font-medium text-gray-700">
                Ordenar por:
              </label>
              <select
                id="sort"
                value={ordenacao}
                onChange={(e) => setOrdenacao(e.target.value)}
                className="border border-gray-300 rounded-lg text-sm p-2 focus:ring-2 focus:ring-primary/20"
              >
                <option value="name-asc">Nome (A-Z)</option>
                <option value="name-desc">Nome (Z-A)</option>
                <option value="price-asc">Menor Preço</option>
                <option value="price-desc">Maior Preço</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1">
              <div className="sticky top-4 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-lg font-medium text-gray-900">
                    <FunnelIcon className="h-5 w-5 text-primary" />
                    Filtros
                  </h3>
                  {Object.keys(filtrosAtivos).length > 0 && (
                    <button
                      onClick={() => {
                        setFiltrosAtivos({});
                        setPaginaAtual(1);
                      }}
                      className="flex items-center gap-1 px-2 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <XMarkIcon className="h-4 w-4" />
                      Limpar
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {filtrosInstituicoes.map((section) => (
                    <FilterSection
                      key={section.id}
                      section={section}
                      filtrosAtivos={filtrosAtivos}
                      handleFiltroChange={(id, value) =>
                        handleFiltroChange(id, value, section.type)
                      }
                    />
                  ))}
                </div>
              </div>
            </aside>

            <div className="lg:col-span-3">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-64 bg-gray-200 rounded-xl mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : visiveis.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {visiveis.map((item) => (
                    <InstitutionCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">
                    Nenhuma instituição encontrada com os filtros atuais.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setFiltrosAtivos({});
                    }}
                    className="text-primary hover:text-primary-dark"
                  >
                    Limpar filtros
                  </button>
                </div>
              )}

              {/* Pagination */}
                  {totalPaginas > 1 && (
                    <div className="flex justify-center gap-2 mt-12">
                      <button
                        onClick={() => setPaginaAtual(p => Math.max(1, p - 1))}
                        disabled={paginaAtual === 1}
                        className="px-4 py-2 text-sm font-medium rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                      >
                        Anterior
                      </button>

                      {[...Array(totalPaginas)].map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setPaginaAtual(i + 1)}
                          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                            paginaAtual === i + 1
                              ? "bg-primary text-white"
                              : "border hover:bg-gray-50"
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}

                      <button
                        onClick={() => setPaginaAtual(p => Math.min(totalPaginas, p + 1))}
                        disabled={paginaAtual === totalPaginas}
                        className="px-4 py-2 text-sm font-medium rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                      >
                        Próxima
                      </button>
                    </div>
                  )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
