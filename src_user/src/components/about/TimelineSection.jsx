import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  LightBulbIcon,
  BeakerIcon,
  CodeBracketIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";

gsap.registerPlugin(ScrollTrigger);

export default function AboutUsPage() {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);

  const timeline = [
    {
      phase: "Fase 1",
      title: "Ideação",
      description:
        "Identificação do problema e definição do escopo do projeto acadêmico.",
      icon: LightBulbIcon,
    },
    {
      phase: "Fase 2",
      title: "Planejamento",
      description:
        "Divisão de tarefas, escolha de tecnologias e criação da arquitetura.",
      icon: BeakerIcon,
    },
    {
      phase: "Fase 3",
      title: "Desenvolvimento",
      description:
        "Implementação das funcionalidades, design e integração do sistema.",
      icon: CodeBracketIcon,
    },
    {
      phase: "Fase 4",
      title: "Entrega",
      description:
        "Testes, refinamentos finais e apresentação do projeto completo.",
      icon: RocketLaunchIcon,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".timeline-item",
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.3,
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Cabeçalho da seção */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
            <BeakerIcon className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-semibold text-slate-300 tracking-wide">
              Jornada de Desenvolvimento
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Como o projeto foi construído
          </h2>

          <p className="text-slate-400 max-w-2xl mx-auto">
            Do conceito inicial até a implementação final, conheça as etapas do
            desenvolvimento.
          </p>
        </div>

        {/* Linha do tempo */}
        <div ref={timelineRef} className="relative">
          {/* Linha vertical central */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-amber-500 to-emerald-500"></div>

          {/* Fases */}
          <div className="space-y-12">
            {timeline.map((item, index) => {
              const Icon = item.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`timeline-item flex flex-col md:flex-row items-center gap-8 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Conteúdo de texto */}
                  <div className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold rounded-full border border-blue-500/30">
                        {item.phase}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-400">{item.description}</p>
                  </div>

                  {/* Ícone */}
                  <div className="relative flex-shrink-0 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center border-4 border-slate-900 shadow-lg">
                    <Icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Espaçador para simetria */}
                  <div className="hidden md:block flex-1"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
