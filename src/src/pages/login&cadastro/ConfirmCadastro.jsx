import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { CheckCircle, Mail } from "lucide-react";

export default function ConfirmacaoCadastro() {
  const navigate = useNavigate();
  const { cadastro } = useAuth();

  const [pendingUser, setPendingUser] = useState(null);
  const [emailEnviado, setEmailEnviado] = useState(false);
  const [confirmado, setConfirmado] = useState(false);

  // 🔹 Recupera o usuário pendente e simula envio de e-mail
  useEffect(() => {
    const storedUser = localStorage.getItem("pendingUser");
    if (storedUser) {
      setPendingUser(JSON.parse(storedUser));
      setTimeout(() => setEmailEnviado(true), 2000);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // 🔹 Faz o cadastro ao confirmar
  const handleConfirm = async () => {
    if (!pendingUser) return;

    const result = await cadastro(pendingUser);

    if (result?.success) {
    localStorage.removeItem("pendingUser");
    setConfirmado(true);  
    } else {
      alert(result?.message || "Erro ao confirmar cadastro.");
    }
  };

  // 🔹 Redireciona automaticamente após confirmação
  useEffect(() => {
    if (confirmado) {
      console.log("Redirecionando para /login...");
      const timer = setTimeout(() => navigate("/login"), 2000);
      return () => clearTimeout(timer); // evita memory leak
    }
  }, [confirmado, navigate]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-indigo-50 p-4">
      <div className="bg-white shadow rounded-xl p-8 max-w-md text-center border border-indigo-200">
        {!emailEnviado && (
          <>
            <Mail className="w-14 h-14 mx-auto text-blue-500 animate-bounce" />
            <h1 className="text-2xl font-bold text-textprimary mt-4">
              Enviando e-mail de confirmação...
            </h1>
            <p className="text-gray-500 mt-2">
              Por favor, aguarde um momento enquanto processamos seu cadastro.
            </p>
          </>
        )}

        {emailEnviado && !confirmado && (
          <>
            <Mail className="w-14 h-14 mx-auto text-blue-600" />
            <h1 className="text-2xl font-bold text-textprimary mt-4">
              Confirmação de Cadastro
            </h1>
            <p className="text-gray-600 mt-2">
              Um e-mail de confirmação foi enviado para:{" "}
              <strong>{pendingUser?.email}</strong>
            </p>
            <p className="text-gray-500 mt-1">
              Clique no botão abaixo para ativar sua conta.
            </p>

            <button
              onClick={handleConfirm}
              className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              Confirmar Cadastro
            </button>
          </>
        )}

        {confirmado && (
          <>
            <CheckCircle className="w-16 h-16 mx-auto text-green-500 animate-pulse" />
            <h1 className="text-2xl font-bold text-textprimary mt-4">
              Cadastro confirmado!
            </h1>
            <p className="text-gray-600 mt-2">
              Redirecionando para a tela de login...
            </p>
          </>
        )}
      </div>

      <p className="text-sm text-indigo-500 mt-6">
        © {new Date().getFullYear()} — StudyConnect • Todos os direitos reservados.
      </p>
    </div>
  );
}