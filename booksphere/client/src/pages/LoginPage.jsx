import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await login(form);
      navigate(location.state?.from || '/dashboard', { replace: true });
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="auth-shell">
      <form className="auth-card" onSubmit={submit}>
        <span className="auth-brand-mark" aria-hidden="true">B</span>
        <p className="eyebrow purple">Welcome back</p>
        <h1>Login to BookSphere</h1>
        <p className="muted">
          Continue discovering and recommending books with your community.
        </p>

        {error ? <div className="form-error" role="alert">{error}</div> : null}

        <label>
          Email
          <input
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={event => setForm({ ...form, email: event.target.value })}
          />
        </label>

        <label>
          Password
          <input
            type="password"
            required
            minLength="8"
            autoComplete="current-password"
            value={form.password}
            onChange={event => setForm({ ...form, password: event.target.value })}
          />
        </label>

        <button className="primary-button" disabled={submitting}>
          {submitting ? 'Signing in…' : 'Login'}
        </button>

        <p className="auth-switch">
          New to BookSphere? <Link to="/register">Create an account</Link>
        </p>
      </form>
    </section>
  );
}
