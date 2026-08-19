const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Request failed.');
  }

  return data;
}

export const getHealth = () => apiRequest('/health');
export const getRecommendations = () => apiRequest('/recommendations');

export const searchBooks = ({ query, type = 'all' }) => {
  const params = new URLSearchParams({
    q: query,
    type
  });

  return apiRequest(`/books/search?${params.toString()}`);
};

export const registerUser = payload =>
  apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload)
  });

export const loginUser = payload =>
  apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload)
  });

export const logoutUser = () =>
  apiRequest('/auth/logout', {
    method: 'POST'
  });

export const getCurrentUser = () => apiRequest('/auth/me');

export const createRecommendation = payload =>
  apiRequest('/recommendations', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
