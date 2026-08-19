import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser
} from '../services/api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then(data => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  async function register(payload) {
    const data = await registerUser(payload);
    setUser(data.user);
    return data.user;
  }

  async function login(payload) {
    const data = await loginUser(payload);
    setUser(data.user);
    return data.user;
  }

  async function logout() {
    await logoutUser();
    setUser(null);
  }

  const value = useMemo(
    () => ({
      user,
      loading,
      authenticated: Boolean(user),
      register,
      login,
      logout
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider.');
  }

  return context;
}
