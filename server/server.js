import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

import leadsRoutes from './routes/leads.js';
import { authenticateToken } from './middleware/auth.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const ADMIN_EMAIL = 'admin@brightpath.local';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const JWT_SECRET = process.env.JWT_SECRET || 'brightpath-super-secret-jwt-key-2026';

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign(
      { id: 1, email: ADMIN_EMAIL, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '8h' }
    );
    
    return res.json({ token, user: { email: ADMIN_EMAIL, role: 'admin' } });
  }

  return res.status(401).json({ error: 'Invalid credentials' });
});

app.use('/api/leads', leadsRoutes);

app.get('/api/auth/verify', authenticateToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/brightpath';

const startServer = async () => {
  try {
    if (MONGODB_URI.includes('localhost')) {
      const mongoServer = await MongoMemoryServer.create();
      const uri = mongoServer.getUri();
      await mongoose.connect(uri);
      console.log('Connected to auto-provisioned in-memory MongoDB');
    } else {
      await mongoose.connect(MONGODB_URI);
      console.log('Connected to external MongoDB');
    }
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }

  app.listen(PORT, '127.0.0.1', () => {
    console.log(`Backend server running on http://127.0.0.1:${PORT}`);
  });
};

startServer();
