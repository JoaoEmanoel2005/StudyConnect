import { useState } from "react";
import { AuthService } from "./services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
  const hashed = await hashPassword(password);

  const result = AuthService.login(email, hashed);

  if (!result.success) {
    setError(result.message);
    return;
  }

  window.location.href = "/dashboard";
};


  return (
    <div className="p-8 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Login do Administrador</h1>

      {error && <p className="text-red-600">{error}</p>}

      <input
        type="text"
        placeholder="Email"
        className="w-full p-3 border rounded"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Senha"
        className="w-full p-3 border rounded"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="w-full p-3 bg-indigo-600 text-white rounded"
      >
        Entrar
      </button>
    </div>
  );
}
