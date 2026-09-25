/**
 * Base API client with local mock fallback and error handling
 */

export const apiClient = {
  async get(endpoint) {
    try {
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn(`[apiClient.get] ${endpoint} failed, continuing gracefully:`, err);
      return null;
    }
  },

  async post(endpoint, data) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn(`[apiClient.post] ${endpoint} failed:`, err);
      throw err;
    }
  },
};

export default apiClient;
