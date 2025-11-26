import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/outline";

function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLoginClick = () => {
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-gray-200/50 flex items-center px-4 md:px-6 z-50">
        {/* LOGO */}
        <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-3">
          <div className="rounded-md px-2 py-1 bg-indigo-100 text-indigo-600 font-bold">SC</div>
          <span className="hidden sm:inline text-lg font-semibold text-slate-900">StudyConnect Administrador</span>
        </Link>

        {/* AÇÕES */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Botão Login Desktop */}
          <button
            onClick={handleLoginClick}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-slate-700 hover:bg-gray-50 hover:shadow-sm transition-all"
          >
            <UserIcon className="h-4 w-4 text-gray-500" />
            <span>Entrar</span>
          </button>

          {/* Menu Hamburger Mobile */}
          <button
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex flex-col gap-1.5 w-5">
              <span
                className={`h-0.5 w-full bg-slate-700 transition-transform duration-300 ${
                  menuOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`h-0.5 w-full bg-slate-700 transition-opacity duration-300 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`h-0.5 w-full bg-slate-700 transition-transform duration-300 ${
                  menuOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Menu Mobile */}
      <div
        className={`sm:hidden fixed top-16 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg z-40 transition-all duration-300 ${
          menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <nav className="p-4" aria-label="Menu móvel">
          <button
            onClick={handleLoginClick}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <UserIcon className="h-5 w-5 text-gray-500" />
            <span className="text-slate-700 font-medium">Entrar</span>
          </button>
        </nav>
      </div>
    </>
  );
}

export default Header;
