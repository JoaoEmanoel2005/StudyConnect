import {
  UserIcon,
  PhotoIcon,
  ClipboardDocumentIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

export default function ProfileCard({
  usuario,
  editing,
  local,
  saving,
  onEditToggle,
  onSave,
  onChange,
  savedCursos = [],
  savedInstitutions = [],
  stats = {},
}) {
  // Se o usuário ainda não foi carregado, evita quebra e mostra um placeholder
  if (!usuario) {
    return (
      <div className="min-h-[240px] flex items-center justify-center">
        <div className="animate-pulse text-gray-500">
          Carregando perfil...
        </div>
      </div>
    );
  }

  // Usa operador de coalescência para evitar falhas
  const initials = (usuario?.name || "U")
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleShareProfile = () => {
    try {
      if (typeof window !== "undefined" && usuario?.id) {
        navigator.clipboard.writeText(
          `${window.location.origin}/perfil/${usuario.id}`
        );
        alert("Link do perfil copiado!");
      }
    } catch {
      alert("Não foi possível copiar o link do perfil.");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6 mb-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Avatar */}
        <div className="flex-shrink-0 text-center md:text-left">
          <div className="relative inline-block">
            <div className="w-32 h-32 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-3xl font-bold overflow-hidden border-4 border-white shadow">
              {usuario?.avatar ? (
                <img
                  src={usuario.avatar}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <UserIcon className="h-12 w-12 text-primary/40" />
                  <span className="text-primary/60">{initials}</span>
                </div>
              )}
            </div>
            <label className="absolute -bottom-2 -right-2 p-2 bg-white rounded-full shadow cursor-pointer hover:scale-105 transition">
              <PhotoIcon className="h-5 w-5 text-primary" />
              <input type="file" accept="image/*" className="sr-only" />
            </label>
          </div>

          <div className="mt-4 space-y-2">
            <button
              onClick={handleShareProfile}
              className="w-full px-4 py-2 bg-primary/5 hover:bg-primary/10 text-primary rounded-lg inline-flex items-center justify-center gap-2 transition"
            >
              <ClipboardDocumentIcon className="h-4 w-4" /> Compartilhar Perfil
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                {usuario?.name ?? "Usuário"}
              </h1>
              <p className="text-sm text-gray-500">
                {usuario?.email ?? "email@indefinido.com"}
              </p>
              {usuario?.bio && (
                <p className="mt-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  {usuario.bio}
                </p>
              )}
            </div>

            {!editing && (
              <button
                onClick={onEditToggle}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition"
              >
                <PencilSquareIcon className="h-4 w-4" /> Editar Perfil
              </button>
            )}
          </div>

          {editing && (
            <form onSubmit={onSave} className="mt-4 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Nome</label>
                <input
                  type="text"
                  value={local?.name ?? ""}
                  onChange={(e) => onChange("name", e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Biografia</label>
                <textarea
                  value={local?.bio ?? ""}
                  onChange={(e) => onChange("bio", e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onEditToggle}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                  disabled={saving}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90"
                  disabled={saving}
                >
                  {saving ? "Salvando..." : "Salvar Alterações"}
                </button>
              </div>
            </form>
          )}

          {/* Estatísticas */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
            <StatCard label="Cursos Salvos" value={savedCursos.length} />
            <StatCard label="Instituições Salvas" value={savedInstitutions.length} />
            <StatCard
              label="Taxa de Conclusão"
              value={`${stats?.completionRate ?? 0}%`}
            />
            <StatCard
              label="Horas Estudadas"
              value={`${stats?.totalHours ?? 0}h`}
            />
            <StatCard
              label="Sequência Atual"
              value={`${stats?.currentStreak ?? 0} dias`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Subcomponente
function StatCard({ label, value }) {
  return (
    <div className="p-4 bg-indigo-50 rounded-xl">
      <div className="text-2xl font-bold text-primary">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}
