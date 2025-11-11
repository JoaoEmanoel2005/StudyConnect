import { BrowserRouter, Routes, Route } from "react-router-dom";
// Componentes de Layout
import Layout from "./components/Layout";
import AuthLayout from "./components/AuthLayout";
import ScrollToTop from "./ScrollToTop";
import CookieConsent from "./components/CookieConsent"; // 👈 importa aqui

// Páginas
import Home from "./pages/Home";
import PaginaCurso from "./pages/catalog/CoursePage";
import InstitutionInfoPage from "./pages/institution/InstitutionInfoPage";
import NotFound from "./pages/NotFound";
import Catalogo from "./pages/catalog/CatalogPage";
import Instituicao from "./pages/institution/InstitutionPage";
import Perfil from "./pages/profile/UserProfile";
import EditProfile from "./pages/profile/EditProfile"; 
import AboutUsPage from "./pages/AboutUsPage";
import ContactPage from "./pages/ContactPage";

// Páginas de autenticação
import Login from "./pages/login&cadastro/Sign-in";
import Cadastro from "./pages/login&cadastro/Registration";
import RecuperarSenha from "./pages/login&cadastro/ForgotPassword";
import ConfirmacaoCadastro from "./pages/login&cadastro/ConfirmCadastro";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      {/* 🔽 Banner de cookies vai aqui, fora das rotas */}
      <CookieConsent />

      <Routes>
        {/* Páginas com header/footer */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/curso/:id" element={<Layout><PaginaCurso /></Layout>} />
        <Route path="/catalogo" element={<Layout><Catalogo /></Layout>} />
        <Route path="/instituicoes" element={<Layout><Instituicao /></Layout>} />
        <Route path="/perfil" element={<Layout><Perfil /></Layout>} />
        <Route path="/instituicao/:id" element={<Layout><InstitutionInfoPage /></Layout>} />
        <Route path="/sobre-nos" element={<Layout><AboutUsPage /></Layout>} />
        <Route path="/contato" element={<Layout><ContactPage /></Layout>} />

        {/* Nova rota para editar perfil */}
        <Route path="/perfil/editar" element={<Layout><EditProfile /></Layout>} />

        {/* Páginas de autenticação (sem header/footer) */}
        <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
        <Route path="/cadastro" element={<AuthLayout><Cadastro /></AuthLayout>} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
        <Route path="/confirmacao" element={<ConfirmacaoCadastro />} />

        {/* Fallback */}
        <Route path="*" element={<Layout><NotFound /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}
