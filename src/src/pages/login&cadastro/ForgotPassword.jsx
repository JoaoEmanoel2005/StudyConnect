import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function ForgotPassword({ onSubmit }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email); // aqui você conecta com sua lógica de envio de reset
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-auto"
      >
        <h2 className="text-3xl font-bold mb-1 text-center text-primary">
          Recuperar Senha
        </h2>

        <p className="text-sm text-gray-600 text-center mb-6">
          Informe seu email cadastrado para receber o link de redefinição.
        </p>

        {/* Campo de email */}
        <div className="mb-4">
          <label className="text-sm font-medium mb-2 flex items-center gap-2">
          <EnvelopeIcon className="h-5 w-5 text-gray-500" />
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="seuemail@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:scale-105 transition"
        >
          Enviar link de recuperação
        </button>

        {/* Link para voltar ao login */}
        <div className="mt-6 text-center">
          <a
            href="/login"
            className="text-sm text-accent hover:underline"
          >
            Voltar ao login
          </a>
        </div>
      </form>
    </div>
  );
}
