"use client";

import { useUser } from "@clerk/nextjs";
import { createContext, useContext, useEffect, useState } from "react";

interface UserContextType {
  user: ReturnType<typeof useUser>['user'];
  isLoaded: boolean;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const [cachedUser, setCachedUser] = useState<ReturnType<typeof useUser>['user']>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (isLoaded && user) {
      setCachedUser(user);
      setIsAuthenticated(true);
    } else if (isLoaded && !user) {
      setCachedUser(null);
      setIsAuthenticated(false);
    }
  }, [isLoaded, user]);

  const value = {
    user: cachedUser,
    isLoaded,
    isAuthenticated,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
}
