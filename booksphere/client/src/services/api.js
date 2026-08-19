const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export async function getHealth() {
  const response = await fetch(`${API_URL}/health`);
  if (!response.ok) throw new Error('Unable to reach the BookSphere API.');
  return response.json();
}
export async function getRecommendations() {
  const response = await fetch(`${API_URL}/recommendations`);
  if (!response.ok) throw new Error('Unable to load recommendations.');
  return response.json();
}
