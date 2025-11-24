import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useState, useRef, useMemo, useEffect } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InstitutionCard from "../institution/InstitutionCard";
import SearchBar from "../institution/SearchBar";
import { instituicao as sampleInstituicoes } from "../../data/Institution";

gsap.registerPlugin(ScrollTrigger);

export default function InstitutionsSection() {
  const [query, setQuery] = useState("");
  const [instituicoes] = useState(sampleInstituicoes);
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

  // Animação GSAP
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

  // Inicializa a navegação do Swiper depois do mount
  useEffect(() => {
    if (swiperInstance && prevRef.current && nextRef.current) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance, prevRef, nextRef]);

  // Filtro e ordenação das instituições
 const instituicoesFiltradas = useMemo(() => {
  const q = query.trim().toLowerCase();
  return instituicoes
    .filter((inst) => {
      if (!q) return true;
      return (
        (inst.nome?.toLowerCase() || "").includes(q) ||
        (inst.sigla?.toLowerCase() || "").includes(q) ||
        (inst.cidade?.toLowerCase() || "").includes(q) ||
        (inst.tipo?.toLowerCase() || "").includes(q) ||
        (inst.area?.toLowerCase() || "").includes(q)
      );
    })
    .sort((a, b) => (a.nome || "").localeCompare(b.nome || ""));
}, [instituicoes, query]);


  // Skeleton
  if (loading) {
    return (
      <section className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-8 w-64 bg-slate-200 rounded-lg animate-pulse mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-96 bg-white rounded-2xl animate-pulse"
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
      className="py-20 md:py-28 bg-amber-50 relative overflow-hidden"
    >
      {/* Decoração de fundo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full filter blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-100 rounded-full filter blur-3xl opacity-50 -translate-x-1/2 translate-y-1/2 pointer-events-none select-none"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Cabeçalho */}
        <div ref={titleRef} className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 border border-amber-200 rounded-full mb-4">
                <BuildingLibraryIcon className="h-4 w-4 text-amber-600" />
                <span className="text-sm font-semibold text-amber-900 tracking-wide">
                  Nossas Parcerias
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                Instituições de{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-amber-600">
                    excelência
                  </span>
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-amber-100 -skew-y-1"></span>
                </span>
              </h2>

              <p className="text-slate-600 max-w-2xl">
                Conectamos você às melhores universidades e faculdades do país.
                Instituições reconhecidas pelo MEC e comprometidas com a
                qualidade de ensino.
              </p>
            </div>

            {/* Controles */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 md:w-64">
                <SearchBar value={query} onChange={setQuery} />
              </div>

              <div className="hidden md:flex items-center gap-2 bg-white p-1 rounded-lg border border-slate-200">
                <button
                  ref={prevRef}
                  aria-label="Anterior"
                  className="p-2 rounded-md bg-slate-50 text-slate-700 hover:bg-amber-500 hover:text-white shadow-sm transition-all duration-300 hover:scale-105"
                >
                  <ChevronLeftIcon className="h-5 w-5" />
                </button>
                <button
                  ref={nextRef}
                  aria-label="Próximo"
                  className="p-2 rounded-md bg-slate-50 text-slate-700 hover:bg-amber-500 hover:text-white shadow-sm transition-all duration-300 hover:scale-105"
                >
                  <ChevronRightIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Contador de resultados */}
          {query && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-slate-200 shadow-sm">
              <span className="text-sm text-slate-600">
                <strong className="text-slate-900 font-semibold">
                  {instituicoesFiltradas.length}
                </strong>{" "}
                instituiç
                {instituicoesFiltradas.length !== 1 ? "ões" : "ão"} encontrada
                {instituicoesFiltradas.length !== 1 ? "s" : ""}
              </span>
            </div>
          )}
        </div>

        {/* Carrossel de Instituições */}
        {instituicoesFiltradas.length > 0 ? (
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
                  "swiper-pagination-bullet-active !bg-amber-500",
              }}
              onSwiper={setSwiperInstance}
              className="pb-12"
            >
              {instituicoesFiltradas
              ?.filter((inst) => inst && inst.id)
              .map((instituicao) => (
                <SwiperSlide key={instituicao.id}>
                  <InstitutionCard instituicao={instituicao} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200">
            <div className="max-w-md mx-auto">
              <div className="inline-flex p-4 bg-slate-100 rounded-full mb-4">
                <BuildingLibraryIcon className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Nenhuma instituição encontrada
              </h3>
              <p className="text-slate-600 mb-6">
                Tente ajustar sua busca ou explore todas as nossas instituições
                parceiras.
              </p>
              <button
                onClick={() => setQuery("")}
                className="inline-flex items-center gap-2 bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
              >
                Limpar busca
              </button>
            </div>
          </div>
        )}

        {/* Link para página completa */}
        <div className="mt-12 text-center">
          <a
            href="/instituicoes"
            className="group inline-flex items-center gap-2 text-amber-600 font-semibold hover:text-amber-700 transition-colors"
          >
            Ver todas as instituições
            <ChevronRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
