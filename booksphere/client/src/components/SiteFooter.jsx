import { Link } from 'react-router-dom';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <Link className="brand footer-brand" to="/">
            <span className="brand-mark" aria-hidden="true">B</span>
            <span>BookSphere</span>
          </Link>
          <p>Books become better when readers share what moved them.</p>
        </div>
        <nav aria-label="Footer navigation">
          <Link to="/">Discover</Link>
          <Link to="/search">Search books</Link>
          <Link to="/register">Join the community</Link>
        </nav>
        <small>GOMYCODE Software Engineering Project · Taher Amine ELHOUARI</small>
      </div>
    </footer>
  );
}
