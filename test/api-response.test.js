import test from 'node:test';
import assert from 'node:assert/strict';
import { readJsonResponse } from '../src/utils/apiResponse.js';

test('reads JSON only from successful JSON responses', async () => {
  const response = new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
  assert.deepEqual(await readJsonResponse(response), { ok: true });
});

test('handles HTML errors without attempting JSON parsing', async () => {
  const response = new Response('<html>Content Too Large</html>', {
    status: 413,
    headers: { 'content-type': 'text/html' },
  });
  await assert.rejects(readJsonResponse(response, 'Lead import failed'), /Lead import failed \(413\)/);
});

test('rejects successful responses that are not JSON', async () => {
  const response = new Response('<html>Unexpected</html>', {
    status: 200,
    headers: { 'content-type': 'text/html' },
  });
  await assert.rejects(readJsonResponse(response), /unexpected response type/);
});
