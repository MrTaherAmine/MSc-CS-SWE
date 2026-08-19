import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <section className="dashboard">
      <div className="dashboard-intro">
        <p className="eyebrow purple">Protected route</p>
        <h1>Welcome, {user.name}</h1>
        <p>
          Your authenticated BookSphere space is ready. Search the Open Library
          catalog and add recommendations from the dedicated search workflow.
        </p>
      </div>

      <div className="dashboard-grid">
        <article className="profile-card">
          <span className="avatar">
            {user.name.slice(0, 1).toUpperCase()}
          </span>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <span className="role-badge">{user.role}</span>
        </article>

        <article className="recommendation-form dashboard-cta">
          <p className="eyebrow purple">Phase 5</p>
          <h2>Your personalized feed is ready</h2>
          <p>
            Discover recommendations ranked using your preferences, ratings,
            likes, followed readers, and community activity.
          </p>
          <div className="dashboard-links">
            <Link className="primary-link" to="/feed">Open my personalized feed</Link>
            <Link className="secondary-link" to={`/profiles/${user.id}`}>View my reader profile</Link>
          </div>
        </article>
      </div>
    </section>
  );
}
