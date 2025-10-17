import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useState, useRef, useMemo, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import CourseCard from "../catalog/CourseCard";
import SearchBar from "../catalog/SearchBar";
import { cursos as sampleCursos } from "../../data/Courses"; // sample data

export default function CoursesSection() {

  const [query, setQuery] = useState("");
  const [cursos, setCursos] = useState(sampleCursos); 
  const [loading, setLoading] = useState(false);

 
  useEffect(() => {
    // Simulate loading delay
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Refs for custom navigation buttons
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // Filter + alphabetical sort (A → Z) with memoization
  const cursosFiltrados = useMemo(() => {
    if (!Array.isArray(cursos)) return [];
    const q = (query || "").trim().toLowerCase();
    const filtered = cursos.filter((curso) => {
      if (!q) return true;
      return (
        (curso.nome || "").toLowerCase().includes(q) ||
        (curso.categoria || "").toLowerCase().includes(q) ||
        (curso.instituicao || "").toLowerCase().includes(q)
      );
    });
    // stable alphabetical sort by nome (handles accents)
    return filtered.slice().sort((a, b) => (a.nome || "").localeCompare(b.nome || "", undefined, { sensitivity: "base" }));
  }, [cursos, query]);

  if (loading) {
    return (
      <section className="py-16 bg-gray-100 relative">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Cursos Disponíveis</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-72 bg-white rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-100 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Cursos Disponíveis</h2>
            <p className="text-sm text-slate-600 mt-1">
              Explore nossos cursos — resultados mostrados em ordem alfabética.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <SearchBar value={query} onChange={setQuery} />
            <div className="hidden md:flex items-center gap-2">
              <button
                ref={prevRef}
                aria-label="Anterior"
                className="p-3 rounded-xl bg-primary text-white shadow-md hover:scale-105 transition transform"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              <button
                ref={nextRef}
                aria-label="Próximo"
                className="p-3 rounded-xl bg-primary text-white shadow-md hover:scale-105 transition transform"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {cursosFiltrados.length > 0 ? (
          <div className="relative">
            <Swiper
              modules={[Navigation, Pagination, A11y]}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
              pagination={{ clickable: true }}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onBeforeInit={(swiper) => {
                // attach custom buttons after refs are available
                // eslint-disable-next-line no-param-reassign
                swiper.params.navigation.prevEl = prevRef.current;
                // eslint-disable-next-line no-param-reassign
                swiper.params.navigation.nextEl = nextRef.current;
              }}
              a11y={{
                prevSlideMessage: "Slide anterior",
                nextSlideMessage: "Próximo slide",
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
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 mb-4">Nenhum curso encontrado.</p>
            <a
              href="/catalogo"
              className="inline-block bg-primary text-white px-6 py-2 rounded-lg shadow hover:bg-primary-dark transition"
            >
              Ver catálogo completo
            </a>
          </div>
        )}
      </div>
    </section>
  );
}