import { HomeIcon } from "@heroicons/react/24/outline";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      
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

      {/* Botão Home com tooltip */}
      <div className="absolute bottom-10 right-10 group">
        <button
          onClick={() => (window.location.href = "/")}
          className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 shadow-lg transition-colors transform hover:scale-110"
        >
          <HomeIcon className="h-6 w-6 text-gray-300 hover:text-white" />
        </button>

        {/* Tooltip */}
        <span className="absolute -top-10 right-1/2 translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition duration-300 whitespace-nowrap hover:scale-105">
          Voltar para Home
        </span>
      </div>
    </div>
  );
}
