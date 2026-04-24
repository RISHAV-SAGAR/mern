import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);
const STORAGE_KEY = "edumart-user";

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    if (typeof window === "undefined") return null;

    try {
      const savedUser = window.localStorage.getItem(STORAGE_KEY);
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (currentUser) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(currentUser));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [currentUser]);

  const value = useMemo(
    () => ({
      currentUser,
      isLoggedIn: Boolean(currentUser),
      login: (userData) =>
        setCurrentUser({
          name:
            userData?.name ||
            userData?.fullName ||
            userData?.email?.split("@")[0] ||
            "Student",
          email: userData?.email || "",
          role: userData?.role || "user",
        }),
      logout: () => setCurrentUser(null),
    }),
    [currentUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
