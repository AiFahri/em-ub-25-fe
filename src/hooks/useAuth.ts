import { useEffect, useState } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
};

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      if (token && userData) {
        setIsLoggedIn(true);
        setUser(JSON.parse(userData));
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    checkLogin();

    window.addEventListener('storage', checkLogin);
    window.addEventListener('authChanged', checkLogin);

    return () => {
      window.removeEventListener('storage', checkLogin);
      window.removeEventListener('authChanged', checkLogin);
    };
  }, []);

  const logout = () => {
    const confirmLogout = window.confirm('Apakah kamu yakin ingin logout?');
    if (!confirmLogout) return;

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
  };

  return { user, isLoggedIn, logout };
}
