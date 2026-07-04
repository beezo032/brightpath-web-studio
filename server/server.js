import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import leadsRoutes from './routes/leads.js';
import templatesRoutes from './routes/templates.js';
import prospectorRoutes from './routes/prospector.js';
import { authenticateToken } from './middleware/auth.js';
import { loginLimiter } from './middleware/rateLimits.js';
import { ADMIN_EMAIL, ADMIN_PASSWORD_HASH, JWT_SECRET } from './config/auth.js';

export const app = express();
const PORT = process.env.PORT || 3001;

app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || 'https://www.signallightstudio.com' }));
app.use(express.json({ limit: '512kb' }));

app.post('/api/auth/login', loginLimiter, async (req, res) => {
  const { email, password } = req.body || {};
  if (typeof email !== 'string' || typeof password !== 'string' || !email || !password) return res.status(400).json({ error: 'Email and password are required' });
  const valid = email.toLowerCase() === ADMIN_EMAIL.toLowerCase() && await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: 1, email: ADMIN_EMAIL, role: 'admin' }, JWT_SECRET, { algorithm: 'HS256', expiresIn: '8h' });
  return res.json({ token, user: { email: ADMIN_EMAIL, role: 'admin' } });
});

app.get('/api/auth/verify', authenticateToken, (req, res) => res.json({ valid: true, user: req.user }));

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/signallightstudio';
let connectionPromise;
export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;
  if (mongoose.connection.readyState === 2 && connectionPromise) return connectionPromise;
  if (!process.env.VERCEL && MONGODB_URI.includes('localhost')) {
    const mongoServer = await MongoMemoryServer.create();
    connectionPromise = mongoose.connect(mongoServer.getUri());
  } else {
    if (process.env.VERCEL && !process.env.MONGODB_URI) throw new Error('Missing required environment variable: MONGODB_URI');
    connectionPromise = mongoose.connect(MONGODB_URI.trim(), { serverSelectionTimeoutMS: 5000 });
  }
  try { await connectionPromise; } catch (error) { connectionPromise = undefined; throw error; }
};

const requireDB = async (_req, res, next) => {
  try { await connectDB(); next(); } catch (error) {
    const safeMessage = String(error.message).replace(/mongodb(?:\+srv)?:\/\/[^@\s]+@/gi, 'mongodb://[credentials]@');
    process.stderr.write(`Database connection failed: ${error.name} ${error.code || ''} ${safeMessage}\n`);
    res.status(503).json({ error: 'Database unavailable', code: 'DATABASE_UNAVAILABLE' });
  }
};

app.use('/api/leads', requireDB, leadsRoutes);
app.use('/api/templates', requireDB, templatesRoutes);
app.use('/api/prospector', prospectorRoutes);

app.use('/api', (_req, res) => res.status(404).json({ error: 'API route not found' }));
app.use((error, req, res, next) => {
  if (!req.path.startsWith('/api') || res.headersSent) return next(error);
  if (error.type === 'entity.too.large') return res.status(413).json({ error: 'Request body is too large' });
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) return res.status(400).json({ error: 'Invalid JSON body' });
  return res.status(error.status || 500).json({ error: 'API request failed' });
});

if (!process.env.VERCEL && process.env.NODE_ENV !== 'test') {
  connectDB().then(() => app.listen(PORT, '127.0.0.1')).catch((error) => {
    process.stderr.write(`Backend startup failed: ${error.message}\n`);
    process.exitCode = 1;
  });
}

export default app;
