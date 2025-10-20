export default function FilterSection({ filtros, setFiltros, opcoes }) {
  return (
    <div className="flex flex-wrap gap-4 mb-8">
      {/* Tipo */}
      <select
        value={filtros.tipo}
        onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value })}
        className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700"
      >
        <option value="">Todos os tipos</option>
        {opcoes
          .find((f) => f.id === "tipo")
          ?.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label} ({opt.count})
            </option>
          ))}
      </select>

      {/* Estado */}
      <select
        value={filtros.estado}
        onChange={(e) => setFiltros({ ...filtros, estado: e.target.value })}
        className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700"
      >
        <option value="">Todos os estados</option>
        {opcoes
          .find((f) => f.id === "estado")
          ?.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label} ({opt.count})
            </option>
          ))}
      </select>

      {/* Cidade */}
      <select
        value={filtros.cidade}
        onChange={(e) => setFiltros({ ...filtros, cidade: e.target.value })}
        className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700"
      >
        <option value="">Todas as cidades</option>
        {opcoes
          .find((f) => f.id === "cidade")
          ?.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label} ({opt.count})
            </option>
          ))}
      </select>
    </div>
  );
}
