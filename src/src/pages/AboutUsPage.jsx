import HeroSection from "../components/about/HeroSection";
import MissionSection from "../components/about/MissionSection";
import TimelineSection from "../components/about/TimelineSection";
import TeamSection from "../components/about/TeamSection"

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <HeroSection />
      <MissionSection />
      <TimelineSection />
      <TeamSection />

      {/* CTA Final */}
      <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Quer saber mais sobre o projeto?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Entre em contato conosco ou explore a plataforma para conhecer todas as funcionalidades
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contato"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg"
            >
              Entre em Contato
            </a>
            <a
              href="/catalogo"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors"
            >
              Explorar Cursos
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

