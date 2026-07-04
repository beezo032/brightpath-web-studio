import { rateLimit } from 'express-rate-limit';

const base = { standardHeaders: 'draft-8', legacyHeaders: false };

export const loginLimiter = rateLimit({
  ...base,
  windowMs: 15 * 60 * 1000,
  limit: 5,
  message: { error: 'Too many login attempts. Try again later.' },
});

export const leadLimiter = rateLimit({
  ...base,
  windowMs: 15 * 60 * 1000,
  limit: 5,
  message: { error: 'Too many submissions. Try again later.' },
});
