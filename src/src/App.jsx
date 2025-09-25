import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import AuthLayout from "./components/AuthLayout";

import Home from "./pages/Home";
import PaginaCurso from "./pages/CoursePage";
import NotFound from "./pages/NotFound";
import Catalogo from "./pages/CatalogPage";
import UserProfile from "./pages/PerfilUsuario";
import Login from "./pages/login&cadastro/Sing-in";
import Cadastro from "./pages/login&cadastro/Registration";
import RecuperarSenha from "./pages/login&cadastro/ForgotPassword";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Páginas com header/footer */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/curso/:id" element={<Layout><PaginaCurso /></Layout>} />
        <Route path="/catalogo" element={<Layout><Catalogo /></Layout>} />
        <Route path="/perfil" element={<Layout><UserProfile /></Layout>} />

        {/* Páginas de autenticação (sem header/footer) */}
        <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
        <Route path="/cadastro" element={<AuthLayout><Cadastro /></AuthLayout>} />
        <Route path="/recuperar-senha" element={<AuthLayout><RecuperarSenha /></AuthLayout>} />

        {/* fallback */}
        <Route path="*" element={<Layout><NotFound /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}
