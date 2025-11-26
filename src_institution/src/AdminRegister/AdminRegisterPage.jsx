import Step2Credentials from "./steps/Step2Credentials";
import { useAdminRegister } from "./useAdminRegister";

export default function AdminRegisterPage() {
  const {
    formData,
    handleChange,
    handleBlur,
    errors,
    touched,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    toggleShowPassword,
    toggleShowConfirmPassword,
    currentStep,
    nextStep,
    prevStep,
    handleNext,
    handleSubmit
  } = useAdminRegister();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {currentStep === 2 && (
        <Step2Credentials
          formData={formData}
          handleChange={handleChange}
          handleBlur={handleBlur}
          errors={errors}
          touched={touched}
          showPassword={showPassword}
          toggleShowPassword={toggleShowPassword}
          showConfirmPassword={showConfirmPassword}
          toggleShowConfirmPassword={toggleShowConfirmPassword}
        />
      )}

      {/* Botões de navegação */}
      <div className="flex justify-between mt-6">
        {currentStep > 1 && (
          <button
            type="button"
            onClick={prevStep}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            Voltar
          </button>
        )}

        {currentStep < 3 && (
          <button
            type="button"
            onClick={handleNext}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md"
          >
            Próximo
          </button>
        )}

        {currentStep === 3 && (
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md"
          >
            Finalizar
          </button>
        )}
      </div>

    </form>
  );
}
