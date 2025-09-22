import { useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import SearchBar from "../catalog/SearchBar";
import CourseCard from "../catalog/CourseCard";
import { cursos } from "../../data/Courses";

export default function CoursesSection() {
  const [query, setQuery] = useState("");

  const cursosFiltrados = cursos.filter(
    (curso) =>
      curso.nome.toLowerCase().includes(query.toLowerCase()) ||
      curso.categoria.toLowerCase().includes(query.toLowerCase()) ||
      curso.instituicao?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="py-16 bg-gray-100 relative">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Cursos Disponíveis</h2>
        <p className="text-lg text-slate-600 mb-6">
          Descubra nossos cursos mais bem avaliados que ajudaram milhares de
          profissionais a progredir em suas carreiras e dominar novas habilidades.
        </p>

        {/* Barra de pesquisa */}
        <div className="max-w-7xl mx-auto px-7 grid md:grid-cols-2 gap-12 items-center bg-white p-6 rounded-lg shadow-md mb-12">
          <div className="text-center md:text-left space-y-2 mb-4">
            <span className="inline-block px-4 py-2 bg-indigo-500/30 text-indigo-700 text-sm font-medium rounded-full border border-indigo-500/30 mb-4">
              <span role="img" aria-label="books">📚</span> Encontre o curso perfeito para você!
            </span>
            <h3 className="text-2xl font-semibold text-textprimary">
              Procure o curso e saiba todos os detalhes
            </h3>
            <p className="text-sm text-primary">
              Descubra a duração do curso, média da mensalidade, o que faz o profissional, nota de corte, quanto ganha, entre outras informações.
            </p>
          </div>
          <div className="text-center md:text-right space-y-6 mb-4">
            <SearchBar value={query} onChange={setQuery} />
            <Link to="/catalogo" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
              Ver todos os cursos 
            </Link>
          </div>
        </div>

        {cursosFiltrados.length > 0 ? (
          <>
            {/* Botões customizados */}
            <div className="absolute inset-y-1/2 left-20 z-10 hidden md:flex">
              <button className="prevBtn">
                <ChevronLeftIcon className="h-12 w-12 text-white hover:text-gray-300 bg-primary hover:bg-textprimary p-2 rounded-full" />
              </button>
            </div>
            <div className="absolute inset-y-1/2 right-20 z-10 hidden md:flex">
              <button className="nextBtn">
                <ChevronRightIcon className="h-12 w-12 text-white hover:text-gray-300 bg-primary hover:bg-textprimary p-2 rounded-full" />
              </button>
            </div>

            {/* Carrossel */}
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              pagination={{ clickable: true }}
              navigation={{
                prevEl: ".prevBtn",
                nextEl: ".nextBtn",
              }}
              className="pb-12"
            >
              {cursosFiltrados.map((curso) => (
                <SwiperSlide key={curso.id} className="h-auto">
                  <div className="h-full">
                    <CourseCard curso={curso} className="h-full" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        ) : (
          <p className="text-center text-gray-500 mt-6">Nenhum curso encontrado.</p>
        )}
      </div>
    </section>
  );
}
