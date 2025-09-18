import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { UserIcon, EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export default function AuthForm({ type, onSubmit }) {
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 w-auto">
      <h2 className="text-3xl font-bold mb-2 text-center text-primary">
        {type === "login" ? "Bem-vindo de volta!" : "Crie sua conta para começar"}
      </h2>
      <p className="text-sm text-gray-400 text-center mb-6">
        {type === "login"
          ? "Faça login com suas credenciais para acessar sua conta."
          : "Preencha o formulário abaixo para criar uma nova conta."}
      </p>

      {type === "cadastro" && (
        <div className="mb-4">
          <label className="flex items-center gap-2 text-sm font-medium mb-2">
            <UserIcon className="h-5 w-5 text-gray-400" />
            Nome
          </label>
          <input
            type="text"
            name="name"
            placeholder="Digite seu nome..."
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent outline-none"
            required
          />
        </div>
      )}

      <div className="mb-4">
        <label className="flex items-center gap-2 text-sm font-medium mb-2">
          <EnvelopeIcon className="h-5 w-5 text-gray-400" />
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="Digite seu e-mail..."
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent outline-none"
          required
        />
      </div>

      <div className="mb-2 relative">
        <label className="flex items-center gap-2 text-sm font-medium mb-2">
          <LockClosedIcon className="h-5 w-5 text-gray-400" />
          Senha
        </label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Digite sua senha..."
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent outline-none pr-10"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-14 transform -translate-y-1/2 text-gray-400 hover:text-gray-500"
        >
          {showPassword ? <EyeIcon className="h-5 w-5" /> : <EyeSlashIcon className="h-5 w-5" />}
        </button>
      </div>

      {type === "login" && (
        <div className="flex justify-between items-center mb-4 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="h-4 w-4 rounded border-gray-300 focus:ring-accent" />
            Lembrar-me
          </label>
          <Link to="/recuperar-senha" className="text-accent hover:underline">
            Esqueceu a senha?
          </Link>
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:scale-105 transition mt-5"
      >
        {type === "login" ? "Entrar" : "Cadastrar"}
      </button>

      {/* Login social */}
      <div className="flex flex-col items-center mb-4 mt-4">
        <p className="text-gray-500 mb-5">___________ ou ___________</p>
        <button className="flex items-center justify-center gap-2 w-full border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
          </svg>
          Contiune com o Google
        </button>
      </div>

      <p className="text-center text-sm text-gray-600 mt-4">
        {type === "login" ? (
          <>
            Não tem uma conta?{" "}
            <Link to="/cadastro" className="text-accent font-medium hover:underline">
              Cadastre-se
            </Link>
          </>
        ) : (
          <>
            Já tem conta?{" "}
            <Link to="/login" className="text-accent font-medium hover:underline">
              Faça login
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
