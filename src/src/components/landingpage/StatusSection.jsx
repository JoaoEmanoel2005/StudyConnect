import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookOpenIcon  , BuildingOffice2Icon , UsersIcon , RocketLaunchIcon } from "@heroicons/react/24/outline";

gsap.registerPlugin(ScrollTrigger);


export default function StatusSection() {
  const statsRef = useRef([]);
  const categoryRefs = useRef([]);

  const stats = [
    { number: 50, label: "Cursos disponíveis", icon: <BookOpenIcon className="h-11 w-11 text-indigo-500 bg-indigo-50 rounded-full py-2" /> },
    { number: 3, label: "Instituições parceiras", icon: <BuildingOffice2Icon  className="h-11 w-11 text-green-500 bg-green-50 rounded-full py-2" /> },
    { number: 100, label: "Alunos conectados", icon: <UsersIcon  className="h-11 w-11 text-amber-500 bg-amber-50 rounded-full py-2"  /> },
    { number: 10, label: "Áreas de conhecimento", icon: <RocketLaunchIcon className="h-11 w-11 text-red-500 bg-red-50 rounded-full py-2"  /> }
  ];

  useEffect(() => {
    // Contadores animados
    statsRef.current.forEach((el, idx) => {
      gsap.fromTo(
        el.querySelector(".stat-number"),
        { innerText: 0 },
        {
          innerText: stats[idx].number,
          duration: 2,
          ease: "power1.out",
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
          },
        }
      );
    });
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="w-auto mx-auto text-center mb-12 px-6">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Confiável por profissionais de todo o Brasil</h2>
        <p className="text-lg text-slate-600">
          Nossos números falam por si. Veja como estamos conectando estudantes a oportunidades educacionais.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 gap-y-12 text-center">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            ref={(el) => (statsRef.current[idx] = el)}
            className="p-6 bg-white rounded-2xl border shadow-md flex flex-col items-center gap-3"
          >
            {/* Ícone + Número em linha */}
            <div className="flex items-center gap-3">
              <div>{stat.icon}</div>
              <h3 className="text-3xl font-bold text-textprimary stat-number">0</h3>
            </div>

            {/* Label abaixo */}
            <p className="text-textsecondary text-sm">{stat.label}</p>
          </div>
        ))}
        </div>
    </section>
  );
}
