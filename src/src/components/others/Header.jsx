import { useState, useEffect, useRef, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  ArrowRightStartOnRectangleIcon,
  MagnifyingGlassIcon,
  BuildingLibraryIcon,
  BookOpenIcon,
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  BanknotesIcon,
  ChatBubbleOvalLeftIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline";
import { cursos as cursosData } from "../../data/Courses";
import { instituicao as instituicaoData } from "../../data/Institution";

export default function Header() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const [openMobile, setOpenMobile] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const inputRef = useRef(null);
  const resultsRef = useRef(null);

  // keyboard shortcut: Ctrl/Cmd + K to focus search
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setShowResults(true);
        setOpenMobile(false);
      }
      if (e.key === "Escape") {
        setShowResults(false);
        setOpenUserMenu(false);
        setOpenMobile(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // close results when clicking outside
  useEffect(() => {
    const onDoc = (e) => {
      if (!resultsRef.current) return;
      if (!resultsRef.current.contains(e.target) && e.target !== inputRef.current) {
        setShowResults(false);
      }
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  const normalized = (s) => (s || "").toString().toLowerCase();

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = normalized(query);
    const cursoMatches = cursosData
      .filter((c) => normalized(c.nome).includes(q) || normalized(c.categoria).includes(q))
      .slice(0, 5)
      .map((c) => ({ id: `curso-${c.id}`, kind: "curso", title: c.nome, meta: c.categoria, href: `/curso/${c.id}`, Icon: BookOpenIcon }));
    const instMatches = instituicaoData
      .filter((i) => normalized(i.nome).includes(q) || normalized(i.cidade).includes(q))
      .slice(0, 5)
      .map((i) => ({ id: `inst-${i.id}`, kind: "instituicao", title: i.nome, meta: i.cidade, href: `/instituicao/${i.id}`, Icon: BuildingLibraryIcon }));
    return [...cursoMatches, ...instMatches];
  }, [query]);

  const initials = (name) =>
    (name || "U")
      .split(" ")
      .map((p) => p[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  const goto = (href) => {
    navigate(href);
    setShowResults(false);
    setQuery("");
    setOpenMobile(false);
  };

  return (
    <header className="bg-white border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-1 sm:px-2 lg:px-2">
        <div className="flex h-20 items-center justify-between">
          {/* left: logo */}
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
              onClick={() => setOpenMobile((s) => !s)}
              aria-label="Abrir menu"
            >
              {openMobile ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>

            <Link to="/" className="flex items-center gap-3">
              <div className="rounded-md px-2 py-1 bg-primary/10 text-primary font-bold">SC</div>
              <span className="hidden sm:inline text-lg font-semibold text-slate-900">StudyConnect</span>
            </Link>
          </div>

          {/* center: nav (desktop) */}
          <nav className="hidden lg:flex lg:items-center lg:space-x-6">
            <Link to="/" className="text-sm text-slate-600 hover:text-primary">Home</Link>
            <Link to="/catalogo" className="text-sm text-slate-600 hover:text-primary">Catálogo de Cursos</Link>
            <Link to="/instituicoes" className="text-sm text-slate-600 hover:text-primary">Instituições de Ensino</Link>
            <Link to="/sobre-nos" className="text-sm text-slate-600 hover:text-primary">Sobre Nós</Link>
            <Link to="/contato" className="text-sm text-slate-600 hover:text-primary">Contato</Link>
          </nav>

          {/* right: search + user */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="flex items-center rounded-full border bg-white shadow-sm px-3 py-1">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setShowResults(Boolean(e.target.value));
                  }}
                  onFocus={() => setShowResults(Boolean(query))}
                  placeholder="Pesquisar cursos ou instituições..."
                  className="ml-2 w-36 md:w-24 lg:w-60 text-sm placeholder-gray-400 bg-transparent outline-none"
                  aria-label="Pesquisar"
                />
              </div>

              {/* results dropdown (desktop) */}
              {showResults && results.length > 0 && (
                <div ref={resultsRef} className="absolute right-0 mt-2 w-[28rem] md:w-96 bg-white border rounded-lg shadow-lg overflow-hidden z-50">
                  <div className="divide-y">
                    {results.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => goto(r.href)}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-start gap-3"
                      >
                        <r.Icon className="h-5 w-5 text-gray-500 mt-0.5" />
                        <div className="flex-1">
                          <div className="font-medium text-sm text-slate-900">{r.title}</div>
                          <div className="text-xs text-gray-500">{r.meta} • {r.kind}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {showResults && query && results.length === 0 && (
                <div className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow p-4 text-sm text-gray-500 z-50">
                  Nenhum resultado para &quot;{query}&quot;
                </div>
              )}
            </div>

            {/* user area */}
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
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link to="/login" className="px-3 py-1 text-sm bg-primary text-white rounded-md">Entrar</Link>
                  <Link to="/cadastro" className="px-3 py-1 text-sm border rounded-md">Cadastrar</Link>
                </div>
              )}

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
                    <button
                      onClick={() => { setOpenUserMenu(false); logout?.(); }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-1"
                    >
                      <ArrowRightStartOnRectangleIcon className="h-4 w-4" />
                      Sair
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* mobile full-screen panel (enhanced & dynamic) */}
        {openMobile && (
          <div className="fixed inset-0 z-50">
            {/* animated backdrop */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-indigo-50 backdrop-blur-sm"
              aria-hidden
            />

            <div className="relative h-full overflow-auto">
              <div className="flex flex-col min-h-full max-w-full mx-auto border shadow-lg bg-white">
                {/* header of panel */}
                <div className="flex items-center justify-between px-4 py-4 border-b backdrop-blur-sm">
                  <Link to="/" onClick={() => setOpenMobile(false)} className="flex items-center gap-3">
                    <div className="rounded-md px-3 py-2 bg-primary/10 text-primary font-bold">SC</div>
                    <span className="text-lg font-semibold text-slate-900">StudyConnect</span>
                  </Link>

                  <div className="flex items-center gap-2">
                    <button
                      className="p-2 rounded-md hover:bg-gray-100"
                      onClick={() => {
                        setOpenMobile(false);
                        inputRef.current?.focus();
                      }}
                      aria-label="Focar pesquisa"
                    >
                      <MagnifyingGlassIcon className="h-5 w-5" />
                    </button>

                    {usuario ? (
                      <button
                        onClick={() => {
                          setOpenUserMenu(false);
                          setOpenMobile(false);
                          navigate("/perfil");
                        }}
                        className="px-3 py-1 rounded-md bg-primary text-white text-sm"
                      >
                        Minha Conta
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <Link to="/login" onClick={() => setOpenMobile(false)} className="px-3 py-1 rounded-md bg-primary text-white text-sm">Entrar</Link>
                        <Link to="/cadastro" onClick={() => setOpenMobile(false)} className="px-3 py-1 rounded-md border text-sm">Cadastrar</Link>
                      </div>
                    )}

                    <button className="ml-2 p-2 rounded-md hover:bg-gray-100" onClick={() => setOpenMobile(false)} aria-label="Fechar menu">
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>
                </div>

                {/* search block */}
                <div className="px-4 py-4 bg-white">
                  <div className="relative">
                    <div className="flex items-center rounded-lg border px-3 py-2 bg-gray-50">
                      <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                      <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        ref={inputRef}
                        placeholder="Pesquisar cursos e instituições..."
                        className="ml-3 w-full bg-transparent outline-none text-sm"
                      />
                      {query && (
                        <button
                          onClick={() => { setQuery(""); setShowResults(false); }}
                          className="text-sm text-gray-500 px-2"
                          aria-label="Limpar pesquisa"
                        >
                          Limpar
                        </button>
                      )}
                    </div>
                  </div>

                  {/* mobile search results */}
                  <div className="mt-3">
                    {query ? (
                      results.length ? (
                        <div className="grid gap-2">
                          {results.map((r) => (
                            <button
                              key={r.id}
                              onClick={() => goto(r.href)}
                              className="flex items-center gap-3 p-3 rounded-lg bg-white border hover:shadow-sm text-left"
                            >
                              <r.Icon className="h-6 w-6 text-gray-500" />
                              <div className="flex-1">
                                <div className="font-medium">{r.title}</div>
                                <div className="text-xs text-gray-500">{r.meta} • {r.kind}</div>
                              </div>
                              <span className="text-primary text-sm">Abrir</span>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="p-3 text-sm text-gray-500">Nenhum resultado para "{query}"</div>
                      )
                    ) : (
                      // suggestions when no query
                      <div className="grid grid-cols-2 gap-3 mt-2">
                        <button onClick={() => { goto("/catalogo"); }} className="p-3 rounded-lg bg-white border flex flex-col items-start">
                          <BookOpenIcon className="h-6 w-6 text-primary mb-2" />
                          <div className="font-medium">Explorar Cursos</div>
                          <div className="text-xs text-gray-500">Filtrar por área</div>
                        </button>
                        <button onClick={() => { goto("/instituicoes"); }} className="p-3 rounded-lg bg-white border flex flex-col items-start">
                          <BuildingLibraryIcon className="h-6 w-6 text-primary mb-2" />
                          <div className="font-medium">Instituições de Ensino</div>
                          <div className="text-xs text-gray-500">Buscar por cidade</div>
                        </button>
                        <button onClick={() => { goto("/catalogo?sort=price-asc"); }} className="p-3 rounded-lg bg-white border flex flex-col items-start">
                          <BanknotesIcon className="h-6 w-6 text-primary mb-2" />
                          <div className="font-medium">Ofertas</div>
                          <div className="text-xs text-gray-500">Cursos gratuitos e promoções</div>
                        </button>
                        <button onClick={() => { goto("/sobre-nos"); }} className="p-3 rounded-lg bg-white border flex flex-col items-start">
                          <CodeBracketIcon  className="h-6 w-6 text-primary mb-2" />
                          <div className="font-medium">Sobre Nós</div>
                          <div className="text-xs text-gray-500">Conheça nossa história</div>
                        </button>
                        <button onClick={() => { goto("/contato"); }} className="p-3 rounded-lg bg-white border flex flex-col items-start">
                          <ChatBubbleOvalLeftIcon className="h-6 w-6 text-primary mb-2" />
                          <div className="font-medium">Suporte</div>
                          <div className="text-xs text-gray-500">Dúvidas e parcerias</div>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* quick links & footer */}
                <div className="bg-white mt-4 px-4 pb-6 flex-1 overflow-auto">
                    <div className="mt-3 border-t pt-3">
                      <div className="text-xs text-gray-500 mb-2">Conta</div>
                      {usuario ? (
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            {usuario.avatar ? (
                              <img src={usuario.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-700">{initials(usuario.name)}</div>
                            )}
                            <div>
                              <div className="font-medium">{usuario.name}</div>
                              <div className="text-xs text-gray-500">{usuario.email}</div>
                            </div>
                          </div>

                          <div className="flex flex-col gap-2">
                            <Link to="/perfil" onClick={() => setOpenMobile(false)} className="px-3 py-2 rounded-md bg-primary text-white text-sm text-center">Ver Perfil</Link>
                            <button onClick={() => { logout?.(); setOpenMobile(false); }} className="px-3 py-2 rounded-md border text-sm text-red-600">Sair</button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <Link to="/login" onClick={() => setOpenMobile(false)} className="flex-1 px-3 py-2 rounded-md bg-primary text-white text-sm text-center">Entrar</Link>
                          <Link to="/cadastro" onClick={() => setOpenMobile(false)} className="flex-1 px-3 py-2 rounded-md border text-sm text-center">Cadastrar</Link>
                        </div>
                      )}
                    </div>
                </div>

                <div className="px-4 py-3 text-xs text-gray-500 border-t bg-white/80 text-center">
                  © {new Date().getFullYear()} StudyConnect — Aprenda e Conecte
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
