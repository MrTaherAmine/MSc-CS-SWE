import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { createRecommendation } from '../services/api.js';

export default function DashboardPage() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    title: '',
    author: '',
    recommendationText: '',
    rating: '5'
  });
  const [status, setStatus] = useState('');

  async function submit(event) {
    event.preventDefault();
    setStatus('');

    try {
      await createRecommendation({
        book: {
          title: form.title,
          authors: form.author ? [form.author] : [],
          source: 'manual'
        },
        recommendationText: form.recommendationText,
        rating: Number(form.rating)
      });

      setForm({
        title: '',
        author: '',
        recommendationText: '',
        rating: '5'
      });
      setStatus('Recommendation published successfully.');
    } catch (error) {
      setStatus(error.message);
    }
  }

  return (
    <section className="dashboard">
      <div className="dashboard-intro">
        <p className="eyebrow purple">Protected route</p>
        <h1>Welcome, {user.name}</h1>
        <p>This page is available only to authenticated BookSphere users.</p>
      </div>

      <div className="dashboard-grid">
        <article className="profile-card">
          <span className="avatar">{user.name.slice(0, 1).toUpperCase()}</span>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <span className="role-badge">{user.role}</span>
        </article>

        <form className="recommendation-form" onSubmit={submit}>
          <h2>Add a recommendation</h2>

          <label>
            Book title
            <input
              required
              value={form.title}
              onChange={event => setForm({ ...form, title: event.target.value })}
            />
          </label>

          <label>
            Author
            <input
              value={form.author}
              onChange={event => setForm({ ...form, author: event.target.value })}
            />
          </label>

          <label>
            Recommendation
            <textarea
              required
              minLength="3"
              rows="5"
              value={form.recommendationText}
              onChange={event =>
                setForm({ ...form, recommendationText: event.target.value })
              }
            />
          </label>

          <label>
            Rating
            <select
              value={form.rating}
              onChange={event => setForm({ ...form, rating: event.target.value })}
            >
              <option value="5">5 — Excellent</option>
              <option value="4">4 — Very good</option>
              <option value="3">3 — Good</option>
              <option value="2">2 — Fair</option>
              <option value="1">1 — Poor</option>
            </select>
          </label>

          <button className="primary-button">Publish recommendation</button>
          {status && <p className="form-status">{status}</p>}
        </form>
      </div>
    </section>
  );
}
