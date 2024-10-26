import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { login } from "../api/authApi";

type AuthContextType = {
  token: string | null;
  setToken: (newToken: string) => void;
};

const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken_] = useState<string | null>(localStorage.getItem("token"));

  const setToken = (newToken: string) => {
    setToken_(newToken);
  };

  const loginUser = async () => {
    try {
      const data = await login();
      const { user, accessToken, refreshToken } = data;
      setToken(accessToken);
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("userId", user.id);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  useEffect(() => {
    if (!token) {
      loginUser();
    } else {
    }
    // eslint-disable-next-line
  }, [token]);

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
