import { Lock, Eye, EyeOff } from "lucide-react";

export default function Step2Credentials({
  formData,
  handleChange,
  handleBlur,
  errors = {},
  touched = {},
  showPassword,
  showConfirmPassword,
  toggleShowPassword,
  toggleShowConfirmPassword,
}) {
  const getBorderClasses = (field) => {
    if (touched[field] && errors[field]) return "border-red-500";
    if (touched[field] && !errors[field]) return "border-green-500";
    return "border-gray-300";
  };

  return (
    <div className="space-y-5">
      {/* Departamento */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Departamento <span className="text-red-500">*</span>
        </label>

        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          aria-required="true"
          aria-invalid={errors.department ? "true" : "false"}
          aria-describedby={errors.department ? "department-error" : undefined}
          className={`w-full px-4 py-3 border ${getBorderClasses(
            "department"
          )} rounded-lg bg-white focus:ring-2 focus:ring-indigo-500`}
        >
          <option value="">Selecione um departamento</option>
          <option value="ti">Tecnologia da Informação</option>
          <option value="academico">Acadêmico</option>
          <option value="financeiro">Financeiro</option>
          <option value="rh">Recursos Humanos</option>
          <option value="geral">Administração Geral</option>
        </select>

        {touched.department && errors.department && (
          <p id="department-error" className="mt-1 text-sm text-red-600">
            {errors.department}
          </p>
        )}
      </div>

      {/* Senha */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Senha <span className="text-red-500">*</span>
        </label>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            placeholder="Mínimo 8 caracteres"
            className={`w-full pl-11 pr-12 py-3 border ${getBorderClasses(
              "password"
            )} rounded-lg focus:ring-2 focus:ring-indigo-500`}
          />

          {/* Toggle via onMouseDown to avoid focus loss and guarantee toggle */}
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              toggleShowPassword();
            }}
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            aria-pressed={showPassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <Eye /> : <EyeOff />}
          </button>
        </div>

        <p id="password-help" className="text-xs text-gray-500 mt-1">
          Use letras, números e símbolos para maior segurança.
        </p>

        {touched.password && errors.password && (
          <p id="password-error" className="mt-1 text-sm text-red-600">
            {errors.password}
          </p>
        )}
      </div>

      {/* Confirmar Senha */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Confirmar Senha <span className="text-red-500">*</span>
        </label>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            aria-required="true"
            aria-invalid={errors.confirmPassword ? "true" : "false"}
            aria-describedby={
              errors.confirmPassword ? "confirmPassword-error" : undefined
            }
            className={`w-full pl-11 pr-12 py-3 border ${getBorderClasses(
              "confirmPassword"
            )} rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all`}
            placeholder="Repita sua senha"
          />

          {/* Toggle via onMouseDown */}
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              toggleShowConfirmPassword();
            }}
            aria-label={showConfirmPassword ? "Ocultar senha" : "Mostrar senha"}
            aria-pressed={showConfirmPassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? <Eye /> : <EyeOff />}
          </button>
        </div>

        {touched.confirmPassword && errors.confirmPassword && (
          <p id="confirmPassword-error" className="mt-1 text-sm text-red-600">
            {errors.confirmPassword}
          </p>
        )}
      </div>
    </div>
  );
}
