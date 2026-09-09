"use client";

import api from "@/config/axios.config";
import { setAuthFailureHandler } from "@/lib/axios"; // registers interceptors
import React, { createContext, useContext, useEffect, useState } from "react";
import type {
  AuthContextType,
  AuthProviderProps,
  User,
} from "@/types/auth-context.types";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState<boolean>(true);

  const fetchCurrentUser = async () => {
    try {
      const response = await api.get("/user/me");
      setUser(response?.data?.data);
    } catch (error) {
      setUser(null);
    } finally {
      setUserLoading(false);
    }
  };

  useEffect(() => {
    // Register the handler so the interceptor can clear auth state on refresh failure
    setAuthFailureHandler(() => {
      setUser(null);
      setUserLoading(false);
    });
    fetchCurrentUser();
  }, []);
  return (
    <AuthContext.Provider
      value={{ user, setUser, setUserLoading, userLoading, fetchCurrentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext) as AuthContextType;
export default useAuth;
