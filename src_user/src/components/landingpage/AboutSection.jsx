import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MagnifyingGlassIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon,
  ArrowPathIcon,
  AcademicCapIcon,
  BuildingLibraryIcon,
  UserGroupIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  // ✨ GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title Animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        }
      );
      // Cards Animation
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
   <section ref={sectionRef} className="relative bg-white py-20 md:py-28 overflow-hidden">
      {/* Fundo suave */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Cabeçalho */}
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full mb-6">
            <LightBulbIcon className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-900 tracking-wide">Sobre o Projeto</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Facilitando a jornada acadêmica de{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-blue-600">milhares de estudantes</span>
              <span className="absolute bottom-2 left-0 w-full h-3 bg-blue-100 -skew-y-1"></span>
            </span>
          </h2>

          <p className="text-lg text-slate-600 leading-relaxed">
            O <strong className="text-slate-900 font-semibold">StudyConnect</strong> nasceu da necessidade de 
            conectar estudantes às melhores oportunidades educacionais, tornando o processo de escolha 
            de cursos mais transparente, acessível e eficiente.
          </p>
        </div>

        {/* Problema e Solução */}
        <div className="grid md:grid-cols-2 gap-8">
          <div
            ref={(el) => (cardsRef.current[0] = el)}
            className="group relative bg-slate-800 rounded-2xl p-8 border border-slate-600"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-red-500/10 rounded-xl border border-red-500/20">
                <div className="w-8 h-8 text-red-400 font-bold flex items-center justify-center text-xl">!</div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">O Desafio</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Estudantes enfrentam dificuldades para encontrar informações claras sobre cursos, 
                  comparar instituições e estabelecer contato direto, resultando em decisões mal 
                  informadas e perda de oportunidades.
                </p>
              </div>
            </div>
          </div>

          <div
            ref={(el) => (cardsRef.current[1] = el)}
            className="group relative bg-blue-600 rounded-2xl p-8 border border-blue-400"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-white/10 rounded-xl border border-white/20">
                <AcademicCapIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Nossa Solução</h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  Uma plataforma interativa que centraliza informações, oferece recomendações 
                  personalizadas e facilita a comunicação direta com instituições, promovendo 
                  decisões mais assertivas e conscientes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
