import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { cursos } from "../data/Courses";
import {
  ArrowLeftOnRectangleIcon,
  PencilSquareIcon,
  TrashIcon,
  ClipboardDocumentIcon,
  UserIcon,
  BookmarkIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";

export default function Perfil() {
  const { usuario, logout, toggleCursoFavorito, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [local, setLocal] = useState(() => ({
    name: usuario?.name ?? "",
    email: usuario?.email ?? "",
    bio: usuario?.bio ?? "",
  }));
  const [saving, setSaving] = useState(false);

  // Derived: saved course objects
  const savedCursos = useMemo(() => {
    if (!usuario?.cursosSalvos?.length) return [];
    return usuario.cursosSalvos
      .map((id) => cursos.find((c) => c.id === id))
      .filter(Boolean);
  }, [usuario]);

  if (!usuario) {
    return (
      <div className="min-h-[240px] flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Carregando perfil...</div>
      </div>
    );
  }

  const initials = (usuario.name || "U")
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleEditToggle = () => {
    setLocal({ name: usuario.name ?? "", email: usuario.email ?? "", bio: usuario.bio ?? "" });
    setEditing((s) => !s);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = { name: local.name, bio: local.bio };
    try {
      if (typeof updateProfile === "function") {
        await updateProfile(payload);
      } else {
        console.warn("updateProfile not implemented in auth context");
      }
      setEditing(false);
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar perfil.");
    } finally {
      setSaving(false);
    }
  };

  const handleCopyProfile = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/perfil/${usuario.id ?? ""}`);
      alert("Link do perfil copiado!");
    } catch {
      alert("Não foi possível copiar o link.");
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          aria-label="Voltar"
        >
          <ArrowLeftOnRectangleIcon className="h-5 w-5" /> Voltar
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <div className="w-28 h-28 rounded-xl bg-gray-100 flex items-center justify-center text-2xl font-bold text-gray-700 overflow-hidden">
              {usuario.avatar ? (
                <img src={usuario.avatar} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <UserIcon className="h-8 w-8 text-gray-500" />
                  <span>{initials}</span>
                </div>
              )}
            </div>

            <div className="mt-3 flex gap-2">
              <label className="inline-flex items-center gap-2 px-3 py-2 border rounded-lg text-sm cursor-pointer hover:bg-gray-50">
                <PhotoIcon className="h-4 w-4" /> Alterar foto
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={() => alert("Upload não implementado no demo")}
                />
              </label>

              <button
                onClick={handleCopyProfile}
                className="px-3 py-2 border rounded-lg text-sm hover:bg-gray-50 inline-flex items-center gap-2"
                aria-label="Copiar link do perfil"
                title="Copiar link do perfil"
              >
                <ClipboardDocumentIcon className="h-4 w-4" /> Copiar link
              </button>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-800">{usuario.name}</h1>
                <p className="text-sm text-gray-500">{usuario.email}</p>
                {usuario.bio && <p className="mt-2 text-sm text-gray-700">{usuario.bio}</p>}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleEditToggle}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:opacity-95"
                >
                  <PencilSquareIcon className="h-4 w-4" /> {editing ? "Cancelar" : "Editar"}
                </button>

                <button
                  onClick={logout}
                  className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg text-sm text-red-600 hover:bg-red-50"
                >
                  <ArrowLeftOnRectangleIcon className="h-4 w-4" />
                  Sair
                </button>
              </div>
            </div>

            {editing && (
              <form onSubmit={handleSave} className="mt-4 grid grid-cols-1 gap-3">
                <input
                  type="text"
                  value={local.name}
                  onChange={(e) => setLocal((s) => ({ ...s, name: e.target.value }))}
                  className="w-full px-4 py-2 border rounded-lg"
                  aria-label="Nome"
                />
                <textarea
                  value={local.bio}
                  onChange={(e) => setLocal((s) => ({ ...s, bio: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-2 border rounded-lg"
                  aria-label="Biografia"
                />
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="px-4 py-2 rounded-lg border"
                    disabled={saving}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-primary text-white"
                    disabled={saving}
                  >
                    {saving ? "Salvando..." : "Salvar"}
                  </button>
                </div>
              </form>
            )}

            {/* quick stats */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="p-3 bg-gray-50 rounded-lg text-center">
                <div className="text-lg font-bold text-slate-800">{savedCursos.length}</div>
                <div className="text-xs text-gray-500">Cursos salvos</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg text-center">
                <div className="text-lg font-bold text-slate-800">{usuario.cursosConcluidos?.length ?? 0}</div>
                <div className="text-xs text-gray-500">Concluídos</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg text-center">
                <div className="text-lg font-bold text-slate-800">{usuario.following?.length ?? 0}</div>
                <div className="text-xs text-gray-500">Seguindo</div>
              </div>
            </div>
          </div>
        </div>

        {/* Saved courses */}
        <section className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Cursos Salvos</h2>
            <button
              onClick={() => {
                if (!usuario.cursosSalvos || usuario.cursosSalvos.length === 0) {
                  alert("Nenhum curso salvo.");
                  return;
                }
                // bulk remove example (confirm)
                if (confirm("Remover todos os cursos salvos?")) {
                  usuario.cursosSalvos.slice().forEach((id) => toggleCursoFavorito(id));
                }
              }}
              className="text-sm text-red-600 hover:underline inline-flex items-center gap-2"
            >
              <TrashIcon className="h-4 w-4" /> Remover todos
            </button>
          </div>

          {savedCursos.length === 0 ? (
            <div className="rounded-lg border border-dashed border-gray-200 p-6 text-center">
              <BookmarkIcon className="mx-auto h-8 w-8 text-gray-400" />
              <p className="mt-3 text-gray-600">Você ainda não salvou nenhum curso.</p>
              <Link to="/catalogo" className="mt-4 inline-block px-4 py-2 bg-primary text-white rounded-lg">
                Explorar cursos
              </Link>
            </div>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              {savedCursos.map((c) => (
                <li key={c.id} className="bg-white border rounded-lg p-3 flex gap-3 items-start">
                  <img src={c.imagem} alt={c.nome} className="w-20 h-16 object-cover rounded-md" />
                  <div className="flex-1">
                    <Link to={`/curso/${c.id}`} className="font-semibold text-slate-800 block hover:underline">
                      {c.nome}
                    </Link>
                    <div className="text-sm text-gray-500">{c.instituicao} • {c.categoria}</div>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-800">{c.custo ?? "Gratuito"}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => toggleCursoFavorito(c.id)}
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border text-sm hover:bg-gray-50"
                      aria-label={`Remover ${c.nome} dos salvos`}
                    >
                      Remover
                    </button>
                    <Link to={`/curso/${c.id}`} className="text-xs text-primary hover:underline">Ver</Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
