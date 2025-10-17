import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AuthForm from "../../components/others/AuthForm";

export default function Cadastro() {
  const { cadastro } = useAuth();
  const navigate = useNavigate();

  const handleCadastro = (formData) => {
    // Armazena temporariamente os dados (sem criar o usuário ainda)
    localStorage.setItem("pendingUser", JSON.stringify(formData));
    navigate("/confirmacao"); // redireciona para a página de confirmação
  };

  return <AuthForm type="cadastro" onSubmit={handleCadastro} />;
}
