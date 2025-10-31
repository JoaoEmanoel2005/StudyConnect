import { forwardRef, useRef, useEffect } from "react";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import gsap from "gsap";

const HeroSection = forwardRef(() => {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(heroRef.current?.children || [], {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      });
    });

    return () => ctx.revert(); // limpa a animação ao desmontar
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
      {/* Grade de fundo */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Barra superior */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>

      {/* Conteúdo principal */}
      <div
        ref={heroRef}
        className="relative max-w-5xl mx-auto px-6 py-20 md:py-28 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-8">
          <UserGroupIcon className="h-4 w-4" />
          <span className="text-sm font-semibold tracking-wide">Sobre o Projeto</span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Conectando estudantes ao{" "}
          <span className="text-blue-400">futuro educacional</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
          O <strong className="text-white">StudyConnect</strong> é um projeto acadêmico
          desenvolvido por estudantes comprometidos em facilitar o acesso à educação
          superior no Brasil.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
            <div className="text-2xl font-bold text-blue-400 mb-1">2025</div>
            <div className="text-sm text-slate-300">Ano de Criação</div>
          </div>
          <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
            <div className="text-2xl font-bold text-amber-400 mb-1">3</div>
            <div className="text-sm text-slate-300">Desenvolvedores</div>
          </div>
          <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
            <div className="text-2xl font-bold text-emerald-400 mb-1">6</div>
            <div className="text-sm text-slate-300">Meses de Desenvolvimento</div>
          </div>
        </div>
      </div>

      {/* Onda inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 30C240 10 480 50 720 30C960 10 1200 50 1440 30V60H0V30Z"
            fill="white"
            fillOpacity="0.3"
          />
          <path
            d="M0 45C240 25 480 65 720 45C960 25 1200 65 1440 45V60H0V45Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
});

export default HeroSection;
