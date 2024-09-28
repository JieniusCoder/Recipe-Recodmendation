import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
    uid: string;
    name: string|null;
    email: string|null;
    picture: string|undefined;
  }
  
  interface UserContextType {
    user: User | undefined;
    setUser: (user: User) => void;
    logout: () => void;
  }

  const UserContext = createContext<UserContextType | undefined>(undefined);

  export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | undefined>(undefined);
  
    const logout = () => {
      setUser(undefined);
    };
  
    return (
      <UserContext.Provider value={{ user, setUser, logout }}>
        {children}
      </UserContext.Provider>
    );
  };

  export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
      throw new Error("useUser must be used within a UserProvider");
    }
    return context;
  };

