import React, { createContext, useContext, useState, useEffect } from "react";
import { axiosAuthInstance } from "@/services/axios";
import { User } from "@/types/types";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    try {
      if (token) {
        const fetchUser = async () => {
          const user = await axiosAuthInstance.get<User>("/api/v1/user");
          if (user.status === 200) {
            setUser(user.data);
          }
        };
        fetchUser().then();
      }
    } catch (e) {
      console.log("Error with user request.");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = async () => {
    setUser(null);
    const token = localStorage.getItem("access_token");
    await axiosAuthInstance.post("/api/v1/logout", { access_token: token });
    localStorage.removeItem("access_token");
  };

  const authContextValue: AuthContextType = {
    user,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
