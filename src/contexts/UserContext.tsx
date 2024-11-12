import React, { createContext, useState, ReactNode } from 'react';

interface UserContextType {
  user: any;
  setUser: (user: any) => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {}
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};