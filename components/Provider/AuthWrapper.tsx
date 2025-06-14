"use client";

import { UserResponse } from "@/utils/testing/types";
import toast from "react-hot-toast";
import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  user?: UserResponse;
  loading: boolean;
  refreshUser: () => Promise<void>;
};
const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: undefined,
  loading: true,
  refreshUser: async () => {},
});
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserResponse | undefined>();
  const [loading, setLoading] = useState(true);

  const fetchMe = async () => {
    try {
      const Response = await fetch("/api/profile");
      if (!Response.ok) {
        toast("haii, silahkan login untuk mendapatkan access", {
          icon: "✌️",
        });
      }
      const data = await Response.json();
      setUser(data.profile);
    } catch (err) {
      console.log("error", err);
      setUser(undefined);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMe();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!user,
        user,
        loading,
        refreshUser: fetchMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
