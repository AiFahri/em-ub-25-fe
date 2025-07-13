import { useEffect, useState } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
};

const isTokenExpired = (token: string): boolean => {
  try {
    const payloadBase64 = token.split('.')[1];
    const payload = JSON.parse(atob(payloadBase64));
    const exp = payload.exp * 1000;
    return Date.now() > exp;
  } catch {
    return true;
  }
};

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLogin = () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData && !isTokenExpired(token)) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  useEffect(() => {
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
    window.location.reload();
  };

  return { user, isLoggedIn, logout };
}
