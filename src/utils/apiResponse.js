const isJsonResponse = (response) => response.headers.get('content-type')?.toLowerCase().includes('application/json');

export const readJsonResponse = async (response, fallbackMessage = 'Request failed') => {
  if (!response.ok) {
    let message = `${fallbackMessage} (${response.status})`;
    const body = await response.text();
    if (isJsonResponse(response) && body) {
      try { message = JSON.parse(body).error || message; } catch { /* use the status fallback */ }
    }
    throw new Error(message);
  }

  if (response.status === 204) return null;
  if (!isJsonResponse(response)) throw new Error(`Server returned an unexpected response type (${response.status})`);
  return response.json();
};
