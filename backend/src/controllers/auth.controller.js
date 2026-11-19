const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const httpError = require('../utils/httpError');

const signToken = (user) =>
  jwt.sign(
    { id: user.id, role: user.role, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );

/**
 * POST /api/auth/login
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw httpError(400, 'Email et mot de passe obligatoires.');
  }

  const user = await User.findOne({ email: String(email).trim().toLowerCase() }).select(
    '+passwordHash'
  );

  if (!user || !user.active) {
    throw httpError(401, 'Email ou mot de passe incorrect.');
  }

  const valid = await user.comparePassword(password);
  if (!valid) {
    throw httpError(401, 'Email ou mot de passe incorrect.');
  }

  res.json({
    success: true,
    token: signToken(user),
    user: user.toJSON(),
  });
});

/**
 * GET /api/auth/me
 */
const me = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) throw httpError(401, 'Compte introuvable ou supprimé.');
  res.json({ success: true, data: user.toJSON() });
});

/**
 * POST /api/auth/logout
 * Le JWT est stateless : la déconnexion consiste à supprimer le token côté client.
 */
const logout = asyncHandler(async (_req, res) => {
  res.json({ success: true, message: 'Déconnexion effectuée.' });
});

module.exports = { login, me, logout };
