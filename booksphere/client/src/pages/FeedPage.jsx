import { useEffect, useState } from 'react';
import FeedCard from '../components/FeedCard.jsx';
import { getPersonalizedFeed } from '../services/api.js';
import LoadingState from '../components/LoadingState.jsx';

export default function FeedPage() {
  const [items, setItems] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    getPersonalizedFeed({}, { signal: controller.signal })
      .then(response => {
        setItems(response.data || []);
        setNextCursor(response.nextCursor || null);
      })
      .catch(loadError => {
        if (loadError.name !== 'AbortError') setError(loadError.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, []);

  function updateItem(itemId, patch) {
    setItems(current => current.map(item =>
      item._id === itemId ? { ...item, ...patch } : item
    ));
  }

  async function loadMore() {
    if (!nextCursor || loadingMore) return;
    setLoadingMore(true);
    setError('');

    try {
      const response = await getPersonalizedFeed({ cursor: nextCursor });
      setItems(current => [...current, ...(response.data || [])]);
      setNextCursor(response.nextCursor || null);
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setLoadingMore(false);
    }
  }

  if (loading) return <LoadingState label="Building your personal feed…" />;

  return (
    <section className="feed-page">
      <div className="feed-intro">
        <div>
          <p className="eyebrow purple">Personalized for you</p>
          <h1>Your BookSphere feed</h1>
          <p>
            Recommendations ranked using your favorite genres, likes, ratings,
            followed readers, community engagement, and recent activity.
          </p>
        </div>
        <span className="algorithm-badge">Explainable recommendations</span>
      </div>

      {error ? <p className="error">{error}</p> : null}

      {items.length ? (
        <div className="feed-list">
          {items.map(item => (
            <FeedCard
              key={item._id}
              recommendation={item}
              onChange={patch => updateItem(item._id, patch)}
            />
          ))}
        </div>
      ) : (
        <div className="empty feed-empty">
          <h2>Your feed is ready for more readers</h2>
          <p>
            Add recommendations or follow other readers. BookSphere will use
            those interactions to personalize this space.
          </p>
        </div>
      )}

      {nextCursor ? (
        <button className="load-more" disabled={loadingMore} onClick={loadMore}>
          {loadingMore ? 'Loading…' : 'Load more recommendations'}
        </button>
      ) : null}
    </section>
  );
}
