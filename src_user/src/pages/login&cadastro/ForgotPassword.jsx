import { EnvelopeIcon, ArrowLeftIcon, CheckCircleIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { PaperAirplaneIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function ForgotPassword({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [focusedField, setFocusedField] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isEmailValid = email.includes('@') && email.length > 5;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simula delay de envio
    setTimeout(() => {
      onSubmit(email);
      setIsLoading(false);
      setEnviado(true);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-4 relative overflow-hidden">
      {/* Card central */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full border border-gray-100 relative z-10"
      >
        <AnimatePresence mode="wait">
          {!enviado ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Ícone */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 mx-auto bg-primary rounded-2xl flex items-center justify-center mb-6 shadow-md shadow-primary/30"
              >
                <LockClosedIcon className="w-10 h-10 text-white" />
              </motion.div>

              {/* Título */}
              <h2 className="text-3xl font-bold text-slate-900 text-center mb-3">
                Esqueceu sua senha?
              </h2>
              <p className="text-slate-600 text-center mb-8">
                Não se preocupe! Digite seu email e enviaremos um link para redefinir sua senha.
              </p>

              {/* Formulário */}
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                    <EnvelopeIcon className="h-4 w-4 text-primary" />
                    Email cadastrado
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusedField(true)}
                      onBlur={() => setFocusedField(false)}
                      className={`w-full px-4 py-3 pl-11 border-2 rounded-xl outline-none transition-all ${
                        focusedField 
                          ? 'border-primary bg-blue-50/50 shadow-lg shadow-primary/10' 
                          : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                      }`}
                      required
                    />
                    <EnvelopeIcon className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors ${
                      focusedField ? 'text-primary' : 'text-gray-400'
                    }`} />
                    {email && isEmailValid && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        <CheckCircleIcon className="h-5 w-5 text-green-500" />
                      </motion.div>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                    <LockClosedIcon className="h-3 w-3" />
                    Enviaremos um link seguro para redefinição
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary text-white py-3.5 rounded-xl font-semibold shadow-md shadow-primary/30 hover:shadow-primary/40 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar link de recuperação
                      <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>
              </form>

              {/* Link de volta */}
              <div className="mt-6 text-center">
                <Link 
                  to="/login" 
                  className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:underline"
                >
                  <ArrowLeftIcon className="h-4 w-4" />
                  Voltar ao login
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              {/* Ícone de sucesso */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-24 h-24 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-500/30"
              >
                <CheckCircleIcon className="w-14 h-14 text-white" />
              </motion.div>

              {/* Animação de sucesso */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-3xl font-bold text-slate-900 mb-3">
                  Email Enviado! 📧
                </h2>
                <p className="text-slate-600 mb-2">
                  Enviamos um link de recuperação para:
                </p>
                <p className="text-primary font-semibold text-lg mb-4">
                  {email}
                </p>
              </motion.div>

              {/* Card de instruções */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-blue-50 border-2 border-blue-100 rounded-xl p-4 mb-6 text-left"
              >
                <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <PaperAirplaneIcon className="h-5 w-5 text-primary" />
                  Próximos passos:
                </h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold mt-0.5">1.</span>
                    <span>Verifique sua caixa de entrada</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold mt-0.5">2.</span>
                    <span>Clique no link de redefinição (válido por 24h)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold mt-0.5">3.</span>
                    <span>Crie uma nova senha segura</span>
                  </li>
                </ul>
                <div className="mt-4 pt-4 border-t border-blue-200">
                  <p className="text-xs text-slate-600">
                    💡 <strong>Dica:</strong> Se não encontrar o email, verifique sua pasta de spam ou lixo eletrônico.
                  </p>
                </div>
              </motion.div>

              {/* Botões de ação */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="space-y-3"
              >
                <Link
                  to="/login"
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-indigo-600 text-white py-3 rounded-xl font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all"
                >
                  Voltar ao login
                  <ArrowRightIcon className="h-5 w-5" />
                </Link>
                
                <button
                  onClick={() => setEnviado(false)}
                  className="w-full inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-slate-700 py-3 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-300 transition-all"
                >
                  <EnvelopeIcon className="h-5 w-5" />
                  Reenviar email
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Rodapé */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-center relative z-10"
      >
        <p className="text-sm text-slate-500 mb-3">
          Precisa de ajuda?{" "}
          <Link to="/contato" className="text-primary font-medium hover:underline">
            Entre em contato
          </Link>
        </p>
        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} StudyConnect • Todos os direitos reservados
        </p>
      </motion.div>

      {/* Badges de segurança */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex items-center justify-center gap-4 mt-4 relative z-10"
      >
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <LockClosedIcon className="h-4 w-4 text-green-500" />
          <span>Conexão segura</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <CheckCircleIcon className="h-4 w-4 text-blue-500" />
          <span>Dados criptografados</span>
        </div>
      </motion.div>
    </div>
  );
}