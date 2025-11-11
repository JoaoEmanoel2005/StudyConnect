// NotFound.jsx
import { Link } from "react-router-dom";
import { HomeIcon, PhoneIcon  } from "@heroicons/react/24/outline";

export default function NotFound() {
  return (
    <div className="grid max-h-screen place-items-center bg-indigo-50 px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-secondary">Error 404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-balance text-primary sm:text-7xl">
            Página não Encontrada
          </h1>
          <p className="mt-6 text-lg font-medium text-pretty text-secondary sm:text-xl/8">
            Desculpe, não conseguimos encontrar a página que você está procurando.<br />
            Tente verificar o URL ou voltar para a página inicial.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/" className="flex w-64 items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 transition-colors rounded-lg p-4 text-white font-medium">
              <HomeIcon className="h-5 w-5 text-white" />
              Voltar para a Home
            </Link>
            <Link to="/contato" className="flex w-64 items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 transition-colors rounded-lg p-4 text-white font-medium">
              <PhoneIcon className="h-5 w-5 text-white" />
              Contate com o Suporte
            </Link>
          </div>
        </div>
      </div>
  );
}
