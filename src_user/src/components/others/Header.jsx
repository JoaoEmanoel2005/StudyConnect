import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { useAuth } from "../../context/AuthContext";
import SearchBar from "../header/SearchBar";
import UserMenu from "../header/UserMenu";
import MobileMenu from "../header/MobileMenu";

export default function Header() {
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { usuario, logout } = useAuth();

  useEffect(() => {
    const handleShortcut = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        const input = document.getElementById("searchInput");
        input?.focus();
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/buscar?q=${encodeURIComponent(query)}`);
      setQuery("");
    }
  };

  return (
    <header className="bg-white border-b sticky top-0 z-40 shadow-sm">
      <div className="max-w-full mx-auto px-4 sm:px-8 flex items-center justify-between h-16">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">
          <div className="rounded-md px-2 py-1 bg-primary/10 text-primary font-bold">SC</div>
          <span className="hidden sm:inline text-lg font-semibold text-slate-900">StudyConnect</span>
        </Link>


        {/* MENU DESKTOP */}
        <nav className="hidden lg:flex lg:items-center lg:space-x-6">
          <Link to="/" className="text-sm text-slate-600 hover:text-primary">Home</Link>
          <Link to="/catalogo" className="text-sm text-slate-600 hover:text-primary">Catálogo de Cursos</Link>
          <Link to="/instituicoes" className="text-sm text-slate-600 hover:text-primary">Instituições de Ensino</Link>
          <Link to="/sobre-nos" className="text-sm text-slate-600 hover:text-primary">Sobre Nós</Link>
          <Link to="/contato" className="text-sm text-slate-600 hover:text-primary">Contato</Link>
        </nav>

        {/* 🔍 BUSCA */}
        <SearchBar query={query} setQuery={setQuery} handleSearch={handleSearch} />

        {/* USUÁRIO */}
        <div className="relative flex items-center gap-3">
          {usuario ? (
            <UserMenu
              usuario={usuario}
              openUserMenu={openUserMenu}
              setOpenUserMenu={setOpenUserMenu}
              logout={logout}
            />
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link to="/login" className="px-3 py-1 text-sm bg-primary text-white rounded-md">Entrar</Link>
              <Link to="/cadastro" className="px-3 py-1 text-sm border rounded-md">Cadastrar</Link>
            </div>
          )}

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
            onClick={() => setOpenMobile(!openMobile)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* MENU MOBILE */}
      <MobileMenu open={openMobile} setOpen={setOpenMobile} usuario={usuario} logout={logout} />
    </header>
  );
}
