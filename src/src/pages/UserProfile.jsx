import React, { useState, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { cursos } from "../data/Courses";
import { instituicao } from "../data/Institution"; // ✅ já importado
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileCard from "../components/profile/ProfileCard";
import ProfileTabs from "../components/profile/ProfileTabs";

export default function Profile() {
  const {
    usuario,
    logout,
    toggleCursoFavorito,
    toggleInstituicaoFavorita, // ✅ adicionamos aqui
    updateProfile,
  } = useAuth();

  const [editing, setEditing] = useState(false);
  const [local, setLocal] = useState({
    name: usuario?.name ?? "",
    bio: usuario?.bio ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("saved");

  // --- CURSOS SALVOS ---
  const savedCursos = useMemo(() => {
    if (!usuario?.cursosSalvos?.length) return [];
    return usuario.cursosSalvos
      .map((id) => cursos.find((c) => c.id === id))
      .filter(Boolean);
  }, [usuario]);

  // --- INSTITUIÇÕES SALVAS (🔥 novo trecho) ---
  const savedInstitutions = useMemo(() => {
  if (!usuario?.instituicoesSalvas?.length) return [];
  return usuario.instituicoesSalvas
    .map((id) => instituicao.find((i) => i.id === id))
    .filter(Boolean);
}, [usuario]);

  // --- ESTATÍSTICAS (exemplo seu) ---
  const stats = {
    completionRate: 85,
    totalHours: 124,
    certificatesEarned: 3,
    currentStreak: 5,
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile({ name: local.name, bio: local.bio });
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

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

        {/* ✅ Aqui passamos as instituições para o componente ProfileTabs */}
        <ProfileTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          savedCursos={savedCursos}
          savedInstitutions={savedInstitutions} // 🔥 novo
          toggleCursoFavorito={toggleCursoFavorito}
          toggleInstituicaoFavorita={toggleInstituicaoFavorita} // 🔥 novo
        />
      </main>
    </div>
  );
}
