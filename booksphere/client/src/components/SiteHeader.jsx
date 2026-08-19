import { useEffect, useState } from 'react';
import {
  Link,
  NavLink,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function SiteHeader() {
  const { authenticated, user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  async function handleLogout() {
    await logout();
    navigate('/');
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to="/" aria-label="BookSphere home">
          <span className="brand-mark" aria-hidden="true">B</span>
          <span>BookSphere</span>
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen(current => !current)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          id="primary-navigation"
          className={menuOpen ? 'primary-navigation open' : 'primary-navigation'}
          aria-label="Primary navigation"
        >
          <div className="nav-main">
            <NavLink to="/" end>Discover</NavLink>
            <NavLink to="/search">Search</NavLink>
            {authenticated ? <NavLink to="/feed">For You</NavLink> : null}
          </div>

          <div className="nav-account">
            {authenticated ? (
              <>
                <NavLink to="/dashboard">My Library</NavLink>
                <NavLink className="user-chip" to={`/profiles/${user.id}`}>
                  <span aria-hidden="true">{user.name.slice(0, 1).toUpperCase()}</span>
                  {user.name}
                </NavLink>
                <button className="text-button" type="button" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <NavLink to="/login">Login</NavLink>
                <NavLink className="nav-cta" to="/register">Join BookSphere</NavLink>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
