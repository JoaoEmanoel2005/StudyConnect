import { Link } from "react-router-dom";
import { 
  UserCircleIcon, 
  ArrowRightOnRectangleIcon, 
  PencilSquareIcon,
  ChevronDownIcon,
  CheckBadgeIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";

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
          className="group flex items-center gap-2.5 rounded-xl px-3 py-2 transition-all duration-200 border-2 border-transparent"
          aria-label="Abrir menu do usuário"
        >
          {/* Avatar/Initials */}
          {usuario.avatar ? (
            <div className="relative">
              <img 
                src={usuario.avatar} 
                alt="avatar" 
                className="h-9 w-9 rounded-full object-cover border-2 border-slate-200 group-hover:border-blue-400 transition-colors" 
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
            </div>
          ) : (
            <div className="relative h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-sm font-bold text-white shadow-md group-hover:scale-105 transition-transform">
              {initials(usuario.name)}
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
            </div>
          )}

          {/* Nome */}
          <span className="hidden sm:inline text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
            {usuario.name?.split(" ")[0]}
          </span>

          {/* Chevron com rotação */}
          <ChevronDownIcon 
            className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
              openUserMenu ? 'rotate-180' : ''
            }`} 
          />
        </button>
      ) : null}

      {/* Dropdown Menu */}
      {openUserMenu && usuario && (
        <>
          {/* Overlay para fechar ao clicar fora */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setOpenUserMenu(false)}
          />

          <div className="absolute right-0 mt-3 w-64 bg-white border-2 border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden animate-slideDown">
            {/* Header do Menu */}
            <div className="px-4 py-4 bg-gradient-to-br from-slate-50 to-white border-b-2 border-slate-100">
              <div className="flex items-center gap-3">
                {usuario.avatar ? (
                  <img 
                    src={usuario.avatar} 
                    alt="avatar" 
                    className="h-12 w-12 rounded-full object-cover border-2 border-blue-400 shadow-md" 
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-base font-bold text-white shadow-md">
                    {initials(usuario.name)}
                  </div>
                )}
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="font-bold text-slate-900 truncate">
                      {usuario.name}
                    </p>
                    {usuario.verified && (
                      <CheckBadgeIcon className="h-4 w-4 text-blue-500 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-slate-500 truncate">
                    {usuario.email || 'estudante@email.com'}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              <Link 
                to="/perfil" 
                onClick={() => setOpenUserMenu(false)}
                className="group flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-blue-50 transition-colors"
              >
                <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg bg-slate-100 group-hover:bg-blue-100 transition-colors">
                  <UserCircleIcon className="h-5 w-5 text-slate-600 group-hover:text-blue-600 transition-colors" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                    Meu Perfil
                  </div>
                  <div className="text-xs text-slate-500">
                    Ver informações
                  </div>
                </div>
              </Link>

              <Link 
                to="/perfil/editar" 
                onClick={() => setOpenUserMenu(false)}
                className="group flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-amber-50 transition-colors"
              >
                <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg bg-slate-100 group-hover:bg-amber-100 transition-colors">
                  <PencilSquareIcon className="h-5 w-5 text-slate-600 group-hover:text-amber-600 transition-colors" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-slate-900 group-hover:text-amber-600 transition-colors">
                    Editar Perfil
                  </div>
                  <div className="text-xs text-slate-500">
                    Atualizar dados
                  </div>
                </div>
              </Link>

              <Link 
                to="/perfil/editar" 
                onClick={() => setOpenUserMenu(false)}
                className="group flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-emerald-50 transition-colors"
              >
                <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg bg-slate-100 group-hover:bg-emerald-100 transition-colors">
                  <BookmarkIcon  className="h-5 w-5 text-slate-600 group-hover:text-emerald-600 transition-colors" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">
                    Meus Favoritos
                  </div>
                  <div className="text-xs text-slate-500">
                    Visualizar cursos salvos
                  </div>
                </div>
              </Link>
            </div>

            {/* Logout Button */}
            <div className="border-t-2 border-slate-100 p-2">
              <button
                onClick={() => { 
                  setOpenUserMenu(false); 
                  logout?.(); 
                }}
                className="group w-full flex items-center gap-3 px-4 py-3 text-sm rounded-xl hover:bg-red-50 transition-all"
              >
                <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg bg-slate-100 group-hover:bg-red-100 transition-colors">
                  <ArrowRightOnRectangleIcon className="h-5 w-5 text-slate-600 group-hover:text-red-600 transition-colors" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-slate-900 group-hover:text-red-600 transition-colors">
                    Sair da Conta
                  </div>
                  <div className="text-xs text-slate-500">
                    Fazer logout
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Animação CSS */}
          <style jsx>{`
            @keyframes slideDown {
              from {
                opacity: 0;
                transform: translateY(-10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .animate-slideDown {
              animation: slideDown 0.2s ease-out;
            }
          `}</style>
        </>
      )}
    </div>
  );
}