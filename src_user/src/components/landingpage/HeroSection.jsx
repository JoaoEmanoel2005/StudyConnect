import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  UserPlusIcon,
  ArrowLongRightIcon,
  CheckIcon,
  TrophyIcon,
  AcademicCapIcon,
  BuildingLibraryIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const [query, setQuery] = useState("");
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current?.children || [], {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 85%",
        },
      });

      gsap.from(imageRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 80%",
        },
      });

      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-slate-50">
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 ">
        {/* Padrão de fundo sutil acadêmico */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            
            {/* Left - Conteúdo Textual */}
            <div ref={textRef} className="space-y-8">
              {/* Badge institucional */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
                <BuildingLibraryIcon className="h-4 w-4 text-amber-400" />
                <span className="text-sm font-medium text-slate-200 tracking-wide">
                  Plataforma de Ensino Superior
                </span>
              </div>

              {/* Título principal */}
              <div>
                <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                  Conectando estudantes a{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10 text-amber-400">instituições de excelência</span>
                    <span className="absolute bottom-2 left-0 w-full h-3 bg-blue-400/20 -skew-y-1"></span>
                  </span>
                </h1>
                
                <p className="mt-6 text-slate-300 text-lg leading-relaxed max-w-xl">
                  Explore cursos de graduação e pós-graduação em instituições reconhecidas. 
                  Facilitamos sua jornada acadêmica com informações precisas e atualizadas.
                </p>
              </div>

              {/* CTAs refinados */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link to="/catalogo" className="group relative inline-flex items-center justify-center gap-2 bg-amber-500 text-slate-800 px-7 py-3.5 rounded-lg font-semibold shadow-lg shadow/20 hover:bg-amber-400 transition-all duration-300 overflow-hidden">
                  <span className="relative z-10">Buscar Cursos</span>
                  <ArrowLongRightIcon className="h-5 w-5 relative z-10 transition-transform group-hover:translate-x-1" />
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>

                <Link to="/cadast" className="group inline-flex items-center justify-center gap-2 border-2 border-slate-600 text-white px-7 py-3.5 rounded-lg hover:bg-white/5 hover:border-slate-500 transition-all duration-300 backdrop-blur-sm font-semibold">
                  <UserPlusIcon className="h-5 w-5" />
                  Criar Conta
                </Link>
              </div>
            </div>

            {/* Right - Imagem e estatísticas */}
            <div className="flex justify-center md:justify-end">
              <div className="relative">
                {/* Imagem principal */}
                <div ref={imageRef} className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-br from-amber-500/20 to-blue-500/20 rounded-2xl blur-2xl"></div>
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop"
                    alt="Campus universitário"
                    className="relative w-full max-w-lg object-cover rounded-2xl shadow-2xl border border-white/10"
                  />      
                </div>

                {/* Cards de estatísticas refinados */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                  {[
                    { 
                      icon: BuildingLibraryIcon, 
                      value: "10+", 
                      label: "Instituições parceiras",
                      color: "blue-600"
                    },
                    { 
                      icon: AcademicCapIcon, 
                      value: "50+", 
                      label: "Cursos disponíveis",
                      color: "amber-500"
                    },
                    { 
                      icon: UserGroupIcon, 
                      value: "+1k", 
                      label: "Estudantes ativos",
                      color: "emerald-600"
                    },
                    { 
                      icon: CheckIcon, 
                      value: "98%", 
                      label: "Taxa de satisfação",
                      color: "violet-600"
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      ref={(el) => (cardsRef.current[i] = el)}
                    >
                      <StatCard {...item} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Onda decorativa diferente */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 30C240 10 480 50 720 30C960 10 1200 50 1440 30V60H0V30Z" fill="#f8fafc" fillOpacity="0.3"/>
            <path d="M0 45C240 25 480 65 720 45C960 25 1200 65 1440 45V60H0V45Z" fill="#f8fafc"/>
          </svg>
        </div>
      </div>
    </section>
  );
}

const StatCard = ({ icon: Icon, value, label, color }) => (
  <div className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-white/5">
  <div className="flex items-center gap-3">
    <div className={`flex-shrink-0 p-2 rounded-lg bg-${color} group-hover:scale-110 transition-transform duration-300`}>
      <Icon className="h-5 w-5 text-white" />
    </div>
    <div className="space-y-0">
      <div className="text-2xl font-bold text-white leading-none">{value}</div>
      <div className="text-xs text-slate-400 leading-tight">{label}</div>
    </div>
  </div>
</div>
);