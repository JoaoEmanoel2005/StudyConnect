"use client";

import { useState, useEffect } from "react";
import CourseCard from "../components/catalog/CourseCard";
import { cursos } from "../data/Courses";
import SearchBar from "../components/catalog/SearchBar";
import FilterSection from "../components/catalog/FilterSection";
import { filtrosCursos } from "../data/FiltersConfig";

import { FunnelIcon, XMarkIcon  } from "@heroicons/react/24/outline";

export default function CatalogoCursos() {
  const [filtrosAtivos, setFiltrosAtivos] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [cursosFiltrados, setCursosFiltrados] = useState(cursos);

  // Atualiza cursos filtrados
  useEffect(() => {
    let filtered = cursos;

    // Função auxiliar para converter label em intervalo numérico
    function precoParaIntervalo(label) {
      switch (label) {
        case "Gratuito":
          return [0, 0];
        case "Abaixo de R$100":
          return [0, 100];
        case "R$100 - R$500":
          return [100, 500];
        case "R$500 - R$900":
          return [500, 900];
        case "Acima de R$1.000":
          return [1000, Infinity];
        default:
          return [0, Infinity];
      }
    }
    // aplica filtros da sidebar
    Object.keys(filtrosAtivos).forEach((key) => {
      const valores = filtrosAtivos[key];
      if (valores?.length) {
        if (key === "preco") {
          const [min, max] = precoParaIntervalo(valores);
          filtered = filtered.filter((c) => {
            const custoNum = Number(c.custo.replace(/[^\d]/g, ""));
            return custoNum >= min && custoNum <= max;
          });
        } else {
          filtered = filtered.filter((c) => valores.includes(c[key]));
        }
      }
    });

    // aplica busca por texto
    if (searchQuery.trim()) {
      filtered = filtered.filter((c) =>
        c.nome.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setCursosFiltrados(filtered);
  }, [filtrosAtivos, searchQuery]);

  // Atualiza filtros ativos
  const handleFiltroChange = (sectionId, value, type = "checkbox") => {
    setFiltrosAtivos((prev) => {
      if (type === "checkbox") {
        const prevOptions = prev[sectionId] || [];
        if (prevOptions.includes(value)) {
          return { ...prev, [sectionId]: prevOptions.filter((v) => v !== value) };
        } else {
          return { ...prev, [sectionId]: [...prevOptions, value] };
        }
      } else {
        // radio ou select
        return { ...prev, [sectionId]: value };
      }
    });
  };

  return (
    <>
      {/* Banner */}
      <div className="h-14 py-40 items-center justify-center bg-indigo-600 text-white flex">
        banner em processo...
      </div>

      {/* Catálogo de Cursos */}
      <div className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 pt-20 pb-6">
          <h1 className="text-3xl font-bold tracking-tight text-textprimary mb-2">
            Catálogo de Cursos
          </h1>
          <p className="text-gray-600 border-b border-gray-200 pb-6">
            Explore nossa ampla variedade de cursos e encontre o que melhor se adapta às suas necessidades.
          </p>

          {/* Barra de busca + ordenação */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-6">
            <SearchBar value={searchQuery} onChange={setSearchQuery} /> 

            <div>
              <label className="mr-2 font-medium text-gray-700">Ordenar por:</label>
              <select className="border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option value="relevance">Relevância</option>
                <option value="price-asc">Preço: Menor para Maior</option>
                <option value="price-desc">Preço: Maior para Menor</option>
                <option value="rating">Avaliação</option>
                <option value="newest">Mais Recentes</option>
              </select>
            </div>
          </div>

          {/* Listagem */}
          <section className="pt-6 pb-24">
            <div className="mb-5 flex items-center space-x-2 text-gray-700">
              <FunnelIcon className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-medium text-textprimary">Filtrar por:</h3>

              <div className="flex items-center space-x-2">
              {/* Botão para limpar filtros */}
                {Object.keys(filtrosAtivos).length > 0 && (
                  <button
                    onClick={() => setFiltrosAtivos({})}
                    className="flex items-center gap-2 px-3 py-1 bg-red-200 text-sm text-red-700 rounded-lg hover:bg-red-300 transition"
                  >
                    <XMarkIcon className="h-5 w-5 text-red-700" />
                    Limpar filtros
                  </button>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              
              {/* Sidebar */}
              <div className="space-y-6 text-sm text-gray-500 lg:col-span-1">
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

              {/* Cursos */}
              <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {cursosFiltrados.map((curso) => (
                  <CourseCard key={curso.id} curso={curso} />
                ))}

                {cursosFiltrados.length === 0 && (
                  <p className="col-span-full text-center text-gray-500">
                    Nenhum curso encontrado.
                  </p>
                )}
              </div>
            </div>
          </section>
          
        </div>
      </div>
    </>
  );
}
