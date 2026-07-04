import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/auth.js';

export const authenticateToken = (req, res, next) => {
  const header = req.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Access denied' });

  jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] }, (error, user) => {
    if (error) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};
