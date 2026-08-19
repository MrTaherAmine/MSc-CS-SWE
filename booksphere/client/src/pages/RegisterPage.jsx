import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await register(form);
      navigate('/dashboard', { replace: true });
    } catch (registerError) {
      setError(registerError.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="auth-shell">
      <form className="auth-card" onSubmit={submit}>
        <span className="auth-brand-mark" aria-hidden="true">B</span>
        <p className="eyebrow purple">Join the community</p>
        <h1>Create your BookSphere account</h1>
        <p className="muted">
          Save recommendations, rate books, and build your reading network.
        </p>

        {error ? <div className="form-error" role="alert">{error}</div> : null}

        <label>
          Name
          <input
            required
            minLength="2"
            autoComplete="name"
            value={form.name}
            onChange={event => setForm({ ...form, name: event.target.value })}
          />
        </label>

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
            autoComplete="new-password"
            value={form.password}
            onChange={event => setForm({ ...form, password: event.target.value })}
          />
        </label>

        <p className="password-note">Use at least 8 characters.</p>

        <button className="primary-button" disabled={submitting}>
          {submitting ? 'Creating account…' : 'Create account'}
        </button>

        <p className="auth-switch">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </form>
    </section>
  );
}
