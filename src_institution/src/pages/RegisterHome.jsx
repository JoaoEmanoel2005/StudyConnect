import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BuildingLibraryIcon, UserGroupIcon, CheckCircleIcon, ShieldCheckIcon, UserIcon } from "@heroicons/react/24/outline";

// Componente Header separado para melhor organização
function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogoClick = () => {
    setMenuOpen(false);
    navigate("/");
  };

  const handleLoginClick = () => {
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-gray-200/50 flex items-center px-4 md:px-6 z-50">
        {/* LOGO / BRAND */}
        <button
          onClick={handleLogoClick}
          className="flex items-center gap-3 select-none cursor-pointer min-w-0 hover:opacity-80 transition-opacity"
          aria-label="Ir para o início"
        >
          <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center shadow-md flex-shrink-0">
            <span className="text-white font-bold text-lg">SC</span>
          </div>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-sm font-semibold text-slate-800">StudyConnect</span>
            <span className="text-xs text-slate-500 -mt-0.5">Admin</span>
          </div>
        </button>

        {/* AÇÕES */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Botão Login Desktop */}
          <button
            onClick={handleLoginClick}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-slate-700 hover:bg-gray-50 hover:shadow-sm transition-all"
          >
            <UserIcon className="h-4 w-4 text-gray-500" />
            <span>Entrar</span>
          </button>

          {/* Menu Hamburger Mobile */}
          <button
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex flex-col gap-1.5 w-5">
              <span 
                className={`h-0.5 w-full bg-slate-700 transition-transform duration-300 ${
                  menuOpen ? "translate-y-2 rotate-45" : ""
                }`} 
              />
              <span 
                className={`h-0.5 w-full bg-slate-700 transition-opacity duration-300 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`} 
              />
              <span 
                className={`h-0.5 w-full bg-slate-700 transition-transform duration-300 ${
                  menuOpen ? "-translate-y-2 -rotate-45" : ""
                }`} 
              />
            </div>
          </button>
        </div>
      </header>

      {/* Menu Mobile */}
      <div 
        className={`sm:hidden fixed top-16 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg z-40 transition-all duration-300 ${
          menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <nav className="p-4" aria-label="Menu móvel">
          <button 
            onClick={handleLoginClick}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <UserIcon className="h-5 w-5 text-gray-500" />
            <span className="text-slate-700 font-medium">Entrar</span>
          </button>
        </nav>
      </div>
    </>
  );
}

// Componente de Card de Recurso
function FeatureCard({ title, description, badge, icon: Icon, iconBgColor, iconColor, features, buttonText, buttonColor, buttonHoverColor, onClick }) {
  return (
    <section
      className="group border border-gray-200 bg-white rounded-2xl p-8 flex flex-col gap-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      aria-labelledby={`${title.toLowerCase()}-title`}
    >
      <div className="flex items-start gap-4">
        <div className={`w-16 h-16 rounded-xl ${iconBgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`h-9 w-9 ${iconColor}`} />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 id={`${title.toLowerCase()}-title`} className="text-xl font-semibold text-slate-800">
              {title}
            </h3>
            <span className={`px-2 py-0.5 ${badge.bgColor} ${badge.textColor} text-xs font-medium rounded`}>
              {badge.text}
            </span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Lista de Recursos */}
      <div className="space-y-2">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
            <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span>{feature}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto">
        <button
          className={`w-full py-3 ${buttonColor} text-white rounded-lg ${buttonHoverColor} transition-all duration-300 font-medium shadow-md hover:shadow-lg`}
          onClick={onClick}
        >
          {buttonText}
        </button>
      </div>
    </section>
  );
}

export default function Home() {
  const navigate = useNavigate();

  const adminFeatures = [
    "Gerenciamento completo de usuários",
    "Controle de permissões avançado",
    "Relatórios e analytics em tempo real"
  ];

  const institutionFeatures = [
    "Gestão de cursos e turmas",
    "Acompanhamento de alunos",
    "Dashboard personalizado"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />

      {/* CONTEÚDO PRINCIPAL */}
      <main className="pt-28 px-6 pb-12 flex justify-center">
        <div className="w-full max-w-5xl">

          {/* TÍTULO CENTRAL */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-2">
              <ShieldCheckIcon className="w-4 h-4" />
              Plataforma Segura
            </div>
            <h1 className="text-4xl font-bold text-slate-800 mb-3">
              Crie sua conta
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Escolha o tipo de conta adequado para acessar o painel administrativo e começar a gerenciar sua plataforma educacional.
            </p>
          </div>

          {/* GRID DE CARDS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Card Administrador */}
            <FeatureCard
              title="Administrador"
              description="Controle total sobre usuários, instituições e configurações da plataforma."
              badge={{ text: "Full Access", bgColor: "bg-indigo-100", textColor: "text-indigo-700" }}
              icon={UserGroupIcon}
              iconBgColor="bg-indigo-100"
              iconColor="text-indigo-600"
              features={adminFeatures}
              buttonText="Cadastrar como Administrador"
              buttonColor="bg-indigo-600"
              buttonHoverColor="hover:bg-indigo-700"
              onClick={() => navigate("/register/admin")}
            />

            {/* Card Instituição */}
            <FeatureCard
              title="Instituição de Ensino"
              description="Gerencie cursos, alunos e operações acadêmicas de forma eficiente."
              badge={{ text: "Academic", bgColor: "bg-green-100", textColor: "text-green-700" }}
              icon={BuildingLibraryIcon}
              iconBgColor="bg-green-100"
              iconColor="text-green-600"
              features={institutionFeatures}
              buttonText="Cadastrar como Instituição"
              buttonColor="bg-green-600"
              buttonHoverColor="hover:bg-green-700"
              onClick={() => navigate("/register/institution")}
            />

          </div>

          {/* RODAPÉ */}
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500">
              Precisa de ajuda para escolher?{" "}
              <button 
                className="text-indigo-600 hover:text-indigo-700 font-medium underline transition-colors"
                onClick={() => navigate("/help")}
              >
                Veja nosso guia de comparação
              </button>
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}