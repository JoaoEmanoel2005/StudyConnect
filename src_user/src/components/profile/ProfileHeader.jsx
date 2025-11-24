import { 
  ArrowLeftIcon, 
  BellIcon, 
  ArrowRightOnRectangleIcon,
  UserCircleIcon 
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function ProfileHeader({ usuario, logout }) {
  const navigate = useNavigate();

  const notificationCount = Array.isArray(usuario?.notifications) 
    ? usuario.notifications.length 
    : 0;

  return (
    <header className="relative bg-gradient-to-br from-textprimary to-primary text-white overflow-hidden">
      {/* Conteúdo */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-6">
          {/* Lado esquerdo - Botão voltar e info do usuário */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate(-1)}
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all hover:scale-105 border border-white/20"
            >
              <ArrowLeftIcon className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
              <span className="font-medium">Voltar</span>
            </button>

            {/* Info rápida do usuário (opcional, pode remover se preferir) */}
            <div className="hidden md:flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                {usuario?.fotoPerfil ? (
                  <img 
                    src={usuario.fotoPerfil} 
                    alt="Avatar" 
                    className="w-full h-full object-cover rounded-xl" 
                  />
                ) : (
                  <UserCircleIcon className="h-6 w-6" />
                )}
              </div>
              <div>
                <p className="font-semibold text-sm">{usuario?.nome || "Usuário"}</p>
                <p className="text-xs text-white/70">Perfil do Usuário</p>
              </div>
            </div>
          </div>

          {/* Lado direito - Notificações e Logout */}
          <div className="flex items-center gap-3">
            {/* Notificações */}
            <button className="relative p-3 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all hover:scale-105 border border-white/20 group">
              <BellIcon className="h-6 w-6 transition-transform group-hover:rotate-12" />
              {notificationCount > 0 && (
                <>
                  {/* Badge de notificação */}
                  <span className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-red-500 rounded-full text-xs font-bold flex items-center justify-center px-1.5 shadow-lg animate-pulse border-2 border-white">
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </span>
                  {/* Pulso animado */}
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full animate-ping opacity-75"></span>
                </>
              )}
            </button>

            {/* Botão de Logout */}
            <button
              onClick={logout}
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all hover:scale-105 font-medium border border-white/20"
            >
              <span className="hidden sm:inline">Sair</span>
              <ArrowRightOnRectangleIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Linha decorativa inferior */}
      <div className="h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
    </header>
  );
}