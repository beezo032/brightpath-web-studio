import dotenv from 'dotenv';

dotenv.config();

const required = (name) => {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
};

export const ADMIN_EMAIL = required('ADMIN_EMAIL');
export const ADMIN_PASSWORD_HASH = required('ADMIN_PASSWORD_HASH');
export const JWT_SECRET = required('JWT_SECRET');

if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ADMIN_EMAIL)) throw new Error('ADMIN_EMAIL must be a valid email address');
const bcryptMatch = ADMIN_PASSWORD_HASH.match(/^\$2[aby]\$(\d{2})\$[./A-Za-z0-9]{53}$/);
if (!bcryptMatch) throw new Error('ADMIN_PASSWORD_HASH must be a bcrypt hash');
if (Number(bcryptMatch[1]) < 12) throw new Error('ADMIN_PASSWORD_HASH must use a bcrypt cost of at least 12');
if (JWT_SECRET.length < 32 || JWT_SECRET === 'signallightstudio-super-secret-jwt-key-2026') throw new Error('JWT_SECRET must be unique and at least 32 characters');
