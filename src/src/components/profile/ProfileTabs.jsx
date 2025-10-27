import {
  BookOpenIcon,
  TrashIcon,
  ArrowRightIcon,
  DocumentTextIcon,
  CogIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  BookmarkIcon,
  CloudArrowUpIcon,
  DocumentIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProfileTabs({
  activeTab,
  setActiveTab,
  savedCursos,
  savedInstitutions,
  toggleCursoFavorito,
  toggleInstituicaoFavorita,
}) {
  const { usuario, addUserFile, removeUserFile } = useAuth();

  const uploadedFiles = Array.isArray(usuario?.arquivos)
    ? usuario.arquivos.filter(Boolean)
    : [];

  const tabs = [
    { id: "saved", label: "Cursos Salvos", icon: BookOpenIcon, count: savedCursos.length },
    { id: "institutions", label: "Instituições Salvas", icon: BuildingOfficeIcon, count: savedInstitutions.length },
    { id: "certificates", label: "Certificados", icon: DocumentTextIcon, count: uploadedFiles.length },
    { id: "settings", label: "Configurações", icon: CogIcon },
  ];

  const handleRemoveAll = () => {
    if (!savedCursos.length) return;
    if (confirm("Remover todos os cursos salvos?")) {
      savedCursos.forEach((curso) => toggleCursoFavorito(curso.id));
    }
  };

  const handleRemoveAllInstitutions = () => {
    if (!savedInstitutions.length) return;
    if (confirm("Remover todas as instituições salvas?")) {
      savedInstitutions.forEach((inst) => toggleInstituicaoFavorita(inst.id));
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      {/* TABS - Design moderno com badges */}
      <div className="flex border-b border-gray-100 overflow-x-auto bg-gray-50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex items-center gap-2 px-6 py-4 font-medium text-sm transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? "text-primary"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50/50"
            }`}
          >
            <tab.icon className="h-5 w-5" />
            <span>{tab.label}</span>
            {tab.count !== undefined && tab.count > 0 && (
              <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                activeTab === tab.id 
                  ? "bg-primary text-white" 
                  : "bg-gray-200 text-gray-600"
              }`}>
                {tab.count}
              </span>
            )}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
            )}
          </button>
        ))}
      </div>

      {/* CONTEÚDO */}
      <div className="p-6">
        {/* CURSOS SALVOS */}
        {activeTab === "saved" && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <HeartIcon className="h-6 w-6 text-primary" />
                  Cursos Salvos
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {savedCursos.length === 0 
                    ? "Você ainda não salvou nenhum curso" 
                    : `${savedCursos.length} ${savedCursos.length === 1 ? 'curso salvo' : 'cursos salvos'}`}
                </p>
              </div>
              {savedCursos.length > 0 && (
                <button
                  onClick={handleRemoveAll}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-all border border-red-100 hover:border-red-200"
                >
                  <TrashIcon className="h-4 w-4" /> Limpar todos
                </button>
              )}
            </div>

            {savedCursos.length === 0 ? (
              <EmptyState
                icon={BookmarkIcon}
                title="Nenhum curso salvo"
                description="Explore nosso catálogo e salve os cursos do seu interesse."
                actionLabel="Explorar Cursos"
                actionLink="/catalogo"
              />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {savedCursos.map((curso) => (
                  <CourseCard
                    key={curso.id}
                    curso={curso}
                    onRemove={() => toggleCursoFavorito(curso.id)}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {/* INSTITUIÇÕES SALVAS */}
        {activeTab === "institutions" && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <BuildingOfficeIcon className="h-6 w-6 text-primary" />
                  Instituições Salvas
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {savedInstitutions.length === 0 
                    ? "Você ainda não salvou nenhuma instituição" 
                    : `${savedInstitutions.length} ${savedInstitutions.length === 1 ? 'instituição salva' : 'instituições salvas'}`}
                </p>
              </div>
              {savedInstitutions.length > 0 && (
                <button
                  onClick={handleRemoveAllInstitutions}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-all border border-red-100 hover:border-red-200"
                >
                  <TrashIcon className="h-4 w-4" /> Limpar todas
                </button>
              )}
            </div>

            {savedInstitutions.length === 0 ? (
              <EmptyState
                icon={BuildingOfficeIcon}
                title="Nenhuma instituição salva"
                description="Explore nossa rede de instituições parceiras e salve as de seu interesse."
                actionLabel="Ver Instituições"
                actionLink="/instituicoes"
              />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {savedInstitutions.map((institution) => (
                  <InstitutionCard
                    key={institution.id}
                    institution={institution}
                    onRemove={() => toggleInstituicaoFavorita(institution.id)}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {/* CERTIFICADOS / CURRÍCULOS */}
        {activeTab === "certificates" && (
          <section>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <DocumentTextIcon className="h-6 w-6 text-primary" />
                Certificados & Currículos
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Gerencie seus documentos profissionais
              </p>
            </div>

            {/* Upload Area */}
            <label className="block mb-6 p-8 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:border-primary hover:bg-gradient-to-br hover:from-indigo-50/50 hover:to-purple-50/50 transition-all group">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => {
                  if (!e.target.files?.length) return;
                  const file = e.target.files[0];
                  if (!file || !file.name) return;
                  addUserFile(file);
                }}
              />
              <div className="text-center">
                <CloudArrowUpIcon className="h-12 w-12 text-gray-400 mx-auto group-hover:text-primary transition-colors" />
                <p className="mt-3 font-medium text-gray-700 group-hover:text-primary transition-colors">
                  Clique para fazer upload
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  PDF, DOC ou DOCX (máx. 10MB)
                </p>
              </div>
            </label>

            {uploadedFiles.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-2xl">
                <DocumentIcon className="h-10 w-10 text-gray-400 mx-auto" />
                <p className="mt-3 text-gray-600">Nenhum arquivo enviado ainda</p>
                <p className="text-sm text-gray-500">Faça upload dos seus certificados e currículos</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {uploadedFiles.map((file, index) => {
                  if (!file || !file.name || !file.dataUrl) return null;

                  const fileName = file.name;
                  const ext = fileName.includes(".")
                    ? fileName.split(".").pop().toUpperCase()
                    : "DOC";

                  return (
                    <FileCard
                      key={index}
                      file={file}
                      fileName={fileName}
                      ext={ext}
                      onRemove={() => removeUserFile(index)}
                    />
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* CONFIGURAÇÕES */}
        {activeTab === "settings" && (
          <section>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <CogIcon className="h-6 w-6 text-primary" />
                Configurações da Conta
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Ajustes de preferências e privacidade
              </p>
            </div>

            <div className="space-y-4">
              <SettingCard
                title="Notificações por Email"
                description="Receba atualizações sobre novos cursos e instituições"
                type="toggle"
              />
              <SettingCard
                title="Perfil Público"
                description="Permitir que outros usuários vejam seu perfil"
                type="toggle"
                defaultValue={usuario?.perfilPublico}
              />
              <SettingCard
                title="Idioma"
                description="Escolha o idioma da plataforma"
                type="select"
                options={["Português", "English", "Español"]}
              />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

// --- Subcomponentes ---
const EmptyState = ({ icon: Icon, title, description, actionLabel, actionLink }) => (
  <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
    <div className="inline-flex p-4 bg-white rounded-2xl shadow-sm mb-4">
      <Icon className="h-12 w-12 text-gray-400" />
    </div>
    <h3 className="text-lg font-bold text-gray-900">{title}</h3>
    <p className="mt-2 text-gray-600 max-w-md mx-auto">{description}</p>
    <Link
      to={actionLink}
      className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:scale-105 transition-all font-medium"
    >
      {actionLabel}
      <ArrowRightIcon className="h-4 w-4" />
    </Link>
  </div>
);

const CourseCard = ({ curso, onRemove }) => {
  if (!curso) return null;
  return (
    <div className="group bg-white rounded-2xl border border-gray-200 hover:border-primary/30 shadow-sm transition-all overflow-hidden">
      <div className="flex">
        <div className="w-28 h-28 flex-shrink-0 relative overflow-hidden">
          <img
            src={curso.imagem || "/placeholder.jpg"}
            alt={curso.nome || "Curso"}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>

        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <Link
              to={`/curso/${curso.id}`}
              className="font-semibold text-gray-900 hover:text-primary transition-colors line-clamp-2"
            >
              {curso.nome ?? "Curso sem nome"}
            </Link>
            <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
              <BuildingOfficeIcon className="h-3.5 w-3.5" />
              {curso.instituicao ?? "—"}
            </p>
          </div>

          <div className="flex items-center justify-between mt-3">
            <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-lg">
              Salvo
            </span>
            <button
              onClick={onRemove}
              className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
              title="Remover dos salvos"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const InstitutionCard = ({ institution, onRemove }) => {
  if (!institution) return null;
  return (
    <div className="group bg-white rounded-2xl border border-gray-200 hover:border-primary/30 shadow-sm transition-all overflow-hidden">
      <div className="flex">
        <div className="w-28 h-28 flex-shrink-0 relative overflow-hidden">
          <img
            src={institution.imagem || "/placeholder-institution.jpg"}
            alt={institution.nome || "Instituição"}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>

        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <Link
              to={`/instituicao/${institution.id}`}
              className="font-semibold text-gray-900 hover:text-primary transition-colors line-clamp-2"
            >
              {institution.nome ?? "Instituição sem nome"}
            </Link>
            <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
              <MapPinIcon className="h-3.5 w-3.5" />
              {institution.cidade ?? "—"}, {institution.estado ?? "—"}
            </p>
          </div>

          <div className="flex items-center justify-between mt-3">
            <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-lg">
              Salvo
            </span>
            <button
              onClick={onRemove}
              className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
              title="Remover dos salvos"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FileCard = ({ file, fileName, ext, onRemove }) => {
  const extColors = {
    PDF: "bg-red-500",
    DOC: "bg-blue-500",
    DOCX: "bg-blue-500",
  };

  return (
    <div className="group bg-white rounded-2xl border border-gray-200 hover:border-primary/30 shadow-sm transition-all p-4">
      <div className="flex items-center gap-4">
        {/* Ícone com extensão */}
        <div className={`w-16 h-16 flex items-center justify-center ${extColors[ext] || "bg-gray-500"} rounded-xl text-white font-bold text-sm shadow-md group-hover:scale-105 transition-transform`}>
          {ext}
        </div>

        {/* Info do arquivo */}
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-900 truncate">{fileName}</p>
          <p className="text-xs text-gray-500 mt-1">Documento enviado</p>
        </div>

        {/* Ações */}
        <div className="flex gap-2">
          <a
            href={file.dataUrl}
            download={fileName}
            className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all"
            title="Baixar"
          >
            <ArrowRightIcon className="h-4 w-4 rotate-90" />
          </a>

          <button
            onClick={onRemove}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
            title="Remover"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const SettingCard = ({ title, description, type, options, defaultValue }) => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-indigo-50/20 rounded-2xl border border-gray-200 p-5 hover:border-primary/30 transition-all">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{title}</h4>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>

        {type === "toggle" && (
          <button className={`relative w-12 h-6 rounded-full transition-colors ${defaultValue ? 'bg-primary' : 'bg-gray-300'}`}>
            <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${defaultValue ? 'translate-x-6' : 'translate-x-0'}`}></span>
          </button>
        )}

        {type === "select" && (
          <select className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:border-primary focus:outline-none">
            {options?.map((opt, i) => (
              <option key={i}>{opt}</option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};