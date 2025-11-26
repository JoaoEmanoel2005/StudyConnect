import { Shield } from "lucide-react";

export default function Step3Confirmation({ formData, handleChange }) {
  return (
    <div className="space-y-6">

      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <Shield className="h-6 w-6 text-indigo-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-indigo-900 mb-1">
              Privilégios de Administrador
            </h3>
            <p className="text-sm text-indigo-700">
              Esta conta terá acesso total ao sistema, incluindo gerenciamento de usuários,
              configurações e dados sensíveis.
            </p>
          </div>
        </div>
      </div>

      {/* Resumo */}
      <div className="bg-gray-50 rounded-lg p-5 space-y-3">
        <h4 className="font-medium text-gray-900 mb-3">Resumo do Cadastro</h4>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Nome:</span>
            <span className="font-medium text-gray-900">
              {formData.fullName || "—"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">E-mail:</span>
            <span className="font-medium text-gray-900">
              {formData.email || "—"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Departamento:</span>
            <span className="font-medium text-gray-900">
              {formData.department ? formData.department.toUpperCase() : "—"}
            </span>
          </div>
        </div>
      </div>

      {/* Termos */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          name="acceptTerms"
          checked={formData.acceptTerms}
          onChange={handleChange}
          className="mt-1 h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        />

        <label className="text-sm text-gray-600">
          Eu li e aceito os{" "}
          <button type="button" className="text-indigo-600 underline">
            termos de uso
          </button>{" "}
          e a{" "}
          <button type="button" className="text-indigo-600 underline">
            política de privacidade
          </button>
        </label>
      </div>
    </div>
  );
}
