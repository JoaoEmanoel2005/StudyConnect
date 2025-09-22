"use client";

import { useState, useEffect } from "react";
import SidebarFilters from "../components/catalog/SidebarFilters";
import CourseCard from "../components/catalog/CourseCard";
import { cursos } from "../data/Courses";
import SearchBar from "../components/catalog/SearchBar";

export default function CatalogoCursos() {
  const [filtrosAtivos, setFiltrosAtivos] = useState({});
  const [cursosFiltrados, setCursosFiltrados] = useState(cursos);

  // Atualiza cursos filtrados
  useEffect(() => {
    let filtered = cursos;
    Object.keys(filtrosAtivos).forEach((key) => {
      const valores = filtrosAtivos[key];
      if (valores?.length) {
        filtered = filtered.filter((c) => valores.includes(c[key]));
      }
    });
    setCursosFiltrados(filtered);
  }, [filtrosAtivos]);

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
      {/* Banner Catálogo */}
      
      
      {/* Catálogo de Cursos */}
      <div className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 border-b border-gray-200 pb-4">
            Catálogo de Cursos
          </h1>
          
          <section className="pt-6 pb-24">
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
