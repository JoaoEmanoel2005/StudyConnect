"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import CourseCard from "../../components/catalog/CourseCard";
import SearchBar from "../../components/catalog/SearchBar";
import FilterSection from "../../components/catalog/FilterSection";
import { filtrosCursos } from "../../data/FiltersConfig";
import { cursos } from "../../data/Courses";
import {
  FunnelIcon,
  XMarkIcon,
  AcademicCapIcon,
  UserGroupIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";

export default function CatalogoCursos() {
  // Helpers
  const normalize = (str) =>
    str
      ?.toString()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .trim();

  // URL Search Params para filtros compartilháveis
  const [searchParams, setSearchParams] = useSearchParams();

  // Estado inicial com restauração via URL
  const [filtrosAtivos, setFiltrosAtivos] = useState(() => {
    try {
      const filtersParam = searchParams.get("filters");
      return filtersParam ? JSON.parse(filtersParam) : {};
    } catch {
      return {};
    }
  });

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [ordenacao, setOrdenacao] = useState(searchParams.get("sort") || "name-asc");
  const [paginaAtual, setPaginaAtual] = useState(Number(searchParams.get("page")) || 1);
  const [isLoading, setIsLoading] = useState(true);

  const cursosPorPagina = 9;

  // Atualiza URL quando filtros, busca ou ordenação mudam
  useEffect(() => {
    const params = new URLSearchParams();

    if (searchQuery) params.set("q", searchQuery);
    if (ordenacao !== "name-asc") params.set("sort", ordenacao);

    if (Object.keys(filtrosAtivos).length) {
      const filtrosNormalizados = {};
      Object.entries(filtrosAtivos).forEach(([chave, valor]) => {
        if (Array.isArray(valor)) {
          filtrosNormalizados[chave] = valor.map((v) => normalize(v));
        } else if (typeof valor === "string") {
          filtrosNormalizados[chave] = normalize(valor);
        }
      });
      params.set("filters", JSON.stringify(filtrosNormalizados));
    }

    if (paginaAtual > 1) params.set("page", paginaAtual.toString());
    setSearchParams(params, { replace: true });
  }, [filtrosAtivos, searchQuery, ordenacao, paginaAtual]);

  // Simula loading ao aplicar filtros
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [filtrosAtivos, searchQuery, ordenacao]);

  // Filtragem de cursos
  const cursosFiltrados = useMemo(() => {
    let filtered = [...cursos];

    // Conversão de faixa de preço
    const precoParaIntervalo = (label) => {
      const ranges = {
        "Gratuito": [0, 0],
        "Abaixo de R$100": [0, 100],
        "R$100 - R$500": [100, 500],
        "R$500 - R$900": [500, 900],
        "Acima de R$1.000": [1000, Infinity],
      };
      return ranges[label] || [0, Infinity];
    };

    // 🔹 Aplica filtros ativos
Object.entries(filtrosAtivos).forEach(([key, valores]) => {
  if (valores?.length) {
    if (key === "preco") {
      const label = Array.isArray(valores) ? valores[0] : valores;
      const [min, max] = precoParaIntervalo(label);
      filtered = filtered.filter((c) => {
        const custoNum =
          c.custo === "Gratuito"
            ? 0
            : Number(c.custo.replace(/[^\d]/g, "")) || 0;
        return custoNum >= min && custoNum <= max;
      });
    } else {
      // 🧩 Fix: garante que valores é sempre array
      const valoresArray = Array.isArray(valores) ? valores : [valores];
      filtered = filtered.filter((c) =>
        valoresArray.some((v) => normalize(c[key]) === normalize(v))
      );
    }
  }
});


    // 🔹 Aplica busca textual
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.nome.toLowerCase().includes(query) ||
          c.descricao?.toLowerCase().includes(query) ||
          c.categoria?.toLowerCase().includes(query)
      );
    }

    // 🔹 Aplica ordenação
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

    return filtered.sort(sortFunctions[ordenacao] || sortFunctions["name-asc"]);
  }, [filtrosAtivos, searchQuery, ordenacao]);

  // Paginação
  const totalPaginas = Math.ceil(cursosFiltrados.length / cursosPorPagina);
  const cursosVisiveis = cursosFiltrados.slice(
    (paginaAtual - 1) * cursosPorPagina,
    paginaAtual * cursosPorPagina
  );

  // Manipula alterações nos filtros
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
    <>
      {/* Hero Section */}
      <div className="relative w-full bg-gradient-to-r from-textprimary via-primary to-indigo-600 text-white py-20 px-6">
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-4xl font-bold mb-4 drop-shadow-lg">
            Aprenda, Cresça e Transforme sua Carreira
          </h1>
          <p className="text-base mb-8 text-gray-100 max-w-2xl mx-auto">
            Explore nossa ampla variedade de cursos e encontre o que melhor se adapta às suas necessidades.
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-xl">
              <BookOpenIcon className="h-5 w-5" />
              <span>+200 Cursos</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-xl">
              <AcademicCapIcon className="h-5 w-5" />
              <span>Certificados Reconhecidos</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-xl">
              <UserGroupIcon className="h-5 w-5" />
              <span>Instrutores Especializados</span>
            </div>
          </div>

          {/* Search bar */}
          <div className="max-w-xl mx-auto">
            <SearchBar
              value={searchQuery}
              onChange={(value) => {
                setSearchQuery(value);
                setPaginaAtual(1);
              }}
              placeholder="Busque por nome do curso, categoria ou descrição..."
            />
          </div>
        </div>

        {/* Wave decorativa */}
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
          {/* Cabeçalho de resultados */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <h2 className="text-lg font-medium text-gray-900">
              {cursosFiltrados.length}{" "}
              {cursosFiltrados.length === 1 ? "curso encontrado" : "cursos encontrados"}
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

          {/* Layout em grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar de filtros */}
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
                  {filtrosCursos.map((section) => (
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

            {/* Grid de cursos */}
            <div className="lg:col-span-3">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-48 bg-gray-200 rounded-t-xl" />
                      <div className="p-4 space-y-3 bg-white rounded-b-xl">
                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                        <div className="h-4 bg-gray-200 rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : cursosVisiveis.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cursosVisiveis.map((curso) => (
                      <CourseCard key={curso.id} curso={curso} />
                    ))}
                  </div>

                  {/* Paginação */}
                  {totalPaginas > 1 && (
                    <div className="flex justify-center gap-2 mt-12">
                      <button
                        onClick={() => setPaginaAtual((p) => Math.max(1, p - 1))}
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
                        onClick={() => setPaginaAtual((p) => Math.min(totalPaginas, p + 1))}
                        disabled={paginaAtual === totalPaginas}
                        className="px-4 py-2 text-sm font-medium rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                      >
                        Próxima
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Nenhum curso encontrado
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Tente ajustar seus filtros ou termos de busca
                  </p>
                  <button
                    onClick={() => {
                      setFiltrosAtivos({});
                      setSearchQuery("");
                      setPaginaAtual(1);
                    }}
                    className="text-primary hover:text-primary-dark font-medium"
                  >
                    Limpar todos os filtros
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
