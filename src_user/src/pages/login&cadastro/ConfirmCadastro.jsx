import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { 
  CheckCircleIcon, 
  EnvelopeIcon,
  ArrowRightIcon,
  SparklesIcon,
  ClockIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/outline";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";

export default function ConfirmacaoCadastro() {
  const navigate = useNavigate();
  const { cadastro } = useAuth();

  const [pendingUser, setPendingUser] = useState(null);
  const [emailEnviado, setEmailEnviado] = useState(false);
  const [confirmado, setConfirmado] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [countdown, setCountdown] = useState(3);

  // Recupera o usuário pendente e simula envio de e-mail
  useEffect(() => {
    const storedUser = localStorage.getItem("pendingUser");
    if (storedUser) {
      setPendingUser(JSON.parse(storedUser));
      setTimeout(() => setEmailEnviado(true), 2000);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // Faz o cadastro ao confirmar
  const handleConfirm = async () => {
    if (!pendingUser) return;
    
    setIsConfirming(true);

    // Simula processamento
    setTimeout(async () => {
      const result = await cadastro(pendingUser);

      if (result?.success) {
        localStorage.removeItem("pendingUser");
        setIsConfirming(false);
        setConfirmado(true);
      } else {
        setIsConfirming(false);
        alert(result?.message || "Erro ao confirmar cadastro.");
      }
    }, 1500);
  };

  // Redireciona automaticamente após confirmação com countdown
  useEffect(() => {
    if (confirmado) {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            navigate("/login");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [confirmado, navigate]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-blue-50 p-4 relative overflow-hidden">
      {/* Card principal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-md rounded-2xl p-8 max-w-lg w-full border border-gray-100 relative z-10"
      >
        <AnimatePresence mode="wait">
          {/* Estado 1: Enviando email */}
          {!emailEnviado && (
            <motion.div
              key="sending"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 10, 0],
                  y: [0, -10, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-24 h-24 mx-auto bg-blue-800 rounded-full flex items-center justify-center mb-6 shadow-sm shadow-blue-500/30"
              >
                <PaperAirplaneIcon className="w-12 h-12 text-white -rotate-45" />
              </motion.div>

              <div className="space-y-3">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <h1 className="text-3xl font-bold text-slate-900">
                    Processando seu cadastro...
                  </h1>
                </motion.div>
                <p className="text-slate-600">
                  Aguarde enquanto preparamos tudo para você
                </p>
              </div>

              {/* Loading spinner */}
              <div className="flex justify-center gap-2 mt-8">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 bg-primary rounded-full"
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Estado 2: Email enviado - aguardando confirmação */}
          {emailEnviado && !confirmado && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-20 h-20 mx-auto bg-blue-800 rounded-full flex items-center justify-center mb-4 shadow-sm shadow-primary/30"
              >
                <EnvelopeIcon className="w-10 h-10 text-white" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h1 className="text-3xl font-bold text-slate-900 mb-3">
                  Quase lá! 🎉
                </h1>
                <p className="text-slate-600 mb-2">
                  Enviamos um email de confirmação para:
                </p>
                <div className="bg-blue-50 border-2 border-blue-100 rounded-xl p-3 mb-4 inline-block">
                  <p className="text-primary font-semibold text-lg flex items-center gap-2">
                    <EnvelopeIcon className="h-5 w-5" />
                    {pendingUser?.email}
                  </p>
                </div>
              </motion.div>

              {/* Card de instruções */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-indigo-100 rounded-xl p-5 mb-6 text-left"
              >
                <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <SparklesIcon className="h-5 w-5 text-primary" />
                  Complete seu cadastro:
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">1</span>
                    </div>
                    <div>
                      <p className="text-sm text-slate-700 font-medium">Verifique seu email</p>
                      <p className="text-xs text-slate-600">Encontre nossa mensagem na caixa de entrada</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">2</span>
                    </div>
                    <div>
                      <p className="text-sm text-slate-700 font-medium">Clique no botão abaixo</p>
                      <p className="text-xs text-slate-600">Ou use o link que enviamos por email</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">3</span>
                    </div>
                    <div>
                      <p className="text-sm text-slate-700 font-medium">Comece a explorar</p>
                      <p className="text-xs text-slate-600">Acesse milhares de cursos e oportunidades</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Botão de confirmação */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleConfirm}
                disabled={isConfirming}
                className="w-full bg-primary text-white py-4 rounded-xl font-semibold shadow-md shadow-primary/30 transition-all flex items-center justify-center gap-2 group"
              >
                {isConfirming ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Confirmando...
                  </>
                ) : (
                  <>
                    <CheckCircleIcon className="h-6 w-6" />
                    Confirmar Cadastro
                    <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </motion.button>

              {/* Aviso sobre spam */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-xs text-slate-500 mt-4 flex items-center justify-center gap-1"
              >
                <ClockIcon className="h-3 w-3" />
                Não encontrou? Verifique a pasta de spam
              </motion.p>
            </motion.div>
          )}

          {/* Estado 3: Confirmado */}
          {confirmado && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              {/* Ícone de sucesso com animação */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="relative mx-auto mb-6"
              >
                <div className="w-28 h-28 mx-auto bg-green-500 rounded-full flex items-center justify-center shadow-md shadow-green-500/30">
                  <CheckCircleIcon className="w-16 h-16 text-white" />
                </div>
                {/* Efeito de celebração */}
                <motion.div
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute inset-0 border-4 border-green-400 rounded-full"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h1 className="text-3xl font-bold text-slate-900 mb-3">
                  Cadastro Confirmado! 🎉
                </h1>
                <p className="text-slate-600 mb-2">
                  Sua conta foi ativada com sucesso
                </p>
              </motion.div>

              {/* Card de boas-vindas */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-100 rounded-xl p-5 mb-6"
              >
                <h3 className="font-semibold text-slate-900 mb-2 flex items-center justify-center gap-2">
                  <SparklesIcon className="h-5 w-5 text-green-600" />
                  Bem-vindo(a) à StudyConnect!
                </h3>
                <p className="text-sm text-slate-700">
                  Agora você pode acessar milhares de cursos, salvar seus favoritos e começar sua jornada de aprendizado.
                </p>
              </motion.div>

              {/* Countdown */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-center gap-2 text-slate-600 mb-6"
              >
                <ClockIcon className="h-5 w-5 text-primary" />
                <span className="text-sm">
                  Redirecionando em{" "}
                  <span className="font-bold text-primary text-lg">{countdown}</span>{" "}
                  segundos...
                </span>
              </motion.div>

              {/* Botão de ir imediatamente */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all group"
                >
                  Ir para o Login agora
                  <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Rodapé */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
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
        transition={{ delay: 1 }}
        className="flex items-center justify-center gap-4 mt-4 relative z-10"
      >
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <ShieldCheckIcon className="h-4 w-4 text-green-500" />
          <span>Processo seguro</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <CheckCircleIcon className="h-4 w-4 text-blue-500" />
          <span>Email verificado</span>
        </div>
      </motion.div>
    </div>
  );
}