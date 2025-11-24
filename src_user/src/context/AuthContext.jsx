import { createContext, useContext, useState, useEffect } from "react";
import config from "../data/config.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (!storedUser) return null;

    const parsedUser = JSON.parse(storedUser);

    if (parsedUser && !Array.isArray(parsedUser.areasInteresse)) {
      parsedUser.areasInteresse = parsedUser.areasInteresse
        ? [parsedUser.areasInteresse]
        : [];
    }

    return parsedUser;
  });

  useEffect(() => {
    if (usuario) {
      localStorage.setItem("currentUser", JSON.stringify(usuario));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [usuario]);

  // 🔹 FUNÇÃO CENTRAL DE ATUALIZAÇÃO
  const atualizarPerfil = (novosDados) => {
    setUsuario((prev) => {
      const atualizado = {
        ...prev,
        ...novosDados,
        areasInteresse: Array.isArray(novosDados.areasInteresse)
          ? novosDados.areasInteresse
          : novosDados.areasInteresse
          ? [novosDados.areasInteresse]
          : prev?.areasInteresse || [],
      };

      localStorage.setItem("currentUser", JSON.stringify(atualizado));

      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const updatedUsers = users.map((u) =>
        u.id === atualizado.id ? atualizado : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      return atualizado;
    });
  };

  // 🔹 FUNÇÃO PARA ATUALIZAR USUÁRIO VIA API
  const refreshUser = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Usuário não autenticado");

    const resposta = await fetch(`${config.API_URL}/api/usuarios/me`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const data = await resposta.json();
    if (!resposta.ok) throw new Error(data.message || "Erro ao buscar usuário");

    if (!Array.isArray(data.areasInteresse)) {
      data.areasInteresse = data.areasInteresse ? [data.areasInteresse] : [];
    }

    setUsuario(data);
    localStorage.setItem("currentUser", JSON.stringify(data));
    return data;
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return null;
  }
};


  // 🔹 LOGIN
  const login = async ({ email, password }) => {
    try {
      const resposta = await fetch(`${config.API_URL}/api/usuarios/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha: password }),
      });

      const data = await resposta.json();

      localStorage.setItem("token", data.token); // se você usa JWT


      if (!resposta.ok) throw new Error(data.message || `Erro HTTP ${resposta.status}`);

      if (!Array.isArray(data.areasInteresse)) {
        data.areasInteresse = data.areasInteresse
          ? [data.areasInteresse]
          : [];
      }

      setUsuario(data);
      localStorage.setItem("currentUser", JSON.stringify(data));

      console.log("Usuário logado:", data);
      return { success: true };
    } catch (error) {
      console.error("Erro ao fazer login:", error.message);
      return { success: false, message: error.message };
    }
  };

  // 🔹 CADASTRO
  const cadastro = async ({ name, email, password }) => {
    try {
      const resposta = await fetch(`${config.API_URL}/api/usuarios/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: name, email, senha: password }),
      });

      const data = await resposta.json();
      if (!resposta.ok) throw new Error(data.message || `Erro HTTP ${resposta.status}`);

      console.log("Usuário cadastrado:", data);
      return { success: true };
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error.message);
      return { success: false, message: error.message };
    }
  };

  // 🔹 LOGOUT
  const logout = () => {
    localStorage.removeItem("currentUser");
    setUsuario(null);
  };

  // 🔹 FAVORITAR / DESFAVORITAR CURSO
  const toggleCursoFavorito = (cursoId) => {
    if (!usuario) return;
    const updatedUser = { ...usuario };
    updatedUser.cursosSalvos = updatedUser.cursosSalvos || [];
    updatedUser.cursosSalvos = updatedUser.cursosSalvos.includes(cursoId)
      ? updatedUser.cursosSalvos.filter((id) => id !== cursoId)
      : [...updatedUser.cursosSalvos, cursoId];
    atualizarPerfil(updatedUser);
  };

  // 🔹 FAVORITAR / DESFAVORITAR INSTITUIÇÃO
  const toggleInstituicaoFavorita = (instituicaoId) => {
    if (!usuario) return;
    const updatedUser = { ...usuario };
    updatedUser.instituicoesSalvas = updatedUser.instituicoesSalvas || [];
    updatedUser.instituicoesSalvas = updatedUser.instituicoesSalvas.includes(instituicaoId)
      ? updatedUser.instituicoesSalvas.filter((id) => id !== instituicaoId)
      : [...updatedUser.instituicoesSalvas, instituicaoId];
    atualizarPerfil(updatedUser);
  };

  // 🔹 ADD / REMOVE ARQUIVO DO USUÁRIO
  const addUserFile = (file) => {
    if (!usuario || !file || !file.name) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const fileDataUrl = e.target.result;
      const updatedUser = {
        ...usuario,
        arquivos: [...(usuario.arquivos || []), { name: file.name, type: file.type, dataUrl: fileDataUrl }],
      };
      atualizarPerfil(updatedUser);
    };
    reader.readAsDataURL(file);
  };

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
        refreshUser, // 🔹 agora incluído
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
