import React from "react";
import { CheckCircle } from "lucide-react";

const defaultSteps = [
  { number: 1, title: "Informações Pessoais" },
  { number: 2, title: "Credenciais de Acesso" },
  { number: 3, title: "Confirmação" }
];

export default function ProgressIndicator({ currentStep = 1, steps = defaultSteps }) {
  const total = steps.length;
  const stepIndex = Math.min(Math.max(Math.round(currentStep), 1), total);

  return (
    <nav aria-label="Progresso do cadastro" className="mb-4">
      <div className="flex items-center justify-between mb-2">
        {steps.map((step, index) => {
          const isCompleted = step.number < stepIndex;
          const isCurrent = step.number === stepIndex;
          const isUpcoming = step.number > stepIndex;

          return (
            <div
              key={step.number}
              role="listitem"
              aria-current={isCurrent ? "step" : undefined}
              className="flex items-center flex-1"
            >
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all
                    ${isCompleted ? "bg-indigo-600 text-white" : isCurrent ? "bg-white text-indigo-600 ring-2 ring-indigo-200 shadow-sm" : "bg-gray-200 text-gray-500"}`}
                  aria-hidden="true"
                >
                  {isCompleted ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <span className={isCurrent ? "text-indigo-600" : ""}>{step.number}</span>
                  )}
                </div>

                <span className="text-xs mt-2 text-gray-600 hidden sm:block text-center">
                  {step.title}
                </span>

                {/* screen reader status */}
                <span className="sr-only">
                  {isCompleted ? `${step.title} — concluído` : isCurrent ? `${step.title} — atual` : `${step.title} — não iniciado`}
                </span>
              </div>

              {/* connecting line */}
              {index < steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className={`h-1 flex-1 mx-2 transition-colors duration-300 rounded-md
                    ${isCompleted ? "bg-indigo-600" : "bg-gray-200"}`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* optional textual progress for small screens */}
      <div className="sm:hidden mt-3 text-sm text-gray-600 text-center">
        Etapa {stepIndex} de {total} — {steps[stepIndex - 1]?.title}
      </div>
    </nav>
  );
}
