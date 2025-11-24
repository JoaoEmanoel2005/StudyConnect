import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { StarIcon } from "@heroicons/react/24/solid";
import { AcademicCapIcon, CheckBadgeIcon } from "@heroicons/react/24/outline";

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialsSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

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

      // Animação dos cards
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const testimonials = [
    {
      id: 1,
      name: "Ana Carolina Silva",
      role: "Estudante de Engenharia",
      institution: "UNIFESP",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      rating: 5,
      text: "O StudyConnect foi essencial na minha escolha. Consegui comparar diferentes cursos de engenharia e encontrei a instituição perfeita para mim. A plataforma é intuitiva e as informações são muito completas.",
      course: "Engenharia de Software",
      verified: true
    },
    {
      id: 2,
      name: "Rafael Mendes",
      role: "Estudante de Administração",
      institution: "FGV",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      rating: 5,
      text: "Economia de tempo incrível! Antes eu tinha que visitar vários sites diferentes. Aqui encontrei tudo em um só lugar, com contato direto das instituições. Recomendo muito!",
      course: "Administração",
      verified: true
    },
    {
      id: 3,
      name: "Juliana Oliveira",
      role: "Estudante de Medicina",
      institution: "UNICAMP",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      rating: 5,
      text: "A funcionalidade de salvar cursos favoritos me ajudou muito durante o processo de decisão. Pude analisar com calma cada opção e fazer a melhor escolha para minha carreira.",
      course: "Medicina",
      verified: true
    },
    {
      id: 4,
      name: "Pedro Santos",
      role: "Estudante de Direito",
      institution: "USP",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      rating: 5,
      text: "Plataforma excelente para quem está em dúvida sobre qual curso fazer. As descrições são claras e o sistema de busca é muito eficiente. Consegui tirar todas as minhas dúvidas.",
      course: "Direito",
      verified: true
    },
    {
      id: 5,
      name: "Mariana Costa",
      role: "Estudante de Arquitetura",
      institution: "PUC-SP",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
      rating: 5,
      text: "Adorei poder ver as grades curriculares e modalidades de ensino antes de me decidir. A plataforma facilitou demais minha pesquisa e me deu segurança na escolha.",
      course: "Arquitetura e Urbanismo",
      verified: true
    },
    {
      id: 6,
      name: "Lucas Ferreira",
      role: "Estudante de Psicologia",
      institution: "UnB",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
      rating: 5,
      text: "O cadastro foi super rápido e seguro. Agora consigo acompanhar todos os cursos que me interessam em um só lugar. Interface limpa e fácil de usar, parabéns pelo trabalho!",
      course: "Psicologia",
      verified: true
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      {/* Padrão decorativo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgb(51, 65, 85) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Cabeçalho */}
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full mb-6">
            <CheckBadgeIcon className="h-4 w-4 text-emerald-600" />
            <span className="text-sm font-semibold text-emerald-900 tracking-wide">Depoimentos</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            O que dizem nossos{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-emerald-600">estudantes</span>
              <span className="absolute bottom-2 left-0 w-full h-3 bg-emerald-100 -skew-y-1"></span>
            </span>
          </h2>
          
          <p className="text-lg text-slate-600 leading-relaxed">
            Milhares de estudantes já encontraram seu curso ideal através do StudyConnect. 
            Veja o que eles têm a dizer sobre a experiência.
          </p>
        </div>

        {/* Grid de Depoimentos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              ref={(el) => (cardsRef.current[index] = el)}
            >
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>

        {/* Estatísticas de satisfação */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-3xl transform -skew-y-1"></div>
          
          <div className="relative bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-3xl p-8 md:p-12 border border-emerald-500">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="group">
                <div className="inline-flex items-center justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="h-6 w-6 text-amber-400 group-hover:scale-110 transition-transform" style={{ transitionDelay: `${i * 50}ms` }} />
                  ))}
                </div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">4.9/5</div>
                <div className="text-emerald-100 text-sm">Avaliação média</div>
              </div>

              <div className="border-l border-r border-emerald-400/30">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">98%</div>
                <div className="text-emerald-100 text-sm">Taxa de satisfação</div>
                <div className="mt-2 text-xs text-emerald-200">baseado em +10.000 avaliações</div>
              </div>

              <div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">+1k</div>
                <div className="text-emerald-100 text-sm">Estudantes conectados</div>
                <div className="mt-2 text-xs text-emerald-200">e crescendo cada dia</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

const TestimonialCard = ({ testimonial }) => (
  <div className="group relative bg-white rounded-2xl border-2 border-slate-200 p-6 hover:border-emerald-300 transition-all duration-300 h-full flex flex-col">
    {/* Header com foto e info */}
    <div className="flex items-start gap-4 mb-4 relative z-10">
      <div className="relative flex-shrink-0">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-14 h-14 rounded-full object-cover border-2 border-slate-200 group-hover:border-emerald-400 transition-colors"
        />
        {testimonial.verified && (
          <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1">
            <CheckBadgeIcon className="h-4 w-4 text-white" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-slate-900 text-base truncate group-hover:text-emerald-600 transition-colors">
          {testimonial.name}
        </h4>
        <p className="text-xs text-slate-500 truncate">{testimonial.role}</p>
        <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
          <AcademicCapIcon className="h-3 w-3" />
          {testimonial.institution}
        </p>
      </div>
    </div>

    {/* Rating */}
    <div className="flex items-center gap-1 mb-4">
      {[...Array(testimonial.rating)].map((_, i) => (
        <StarIcon key={i} className="h-4 w-4 text-amber-400" />
      ))}
    </div>

    {/* Texto do depoimento */}
    <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-1">
      "{testimonial.text}"
    </p>

    {/* Badge do curso */}
    <div className="pt-4 border-t border-slate-100">
      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-100">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
        {testimonial.course}
      </span>
    </div>
  </div>
);