import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  useEffect(() => {
    // Load user data from localStorage
    const storedUser = localStorage.getItem('user');
    const storedRefreshToken = localStorage.getItem('refreshToken');
    
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      // Normalize the role to lowercase if it exists
      if (parsedUser.role) {
        parsedUser.role = parsedUser.role.toLowerCase();
      }
      setUser(parsedUser);
    }
    
    if (storedRefreshToken) {
      setRefreshToken(storedRefreshToken);
    }
  }, []);

  const login = (userData) => {
    // Normalize the role to lowercase before saving
    let userObj = userData;
    let refreshTokenValue = userData.refreshToken;
    // If userData has a 'user' property, use that (for backward compatibility)
    if (userData.user) {
      userObj = userData.user;
      refreshTokenValue = userData.refreshToken || userData.user.refreshToken;
    }
    if (userObj && userObj.role) {
      userObj.role = userObj.role.toLowerCase();
    }
    localStorage.setItem('user', JSON.stringify(userObj));
    if (userObj.token) {
      localStorage.setItem('token', userObj.token);
    }
    if (refreshTokenValue) {
      localStorage.setItem('refreshToken', refreshTokenValue);
      setRefreshToken(refreshTokenValue);
    }
    setUser(userObj);
  };

  const updateToken = (newToken) => {
    // Update token in localStorage and user object
    localStorage.setItem('token', newToken);
    
    // Update the user object with the new token
    if (user) {
      const updatedUser = { ...user, token: newToken };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setUser(null);
    setRefreshToken(null);
  };

  const updateRefreshToken = (newRefreshToken) => {
    localStorage.setItem('refreshToken', newRefreshToken);
    setRefreshToken(newRefreshToken);
  };

  return (
    <AuthContext.Provider value={{ user, refreshToken, login, logout, updateToken, updateRefreshToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);