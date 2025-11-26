import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeftIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

export default function RegisterHeader({
  title = "Cadastro de Administrador",
  description = "Preencha os dados para criar sua conta com privilégios administrativos.",
  showBack = true,
  helpLink = "/help",
  step,
  totalSteps,
  onBack,
}) {
  const navigate = useNavigate();
  const handleBack = typeof onBack === "function" ? onBack : () => navigate(-1);
  const progress =
    step != null && totalSteps != null ? Math.round((step / totalSteps) * 100) : null;

  return (
    <header className="my-8 relative">
      <div className="flex items-start gap-3 sm:gap-4 sm:items-center justify-between">
        <div className="flex items-start gap-3 sm:gap-4">
          {showBack && (
            <button
              type="button"
              onClick={handleBack}
              aria-label="Voltar"
              className="group p-2.5 rounded-xl hover:bg-white transition-all duration-200 border border-slate-200/50 hover:border-indigo-200"
            >
              <ChevronLeftIcon className="w-5 h-5 text-slate-600 group-hover:text-indigo-600 group-hover:-translate-x-0.5 transition-all" />
            </button>
          )}

          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {title}
            </h1>
            <p className="text-sm sm:text-sm text-slate-600 max-w-xl leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        <Link
          to={helpLink}
          className="group flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 bg-white hover:bg-indigo-50 rounded-xl transition-all duration-200 border border-slate-200/50 hover:border-indigo-200"
          aria-label="Ajuda"
        >
          <QuestionMarkCircleIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline">Ajuda</span>
        </Link>
      </div>

      {progress !== null && (
        <div className="mt-6 bg-white/90 backdrop-blur-sm rounded-2xl p-5 shadow-md border border-slate-200/60 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between text-xs font-medium text-slate-600 mb-3">
            <span className="flex items-center gap-2.5">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white text-xs font-bold shadow-sm">
                {step}
              </span>
              <span className="text-slate-700">Etapa {step} de {totalSteps}</span>
            </span>
            <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 font-semibold">
              {progress}%
            </span>
          </div>
          <div className="relative w-full h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-500 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}