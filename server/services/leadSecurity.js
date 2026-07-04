import crypto from 'crypto';

const LIMITS = { businessName: 120, industry: 100, city: 100, state: 50, websiteUrl: 500, email: 254, phone: 40, notes: 4000 };
const allowedStatuses = new Set(['New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost']);
const recentSubmissions = new Map();
const REPLAY_WINDOW_MS = 10 * 60 * 1000;

const cleanString = (body, field, required = false) => {
  const value = body[field];
  if (value == null || value === '') {
    if (required) throw new Error(`${field} is required`);
    return undefined;
  }
  if (typeof value !== 'string') throw new Error(`${field} must be a string`);
  const clean = value.trim();
  if (clean.length > LIMITS[field]) throw new Error(`${field} is too long`);
  return clean;
};

export const normalizeLead = (body) => {
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error('Invalid request body');
  if (body.companyWebsite || body.website_confirm) throw new Error('Spam submission rejected');
  const lead = {
    businessName: cleanString(body, 'businessName', true), industry: cleanString(body, 'industry'),
    city: cleanString(body, 'city'), state: cleanString(body, 'state'), websiteUrl: cleanString(body, 'websiteUrl'),
    email: cleanString(body, 'email'), phone: cleanString(body, 'phone'), notes: cleanString(body, 'notes'),
  };
  if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) throw new Error('email is invalid');
  if (lead.websiteUrl) {
    let url;
    try { url = new URL(lead.websiteUrl); } catch { throw new Error('websiteUrl is invalid'); }
    if (!['http:', 'https:'].includes(url.protocol)) throw new Error('websiteUrl must use http or https');
    lead.websiteUrl = url.toString();
  }
  if (body.estimatedValue != null) {
    const value = Number(body.estimatedValue);
    if (!Number.isFinite(value) || value < 0 || value > 1_000_000) throw new Error('estimatedValue is invalid');
    lead.estimatedValue = value;
  }
  if (body.contactStatus != null) {
    if (!allowedStatuses.has(body.contactStatus)) throw new Error('contactStatus is invalid');
    lead.contactStatus = body.contactStatus;
  }
  return Object.fromEntries(Object.entries(lead).filter(([, value]) => value !== undefined));
};

export const claimSubmission = (lead) => {
  const now = Date.now();
  for (const [key, timestamp] of recentSubmissions) if (now - timestamp > REPLAY_WINDOW_MS) recentSubmissions.delete(key);
  const key = crypto.createHash('sha256').update(JSON.stringify(lead)).digest('hex');
  if (recentSubmissions.has(key)) return false;
  recentSubmissions.set(key, now);
  return true;
};

export const escapeHtml = (value = '') => String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]);

export const safeHttpUrl = (value) => {
  if (!value) return null;
  try { const url = new URL(value); return ['http:', 'https:'].includes(url.protocol) ? url.toString() : null; } catch { return null; }
};
