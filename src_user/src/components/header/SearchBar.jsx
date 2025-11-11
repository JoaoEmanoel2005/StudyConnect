import { useState, useRef, useEffect, useMemo } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { cursos as cursosData } from "../../data/Courses";
import { instituicao as instituicaoData } from "../../data/Institution";
import { BookOpenIcon, BuildingLibraryIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ query, setQuery }) {
  const [showResults, setShowResults] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef = useRef(null);
  const resultsRef = useRef(null);
  const navigate = useNavigate();

  // Normaliza string
  const normalized = (s) => (s || "").toString().toLowerCase();

  // Resultados filtrados com useMemo
  const results = useMemo(() => {
    if (!query.trim()) return [];

    const q = normalized(query);

    const cursoMatches = cursosData
      .filter((c) => normalized(c.nome).includes(q) || normalized(c.categoria).includes(q))
      .slice(0, 5)
      .map((c) => ({
        id: `curso-${c.id}`,
        kind: "Curso",
        title: c.nome,
        meta: c.categoria,
        href: `/curso/${c.id}`,
        Icon: BookOpenIcon,
      }));

    const instMatches = instituicaoData
      .filter((i) => normalized(i.nome).includes(q) || normalized(i.cidade).includes(q))
      .slice(0, 5)
      .map((i) => ({
        id: `inst-${i.id}`,
        kind: "Instituição",
        title: i.nome,
        meta: i.cidade,
        href: `/instituicao/${i.id}`,
        Icon: BuildingLibraryIcon,
      }));

    return [...cursoMatches, ...instMatches];
  }, [query]);

  // Atalho Ctrl/Cmd + K e Escape
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setShowResults(true);
      }
      if (e.key === "Escape") {
        setShowResults(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Fecha dropdown ao clicar fora
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

  // Navegação por teclado
  const handleKeyDown = (e) => {
    if (!showResults || results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selected = results[highlightedIndex];
      if (selected) goto(selected.href);
    }
  };

  const goto = (href) => {
    navigate(href);
    setShowResults(false);
    setQuery("");
  };

  return (
    <div className="relative">
      {/* Input */}
      <div className="flex items-center rounded-full border bg-white shadow-sm px-3 py-1">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowResults(Boolean(e.target.value));
            setHighlightedIndex(0);
          }}
          onFocus={() => setShowResults(results.length > 0)}
          onKeyDown={handleKeyDown}
          placeholder="Pesquisar cursos ou instituições..."
          className="ml-2 w-36 md:w-60 lg:w-80 text-sm placeholder-gray-400 bg-transparent outline-none"
          aria-label="Pesquisar"
        />
      </div>

      {/* Dropdown */}
      {showResults && results.length > 0 && (
        <div
          ref={resultsRef}
          className="absolute right-0 mt-2 w-[28rem] md:w-96 bg-white border rounded-lg shadow-lg overflow-auto max-h-64 z-50"
        >
          <div className="divide-y">
            {results.map((r, index) => (
              <button
                key={r.id}
                onClick={() => goto(r.href)}
                className={`w-full text-left px-4 py-3 flex items-start gap-3 transition-colors duration-150 ease-in-out ${
                  index === highlightedIndex ? "bg-gray-100" : "hover:bg-gray-50"
                }`}
              >
                {r.Icon ? <r.Icon className="h-5 w-5 text-primary mt-0.5" /> : null}
                <div className="flex-1">
                  <div className="font-medium text-sm text-slate-800">{r.title}</div>
                  {r.meta && (
                    <div className="text-xs text-gray-500">
                      {r.meta} • {r.kind}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Nenhum resultado */}
      {showResults && query && results.length === 0 && (
        <div className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow p-4 text-sm text-gray-500 z-50">
          Nenhum resultado para &quot;{query}&quot;
        </div>
      )}
    </div>
  );
}
