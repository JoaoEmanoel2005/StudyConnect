import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function ForgotPassword({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email);
    setEnviado(true); // simula envio do link de redefinição
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50 p-4 font-sans">
      {/* Card central */}
      <div className="bg-white shadow rounded-2xl p-8 max-w-md w-full border border-amber-200 text-center">
        {!enviado ? (
          <>
            <EnvelopeIcon className="w-16 h-16 mx-auto text-accent " />
            <h2 className="text-2xl font-bold text-orange-800 mt-4">
              Recuperar Senha
            </h2>
            <p className="text-gray-600 mt-2">
              Informe seu e-mail cadastrado para receber o link de redefinição.
            </p>

            <form onSubmit={handleSubmit} className="mt-6">
              <div className="mb-4 text-left">
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
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
              >
                Enviar link de recuperação
              </button>
            </form>

            <div className="mt-6 text-center">
              <a href="/login" className="text-sm text-accent hover:underline">
                Voltar ao login
              </a>
            </div>
          </>
        ) : (
          <>
            <EnvelopeIcon className="w-16 h-16 mx-auto text-accent" />
            <h2 className="text-2xl font-semibold text-gray-800 mt-4">
              Link enviado!
            </h2>
            <p className="text-gray-600 mt-2">
              Verifique seu e-mail ({email}) para redefinir sua senha.
            </p>
            <p className="text-gray-500 mt-1">
              Se não encontrar, verifique a caixa de spam.
            </p>
            <div className="mt-6">
              <a href="/login" className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                Voltar ao login
              </a>
            </div>
          </>
        )}
      </div>

      {/* Rodapé institucional */}
      <p className="text-sm text-gray-400 mt-6">
        © {new Date().getFullYear()} — StudyConnect • Todos os direitos reservados.
      </p>
    </div>
  );
}
