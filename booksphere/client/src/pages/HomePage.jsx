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
        <div className="hero-copy">
          <p className="eyebrow">A community built around books</p>
          <h1>Find your next <em>great read.</em></h1>
          <p>
            Discover thoughtful recommendations, rate what you read, and build
            a personal feed shaped by readers you trust.
          </p>

          <div className="hero-actions">
            <Link className="hero-primary" to={authenticated ? '/feed' : '/register'}>
              {authenticated ? 'Open my personal feed' : 'Start discovering'}
            </Link>
            <Link className="hero-secondary" to="/search">Browse the catalog</Link>
          </div>

          <div className="status-row" aria-label="Application status">
            <span><i className={health ? 'status-dot online' : 'status-dot'} /> API {health ? 'online' : error ? 'unavailable' : 'checking'}</span>
            <span>Powered by Open Library</span>
            <span>Personalized for every reader</span>
          </div>
        </div>

        <div className="hero-visual" aria-label="BookSphere community preview">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <div className="book-stack" aria-hidden="true">
            <span className="book-spine spine-one">IDEAS</span>
            <span className="book-spine spine-two">STORIES</span>
            <span className="book-spine spine-three">WORLDS</span>
          </div>
          <div className="floating-review">
            <span>★★★★★</span>
            <strong>“A reader’s recommendation changed my list.”</strong>
            <small>BookSphere community</small>
          </div>
          <div className="floating-readers">
            <span>T</span><span>A</span><span>R</span><strong>+ readers</strong>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow purple">Community preview</p>
            <h2>Fresh from the community</h2>
          </div>
          <strong>{recommendations.length}</strong>
        </div>

        {error ? <p className="error">Community recommendations are temporarily unavailable. You can still explore the catalog.</p> : null}

        {!error && recommendations.length === 0 ? (
          <div className="empty">
            <h3>No recommendations yet</h3>
            <p>Register or log in to publish the first recommendation.</p>
          </div>
        ) : null}

        <div className="grid">
          {recommendations.map(item => (
            <article className="card recommendation-card" key={item._id}>
              <div className="recommendation-card-top">
                <div className="mini-cover">
                  {item.book?.coverUrl ? <img src={item.book.coverUrl} alt="" /> : <span aria-hidden="true">B</span>}
                </div>
                <div>
                  <span className="card-stars">{'★'.repeat(item.rating)}</span>
                  <h3>{item.book?.title}</h3>
                  <p>{item.book?.authors?.join(', ') || 'Unknown author'}</p>
                </div>
              </div>
              <blockquote>{item.recommendationText}</blockquote>
              <footer>
                <small>By {item.user?.name || 'BookSphere reader'}</small>
                {item.book?._id ? (
                  <Link className="card-link" to={`/books/${item.book._id}`} aria-label={`View details for ${item.book.title}`}>
                    View book <span aria-hidden="true">→</span>
                  </Link>
                ) : null}
              </footer>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
