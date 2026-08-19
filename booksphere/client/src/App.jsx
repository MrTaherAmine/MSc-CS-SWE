import { useEffect, useState } from 'react';
import { getHealth, getRecommendations } from './services/api.js';
import './styles.css';

export default function App() {
  const [health, setHealth] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const [healthData, recommendationData] = await Promise.all([getHealth(), getRecommendations()]);
        setHealth(healthData);
        setRecommendations(recommendationData.data || []);
      } catch (loadError) { setError(loadError.message); }
    }
    load();
  }, []);

  return <main className="page">
    <section className="hero">
      <p className="eyebrow">BookSphere</p>
      <h1>Discover books worth talking about.</h1>
      <p>A social book recommendation platform for discovering, rating, recommending, and discussing books with other readers.</p>
      <div className="status-row">
        <span>API: {health ? 'online' : error ? 'unavailable' : 'checking…'}</span>
        <span>MongoDB: {health?.database || 'checking…'}</span>
        <span>Phase 1 foundation</span>
      </div>
    </section>

    <section className="panel">
      <div className="panel-heading"><div><p className="eyebrow">Foundation Preview</p><h2>Book Recommendations</h2></div><strong>{recommendations.length}</strong></div>
      {error && <p className="error">{error}</p>}
      {!error && recommendations.length === 0 && <div className="empty"><h3>No recommendations yet</h3><p>The MongoDB schema and API are ready. Run the included seed script or add data through the API.</p></div>}
      <div className="grid">
        {recommendations.map(item => <article className="card" key={item._id}><span>{'★'.repeat(item.rating)}</span><h3>{item.book?.title}</h3><p>{item.book?.authors?.join(', ') || 'Unknown author'}</p><blockquote>{item.recommendationText}</blockquote></article>)}
      </div>
    </section>
  </main>;
}
