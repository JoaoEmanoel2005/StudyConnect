import { ArrowLeftOnRectangleIcon, BellIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function ProfileHeader({ usuario, logout }) {
  const navigate = useNavigate();

  return (
    <header className="bg-gradient-to-r from-primary to-accent text-white z-10">
      <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white"
        >
          <ArrowLeftOnRectangleIcon className="h-5 w-5" /> Voltar
        </button>

        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-full hover:bg-white/10">
            <BellIcon className="h-6 w-6" />
            {Array.isArray(usuario?.notifications) && usuario.notifications.length > 0 && (
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
                {usuario.notifications.length}
              </span>
            )}
          </button>
          <button
            onClick={logout}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}
