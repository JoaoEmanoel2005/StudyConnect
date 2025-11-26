import { useState } from "react";
import { AuthService } from "./services/authService";
import { hashPassword } from "./services/hashPassword";

export function useAdminRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    department: "",
    acceptTerms: false
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // toggle helpers
  const toggleShowPassword = () => setShowPassword(prev => !prev);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(prev => !prev);

  // Atualiza inputs e checkbox
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // Marca campos como tocados
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  // Controle de etapas
  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  // Validação
  const validate = () => {
    const newErrors = {};

    // Nome
    if (!formData.fullName || formData.fullName.length < 3) {
      newErrors.fullName = "Nome deve ter pelo menos 3 caracteres.";
    }

    // Email
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Informe um email válido.";
    }

    // Senha
    if (!formData.password) {
      newErrors.password = "Informe uma senha.";
    } else {
      if (formData.password.length < 8) {
        newErrors.password = "A senha deve ter no mínimo 8 caracteres.";
      } else if (!/\d/.test(formData.password)) {
        newErrors.password = "A senha deve incluir pelo menos um número.";
      }
    }

    // Confirmar senha
    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "As senhas não coincidem.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  // Envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    const hashed = await hashPassword(formData.password);

    AuthService.register({
      ...formData,
      password: hashed
    });

    window.location.href = "/login";
  };

  return {
    // estados
    showPassword,
    showConfirmPassword,
    currentStep,
    formData,
    errors,
    touched,

    // alteradores
    setShowPassword,
    setShowConfirmPassword,
    toggleShowPassword,
    toggleShowConfirmPassword,
    handleChange,
    handleBlur,
    nextStep,
    prevStep,
    handleNext,
    handleSubmit
  };
}
