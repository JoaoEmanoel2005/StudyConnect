import React from "react";
import { useAdminRegister } from "./useAdminRegister";

import Header from "./components/RegisterHeader";
import ProgressIndicator from "./components/ProgressIndicator";

import Step1PersonalInfo from "./steps/Step1PersonalInfo";
import Step2Credentials from "./steps/Step2Credentials";
import Step3Confirmation from "./steps/Step3Confirmation";

export default function AdminRegister() {
  const {
    currentStep,
    formData,
    handleChange,
    handleSubmit,
    nextStep,
    prevStep
  } = useAdminRegister();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <main className="px-4 sm:px-6 flex justify-center">
        <div className="w-full max-w-2xl">

          {/* Cabeçalho */}
          <Header />

          {/* Indicador de Progresso */}
          <ProgressIndicator currentStep={currentStep} />

          {/* Área dos Steps */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            {currentStep === 1 && (
              <Step1PersonalInfo
                formData={formData}
                handleChange={handleChange}
              />
            )}

            {currentStep === 2 && (
              <Step2Credentials
                formData={formData}
                handleChange={handleChange}
              />
            )}

            {currentStep === 3 && (
              <Step3Confirmation
                formData={formData}
                handleChange={handleChange}
              />
            )}

            {/* Botões */}
            <div className="flex gap-3 pt-4">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-all"
                >
                  Anterior
                </button>
              )}

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex-1 py-3 px-6 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium shadow-md hover:shadow-lg transition-all"
                >
                  Próximo
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!formData.acceptTerms}
                  className="flex-1 py-3 px-6 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Criar Conta de Administrador
                </button>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Já possui uma conta?{" "}
              <button className="text-indigo-600 hover:text-indigo-700 font-medium underline">
                Fazer login
              </button>
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
