import React from "react";
import { useNavigate } from "react-router-dom";
import { BuildingLibraryIcon, UserGroupIcon, CheckCircleIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import Header from "../components/Header.jsx";
import FeatureCard from "../components/FeatureCard.jsx";

export default function RegisterHome() {
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
              badge={{ text: "Acesso Total", bgColor: "bg-green-100", textColor: "text-green-700" }}
              icon={UserGroupIcon}
              iconBgColor="bg-green-100"
              iconColor="text-green-600"
              features={adminFeatures}
              buttonText="Cadastrar como Administrador"
              buttonColor="bg-green-600"
              buttonHoverColor="hover:bg-green-700"
              onClick={() => navigate("/register/admin")}
            />

            {/* Card Instituição */}
            <FeatureCard
              title="Instituição de Ensino"
              description="Gerencie cursos, alunos e operações acadêmicas de forma eficiente."
              badge={{ text: "Acadêmico", bgColor: "bg-amber-100", textColor: "text-amber-600" }}
              icon={BuildingLibraryIcon}
              iconBgColor="bg-amber-100"
              iconColor="text-amber-500"
              features={institutionFeatures}
              buttonText="Cadastrar como Instituição"
              buttonColor="bg-amber-500"
              buttonHoverColor="hover:bg-amber-600"
              onClick={() => navigate("/register/institution")}
            />
          </div>
        </div>

        {/* RODAPÉ */}
      </main>
      <footer className="bg-slate-100 py-6 ">
        <div className="text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} StudyConnect. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}