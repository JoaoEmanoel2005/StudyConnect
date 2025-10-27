import {
  PencilSquareIcon,
  BuildingLibraryIcon,
  MapPinIcon,
  GlobeAltIcon,
  BriefcaseIcon,
  CalendarIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

export default function ProfileCard({ savedCursos = [], savedInstitutions = [] }) {
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const [bioExpanded, setBioExpanded] = useState(false);

  if (!usuario) {
    return (
      <div className="min-h-[240px] flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Carregando perfil...</div>
      </div>
    );
  }

  const initials = (usuario?.nome || "U")
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  /* ===== Configuração de campos automáticos ===== */
  const camposPerfil = [
    { key: "instituicao", label: "Instituição", icon: <BuildingLibraryIcon className="h-4 w-4" /> },
    { key: "ocupacao", label: "Ocupação", icon: <BriefcaseIcon className="h-4 w-4" /> },
    { key: "cidade", label: "Cidade", icon: <MapPinIcon className="h-4 w-4" /> },
    { key: "estado", label: "Estado", icon: <MapPinIcon className="h-4 w-4" /> },
    { key: "pais", label: "País", icon: <GlobeAltIcon className="h-4 w-4" /> },
    { key: "site", label: "Site pessoal", icon: <GlobeAltIcon className="h-4 w-4" />, isLink: true },
    { key: "dataNascimento", label: "Nascimento", icon: <CalendarIcon className="h-4 w-4" /> },
  ];

  const renderCampos = (usuario) => {
    return camposPerfil.map((campo) => {
      const valor = usuario[campo.key];
      if (!valor) return null;

      if (campo.isLink) {
        return (
          <InfoItem
            key={campo.key}
            icon={campo.icon}
            label={campo.label}
            value={
              <a href={valor} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline transition-colors">
                {valor}
              </a>
            }
          />
        );
      }

      return <InfoItem key={campo.key} icon={campo.icon} label={campo.label} value={valor} />;
    });
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100 mb-10 pt-10">
        <div className="px-6 pb-6">
        {/* Avatar e Info Principal */}
        <div className="flex flex-col md:flex-row gap-6 relative">
          {/* Avatar Section */}
          <div className="flex-shrink-0 text-center md:text-left pr-5">
            <div className="relative inline-block group">
              <div className="w-32 h-32 rounded-2xl bg-white flex items-center justify-center text-3xl font-bold overflow-hidden border-4 border-white shadow-sm">
                {usuario?.fotoPerfil ? (
                  <img src={usuario.fotoPerfil} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-primary/10 to-accent/10">
                    <span className="text-primary text-4xl font-bold">{initials}</span>
                  </div>
                )}
              </div>

              {/* Status online com animação */}
              <span className={`absolute -top-1 -right-1 w-5 h-5 rounded-full border-4 border-white shadow-md ${usuario.online ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} title={usuario.online ? "Online" : "Offline"} />
            </div>

            {/* Status do perfil */}
            <div className="mt-4">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${usuario.perfilPublico ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                {usuario.perfilPublico ? "Público" : "Privado"}
              </span>
            </div>

            {/* Redes sociais */}
            {(usuario.instagram || usuario.github || usuario.linkedin) && (
              <div className="mt-4 flex gap-3 justify-center md:justify-start">
                {usuario.instagram && (
                  <a
                    href={usuario.instagram.startsWith("http") ? usuario.instagram : `https://instagram.com/${usuario.instagram.replace("@","")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-sm"
                    title="Instagram"
                  >
                    <FaInstagram className="text-lg" />
                  </a>
                )}
                {usuario.github && (
                  <a
                    href={usuario.github.startsWith("http") ? usuario.github : `https://github.com/${usuario.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-sm"
                    title="GitHub"
                  >
                    <FaGithub className="text-lg" />
                  </a>
                )}
                {usuario.linkedin && (
                  <a
                    href={usuario.linkedin.startsWith("http") ? usuario.linkedin : `https://linkedin.com/in/${usuario.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-sm"
                    title="LinkedIn"
                  >
                    <FaLinkedin className="text-lg" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Informações principais */}
          <div className="flex-1 mt-4 md:mt-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-bold text-slate-700">{usuario?.nome ?? "Usuário"}</h1>
                  {usuario.badges?.length > 0 && (
                    <SparklesIcon className="h-5 w-5 text-yellow-500" />
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">{usuario?.email ?? "email@indefinido.com"}</p>


                {/* Bio */}
                {usuario?.bio && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100"
                       onClick={() => setBioExpanded(!bioExpanded)}>
                      {bioExpanded ? usuario.bio : usuario.bio.slice(0, 150) + (usuario.bio.length > 150 ? "..." : "")}
                      {usuario.bio.length > 150 && (
                        <button className="text-primary font-semibold ml-2 hover:underline">
                          {bioExpanded ? "ver menos" : "ver mais"}
                        </button>
                      )}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Estatísticas */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <StatCard label="Cursos Salvos" value={savedCursos.length} />
              <StatCard label="Instituições Salvas" value={savedInstitutions.length} />
            </div>

            <div className="absolute top-4 right-4">
          <button
            onClick={() => navigate("/perfil/editar")}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-indigo-800 hover:scale-105 transition-all font-medium"
          >
            <PencilSquareIcon className="h-4 w-4" /> Editar
          </button>
        </div>
          </div>
        </div>

        {/* Áreas de interesse */}
        {usuario?.areasInteresse && Array.isArray(usuario.areasInteresse) && usuario.areasInteresse.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <SparklesIcon className="h-4 w-4 text-primary" />
              Áreas de Interesse
            </h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {Array.isArray(usuario?.areasInteresse) && usuario.areasInteresse.length > 0 ? (
                usuario.areasInteresse.map((area) => (
                  <span
                    key={area}
                    className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full shadow-sm hover:bg-blue-200 transition-colors"
                  >
                    {area}
                  </span>
                ))
              ) : usuario?.areasInteresse ? (
                <span
                  className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full shadow-sm"
                >
                  {usuario.areasInteresse}
                </span>
              ) : (
                <span className="text-gray-400 italic">
                  Nenhuma área de interesse cadastrada
                </span>
              )}
            </div>
          </div>
        )}

        {/* Informações adicionais */}
        {renderCampos(usuario).some(campo => campo !== null) && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Informações</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {renderCampos(usuario)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ===== Subcomponentes reutilizáveis ===== */
function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 transition-all">
      <div className="p-2 bg-white rounded-lg text-primary shadow-sm">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-500 font-medium mb-0.5">{label}</p>
        <p className="text-sm font-semibold text-slate-700 truncate">{value}</p>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
  <div className="relative p-5 bg-indigo-50 rounded-2xl border border-indigo-100 transition-all">
      <div className="relative">
        <div className="text-3xl font-bold bg-primary bg-clip-text text-transparent">{value}</div>
        <div className="text-sm text-gray-600 font-medium mt-1">{label}</div>
      </div>
    </div>
  );
}