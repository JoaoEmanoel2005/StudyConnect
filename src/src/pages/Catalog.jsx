"use client";

import { useState, useEffect } from "react";
import SidebarFilters from "../components/catalog/SidebarFilters";
import CourseCard from "../components/catalog/CourseCard";
import { cursos } from "../data/Courses";
import SearchBar from "../components/catalog/SearchBar";

import { FunnelIcon } from "@heroicons/react/24/outline";

export default function CatalogoCursos() {
  const [filtrosAtivos, setFiltrosAtivos] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [cursosFiltrados, setCursosFiltrados] = useState(cursos);

  // Atualiza cursos filtrados
  useEffect(() => {
    let filtered = cursos;

    // aplica filtros da sidebar
    Object.keys(filtrosAtivos).forEach((key) => {
      const valores = filtrosAtivos[key];
      if (valores?.length) {
        filtered = filtered.filter((c) => valores.includes(c[key]));
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
  const handleFiltroChange = (sectionId, value) => {
    setFiltrosAtivos((prev) => {
      const prevOptions = prev[sectionId] || [];
      if (prevOptions.includes(value)) {
        return { ...prev, [sectionId]: prevOptions.filter((v) => v !== value) };
      } else {
        return { ...prev, [sectionId]: [...prevOptions, value] };
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
            Explore nossa ampla variedade de cursos e encontre o que melhor se
            adapta às suas necessidades.
          </p>

          {/* Barra de busca + ordenação */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-6">
            <SearchBar value={searchQuery} onChange={setSearchQuery} /> 

            {/* Ordenação - placeholder */}
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
            <span className="mb-10 flex items-center space-x-3 text-gray-700">
              <FunnelIcon className="h-6 w-6 text-gray-500" />
              <h3 className="text-lg font-medium text-textprimary">
                Filtrar por:
              </h3>
            </span>
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Sidebar */}    
              <SidebarFilters
                filtrosAtivos={filtrosAtivos}
                handleFiltroChange={handleFiltroChange}
              />

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
