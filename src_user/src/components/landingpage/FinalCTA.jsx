import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  UserPlusIcon,
  AcademicCapIcon,
  SparklesIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const featuresRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animação do conteúdo principal
      gsap.fromTo(
        gsap.utils.toArray(contentRef.current?.children),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
            once: true,
            // markers: true,
          },
        }
      );

      // Animação dos cards (features)
      const validFeatures = featuresRef.current.filter(Boolean);

      if (validFeatures.length) {
        validFeatures.forEach((feature, i) => {
          gsap.fromTo(
            feature,
            { opacity: 0, x: 40 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              delay: i * 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: feature,
                start: "top 85%",
                toggleActions: "play none none reverse",
                once: true,
                // markers: true,
              },
            }
          );
        });
      }

      // Atualiza ScrollTrigger em caso de redimensionamento
      ScrollTrigger.refresh();
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const features = [
    {
      icon: AcademicCapIcon,
      text: "Acesso a +500 cursos de graduação e pós-graduação",
    },
    {
      icon: BuildingLibraryIcon,
      text: "Conexão com +250 instituições reconhecidas pelo MEC",
    },
    {
      icon: SparklesIcon,
      text: "Recomendações personalizadas baseadas no seu perfil",
    },
    {
      icon: CheckCircleIcon,
      text: "Plataforma 100% gratuita, segura e confiável",
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 overflow-hidden">
      {/* Gradiente de fundo */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        </div>

        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full filter blur-3xl"></div>
      </div>

      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-70"></div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-70"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Conteúdo Principal */}
          <div ref={contentRef} className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
              <SparklesIcon className="h-4 w-4 text-amber-400" />
              <span className="text-sm font-semibold text-slate-200 tracking-wide">
                Comece Sua Jornada Hoje
              </span>
            </div>

            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                Pronto para encontrar seu{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-amber-400">curso ideal</span>
                  <span className="absolute bottom-2 left-0 w-full h-4 bg-amber-400/20 -skew-y-1"></span>
                </span>
                ?
              </h2>

              <p className="text-lg text-slate-300 leading-relaxed max-w-xl">
                Junte-se a milhares de estudantes que já transformaram suas carreiras através
                do StudyConnect. Cadastre-se gratuitamente e comece a explorar.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group relative inline-flex items-center justify-center gap-2 bg-amber-500 text-slate-900 px-8 py-4 rounded-xl font-bold shadow-sm hover:bg-amber-400 transition-all duration-300 overflow-hidden hover:scale-105">
                <span className="relative z-10">Criar Conta Gratuita</span>
                <UserPlusIcon className="h-5 w-5 relative z-10 transition-transform group-hover:rotate-12" />
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <button className="group inline-flex items-center justify-center gap-2 border-2 border-slate-600 text-white px-8 py-4 rounded-xl hover:bg-white/10 hover:border-slate-500 transition-all duration-300 backdrop-blur-sm font-bold hover:scale-105">
                Explorar Cursos
                <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="relative">
            <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/10 to-amber-500/10 rounded-2xl blur-2xl"></div>

              <div className="relative space-y-6">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-500 rounded-2xl mb-4 shadow-lg">
                    <CheckCircleIcon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Por que escolher o StudyConnect?
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Tudo que você precisa em um só lugar
                  </p>
                </div>

                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      ref={(el) => (featuresRef.current[index] = el)}
                      className="group flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                    >
                      <div className="flex-shrink-0 p-2 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg border border-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                        <feature.icon className="h-5 w-5 text-blue-400" />
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed pt-1">
                        {feature.text}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-white/10">
                  <div className="flex items-center justify-center gap-3 text-slate-400 text-xs">
                    <div className="flex items-center gap-1.5">
                      <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span>Dados 100% seguros</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1.5">
                      <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span>Plataforma verificada</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-4 shadow-2xl border-4 border-slate-900 rotate-6 hover:rotate-0 transition-transform duration-300">
              <div className="text-center">
                <div className="text-3xl font-black text-white mb-1">98%</div>
                <div className="text-xs font-semibold text-emerald-100">Satisfação</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
