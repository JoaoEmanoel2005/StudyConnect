import AuthForm from "../../components/others/AuthForm";
import { useAuth } from "../../hooks/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleLogin = (formData) => {
    const result = login(formData);
    if (result.success) {
      navigate("/"); // redireciona pra home
    } else {
      setError(result.message);
    }
  };

  return (
    <div>
      <AuthForm type="login" onSubmit={handleLogin} />
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
    </div>
  );
}
