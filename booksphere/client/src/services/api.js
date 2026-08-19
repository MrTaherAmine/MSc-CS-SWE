// Production uses the Express server on the same origin. During local
// development, Vite proxies /api requests to the backend on port 5000.
const API_URL = import.meta.env.VITE_API_URL || '/api';

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

export const getBookDetails = (bookId, options = {}) =>
  apiRequest(`/books/${bookId}`, options);

export const rateBook = (bookId, rating) =>
  apiRequest(`/books/${bookId}/rating`, {
    method: 'PUT',
    body: JSON.stringify({ rating })
  });

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

export const getPersonalizedFeed = ({ cursor, limit = 12 } = {}, options = {}) => {
  const params = new URLSearchParams({ limit: String(limit) });
  if (cursor) params.set('cursor', cursor);
  return apiRequest(`/feed?${params.toString()}`, options);
};

export const toggleRecommendationLike = recommendationId =>
  apiRequest(`/recommendations/${recommendationId}/like`, { method: 'PUT' });

export const getRecommendationComments = recommendationId =>
  apiRequest(`/recommendations/${recommendationId}/comments`);

export const addRecommendationComment = (recommendationId, body) =>
  apiRequest(`/recommendations/${recommendationId}/comments`, {
    method: 'POST',
    body: JSON.stringify({ body })
  });

export const recordRecommendationShare = recommendationId =>
  apiRequest(`/recommendations/${recommendationId}/share`, { method: 'POST' });

export const getUserProfile = (userId, options = {}) =>
  apiRequest(`/users/${userId}/profile`, options);

export const toggleUserFollow = userId =>
  apiRequest(`/users/${userId}/follow`, { method: 'PUT' });

export const updateMyPreferences = payload =>
  apiRequest('/users/me/preferences', {
    method: 'PATCH',
    body: JSON.stringify(payload)
  });
