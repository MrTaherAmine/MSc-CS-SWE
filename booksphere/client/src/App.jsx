import {
  BrowserRouter,
  Navigate,
  Route,
  Routes
} from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import SiteHeader from './components/SiteHeader.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import BookDetailsPage from './pages/BookDetailsPage.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import FeedPage from './pages/FeedPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import './styles.css';

function GuestOnly({ children }) {
  const { authenticated, loading } = useAuth();

  if (loading) {
    return <div className="route-state">Checking your session…</div>;
  }

  return authenticated ? <Navigate to="/dashboard" replace /> : children;
}

function AppRoutes() {
  return (
    <>
      <SiteHeader />

      <main className="page">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/books/:bookId" element={<BookDetailsPage />} />
          <Route path="/profiles/:userId" element={<ProfilePage />} />

          <Route
            path="/login"
            element={
              <GuestOnly>
                <LoginPage />
              </GuestOnly>
            }
          />

          <Route
            path="/register"
            element={
              <GuestOnly>
                <RegisterPage />
              </GuestOnly>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/feed"
            element={
              <ProtectedRoute>
                <FeedPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
