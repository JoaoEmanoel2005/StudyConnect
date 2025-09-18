import { FaFacebook, FaInstagram, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-textprimary text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Logo e descrição */}
        <div>
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            StudyConnect
          </h2>
          <p className="text-sm text-indigo-400 leading-relaxed">
            Conectando estudantes e profissionais a cursos de graduação, pós, técnicos e EAD de forma simples e acessível.
          </p>
        </div>

        {/* Links principais */}
        <div>
          <h3 className="font-semibold mb-4 text-xs uppercase tracking-wide text-indigo-300">
            Navegação
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-secondary transition-colors">Home</Link></li>
            <li><Link to="/cursos" className="hover:text-secondary transition-colors">Catálogos de Cursos</Link></li>
            <li><Link to="/instituicoes" className="hover:text-secondary transition-colors">Instituições de Ensino</Link></li>
            <li><Link to="/sobre-nos" className="hover:text-secondary transition-colors">Sobre Nós</Link></li>
            <li><Link to="/contato" className="hover:text-secondary transition-colors">Contato</Link></li>
          </ul>
        </div>

        {/* Links institucionais */}
        <div>
          <h3 className="font-semibold mb-4 text-xs uppercase tracking-wide text-indigo-300">
            Institucional
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-secondary transition-colors">Política de Privacidade</Link></li>
            <li><Link to="/" className="hover:text-secondary transition-colors">Política de Segurança</Link></li>
            <li><Link to="/" className="hover:text-secondary transition-colors">Política de Cookies</Link></li>
            <li><Link to="/" className="hover:text-secondary transition-colors">Termos de Uso</Link></li>
            <li><Link to="/" className="hover:text-secondary transition-colors">Fale Conosco</Link></li>
          </ul>
        </div>

        {/* Redes sociais */}
        <div>
          <h3 className="font-semibold mb-4 text-xs uppercase tracking-wide text-indigo-300">
            Siga-nos
          </h3>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer"
               className="p-2 rounded-full bg-primary/5 text-xl hover:bg-primary/10 hover:text-indigo-300 transition-all transform hover:scale-110">
              <FaFacebook />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"
               className="p-2 rounded-full bg-primary/5 text-xl hover:bg-primary/10 hover:text-indigo-300 transition-all transform hover:scale-110">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer"
               className="p-2 rounded-full bg-primary/5 text-xl hover:bg-primary/10 hover:text-indigo-300 transition-all transform hover:scale-110">
              <FaLinkedin />
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer"
               className="p-2 rounded-full bg-primary/5 text-xl hover:bg-primary/10 hover:text-indigo-300 transition-all transform hover:scale-110">
              <FaTwitter />
            </a>
            <a href="https://github.com/JoaoEmanoel2005/StudyConnect" target="_blank" rel="noreferrer"
               className="p-2 rounded-full bg-primary/5 text-xl hover:bg-primary/10 hover:text-indigo-300 transition-all transform hover:scale-110">
              <FaGithub />
            </a>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="border-t border-primary mt-8 py-4 text-center text-sm text-secondary">
        &copy; {new Date().getFullYear()} StudyConnect. Todos os direitos reservados.
      </div>
    </footer>
  )
}
