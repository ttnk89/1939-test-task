import React, { createContext, useContext, useState, useEffect, PropsWithChildren } from 'react';

interface AuthContextProps {
  loggedIn: boolean;
  playerName: string;
  login: (name: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<PropsWithChildren<AuthContextProps>> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [playerName, setPlayerName] = useState('');

  useEffect(() => {
    const storedLoggedIn = localStorage.getItem('loggedIn') === 'true';
    const storedPlayerName = localStorage.getItem('username') || '';
    setLoggedIn(storedLoggedIn);
    setPlayerName(storedPlayerName);
  }, []);

  const login = (name: string) => {
    setLoggedIn(true);
    setPlayerName(name);
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('username', name);
  };

  const logout = () => {
    setLoggedIn(false);
    setPlayerName('');
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');
  };

  return (
    <AuthContext.Provider value={{ loggedIn, playerName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};