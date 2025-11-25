import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  // ✨ GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
      aria-labelledby="final-cta-title"
    >
      <div
        ref={contentRef}
        className="max-w-4xl mx-auto px-6 text-center relative z-10"
      >
        <h2
          id="final-cta-title"
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Pronto para transformar sua jornada educacional?
        </h2>
        <p className="text-lg mb-10 max-w-3xl mx-auto">
          Junte-se a milhares de estudantes que já estão aproveitando ao máximo as oportunidades
          acadêmicas com nossa plataforma inovadora.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="/cadastro"
            className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg shadow hover:bg-gray-100 transition"
            aria-label="Comece agora"
          >
            Comece Agora
          </a>
          <a
            href="/sobre-nos"
            className="border border-white text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-white hover:text-blue-600 transition"
            aria-label="Saiba mais"
          >
            Saiba Mais
          </a>
        </div>
      </div>
    </section>
  );
}
