import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  const [user, setUser] = useState(null);

  function logout() {
    localStorage.removeItem('educms_token');
    setUser(null);
  }

  return user
    ? <DashboardPage user={user} onLogout={logout} />
    : <LoginPage onLogin={setUser} />;
}
