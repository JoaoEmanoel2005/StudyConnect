import { HomeIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      
      {/* Coluna Esquerda - Formulário */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 px-6 py-12">
        <div className="max-w-md w-full">
          {children}
        </div>
      </div>

      {/* Coluna Direita - Imagem */}
      <div className="hidden md:flex flex-1 items-center justify-center bg-gradient-to-br from-primary to-accent text-white relative">
        <img
          src="/assets/foto_banner.jpg"
          alt="mulher-jovem-trabalha-em-laptop-em-fones-de-ouvido-no-escritorio"
          className="w-3/4 max-w-lg rounded-2xl drop-shadow-lg"
        />

         {/* Overlay de texto opcional */}
        <div className="absolute bottom-10 text-center px-6">
          <h2 className="text-2xl font-bold">Conectando você ao futuro</h2>
          <p className="text-sm text-gray-200 mt-2">
            Escolha seu curso, transforme sua carreira.
          </p>
        </div>
      </div>

      {/* Fixed Home CTA (accessible, glass + gradient style) */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link
          to="/"
          aria-label="Voltar para Home"
          aria-describedby="home-tooltip"
          title="Voltar para Home"
          className="group inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-xl ring-1 ring-white/10 backdrop-blur-sm hover:scale-105 transform transition-all focus:outline-none focus:ring-4 focus:ring-primary/30"
        >
          <HomeIcon className="h-6 w-6" />
        </Link>

        {/* Tooltip (visible on hover/focus) */}
        <span
          id="home-tooltip"
          role="tooltip"
          className="pointer-events-none absolute -top-10 right-1/2 translate-x-1/2 px-3 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200 whitespace-nowrap"
        >
          Voltar para Home
        </span>
      </div>
    </div>
  );
}
