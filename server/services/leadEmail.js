import nodemailer from 'nodemailer';
import { escapeHtml, safeHttpUrl } from './leadSecurity.js';

export const createLeadTransport = () => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) throw new Error('SMTP is not configured');
  const port = Number(SMTP_PORT) || 587;
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    disableFileAccess: true,
    disableUrlAccess: true,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
};

export const sendLeadEmail = async (lead, transport) => {
  if (process.env.LEAD_EMAIL_DISABLED === 'true') return { skipped: true };
  const mailer = transport || createLeadTransport();
  const website = safeHttpUrl(lead.websiteUrl);
  return mailer.sendMail({
    from: `"Signal Light Studio Alerts" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_TO || 'hello@signallightstudio.com',
    subject: `New Lead: ${String(lead.businessName).replace(/[\r\n]/g, ' ')}`,
    disableFileAccess: true,
    disableUrlAccess: true,
    html: `<h2>New Lead Submission</h2><table><tr><th>Business</th><td>${escapeHtml(lead.businessName)}</td></tr><tr><th>Industry</th><td>${escapeHtml(lead.industry || 'N/A')}</td></tr><tr><th>Email</th><td>${escapeHtml(lead.email || 'N/A')}</td></tr><tr><th>Phone</th><td>${escapeHtml(lead.phone || 'N/A')}</td></tr><tr><th>Website</th><td>${website ? `<a href="${escapeHtml(website)}">${escapeHtml(website)}</a>` : 'N/A'}</td></tr><tr><th>Notes</th><td>${escapeHtml(lead.notes || 'N/A')}</td></tr></table>`,
  });
};
