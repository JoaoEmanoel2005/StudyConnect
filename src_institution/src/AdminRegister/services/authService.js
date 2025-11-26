export const AuthService = {
  register(data) {
    // Simples: só há 1 admin salvo
    localStorage.setItem("adminUser", JSON.stringify(data));
  },

  getUser() {
    const user = localStorage.getItem("adminUser");
    return user ? JSON.parse(user) : null;
  },

  login(email, hashedPassword) {
  const user = this.getUser();
  if (!user) return { success: false, message: "Nenhum usuário cadastrado." };

  if (user.email === email && user.password === hashedPassword) {
    localStorage.setItem("adminLoggedIn", "true");
    return { success: true };
  }

  return { success: false, message: "Credenciais inválidas." };
},

  logout() {
    localStorage.removeItem("adminLoggedIn");
  },

  isAuthenticated() {
    return localStorage.getItem("adminLoggedIn") === "true";
  }
};
