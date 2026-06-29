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
import templatesRoutes from './routes/templates.js';
import prospectorRoutes from './routes/prospector.js';
import { authenticateToken } from './middleware/auth.js';

export const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const ADMIN_EMAIL = 'admin@signallightstudio.local';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const JWT_SECRET = process.env.JWT_SECRET || 'signallightstudio-super-secret-jwt-key-2026';

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

app.get('/api/auth/verify', authenticateToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});

// Database connection middleware (only for routes that need the database)
const requireDB = async (req, res, next) => {
  if (process.env.VERCEL) {
    try {
      await connectDB();
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
  next();
};

app.use('/api/leads', requireDB, leadsRoutes);
app.use('/api/templates', requireDB, templatesRoutes);
app.use('/api/prospector', prospectorRoutes);

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/signallightstudio';

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  
  if (MONGODB_URI.includes('localhost') || !process.env.VERCEL) {
    // Only use memory server locally, NEVER on Vercel
    if (!process.env.VERCEL && MONGODB_URI.includes('localhost')) {
      try {
        const mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);
        console.log('Connected to auto-provisioned in-memory MongoDB');
      } catch (err) {
        console.error('Local memory server error:', err);
      }
    } else {
      await mongoose.connect(MONGODB_URI);
      console.log('Connected to external MongoDB (Local)');
    }
  } else {
    // Vercel Serverless Connection
    if (!process.env.MONGODB_URI) {
      throw new Error('CRITICAL ERROR: MONGODB_URI environment variable is completely missing or not checked for Production in Vercel.');
    }
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000 // fail fast in 5 seconds instead of 30
      });
      console.log('Connected to Vercel MongoDB Atlas');
    } catch (err) {
      throw new Error(`Failed to connect to MongoDB Atlas. Check your username/password and IP settings. Exact Error: ${err.message}`);
    }
  }
};

const startLocalServer = async () => {
  await connectDB();
  app.listen(PORT, '127.0.0.1', () => {
    console.log(`Backend server running on http://127.0.0.1:${PORT}`);
  });
};

// Only bind to port if running locally
if (!process.env.VERCEL) {
  startLocalServer();
}

export default app;

