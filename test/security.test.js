import test from 'node:test';
import assert from 'node:assert/strict';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const VALID_PASSWORD = 'Correct-Horse-Battery-Staple-2026!';
process.env.NODE_ENV = 'test';
process.env.ADMIN_EMAIL = 'admin@example.com';
process.env.ADMIN_PASSWORD_HASH = bcrypt.hashSync(VALID_PASSWORD, 12);
process.env.JWT_SECRET = 'test-only-rotated-secret-with-more-than-32-characters';
process.env.ALLOWED_ORIGIN = 'https://www.signallightstudio.com';

const { app } = await import('../server/server.js');

const withServer = async (run) => {
  const server = app.listen(0, '127.0.0.1');
  await new Promise((resolve) => server.once('listening', resolve));
  try { await run(`http://127.0.0.1:${server.address().port}`); } finally { await new Promise((resolve) => server.close(resolve)); }
};

test('default credentials fail and legitimate bcrypt credentials work', async () => withServer(async (base) => {
  const defaults = await fetch(`${base}/api/auth/login`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email: 'admin@signallightstudio.local', password: 'admin123' }) });
  assert.equal(defaults.status, 401);
  const valid = await fetch(`${base}/api/auth/login`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email: process.env.ADMIN_EMAIL, password: VALID_PASSWORD }) });
  assert.equal(valid.status, 200);
}));

test('JWT signed with retired fallback secret is rejected', async () => withServer(async (base) => {
  const forged = jwt.sign({ role: 'admin' }, 'signallightstudio-super-secret-jwt-key-2026');
  const response = await fetch(`${base}/api/auth/verify`, { headers: { authorization: `Bearer ${forged}` } });
  assert.equal(response.status, 403);
}));

test('login attempts are rate limited', async () => withServer(async (base) => {
  let response;
  for (let index = 0; index < 6; index += 1) response = await fetch(`${base}/api/auth/login`, { method: 'POST', headers: { 'content-type': 'application/json', 'x-forwarded-for': '203.0.113.50' }, body: JSON.stringify({ email: 'bad@example.com', password: 'wrong' }) });
  assert.equal(response.status, 429);
}));

test('API payload limits and parser failures return JSON', async () => withServer(async (base) => {
  const acceptedPayload = await fetch(`${base}/api/prospector/search`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ padding: 'x'.repeat(40 * 1024) }),
  });
  assert.equal(acceptedPayload.status, 401);
  assert.match(acceptedPayload.headers.get('content-type'), /application\/json/);

  const oversizedPayload = await fetch(`${base}/api/prospector/search`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ padding: 'x'.repeat(600 * 1024) }),
  });
  assert.equal(oversizedPayload.status, 413);
  assert.match(oversizedPayload.headers.get('content-type'), /application\/json/);
  assert.equal((await oversizedPayload.json()).error, 'Request body is too large');

  const missingRoute = await fetch(`${base}/api/not-a-route`);
  assert.equal(missingRoute.status, 404);
  assert.match(missingRoute.headers.get('content-type'), /application\/json/);
  assert.equal((await missingRoute.json()).error, 'API route not found');
}));
