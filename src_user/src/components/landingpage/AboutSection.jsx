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
  const pillarsRef = useRef([]);
  const statsRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // 1️⃣ Título
      if (titleRef.current) {
        tl.from(titleRef.current.children, {
          opacity: 0,
          y: 40,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
        });
      }

      // 2️⃣ Cards (Desafio + Solução)
      if (cardsRef.current.every(Boolean)) {
        tl.from(cardsRef.current, {
          opacity: 0,
          y: 50,
          duration: 0.6,
          stagger: 0.2,
          ease: "power3.out",
          immediateRender: false,
        }, "=0.2");
      }

      // 3️⃣ Pilares
      if (pillarsRef.current.every(Boolean)) {
        tl.from(pillarsRef.current, {
          opacity: 0,
          x: -40,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          immediateRender: false,
        }, "-=0.3");
      }

      // 4️⃣ Estatísticas
      if (statsRef.current) {
        tl.from(statsRef.current.children, {
          opacity: 0,
          scale: 0.9,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.4)",
          immediateRender: false,
        }, "-=0.2");
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const pillars = [
    {
      icon: MagnifyingGlassIcon,
      title: "Busca Inteligente",
      description: "Acesso centralizado a informações relevantes sobre cursos de graduação e pós-graduação",
      color: "blue-600",
    },
    {
      icon: SparklesIcon,
      title: "Recomendações Personalizadas",
      description: "Sugestões de cursos baseadas no perfil e objetivos acadêmicos de cada estudante",
      color: "amber-500",
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: "Conexão Direta",
      description: "Comunicação facilitada entre estudantes e instituições de ensino superior",
      color: "emerald-500",
    },
    {
      icon: ArrowPathIcon,
      title: "Processo Simplificado",
      description: "Integração eficiente que elimina barreiras no processo de escolha educacional",
      color: "violet-500",
    },
  ];

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
        <div className="grid md:grid-cols-2 gap-8 mb-20">
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

        {/* Pilares */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Como Funcionamos
            </h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Quatro pilares fundamentais que tornam o StudyConnect a melhor escolha para sua jornada acadêmica
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {pillars.map((pillar, index) => (
              <div
                key={index}
                ref={(el) => (pillarsRef.current[index] = el)}
                className="group relative bg-white rounded-xl p-6 border-2 border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 p-3 rounded-xl bg-${pillar.color} group-hover:scale-110 transition-transform duration-300`}>
                    <pillar.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {pillar.title}
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 text-5xl font-bold text-slate-100 group-hover:text-blue-50 transition-colors">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
