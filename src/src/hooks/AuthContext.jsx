// AuthContext.jsx
import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) setUsuario(JSON.parse(currentUser));
  }, []);

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

  const logout = () => {
    localStorage.removeItem("currentUser");
    setUsuario(null);
  };

  const toggleCursoFavorito = (cursoId) => {
    if (!usuario) return;

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUser = { ...usuario };

    if (!updatedUser.cursosSalvos) updatedUser.cursosSalvos = [];

    if (updatedUser.cursosSalvos.includes(cursoId)) {
      updatedUser.cursosSalvos = updatedUser.cursosSalvos.filter((id) => id !== cursoId);
    } else {
      updatedUser.cursosSalvos.push(cursoId);
    }

    setUsuario(updatedUser);

    const otherUsers = users.filter((u) => u.id !== updatedUser.id);
    localStorage.setItem("users", JSON.stringify([...otherUsers, updatedUser]));
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ usuario, login, cadastro, logout, toggleCursoFavorito }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para acessar o contexto
export function useAuth() {
  return useContext(AuthContext);
}
