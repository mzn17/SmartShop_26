const jwt = require('jsonwebtoken');

/**
 * Vérifie le token JWT envoyé dans l'en-tête Authorization: Bearer <token>.
 * Ajoute l'utilisateur décodé dans req.user.
 */
const protect = (req, res, next) => {
  const header = req.headers.authorization || '';

  if (!header.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Accès refusé : token manquant.' });
  }

  try {
    const token = header.split(' ')[1];
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Session expirée ou token invalide.' });
  }
};

module.exports = { protect };
