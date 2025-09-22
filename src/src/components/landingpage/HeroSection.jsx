import { Link } from "react-router-dom"
import { UserPlusIcon, ArrowLongRightIcon, CheckIcon, TrophyIcon   } from "@heroicons/react/24/outline";

export default function HeroSection() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-textprimary to-primary py-24">
      <div className="max-w-7xl mx-auto px-7 grid md:grid-cols-2 gap-12 items-center">

        {/* Lado Esquerdo - TEXTO */}
        <div className="text-center md:text-left space-y-6">
          
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-amber-500/30 text-amber-300 text-sm font-medium rounded-full border border-amber-500/30 mb-6">
              <span role="img" aria-label="graduation cap">🎓</span> Transforme Sua Carreira Hoje!
            </span>
          </div>

          <h1 className="text-white text-xl lg:text-7xl font-bold mb-8 leading-tight">
              Study
            <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent block">
                Connect
            </span>
          </h1>

          <p className="text-slate-200 mb-10 leading-relaxed max-w-lg ">
            Junte-se a milhares de profissionais que estão avançando em suas carreiras com cursos de nível internacional.
          </p>

          {/* Botões CTA */}
          <div className="flex flex-col sm:flex-row gap-4 m">
            <Link to="/catalogo">
              <button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold px-9 py-3 rounded-xl flex items-center justify-center gap-3">
                Explore os Cursos
                <ArrowLongRightIcon className="h-6 w-6 text-white" />
              </button>
            </Link>
            <Link to="/cadastro">
              <button className="border border-white/20 text-white hover:bg-white/10 px-9 py-3 rounded-xl flex items-center justify-center gap-3">
                <UserPlusIcon  className="h-6 w-6 text-white" />
                Cadastre-se Grátis
              </button>
            </Link>
            
          </div>
        </div>

        {/* Lado Direito - IMAGEM */}
        <div className="flex justify-center md:justify-end relative">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop" 
            alt="Students learning online"
            className="rounded-2xl shadow-2xl"
          />

          {/* Floating Cards */}
          <div className="absolute -top-4 -left-4 bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
            <div className="flex items-center gap-2 text-white">
              <div className="w-9 h-9 bg-green-500 rounded-full flex items-center justify-center">
                <CheckIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="font-semibold">Cursos Completos</div>
                <div className="text-xs opacity-80">100/100</div>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-4 -right-4 bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
            <div className="flex items-center gap-2 text-white">
              <div className="w-9 h-9 bg-amber-500 rounded-full flex items-center justify-center">
                <TrophyIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="font-semibold">Melhores Desempenhos</div>
                <div className="text-xs opacity-80">Seja um dos nossos campeões</div>
              </div>
            </div>
          </div>
        </div>

        
      </div>
      </section>
    </>
  )
}