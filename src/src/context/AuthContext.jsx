// ./context/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  // Carrega usuário atual do localStorage
  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) setUsuario(JSON.parse(currentUser));
  }, []);

  // LOGIN
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
    };

    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    setUsuario(newUser);
    return { success: true };
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("currentUser");
    setUsuario(null);
  };

  // FAVORITAR / DESFAVORITAR
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

  return (
    <AuthContext.Provider
      value={{ usuario, login, cadastro, logout, toggleCursoFavorito }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook de acesso simples
export function useAuth() {
  return useContext(AuthContext);
}
