import { createContext, useContext, useState, useEffect } from "react";
import config from "../data/config.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (!storedUser) return null;

    const parsedUser = JSON.parse(storedUser);

    // ✅ Garante que areasInteresse sempre seja um array
    if (parsedUser && !Array.isArray(parsedUser.areasInteresse)) {
      parsedUser.areasInteresse = parsedUser.areasInteresse
        ? [parsedUser.areasInteresse]
        : [];
    }

    return parsedUser;
  });

  // 🔹 Sincroniza sempre que `usuario` muda
  useEffect(() => {
    if (usuario) {
      localStorage.setItem("currentUser", JSON.stringify(usuario));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [usuario]);

  // 🔹 ATUALIZAR PERFIL
  const atualizarPerfil = (novosDados) => {
    setUsuario((prev) => {
      const atualizado = {
        ...prev,
        ...novosDados,
        // ✅ Garante que areasInteresse sempre seja um array
        areasInteresse: Array.isArray(novosDados.areasInteresse)
          ? novosDados.areasInteresse
          : novosDados.areasInteresse
          ? [novosDados.areasInteresse]
          : prev?.areasInteresse || [],
      };

      localStorage.setItem("currentUser", JSON.stringify(atualizado));

      // Atualiza também a lista completa de usuários, se existir
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const updatedUsers = users.map((u) =>
        u.id === atualizado.id ? atualizado : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      return atualizado;
    });
  };

  // 🔹 LOGIN
  const login = ({ email, password }) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      // ✅ Garante formato consistente
      if (!Array.isArray(user.areasInteresse)) {
        user.areasInteresse = user.areasInteresse
          ? [user.areasInteresse]
          : [];
      }

      localStorage.setItem("currentUser", JSON.stringify(user));
      setUsuario(user);
      return { success: true };
    } else {
      return { success: false, message: "Usuário ou senha inválidos" };
    }
  };

  // 🔹 CADASTRO (API)
  async function cadastro({ name, email, password }) {
  try {
    const resposta = await fetch(`${config.API_URL}/api/usuarios/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: name,
        email,
        senha: password,
      }),
    });

    const data = await resposta.json();

    if (!resposta.ok) {
      throw new Error(data.message || `Erro HTTP ${resposta.status}`);
    }

    console.log("Usuário cadastrado:", data);
    return { success: true };
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error.message);
    return { success: false, message: error.message };
  }
}


  // 🔹 LOGOUT
  const logout = () => {
    localStorage.removeItem("currentUser");
    setUsuario(null);
  };

  // 🔹 FAVORITAR / DESFAVORITAR CURSO
  const toggleCursoFavorito = (cursoId) => {
    if (!usuario) return;

    const updatedUser = { ...usuario };
    if (!updatedUser.cursosSalvos) updatedUser.cursosSalvos = [];

    const jaSalvo = updatedUser.cursosSalvos.includes(cursoId);
    updatedUser.cursosSalvos = jaSalvo
      ? updatedUser.cursosSalvos.filter((id) => id !== cursoId)
      : [...updatedUser.cursosSalvos, cursoId];

    atualizarPerfil(updatedUser); // ✅ usa a função central de atualização
  };

  // 🔹 FAVORITAR / DESFAVORITAR INSTITUIÇÃO
  const toggleInstituicaoFavorita = (instituicaoId) => {
    if (!usuario) return;

    const updatedUser = { ...usuario };
    if (!updatedUser.instituicoesSalvas)
      updatedUser.instituicoesSalvas = [];

    const jaSalva = updatedUser.instituicoesSalvas.includes(instituicaoId);
    updatedUser.instituicoesSalvas = jaSalva
      ? updatedUser.instituicoesSalvas.filter((id) => id !== instituicaoId)
      : [...updatedUser.instituicoesSalvas, instituicaoId];

    atualizarPerfil(updatedUser); // ✅ centralizado
  };

  // 🔹 ADICIONAR ARQUIVO DO USUÁRIO
  const addUserFile = (file) => {
    if (!usuario || !file || !file.name) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const fileDataUrl = e.target.result;

      const updatedUser = {
        ...usuario,
        arquivos: [
          ...(usuario.arquivos || []),
          { name: file.name, type: file.type, dataUrl: fileDataUrl },
        ],
      };

      atualizarPerfil(updatedUser);
    };

    reader.readAsDataURL(file);
  };

  // 🔹 REMOVER ARQUIVO
  const removeUserFile = (index) => {
    if (!usuario?.arquivos) return;

    const updatedUser = { ...usuario };
    updatedUser.arquivos.splice(index, 1);

    atualizarPerfil(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        login,
        cadastro,
        logout,
        atualizarPerfil,
        toggleCursoFavorito,
        toggleInstituicaoFavorita,
        addUserFile,
        removeUserFile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado
export function useAuth() {
  return useContext(AuthContext);
}
