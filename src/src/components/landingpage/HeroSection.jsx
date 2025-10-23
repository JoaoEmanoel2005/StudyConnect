import { useState } from "react";
import { Link } from "react-router-dom";
import {
  UserPlusIcon,
  ArrowLongRightIcon,
  CheckIcon,
  TrophyIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

export default function HeroSection() {
  const [query, setQuery] = useState("");

  return (
    <section className="relative overflow-hidden">

      <div className="bg-gradient-to-r from-textprimary to-primary py-20 md:py-28 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Text + CTA + Search */}
          <div className="text-center md:text-left space-y-6 relative z-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/20 text-amber-200 text-sm font-medium rounded-full border border-amber-500/20">
              <span className="text-base">🎓</span>
              Transforme sua carreira hoje
            </span>

            <h1 className="text-white text-3xl sm:text-4xl lg:text-6xl font-extrabold leading-tight">
              Study
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent block">
                Connect
              </span>
            </h1>

            <p className="text-slate-200 max-w-xl mx-auto md:mx-0 text-sm sm:text-base">
              Junte-se a milhares que estão avançando com cursos certificados.
              Encontre trilhas, instrutores e instituições que combinam com você.
            </p>

            {/* CTAs */}
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <Link
                to="/catalogo"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition"
              >
                Explore os Cursos
                <ArrowLongRightIcon className="h-5 w-5" />
              </Link>

              <Link
                to="/cadastro"
                className="inline-flex items-center gap-2 border border-white/20 text-white px-6 py-3 rounded-xl hover:bg-white/5 transition"
              >
                <UserPlusIcon className="h-5 w-5" />
                Cadastre-se Grátis
              </Link>
            </div>
          </div>

          {/* Right - Image + stats below */}
          <div className="flex justify-center md:justify-end relative z-10">
            <div className="flex flex-col items-center">
              {/* Imagem maior */}
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop"
                alt="Students learning online"
                className="w-full max-w-lg object-cover rounded-3xl shadow-lg"
              />
              {/* Estatísticas abaixo da imagem */}
              <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start px-4 pb-4">
                <div className="flex items-center gap-3 bg-white/5 px-3 py-2 rounded-lg">
                  <div className="p-2 bg-white/10 rounded-full">
                    <SparklesIcon className="h-5 w-5 text-amber-400" />
                  </div>
                  <div className="text-sm text-white">
                    <div className="font-semibold">+10k</div>
                    <div className="text-xs opacity-80">Alunos</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/5 px-3 py-2 rounded-lg">
                  <div className="p-2 bg-white/10 rounded-full">
                    <CheckIcon className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="text-sm text-white">
                    <div className="font-semibold">500+</div>
                    <div className="text-xs opacity-80">Cursos</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/5 px-3 py-2 rounded-lg">
                  <div className="p-2 bg-white/10 rounded-full">
                    <TrophyIcon className="h-5 w-5 text-amber-300" />
                  </div>
                  <div className="text-sm text-white">
                    <div className="font-semibold">Top Rated</div>
                    <div className="text-xs opacity-80">
                      Instrutores qualificados
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}