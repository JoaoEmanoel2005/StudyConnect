import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import {
  UserIcon,
  EnvelopeIcon,
  CakeIcon,
  MapPinIcon,
  GlobeAltIcon,
  AcademicCapIcon,
  SparklesIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  CameraIcon,
  CheckCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function EditProfile() {
  const { usuario, atualizarPerfil } = useAuth();
  const [activeSection, setActiveSection] = useState("personal");
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: usuario?.nome || "",
    email: usuario?.email || "",
    bio: usuario?.bio || "",
    fotoPerfil: usuario?.fotoPerfil || null,
    areasInteresse: Array.isArray(usuario?.areasInteresse)
      ? usuario.areasInteresse.join(", ")
      : usuario?.areasInteresse || "",
    dataNascimento: usuario?.dataNascimento || "",
    cpf: usuario?.cpf || "",
    cidade: usuario?.cidade || "",
    estado: usuario?.estado || "",
    pais: usuario?.pais || "",
    formacao: usuario?.formacao || "",
    instagram: usuario?.instagram || "",
    github: usuario?.github || "",
    linkedin: usuario?.linkedin || "",
    perfilPublico: usuario?.perfilPublico ?? true,
  });

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;

    if (type === "file" && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, fotoPerfil: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simula tempo de salvamento
    await new Promise(resolve => setTimeout(resolve, 1000));

    const dadosAtualizados = {
      ...formData,
      areasInteresse: typeof formData.areasInteresse === "string"
        ? formData.areasInteresse.split(",").map(a => a.trim()).filter(Boolean)
        : formData.areasInteresse,
    };

    try {
      atualizarPerfil(dadosAtualizados);
      toast.success("Perfil atualizado com sucesso!", {
        icon: "🎉",
        duration: 3000,
      });
      navigate("/perfil", { replace: true }); // Redireciona para o perfil
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      toast.error("Erro ao salvar perfil", {
        icon: "⚠️",
        duration: 3000,
      });
    } finally {
      setIsSaving(false);
      setShowSuccess(false);
    }
  };

  const sections = [
    { id: "personal", label: "Informações Pessoais", icon: UserIcon },
    { id: "location", label: "Localização", icon: MapPinIcon },
    { id: "academic", label: "Acadêmico", icon: AcademicCapIcon },
    { id: "social", label: "Redes Sociais", icon: GlobeAltIcon },
    { id: "privacy", label: "Privacidade", icon: ShieldCheckIcon },
  ];

  return (
  <div className="bg-gray-50">
    <div className= "max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <UserIcon className="h-8 w-8 text-primary" />
          Editar Perfil
        </h1>
        <p className="text-gray-600 mt-2">
          Atualize suas informações e personalize seu perfil
        </p>
      </div>

      {/* Notificação de sucesso */}
      {showSuccess && (
        <div className="mb-6 bg-green-50 border-2 border-green-200 rounded-2xl p-4 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <CheckCircleIcon className="h-6 w-6 text-green-600 flex-shrink-0" />
          <p className="text-green-800 font-medium">
            Perfil atualizado com sucesso!
          </p>
          <button 
            onClick={() => setShowSuccess(false)}
            className="ml-auto text-green-600 hover:text-green-800"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar de navegação */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sticky top-6">
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                    activeSection === section.id
                      ? "bg-primary text-white shadow-sm"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <section.icon className="h-5 w-5 flex-shrink-0" />
                  <span className="text-sm font-medium truncate">{section.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Foto de perfil (sempre visível) */}
            <div className="bg-primary p-8">
              <div className="flex flex-col items-center">
                <label className="relative cursor-pointer group">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-xl group-hover:scale-105 transition-transform">
                    {formData.fotoPerfil ? (
                      <img
                        src={formData.fotoPerfil}
                        alt="Foto de perfil"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-white/20 backdrop-blur-sm">
                        <UserIcon className="h-16 w-16 text-white" />
                      </div>
                    )}
                  </div>
                  
                  {/* Overlay de upload */}
                  <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="text-center">
                      <CameraIcon className="h-8 w-8 text-white mx-auto mb-1" />
                      <span className="text-white text-sm font-medium">Alterar foto</span>
                    </div>
                  </div>
                  
                  <input
                    type="file"
                    name="fotoPerfil"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                  />
                </label>
                
                <p className="text-white/90 text-sm mt-4 text-center">
                  Clique na imagem para alterar sua foto de perfil
                </p>
              </div>
            </div>

            {/* Formulário */}
            <div className="p-6 sm:p-8">
              {/* Informações Pessoais */}
              {activeSection === "personal" && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <SectionHeader 
                    icon={UserIcon} 
                    title="Informações Pessoais"
                    description="Dados básicos do seu perfil"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      label="Nome completo"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      icon={UserIcon}
                      placeholder="Seu nome completo"
                    />

                    <InputField
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      icon={EnvelopeIcon}
                      placeholder="seu@email.com"
                    />

                    <InputField
                      label="Data de Nascimento"
                      name="dataNascimento"
                      type="date"
                      value={formData.dataNascimento}
                      onChange={handleChange}
                      icon={CakeIcon}
                    />

                    <InputField
                      label="CPF"
                      name="cpf"
                      value={formData.cpf}
                      onChange={handleChange}
                      icon={ShieldCheckIcon}
                      placeholder="000.000.000-00"
                      helperText="Não exibido publicamente"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <DocumentTextIcon className="h-4 w-4 text-primary" />
                      Biografia
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Conte um pouco sobre você, suas experiências e objetivos..."
                      className="w-full border-2 border-gray-200 rounded-xl p-4 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.bio.length}/500 caracteres
                    </p>
                  </div>
                </div>
              )}

              {/* Localização */}
              {activeSection === "location" && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <SectionHeader 
                    icon={MapPinIcon} 
                    title="Localização"
                    description="Onde você está localizado"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InputField
                      label="Cidade"
                      name="cidade"
                      value={formData.cidade}
                      onChange={handleChange}
                      icon={MapPinIcon}
                      placeholder="Sua cidade"
                    />

                    <InputField
                      label="Estado"
                      name="estado"
                      value={formData.estado}
                      onChange={handleChange}
                      icon={MapPinIcon}
                      placeholder="Seu estado"
                    />

                    <InputField
                      label="País"
                      name="pais"
                      value={formData.pais}
                      onChange={handleChange}
                      icon={GlobeAltIcon}
                      placeholder="Seu país"
                    />
                  </div>
                </div>
              )}

              {/* Acadêmico */}
              {activeSection === "academic" && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <SectionHeader 
                    icon={AcademicCapIcon} 
                    title="Informações Acadêmicas"
                    description="Formação e áreas de interesse"
                  />

                  <InputField
                    label="Formação Acadêmica"
                    name="formacao"
                    value={formData.formacao}
                    onChange={handleChange}
                    icon={AcademicCapIcon}
                    placeholder="Ex: Bacharelado em Ciência da Computação"
                  />

                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <SparklesIcon className="h-4 w-4 text-primary" />
                      Áreas de Interesse
                    </label>
                    <input
                      name="areasInteresse"
                      value={formData.areasInteresse}
                      onChange={handleChange}
                      placeholder="Ex: Meteorologia, Programação, Sustentabilidade"
                      className="w-full border-2 border-gray-200 rounded-xl p-4 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Separe múltiplas áreas com vírgulas
                    </p>
                  </div>
                </div>
              )}

              {/* Redes Sociais */}
              {activeSection === "social" && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <SectionHeader 
                    icon={GlobeAltIcon} 
                    title="Redes Sociais"
                    description="Conecte suas redes sociais ao perfil"
                  />

                  <div className="space-y-4">
                    <SocialInputField
                      label="Instagram"
                      name="instagram"
                      value={formData.instagram}
                      onChange={handleChange}
                      icon={FaInstagram}
                      placeholder="@seuperfil ou instagram.com/seuperfil"
                      color="text-pink-500"
                    />

                    <SocialInputField
                      label="GitHub"
                      name="github"
                      value={formData.github}
                      onChange={handleChange}
                      icon={FaGithub}
                      placeholder="seuperfil ou github.com/seuperfil"
                      color="text-gray-800"
                    />

                    <SocialInputField
                      label="LinkedIn"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      icon={FaLinkedin}
                      placeholder="linkedin.com/in/seuperfil"
                      color="text-blue-600"
                    />
                  </div>
                </div>
              )}

              {/* Privacidade */}
              {activeSection === "privacy" && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <SectionHeader 
                    icon={ShieldCheckIcon} 
                    title="Configurações de Privacidade"
                    description="Controle quem pode ver seu perfil"
                  />

                  <div className="bg-gradient-to-br from-gray-50 to-indigo-50/30 rounded-2xl p-6 border-2 border-gray-200">
                    <label className="flex items-start gap-4 cursor-pointer group">
                      <div className="flex-shrink-0 mt-1">
                        <input
                          type="checkbox"
                          name="perfilPublico"
                          checked={formData.perfilPublico}
                          onChange={handleChange}
                          className="w-6 h-6 text-primary rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-primary/20 cursor-pointer"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                          Perfil Público
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Ao ativar esta opção, outros usuários poderão visualizar suas informações de perfil, cursos salvos e atividades na plataforma.
                        </p>
                        {formData.perfilPublico && (
                          <div className="mt-3 flex items-center gap-2 text-sm text-green-700 font-medium">
                            <CheckCircleIcon className="h-4 w-4" />
                            Seu perfil está visível para todos
                          </div>
                        )}
                      </div>
                    </label>
                  </div>

                  <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 flex gap-3">
                    <ShieldCheckIcon className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-amber-800">
                      <p className="font-medium">Informações protegidas</p>
                      <p className="mt-1">
                        Seus dados sensíveis como CPF nunca serão exibidos publicamente, independente desta configuração.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Botões de ação */}
              <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1 bg-accent text-white py-4 rounded-xl font-semibold hover:scale-105 hover:shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSaving ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Salvando...
                    </span>
                  ) : (
                    "Salvar Alterações"
                  )}
                </button>
                
                <button
                  onClick={() => window.history.back()}
                  className="px-6 py-4 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

// Componentes auxiliares
const SectionHeader = ({ icon: Icon, title, description }) => (
  <div className="mb-6">
    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
      <Icon className="h-6 w-6 text-primary" />
      {title}
    </h2>
    <p className="text-sm text-gray-600 mt-1">{description}</p>
  </div>
);

const InputField = ({ label, name, value, onChange, icon: Icon, type = "text", placeholder, helperText }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label}
    </label>
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        <Icon className="h-5 w-5" />
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border-2 border-gray-200 rounded-xl pl-12 pr-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
      />
    </div>
    {helperText && (
      <p className="text-xs text-gray-500 mt-1">{helperText}</p>
    )}
  </div>
);

const SocialInputField = ({ label, name, value, onChange, icon: Icon, placeholder, color }) => (
  <div className="bg-gradient-to-br from-gray-50 to-indigo-50/20 rounded-xl p-4 border-2 border-gray-200 hover:border-primary/30 transition-all">
    <label className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
      <Icon className={`text-xl ${color}`} />
      {label}
    </label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white"
    />
  </div>
);