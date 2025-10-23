import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import AuthLayout from "./components/AuthLayout";
import ScrollToTop from "./ScrollToTop";


import Home from "./pages/Home";
import PaginaCurso from "./pages/CoursePage";
import InstitutionInfoPage from "./pages/InstitutionInfoPage";
import NotFound from "./pages/NotFound";
import Catalogo from "./pages/CatalogPage";
import Instituicao from "./pages/InstitutionPage";
import Perfil from "./pages/UserProfile";
import Login from "./pages/login&cadastro/Sign-in";
import Cadastro from "./pages/login&cadastro/Registration";
import RecuperarSenha from "./pages/login&cadastro/ForgotPassword";
import ConfirmacaoCadastro from "./pages/login&cadastro/ConfirmCadastro";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
        <Routes>
          {/* Páginas com header/footer */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/curso/:id" element={<Layout><PaginaCurso /></Layout>} />
          <Route path="/catalogo" element={<Layout><Catalogo /></Layout>} />
          <Route path="/instituicoes" element={<Layout><Instituicao /></Layout>} />
          <Route path="/perfil" element={<Layout><Perfil /></Layout>} />
          <Route path="/instituicao/:id" element={<Layout><InstitutionInfoPage /></Layout>} />
          

        {/* Páginas de autenticação (sem header/footer) */}
        <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
        <Route path="/cadastro" element={<AuthLayout><Cadastro /></AuthLayout>} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
        <Route path="/confirmacao" element={<ConfirmacaoCadastro />} />

        {/* fallback */}
        <Route path="*" element={<Layout><NotFound /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}
