import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useState, useRef, useMemo, useEffect } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  FunnelIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CourseCard from "../catalog/CourseCard";
import SearchBar from "../catalog/SearchBar";
import { cursos as sampleCursos } from "../../data/Courses";

gsap.registerPlugin(ScrollTrigger);

export default function CoursesSection() {
  const [query, setQuery] = useState("");
  const [cursos] = useState(sampleCursos);
  const [loading, setLoading] = useState(true);
  const [swiperInstance, setSwiperInstance] = useState(null);

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // Simula carregamento inicial
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Animação do título com GSAP
  useEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current?.children || [], {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [loading]);

  // Inicializa a navegação do Swiper após refs estarem disponíveis
  useEffect(() => {
    if (swiperInstance && prevRef.current && nextRef.current) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance, prevRef, nextRef]);

  // Filtro e ordenação de cursos
  const cursosFiltrados = useMemo(() => {
  const q = query.trim().toLowerCase();
  return cursos
    .filter((curso) => {
      if (!q) return true;
      return (
        (curso.nome?.toLowerCase() || "").includes(q) ||
        (curso.categoria?.toLowerCase() || "").includes(q) ||
        (curso.instituicao?.toLowerCase() || "").includes(q)
      );
    })
    .sort((a, b) => (a.nome || "").localeCompare(b.nome || ""));
}, [cursos, query]);


  // Skeleton de carregamento
  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-8 w-64 bg-slate-200 rounded-lg animate-pulse mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-96 bg-slate-100 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 bg-white relative overflow-hidden"
    >
      {/* Decoração de fundo */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-50 rounded-full filter blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-50 rounded-full filter blur-3xl opacity-50 translate-x-1/2 translate-y-1/2 pointer-events-none select-none"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Cabeçalho */}
        <div ref={titleRef} className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full mb-4">
                <AcademicCapIcon className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-900 tracking-wide">
                  Catálogo de Cursos
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                Explore nossos{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-blue-600">
                    cursos disponíveis
                  </span>
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-blue-100 -skew-y-1"></span>
                </span>
              </h2>

              <p className="text-slate-600 max-w-2xl">
                Navegue por nossa seleção de cursos de graduação e
                pós-graduação. Use a busca para encontrar exatamente o que
                procura.
              </p>
            </div>

            {/* Controles de navegação */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 md:w-64">
                <SearchBar value={query} onChange={setQuery} />
              </div>

              <div className="hidden md:flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
                <button
                  ref={prevRef}
                  aria-label="Anterior"
                  className="p-2 rounded-md bg-white text-slate-700 hover:bg-blue-600 hover:text-white shadow-sm transition-all duration-300 hover:scale-105"
                >
                  <ChevronLeftIcon className="h-5 w-5" />
                </button>
                <button
                  ref={nextRef}
                  aria-label="Próximo"
                  className="p-2 rounded-md bg-white text-slate-700 hover:bg-blue-600 hover:text-white shadow-sm transition-all duration-300 hover:scale-105"
                >
                  <ChevronRightIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Contador de resultados */}
          {query && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg border border-slate-200">
              <span className="text-sm text-slate-600">
                <strong className="text-slate-900 font-semibold">
                  {cursosFiltrados.length}
                </strong>{" "}
                curso{cursosFiltrados.length !== 1 ? "s" : ""} encontrado
                {cursosFiltrados.length !== 1 ? "s" : ""}
              </span>
            </div>
          )}
        </div>

        {/* Carrossel de Cursos */}
        {cursosFiltrados.length > 0 ? (
          <div className="relative">
            <Swiper
              modules={[Navigation, Pagination, A11y]}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              pagination={{
                clickable: true,
                bulletClass: "swiper-pagination-bullet !bg-slate-300",
                bulletActiveClass:
                  "swiper-pagination-bullet-active !bg-blue-600",
              }}
              onSwiper={setSwiperInstance}
              className="pb-12"
            >
              {cursosFiltrados.map((curso) => (
                <SwiperSlide key={curso.id}>
                  <CourseCard curso={curso} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
            <div className="max-w-md mx-auto">
              <div className="inline-flex p-4 bg-slate-100 rounded-full mb-4">
                <FunnelIcon className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Nenhum curso encontrado
              </h3>
              <p className="text-slate-600 mb-6">
                Tente ajustar sua busca ou explore nosso catálogo completo.
              </p>
              <button
                onClick={() => setQuery("")}
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Limpar busca
              </button>
            </div>
          </div>
        )}

        {/* Link para catálogo completo */}
        <div className="mt-12 text-center">
          <a
            href="/catalogo"
            className="group inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
          >
            Ver catálogo completo
            <ChevronRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
