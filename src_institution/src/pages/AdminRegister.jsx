import React, { useState } from "react";
import { Users, Mail, Lock, User, Eye, EyeOff, ArrowLeft, Shield, CheckCircle } from "lucide-react";

export default function AdminRegister() {
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados do cadastro:", formData);
    alert("Conta criada com sucesso! (simulação)");
  };

  const goBack = () => {
    console.log("Voltar para home");
  };

  const steps = [
    { number: 1, title: "Informações Pessoais" },
    { number: 2, title: "Credenciais de Acesso" },
    { number: 3, title: "Confirmação" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-gray-200/50 flex items-center px-4 md:px-6 z-50">
        <button
          onClick={goBack}
          className="flex items-center gap-2 text-slate-700 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="text-sm font-medium">Voltar</span>
        </button>

        <div className="flex items-center gap-3 ml-auto">
          <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-lg">SC</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-4 sm:px-6 flex justify-center">
        <div className="w-full max-w-2xl">
          
          {/* Header da Página */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              Cadastro de Administrador
            </h1>
            <p className="text-gray-600">
              Preencha os dados para criar sua conta com privilégios administrativos
            </p>
          </div>

          {/* Indicador de Progresso */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {steps.map((step, index) => (
                <React.Fragment key={step.number}>
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                        currentStep >= step.number
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {currentStep > step.number ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        step.number
                      )}
                    </div>
                    <span className="text-xs mt-2 text-gray-600 hidden sm:block">{step.title}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 flex-1 mx-2 transition-all ${
                        currentStep > step.number ? "bg-indigo-600" : "bg-gray-200"
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Formulário */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <div className="space-y-6">
              
              {/* Step 1: Informações Pessoais */}
              {currentStep === 1 && (
                <div className="space-y-5">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                      Nome Completo *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="Seu nome completo"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      E-mail Institucional *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="admin@exemplo.com"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Use seu e-mail corporativo ou institucional</p>
                  </div>

                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                      Telefone (opcional)
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Credenciais */}
              {currentStep === 2 && (
                <div className="space-y-5">
                  <div>
                    <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
                      Departamento *
                    </label>
                    <select
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white"
                    >
                      <option value="">Selecione um departamento</option>
                      <option value="ti">Tecnologia da Informação</option>
                      <option value="academico">Acadêmico</option>
                      <option value="financeiro">Financeiro</option>
                      <option value="rh">Recursos Humanos</option>
                      <option value="geral">Administração Geral</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Senha *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="Mínimo 8 caracteres"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Use letras, números e símbolos para maior segurança</p>
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      Confirmar Senha *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="Repita sua senha"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Confirmação */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <Shield className="h-6 w-6 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-indigo-900 mb-1">Privilégios de Administrador</h3>
                        <p className="text-sm text-indigo-700">
                          Esta conta terá acesso total ao sistema, incluindo gerenciamento de usuários, 
                          configurações e dados sensíveis.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-5 space-y-3">
                    <h4 className="font-medium text-gray-900 mb-3">Resumo do Cadastro</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Nome:</span>
                        <span className="font-medium text-gray-900">{formData.fullName || "—"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">E-mail:</span>
                        <span className="font-medium text-gray-900">{formData.email || "—"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Departamento:</span>
                        <span className="font-medium text-gray-900">
                          {formData.department ? formData.department.toUpperCase() : "—"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="acceptTerms"
                      name="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={handleChange}
                      className="mt-1 h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <label htmlFor="acceptTerms" className="text-sm text-gray-600">
                      Eu li e aceito os{" "}
                      <button type="button" className="text-indigo-600 hover:text-indigo-700 font-medium underline">
                        termos de uso
                      </button>
                      {" "}e a{" "}
                      <button type="button" className="text-indigo-600 hover:text-indigo-700 font-medium underline">
                        política de privacidade
                      </button>
                    </label>
                  </div>
                </div>
              )}

              {/* Botões de Navegação */}
              <div className="flex gap-3 pt-4">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium"
                  >
                    Anterior
                  </button>
                )}
                
                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="flex-1 py-3 px-6 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-medium shadow-md hover:shadow-lg"
                  >
                    Próximo
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!formData.acceptTerms}
                    className="flex-1 py-3 px-6 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Criar Conta de Administrador
                  </button>
                )}
              </div>
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