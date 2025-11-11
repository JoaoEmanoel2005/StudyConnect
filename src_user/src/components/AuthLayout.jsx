import { HomeIcon, SparklesIcon, AcademicCapIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function AuthLayout({ children }) {
  const floatingStats = [
    { icon: AcademicCapIcon, label: "50+ Cursos", color: "bg-blue-500" },
    { icon: RocketLaunchIcon, label: "11 Instituições", color: "bg-green-500" },
    { icon: SparklesIcon, label: "1000+ Alunos", color: "bg-amber-500" },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative overflow-hidden bg-slate-50">
      {/* Coluna Esquerda - Formulário */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex items-center justify-center px-6 py-12 relative z-10"
      >
        <div className="max-w-md w-full">
          {/* Formulário */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {children}
          </motion.div>
        </div>
      </motion.div>

      {/* Coluna Direita - Visual Impactante */}
      <div className="hidden md:flex flex-1 relative bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 overflow-hidden">
        {/* Efeitos de fundo animados */}
        <div className="absolute inset-0">
          {/* Gradientes blur */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear" 
            }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
            }}
            transition={{ 
              duration: 15,
              repeat: Infinity,
              ease: "linear" 
            }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"
          />
          
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMCAzNmMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnpNMCAyNGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjAyIi8+PC9nPjwvc3ZnPg==')] opacity-20" />
        </div>

        {/* Conteúdo central */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full px-12 text-white">
          {/* Imagem principal com efeito */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mb-12"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-indigo-600/40 rounded-3xl blur-xl" />
            <img
              src="/assets/foto_banner.jpg"
              alt="Estudante trabalhando"
              className="relative w-full max-w-lg rounded-3xl shadow-2xl border-4 border-white/10"
            />
          </motion.div>

          {/* Texto principal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl font-bold mb-3 leading-tight">
              Transforme Seu{" "}
              <span className="text-transparent bg-clip-text bg-indigo-400">
                Futuro
              </span>
            </h2>
            <p className="text-lg text-slate-300 max-w-md">
              Conecte-se às melhores instituições e cursos para impulsionar sua carreira
            </p>
          </motion.div>

          {/* Stats flutuantes */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {floatingStats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 border border-white/20"
                >
                  <div className={`${stat.color} rounded-lg p-2`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-sm font-semibold">{stat.label}</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        
      </div>

      {/* Botão Home - Redesenhado */}
      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        className="fixed bottom-8 right-8 z-50"
      >
        <Link
          to="/"
          className="group relative inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-indigo-600 text-white shadow-2xl hover:shadow-primary/50 hover:scale-110 transform transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/50"
        >
          <HomeIcon className="h-6 w-6 relative z-10" />
          
          {/* Tooltip melhorado */}
          <span className="absolute bottom-full right-1/2 translate-x-1/2 mb-3 px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            Voltar para Home
            <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900" />
          </span>
        </Link>
      </motion.div>

      {/* Indicador de scroll (mobile) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400"
      >
        <span className="text-xs font-medium">Role para ver mais</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-slate-300 rounded-full flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 bg-slate-400 rounded-full" />
        </motion.div>
      </motion.div>
    </div>
  );
}