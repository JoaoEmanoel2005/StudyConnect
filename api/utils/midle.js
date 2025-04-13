const jwt = require('jsonwebtoken');

// Middleware para verificar o token JWT
const verificarToken = (req, res, next) => {
  // Pega o token do cabeçalho Authorization
  const token = req.headers['authorization'];

  // Se não houver token, retorna erro
  if (!token) {
    return res.status(403).send({ message: 'Token não fornecido!' });
  }

  // Tira o prefixo 'Bearer ' caso ele esteja presente
  const tokenSemPrefixo = token.startsWith('Bearer ') ? token.slice(7) : token;

  // Verifica se o token é válido
  jwt.verify(tokenSemPrefixo, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Token inválido ou expirado!' });
    }

    // Adiciona as informações do usuário ao objeto req para que possam ser usadas nas rotas seguintes
    req.userId = decoded.id;
    next(); // Chama a próxima função de rota
  });
};

// Exporta o middleware
module.exports = { verificarToken };
