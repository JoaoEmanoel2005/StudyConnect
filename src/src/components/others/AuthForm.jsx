import { useState } from "react";
import { EyeIcon, EyeSlashIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { UserIcon, EnvelopeIcon, LockClosedIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function AuthForm({ type, onSubmit }) {
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isLogin = type === "login";

  // Validações visuais simples
  const isEmailValid = formData.email.includes('@') && formData.email.length > 5;
  const isPasswordValid = formData.password.length >= 6;
  const isNameValid = formData.name.length >= 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold mb-2 text-slate-900"
          >
            {isLogin ? "Bem-vindo de volta! 👋" : "Comece sua jornada 🚀"}
          </motion.h2>
          <p className="text-sm text-slate-600">
            {isLogin
              ? "Entre com suas credenciais para acessar sua conta"
              : "Crie sua conta e descubra milhares de oportunidades"}
          </p>
        </div>

        {/* Campo Nome (apenas cadastro) */}
        {!isLogin && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-5"
          >
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <UserIcon className="h-4 w-4 text-primary" />
              Nome completo
            </label>
            <div className="relative">
              <input
                type="text"
                name="name"
                placeholder="Como devemos te chamar?"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-4 py-3 pl-11 border-2 rounded-xl outline-none transition-all ${
                  focusedField === 'name' 
                    ? 'border-primary bg-blue-50/50 shadow-lg shadow-primary/10' 
                    : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                }`}
                required
              />
              <UserIcon className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors ${
                focusedField === 'name' ? 'text-primary' : 'text-gray-400'
              }`} />
              {formData.name && isNameValid && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* Campo Email */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: isLogin ? 0.1 : 0.2 }}
          className="mb-5"
        >
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
            <EnvelopeIcon className="h-4 w-4 text-primary" />
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              className={`w-full px-4 py-3 pl-11 border-2 rounded-xl outline-none transition-all ${
                focusedField === 'email' 
                  ? 'border-primary bg-blue-50/50 shadow-lg shadow-primary/10' 
                  : 'border-gray-200 bg-gray-50 hover:border-gray-300'
              }`}
              required
            />
            <EnvelopeIcon className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors ${
              focusedField === 'email' ? 'text-primary' : 'text-gray-400'
            }`} />
            {formData.email && isEmailValid && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <CheckCircleIcon className="h-5 w-5 text-green-500" />
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Campo Senha */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: isLogin ? 0.2 : 0.3 }}
          className="mb-5"
        >
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
            <LockClosedIcon className="h-4 w-4 text-primary" />
            Senha
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              className={`w-full px-4 py-3 pl-11 pr-11 border-2 rounded-xl outline-none transition-all ${
                focusedField === 'password' 
                  ? 'border-primary bg-blue-50/50 shadow-lg shadow-primary/10' 
                  : 'border-gray-200 bg-gray-50 hover:border-gray-300'
              }`}
              required
            />
            <LockClosedIcon className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors ${
              focusedField === 'password' ? 'text-primary' : 'text-gray-400'
            }`} />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
            >
              {showPassword ? <EyeIcon className="h-5 w-5" /> : <EyeSlashIcon className="h-5 w-5" />}
            </button>
          </div>
          {!isLogin && formData.password && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2"
            >
              <div className="flex items-center gap-2 text-xs">
                <div className={`flex-1 h-1 rounded-full transition-all ${
                  formData.password.length < 6 ? 'bg-red-200' :
                  formData.password.length < 8 ? 'bg-yellow-200' :
                  'bg-green-200'
                }`}>
                  <div className={`h-full rounded-full transition-all ${
                    formData.password.length < 6 ? 'bg-red-500 w-1/3' :
                    formData.password.length < 8 ? 'bg-yellow-500 w-2/3' :
                    'bg-green-500 w-full'
                  }`} />
                </div>
                <span className={`font-medium ${
                  formData.password.length < 6 ? 'text-red-500' :
                  formData.password.length < 8 ? 'text-yellow-500' :
                  'text-green-500'
                }`}>
                  {formData.password.length < 6 ? 'Fraca' :
                   formData.password.length < 8 ? 'Média' :
                   'Forte'}
                </span>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Lembrar-me / Esqueceu senha (apenas login) */}
        {isLogin && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-between items-center mb-6"
          >
            <label className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="checkbox" 
                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-2 focus:ring-primary cursor-pointer" 
              />
              <span className="text-sm text-slate-600 group-hover:text-slate-900 transition">
                Lembrar-me
              </span>
            </label>
            <Link 
              to="/recuperar-senha" 
              className="text-sm text-primary font-medium hover:underline"
            >
              Esqueceu a senha?
            </Link>
          </motion.div>
        )}

        {/* Botão Submit */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: isLogin ? 0.4 : 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-primary text-white py-3.5 rounded-xl font-semibold shadow-md shadow-primary/30 hover:shadow-primary/40 transition-all flex items-center justify-center gap-2 group"
        >
          {isLogin ? "Entrar na minha conta" : "Criar minha conta"}
          <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </motion.button>

        {/* Divider */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="relative my-6"
        >
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-slate-500 font-medium">ou continue com</span>
          </div>
        </motion.div>

        {/* Login Social */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          className="w-full flex items-center justify-center gap-3 border-2 border-gray-200 rounded-xl py-3 hover:bg-gray-50 hover:border-gray-300 transition-all group"
        >
          <svg className="w-5 h-5" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
          </svg>
          <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition">
            Continuar com Google
          </span>
        </motion.button>

        {/* Link para alternar entre login/cadastro */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center text-sm text-slate-600 mt-6"
        >
          {isLogin ? (
            <>
              Ainda não tem conta?{" "}
              <Link to="/cadastro" className="text-primary font-semibold hover:underline">
                Cadastre-se gratuitamente
              </Link>
            </>
          ) : (
            <>
              Já tem uma conta?{" "}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                Fazer login
              </Link>
            </>
          )}
        </motion.p>
      </form>
    </motion.div>
  );
}