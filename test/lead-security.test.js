import test from 'node:test';
import assert from 'node:assert/strict';
import nodemailer from 'nodemailer';
import { claimSubmission, escapeHtml, normalizeLead, safeHttpUrl } from '../server/services/leadSecurity.js';

test('lead schema rejects honeypots, unsafe URLs, and oversized values', () => {
  assert.throws(() => normalizeLead({ businessName: 'Bot', companyWebsite: 'filled' }), /Spam/);
  assert.throws(() => normalizeLead({ businessName: 'Test', websiteUrl: 'javascript:alert(1)' }), /http or https/);
  assert.throws(() => normalizeLead({ businessName: 'x'.repeat(121) }), /too long/);
});

test('lead schema normalizes safe values and duplicate claims are blocked', () => {
  const lead = normalizeLead({ businessName: ' Studio ', email: 'hello@example.com', websiteUrl: 'https://example.com' });
  assert.equal(lead.businessName, 'Studio');
  assert.equal(safeHttpUrl(lead.websiteUrl), 'https://example.com/');
  assert.equal(claimSubmission(lead), true);
  assert.equal(claimSubmission(lead), false);
});

test('HTML escaping neutralizes active markup', () => assert.equal(escapeHtml('<img src=x>'), '&lt;img src=x&gt;'));

test('Nodemailer 9 sends HTML with file and URL access disabled', async () => {
  const transport = nodemailer.createTransport({ streamTransport: true, buffer: true, disableFileAccess: true, disableUrlAccess: true });
  const result = await transport.sendMail({ from: 'from@example.com', to: 'to@example.com', subject: 'Test', html: '<p>Safe</p>', disableFileAccess: true, disableUrlAccess: true });
  assert.match(result.message.toString(), /Safe/);
});
