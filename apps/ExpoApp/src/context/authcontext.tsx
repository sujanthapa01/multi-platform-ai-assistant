import React, { createContext, useContext, useEffect, useState } from "react";
import { GetUser } from "../auth/auth";
const AuthContext = createContext(null);

interface login {
  username?: string;
  email?: string;
  password: string;
}


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userpost, setUserPost] = useState(null);

  const loadUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }
      const res = await GetUser("user");
      setUser(res.user);
    } catch (error) {
      console.log("error is", error);
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const login = async (data:login) => {

  };


  return (
    <AuthContext.Provider >
      {children}
    </AuthContext.Provider>
  )
};
