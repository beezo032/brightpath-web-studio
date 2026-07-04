import assert from 'node:assert/strict';
import nodemailer from 'nodemailer';
import { sendLeadEmail } from '../server/services/leadEmail.js';

const lead = {
  businessName: 'Signal Light SMTP QA',
  industry: 'Quality assurance',
  email: 'qa@example.com',
  phone: '555-0100',
  websiteUrl: 'https://example.com',
  notes: 'Safe SMTP verification message',
};

if (process.argv.includes('--live')) {
  if (!process.env.SMTP_TEST_TO) throw new Error('SMTP_TEST_TO is required for a live test');
  process.env.SMTP_TO = process.env.SMTP_TEST_TO;
  const result = await sendLeadEmail(lead);
  console.log(`LIVE_SMTP_SUCCESS messageId=${result.messageId}`);
} else {
  process.env.SMTP_USER ||= 'qa@signallightstudio.com';
  process.env.SMTP_TO ||= 'qa@example.com';
  const stream = nodemailer.createTransport({
    streamTransport: true,
    buffer: true,
    disableFileAccess: true,
    disableUrlAccess: true,
  });
  const success = await sendLeadEmail(lead, stream);
  assert.match(success.message.toString(), /New Lead Submission/);
  console.log('SIMULATED_SMTP_SUCCESS notification generated');

  const forcedFailure = { sendMail: async () => { throw new Error('forced SMTP failure'); } };
  await assert.rejects(sendLeadEmail(lead, forcedFailure), /forced SMTP failure/);
  console.log('SIMULATED_SMTP_FAILURE accurately rejected');
}
