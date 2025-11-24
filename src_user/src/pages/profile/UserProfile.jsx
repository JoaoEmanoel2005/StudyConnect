import React, { useState, useEffect, useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import { cursos } from "../../data/Courses";
import { instituicao } from "../../data/Institution";
import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileCard from "../../components/profile/ProfileCard";
import ProfileTabs from "../../components/profile/ProfileTabs";

export default function Profile() {
  const {
    usuario,
    refreshUser, // 🔹 nova função para atualizar dados da API
    logout,
    toggleCursoFavorito,
    toggleInstituicaoFavorita,
    updateProfile,
  } = useAuth();

  const [editing, setEditing] = useState(false);
  const [local, setLocal] = useState({
    name: usuario?.name ?? "",
    bio: usuario?.bio ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("saved");
  const [loading, setLoading] = useState(true);

  // --- Buscar dados do usuário ao montar o componente ---
  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      await refreshUser(); // atualiza usuario no contexto
      setLoading(false);
    };

    loadUser();
  }, []);

  // --- CURSOS SALVOS ---
  const savedCursos = useMemo(() => {
    if (!usuario?.cursosSalvos?.length) return [];
    return usuario.cursosSalvos
      .map((id) => cursos.find((c) => c.id === id))
      .filter(Boolean);
  }, [usuario]);

  // --- INSTITUIÇÕES SALVAS ---
  const savedInstitutions = useMemo(() => {
    if (!usuario?.instituicoesSalvas?.length) return [];
    return usuario.instituicoesSalvas
      .map((id) => instituicao.find((i) => i.id === id))
      .filter(Boolean);
  }, [usuario]);

  // --- ESTATÍSTICAS (exemplo) ---
  const stats = {
    completionRate: 85,
    totalHours: 124,
    certificatesEarned: 3,
    currentStreak: 5,
  };

  // --- Salvar perfil editado ---
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile({ name: local.name, bio: local.bio });
      setEditing(false);
      await refreshUser(); // atualiza dados depois de salvar
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-center py-8">Carregando perfil...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileHeader usuario={usuario} logout={logout} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <ProfileCard
          usuario={usuario}
          editing={editing}
          local={local}
          saving={saving}
          savedCursos={savedCursos}
          savedInstitutions={savedInstitutions}
          stats={stats}
          onEditToggle={() => setEditing((s) => !s)}
          onSave={handleSave}
          onChange={(field, value) =>
            setLocal((prev) => ({ ...prev, [field]: value }))
          }
        />

        <ProfileTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          savedCursos={savedCursos}
          savedInstitutions={savedInstitutions}
          toggleCursoFavorito={async (id) => {
            await toggleCursoFavorito(id);
            await refreshUser(); // atualiza dados depois de favoritar
          }}
          toggleInstituicaoFavorita={async (id) => {
            await toggleInstituicaoFavorita(id);
            await refreshUser(); // atualiza dados depois de favoritar
          }}
        />
      </main>
    </div>
  );
}
