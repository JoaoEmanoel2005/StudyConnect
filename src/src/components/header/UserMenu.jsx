import { Link } from "react-router-dom";
import { UserCircleIcon, ArrowRightStartOnRectangleIcon, PencilSquareIcon  } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

function initials(name) {
  return (name || "U")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function UserMenu({ usuario, openUserMenu, setOpenUserMenu, logout }) {
  return (
    <div className="relative">
        {usuario ? (
            <button
            onClick={() => setOpenUserMenu((s) => !s)}
            className="flex items-center gap-2 rounded-full px-3 py-1 hover:bg-gray-100"
            aria-label="Abrir menu do usuário"
            >
                  {usuario.avatar ? (
                    <img src={usuario.avatar} alt="avatar" className="h-8 w-8 rounded-full object-cover" />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-700">
                      {initials(usuario.name)}
                    </div>
                  )}
                  <span className="hidden sm:inline text-sm text-slate-700">{usuario.name?.split(" ")[0]}</span>
                  <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                </button>
              ) : null}

              {/* user menu */}
              {openUserMenu && usuario && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
                  <div className="py-1">
                    <div className="block px-4 py-2 text-sm text-slate-800 border-b ">
                      Conectado como <strong>{usuario.name?.split(" ")[0]}</strong>
                    </div>
                    <Link to="/perfil" className="flex items-center gap-1 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <UserCircleIcon className="h-4 w-4" />
                      Meu perfil
                    </Link>
                    <Link to="/perfil/editar" className="flex items-center gap-1 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <PencilSquareIcon className="h-4 w-4" />
                      Editar perfil
                    </Link>                    
                    <button
                      onClick={() => { setOpenUserMenu(false); logout?.(); }}
                      className="w-full text-left px-4 py-2 text-sm border-t text-red-600 hover:bg-red-50 flex items-center gap-1"
                    >
                      <ArrowRightStartOnRectangleIcon className="h-4 w-4" />
                      Sair
                    </button>
                  </div>
                </div>
    )}
    </div>
  );
}
