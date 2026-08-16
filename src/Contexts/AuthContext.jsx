import React, { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const role = localStorage.getItem('userRole');
      const savedToken = localStorage.getItem('authToken');
      const savedUserStr = localStorage.getItem('userData');

      if (loggedIn && role) {
        setIsLoggedIn(true);
        setUserRole(role);
        setToken(savedToken || null);
        if (savedUserStr) {
          try {
            setUser(JSON.parse(savedUserStr));
          } catch (e) {
            console.error('Error parsing stored user data:', e);
          }
        }
      }
    } catch (err) {
      console.error('Error restoring session:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = authPayload => {
    let role;
    let tokenVal = null;
    let userData = null;

    if (typeof authPayload === 'string') {
      role = authPayload;
    } else if (authPayload && typeof authPayload === 'object') {
      role = authPayload.role;
      tokenVal = authPayload.token || null;
      userData = authPayload.user || null;
    }

    localStorage.setItem('isLoggedIn', 'true');
    if (role) localStorage.setItem('userRole', role);
    if (tokenVal) localStorage.setItem('authToken', tokenVal);
    if (userData) localStorage.setItem('userData', JSON.stringify(userData));

    setIsLoggedIn(true);
    if (role) setUserRole(role);
    if (tokenVal) setToken(tokenVal);
    if (userData) setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');

    setIsLoggedIn(false);
    setUserRole(null);
    setToken(null);
    setUser(null);
  };

  const value = {
    isLoggedIn,
    userRole,
    token,
    user,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
