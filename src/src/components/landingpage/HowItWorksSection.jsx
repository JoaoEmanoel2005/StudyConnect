import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MagnifyingGlassIcon,
  BookOpenIcon,
  BuildingLibraryIcon,
  ArrowTopRightOnSquareIcon,
  BookmarkIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorksSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const stepsRef = useRef([]);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animação do título
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

      // Animação dos steps
      gsap.from(stepsRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: stepsRef.current[0],
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      number: "01",
      icon: MagnifyingGlassIcon,
      title: "Explore o Catálogo",
      description: "Navegue por centenas de cursos como em uma loja online. Busque, filtre e descubra opções que combinam com você.",
      color: "blue-500",
      highlight: "Acesso livre e intuitivo",
    },
    {
      number: "02",
      icon: BookOpenIcon,
      title: "Conheça os Detalhes",
      description: "Acesse informações completas sobre cada curso: grade curricular, duração, modalidade e muito mais.",
      color: "amber-500",
      highlight: "Informações detalhadas",
    },
    {
      number: "03",
      icon: BuildingLibraryIcon,
      title: "Visite as Instituições",
      description: "Conheça as universidades e faculdades parceiras. Acesse diretamente a página oficial do curso e da instituição.",
      color: "emerald-500",
      highlight: "Links diretos e verificados",
    },
    {
      number: "04",
      icon: BookmarkIcon,
      title: "Salve seus Favoritos",
      description: "Gostou de um curso? Crie sua conta gratuita e salve seus cursos favoritos para consultar depois.",
      color: "violet-500",
      highlight: "Cadastro seguro e rápido",
    },
  ];

  return (
    <section ref={sectionRef} className="relative bg-slate-50 py-16 md:py-24 overflow-hidden">
      {/* Padrão decorativo de fundo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgb(51, 65, 85) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Cabeçalho */}
        <div ref={titleRef} className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full mb-6 shadow-sm">
            <ArrowRightIcon className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-semibold text-slate-700 tracking-wide">Como Funciona</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
            Simples como um catálogo,{" "}
            <span className="text-blue-600">poderoso como deve ser</span>
          </h2>
          
          <p className="text-slate-600 leading-relaxed">
            Encontrar o curso ideal nunca foi tão fácil. Siga estes passos e comece sua jornada acadêmica hoje mesmo.
          </p>
        </div>

        {/* Steps com linha conectora */}
        <div className="relative">
          {/* Grid de steps */}
          <div className="grid md:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => (stepsRef.current[index] = el)}
                className="relative"
              >
                <StepCard step={step} />
              </div>
            ))}
          </div>
        </div>

        {/* Call-to-action de segurança */}
        <div className="mt-16 bg-white rounded-2xl border-2 border-slate-200 p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4 flex-1">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <ShieldCheckIcon className="h-8 w-8 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Seus dados estão seguros
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Utilizamos criptografia de ponta e seguimos as melhores práticas de segurança. 
                  Seu cadastro é <strong className="text-slate-900">100% gratuito, seguro e confiável</strong>.
                </p>
              </div>
            </div>
            
            <Link to="/cadastro" className="group flex-shrink-0 inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold shadow-lsm hover:shadow-md transition-all duration-300 hover:scale-105">
              Começar Agora
              <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
    
  );
}

const StepCard = ({ step }) => (
  <div className="group relative">
    {/* Número grande de fundo */}
    <div className="absolute -top-4 -left-2 text-8xl font-bold text-slate-100 select-none transition-colors group-hover:text-slate-200">
      {step.number}
    </div>

    {/* Card principal */}
    <div className="relative bg-white rounded-xl border-2 border-slate-200 p-6 hover:border-blue-300 hover:shadow-xl transition-all duration-300 h-full">
      {/* Ícone */}
      <div className="relative z-10 mb-4">
        <div className={`inline-flex p-3 rounded-xl bg-${step.color} shadow-md group-hover:scale-110 transition-transform duration-300`}>
          <step.icon className="h-7 w-7 text-white" />
        </div>
      </div>

      {/* Conteúdo */}
      <div className="relative z-10">
        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
          {step.title}
        </h3>
        
        <p className="text-sm text-slate-600 leading-relaxed mb-3">
          {step.description}
        </p>

        {/* Badge de destaque */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200 rounded-full">
          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${step.color}`}></div>
          <span className="text-xs font-medium text-slate-700">{step.highlight}</span>
        </div>
      </div>

      {/* Seta conectora (apenas no desktop) */}
      {step.number !== "04" && (
        <div className="hidden md:block absolute -right-4 top-20 text-slate-300 group-hover:text-blue-400 transition-colors">
          <ArrowRightIcon className="h-6 w-6" />
        </div>
      )}
    </div>
  </div>
);