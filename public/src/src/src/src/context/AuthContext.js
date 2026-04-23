import React, { createContext, useContext, useState } from 'react';
const AuthContext = createContext(null);
const USERS = [
  { email: 'admin@medi360.gr', password: 'medi360', name: 'Johan Panou', role: 'Admin', initials: 'JP' },
  { email: 'demo@medi360.gr',  password: 'demo123',  name: 'Demo User',   role: 'Staff', initials: 'DU' },
];
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const login = async (email, password) => {
    const found = USERS.find(u => u.email === email && u.password === password);
    if (!found) throw new Error('Λάθος email ή κωδικός');
    setUser(found);
  };
  const logout = () => setUser(null);
  return <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>{children}</AuthContext.Provider>;
}
export function useAuth() { return useContext(AuthContext); }
