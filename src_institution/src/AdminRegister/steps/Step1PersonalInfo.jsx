import { User, Mail, Phone } from "lucide-react"; // Importação do ícone Phone

export default function Step1PersonalInfo({
  formData,
  handleChange,
  handleBlur, // optional: (e) => { ... }
  errors = {}, // optional: { fullName: "...", email: "...", phoneNumber: "..." }
  touched = {}  // optional: { fullName: true, ... }
}) {

  // Função auxiliar para determinar as classes de borda (consistência visual)
  const getBorderClasses = (fieldName) => {
    if (touched[fieldName] && errors[fieldName]) {
      return 'border-red-500'; // Erro: Borda vermelha
    }
    if (touched[fieldName] && !errors[fieldName]) {
      return 'border-green-500'; // Sucesso: Borda verde
    }
    return 'border-gray-300'; // Padrão: Borda cinza
  };

  return (
    <div className="space-y-5">
      
      {/* Nome */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
          Nome Completo <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            id="fullName"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="name"
            required
            autoFocus
            aria-required="true"
            aria-invalid={errors.fullName ? "true" : "false"}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            // Classes atualizadas com feedback visual dinâmico
            className={`w-full pl-11 pr-4 py-3 border ${getBorderClasses('fullName')} rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all`}
            placeholder="Seu nome completo"
            maxLength={100}
          />
        </div>
        {touched.fullName && errors.fullName && (
          <p id="fullName-error" role="alert" className="mt-1 text-sm text-red-600">
            {errors.fullName}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          E-mail Institucional <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="email"
            required
            aria-required="true"
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : "email-help"}
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            className={`w-full pl-11 pr-4 py-3 border ${getBorderClasses('email')} rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all`}
            placeholder="admin@exemplo.com"
            maxLength={254}
          />
        </div>
        <p id="email-help" className="text-xs text-gray-500 mt-1">
          Use seu e-mail corporativo ou institucional
        </p>
        {touched.email && errors.email && (
          <p id="email-error" role="alert" className="mt-1 text-sm text-red-600">
            {errors.email}
          </p>
        )}
      </div>

      {/* Telefone - ATUALIZADO */}
      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
          Telefone (opcional)
        </label>
        {/* Adicionado wrapper relative para o ícone */}
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            id="phoneNumber"
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="tel"
            inputMode="tel"
            pattern="^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$"
            aria-invalid={errors.phoneNumber ? "true" : "false"}
            aria-describedby={errors.phoneNumber ? "phone-error" : "phone-help"}
            className={`w-full pl-11 pr-4 py-3 border ${getBorderClasses('phoneNumber')} rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all`}
            placeholder="(00) 00000-0000"
            maxLength={16}
          />
        </div>
        <p id="phone-help" className="text-xs text-gray-500 mt-1">
          Formato recomendado: (00) 00000-0000
        </p>
        {touched.phoneNumber && errors.phoneNumber && (
          <p id="phone-error" role="alert" className="mt-1 text-sm text-red-600">
            {errors.phoneNumber}
          </p>
        )}
      </div>
    </div>
  );
}