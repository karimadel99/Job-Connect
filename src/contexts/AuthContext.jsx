import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      // Normalize the role to lowercase if it exists
      if (parsedUser.role) {
        parsedUser.role = parsedUser.role.toLowerCase();
      }
      setUser(parsedUser);
    }
  }, []);

  const login = (userData) => {
    // Normalize the role to lowercase before saving
    if (userData && userData.role) {
      userData.role = userData.role.toLowerCase();
    }
    localStorage.setItem('user', JSON.stringify(userData));
    if (userData.token) {
      localStorage.setItem('token', userData.token);
    }
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
