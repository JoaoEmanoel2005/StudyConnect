import { createContext, useState, useEffect, useContext } from "react";
import config from "../data/config.js";


const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  // Carrega usuário atual do localStorage
  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) setUsuario(JSON.parse(currentUser));
  }, []);

  // LOGIN

  //login base

  
  
  const login = ({ email, password }) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u) => u.email === email && u.password === password);
    
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      setUsuario(user);
      return { success: true };
    } else {
      return { success: false, message: "Usuário ou senha inválidos" };
  }
  };


  
  

  // CADASTRO

  //cadastro base

  /*
  const cadastro = ({ name, email, password }) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    
    if (users.some((u) => u.email === email)) {
      return { success: false, message: "Email já cadastrado" };
    }
    
    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      cursosSalvos: [],
      instituicoesSalvas: [], // novo campo
    };
    
    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    setUsuario(newUser);
    return { success: true };
  };
  
  */
  
async function cadastro({ name, email, password }) {
  try {
    const resposta = await fetch(`${config.API_URL}/api/usuarios/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: name,
        email: email,
        senha: password
      })
    });

    // Verifica se a resposta foi bem-sucedida
    if (!resposta.ok) {
      const erro = await resposta.json();
      throw new Error(erro.message || `Erro HTTP ${resposta.status}`);
    }

    const data = await resposta.json();
    console.log("Usuário cadastrado:", data);
    return { success: true };

  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error.message);
    return null;
  }
}

  
  // LOGOUT
  const logout = () => {
    localStorage.removeItem("currentUser");
    setUsuario(null);
  };

  // FAVORITAR / DESFAVORITAR CURSO
  const toggleCursoFavorito = (cursoId) => {
    if (!usuario) return;

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUser = { ...usuario };

    if (!updatedUser.cursosSalvos) updatedUser.cursosSalvos = [];

    const jaSalvo = updatedUser.cursosSalvos.includes(cursoId);
    updatedUser.cursosSalvos = jaSalvo
      ? updatedUser.cursosSalvos.filter((id) => id !== cursoId)
      : [...updatedUser.cursosSalvos, cursoId];

    // Atualiza estado e armazenamento
    setUsuario(updatedUser);
    const updatedUsers = users.map((u) =>
      u.id === updatedUser.id ? updatedUser : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
  };

  // FAVORITAR / DESFAVORITAR INSTITUIÇÃO
  const toggleInstituicaoFavorita = (instituicaoId) => {
    if (!usuario) return;

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUser = { ...usuario };

    if (!updatedUser.instituicoesSalvas) updatedUser.instituicoesSalvas = [];

    const jaSalva = updatedUser.instituicoesSalvas.includes(instituicaoId);
    updatedUser.instituicoesSalvas = jaSalva
      ? updatedUser.instituicoesSalvas.filter((id) => id !== instituicaoId)
      : [...updatedUser.instituicoesSalvas, instituicaoId];

    // Atualiza estado e armazenamento
    setUsuario(updatedUser);
    const updatedUsers = users.map((u) =>
      u.id === updatedUser.id ? updatedUser : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        login,
        cadastro,
        logout,
        toggleCursoFavorito,
        toggleInstituicaoFavorita, // novo valor exportado
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook de acesso simples
export function useAuth() {
  return useContext(AuthContext);
}
