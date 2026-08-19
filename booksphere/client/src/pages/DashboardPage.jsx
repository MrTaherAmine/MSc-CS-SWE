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
          <p className="eyebrow purple">Phase 3</p>
          <h2>Find your next recommendation</h2>
          <p>
            Search by title, author, or genre. Select a book, add its
            description and your rating, then publish it to BookSphere.
          </p>
          <Link className="primary-link" to="/search">
            Search and recommend books
          </Link>
        </article>
      </div>
    </section>
  );
}
