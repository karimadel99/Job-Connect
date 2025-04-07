export const isAuthenticated = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };
  
  export const getRole = () => {
    const user = isAuthenticated();
    return user?.role || null;
  };
