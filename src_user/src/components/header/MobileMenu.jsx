import { Link, useNavigate } from "react-router-dom";
import { 
  XMarkIcon, 
  MagnifyingGlassIcon, 
  BookOpenIcon, 
  BuildingLibraryIcon, 
  BanknotesIcon, 
  CodeBracketIcon, 
  ChatBubbleOvalLeftIcon 
} from "@heroicons/react/24/outline";

import { useRef, useState, useEffect, useMemo } from "react";
import { cursos as cursosData } from "../../data/Courses";
import { instituicao as instituicaoData } from "../../data/Institution";

export default function MobileMenu({ open, setOpen, usuario, logout }) {
  const [openMobile, setOpenMobile] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const inputRef = useRef(null);
  const resultsRef = useRef(null);
  const navigate = useNavigate();

  // Focar pesquisa com Ctrl/Cmd + K e fechar com Escape
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setShowResults(true);
        setOpenMobile(true);
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

  // Fechar resultados quando clicar fora
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

  // Normalizar texto para comparação
  const normalized = (s) => (s || "").toString().toLowerCase();

  // Gerar resultados filtrados
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = normalized(query);

    const cursoMatches = cursosData
      .filter(c => normalized(c.nome).includes(q) || normalized(c.categoria).includes(q))
      .slice(0, 5)
      .map(c => ({
        id: `curso-${c.id}`,
        kind: "Curso",
        title: c.nome,
        meta: c.categoria,
        href: `/curso/${c.id}`,
        Icon: BookOpenIcon
      }));

    const instMatches = instituicaoData
      .filter(i => normalized(i.nome).includes(q) || normalized(i.cidade).includes(q))
      .slice(0, 5)
      .map(i => ({
        id: `inst-${i.id}`,
        kind: "Instituição",
        title: i.nome,
        meta: i.cidade,
        href: `/instituicao/${i.id}`,
        Icon: BuildingLibraryIcon
      }));

    return [...cursoMatches, ...instMatches];
  }, [query]);

  // Função para pegar iniciais do usuário
  const initials = (name) =>
    (name || "U")
      .split(" ")
      .map((p) => p[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  // Navegar e fechar menu
  const goto = (href) => {
    navigate(href);
    setShowResults(false);
    setQuery("");
    setOpenMobile(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-indigo-50 backdrop-blur-sm" aria-hidden />
      <div className="relative h-full overflow-auto">
        <div className="flex flex-col min-h-full max-w-full mx-auto border shadow-lg bg-white">

          {/* HEADER */}
          <div className="flex items-center justify-between px-4 py-4 border-b backdrop-blur-sm">
            <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-3">
              <div className="rounded-md px-3 py-2 bg-primary/10 text-primary font-bold">SC</div>
              <span className="text-lg font-semibold text-slate-900">StudyConnect</span>
            </Link>
            <button className="ml-2 p-2 rounded-md hover:bg-gray-100" onClick={() => setOpen(false)} aria-label="Fechar menu">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* SEARCH */}
          <div className="px-4 py-4 bg-white">
            <div className="relative">
              <div className="flex items-center rounded-lg border px-3 py-2 bg-gray-50">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setShowResults(true); }}
                  ref={inputRef}
                  placeholder="Pesquisar cursos e instituições..."
                  className="ml-3 w-full bg-transparent outline-none text-sm"
                />
                {query && (
                  <button onClick={() => { setQuery(""); setShowResults(false); }} className="text-sm text-gray-500 px-2" aria-label="Limpar pesquisa">
                    Limpar
                  </button>
                )}
              </div>
            </div>

            {/* RESULTS */}
            {showResults && results.length > 0 && (
              <div ref={resultsRef} className="mt-3 grid gap-2">
                {results.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => goto(r.href)}
                    className="flex items-center gap-3 p-3 rounded-lg bg-white border hover:shadow-sm text-left"
                  >
                    {r.Icon && <r.Icon className="h-6 w-6 text-gray-500" />}
                    <div className="flex-1">
                      <div className="font-medium">{r.title}</div>
                      <div className="text-xs text-gray-500">{r.meta} • {r.kind}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {showResults && results.length === 0 && query && (
              <div className="p-3 text-sm text-gray-500">Nenhum resultado para "{query}"</div>
            )}

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
          </div>

          

          {/* USER ACCOUNT */}
          <div className="bg-white mt-4 px-4 pb-6 flex-1 overflow-auto">
            <div className="mt-3 border-t pt-3">
              <div className="text-xs text-gray-500 mb-2">Conta</div>
              {usuario ? (
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {usuario.avatar ? (
                      <img src={usuario.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-700">
                        {initials(usuario.name)}
                      </div>
                    )}
                    <div>
                      <div className="font-medium">{usuario.name}</div>
                      <div className="text-xs text-gray-500">{usuario.email}</div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link to="/perfil" onClick={() => setOpen(false)} className="px-3 py-2 rounded-md bg-primary text-white text-sm text-center">Ver Perfil</Link>
                    <button onClick={() => { logout?.(); setOpen(false); }} className="px-3 py-2 rounded-md border text-sm text-red-600">Sair</button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link to="/login" onClick={() => setOpen(false)} className="flex-1 px-3 py-2 rounded-md bg-primary text-white text-sm text-center">Entrar</Link>
                  <Link to="/cadastro" onClick={() => setOpen(false)} className="flex-1 px-3 py-2 rounded-md border text-sm text-center">Cadastrar</Link>
                </div>
              )}
            </div>
          </div>

          {/* FOOTER */}
          <div className="px-4 py-3 text-xs text-gray-500 border-t bg-white/80 text-center">
            © {new Date().getFullYear()} StudyConnect — Aprenda e Conecte
          </div>

        </div>
      </div>
    </div>
  );
}
