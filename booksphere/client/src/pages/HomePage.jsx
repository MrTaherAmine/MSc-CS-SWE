import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { getHealth, getRecommendations } from '../services/api.js';

export default function HomePage() {
  const { authenticated } = useAuth();
  const [health, setHealth] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([getHealth(), getRecommendations()])
      .then(([healthData, recommendationData]) => {
        setHealth(healthData);
        setRecommendations(recommendationData.data || []);
      })
      .catch(loadError => setError(loadError.message));
  }, []);

  return (
    <>
      <section className="hero">
        <p className="eyebrow">BookSphere</p>
        <h1>Discover books worth talking about.</h1>
        <p>
          A social book recommendation platform for discovering, rating,
          recommending, and discussing books with other readers.
        </p>

        <div className="hero-actions">
          <Link className="hero-primary" to={authenticated ? '/dashboard' : '/register'}>
            {authenticated ? 'Open my library' : 'Join BookSphere'}
          </Link>
          {!authenticated && <Link className="hero-secondary" to="/login">Login</Link>}
        </div>

        <div className="status-row">
          <span>API: {health ? 'online' : error ? 'unavailable' : 'checking…'}</span>
          <span>MongoDB: {health?.database || 'checking…'}</span>
          <span>Phase 2 authentication</span>
        </div>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow purple">Community preview</p>
            <h2>Recent Recommendations</h2>
          </div>
          <strong>{recommendations.length}</strong>
        </div>

        {error && <p className="error">{error}</p>}

        {!error && recommendations.length === 0 && (
          <div className="empty">
            <h3>No recommendations yet</h3>
            <p>Register or log in to publish the first recommendation.</p>
          </div>
        )}

        <div className="grid">
          {recommendations.map(item => (
            <article className="card" key={item._id}>
              <span>{'★'.repeat(item.rating)}</span>
              <h3>{item.book?.title}</h3>
              <p>{item.book?.authors?.join(', ') || 'Unknown author'}</p>
              <blockquote>{item.recommendationText}</blockquote>
              <small>Recommended by {item.user?.name || 'BookSphere reader'}</small>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
