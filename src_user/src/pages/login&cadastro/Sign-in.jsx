import AuthForm from "../../components/others/AuthForm";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleLogin = async (formData) => {
    setError(null); // limpa erros anteriores
    const result = await login(formData); // ⚡ precisa do await aqui

    if (result.success) {
      navigate("/"); // redireciona após login
    } else {
      setError(result.message); // mostra mensagem de erro
    }
  };

  return (
    <div>
      <AuthForm type="login" onSubmit={handleLogin} />
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
    </div>
  );
}
