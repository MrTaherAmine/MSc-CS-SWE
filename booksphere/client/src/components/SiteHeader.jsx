import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function SiteHeader() {
  const { authenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate('/');
  }

  return (
    <header className="site-header">
      <Link className="brand" to="/">BookSphere</Link>

      <nav>
        <NavLink to="/">Discover</NavLink>

        {authenticated ? (
          <>
            <NavLink to="/dashboard">My Library</NavLink>
            <span className="user-chip">{user.name}</span>
            <button className="text-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink className="nav-cta" to="/register">
              Join BookSphere
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
