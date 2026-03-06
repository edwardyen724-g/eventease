import React, { createContext, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider: React.FC = ({ children }) => {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);