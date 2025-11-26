// middlewares/auth.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'chave_secreta';

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Token não enviado' });

  const token = authHeader.split(' ')[1]; // formato "Bearer <token>"
  if (!token) return res.status(401).json({ error: 'Token inválido' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // Verifica se é usuário ou instituição
    if (decoded.tipo === 'instituicao') {
      req.instituicao = decoded; // { id, email, tipo }
    } else {
      req.user = decoded; // { id, email, tipo }
    }

    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token expirado ou inválido' });
  }
}

module.exports = authMiddleware;
