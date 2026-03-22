import { createContext, useContext, useEffect, useState } from "react";
import { GetUser, PostUser } from "../auth/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore user from token
  const loadUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        setLoading(false);

        return;
      }

      const data = await GetUser("user"); // token sent in headers
      setUser(data.user);
    } catch (err) {
      console.error("Auth restore failed:", err);
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  //  Login
  const login = async (credentials) => {
    const res = await PostUser("login", credentials);

    if (res?.token) {
      localStorage.setItem("token", res.token);
      await loadUser();
    }

    return res;
  };
  const token = localStorage.getItem("token");
  // 🔐 Used by verify-email & OAuth
  const setAuthToken = async (token) => {
    if (!token) return;
    localStorage.setItem("token", token);
    await loadUser();
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLogin: !!user,
        loading,
        login,
        logout,
        setAuthToken,
        token,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
