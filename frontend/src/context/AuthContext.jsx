import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // LOGIN
  const login = (userData) => {

  setUser(userData);

};

  // REGISTER
  const register = async (data) => {

    try {

      const res = await axios.post(
        "https://ai-social-media-content-pipeline-81g3.onrender.com/api/auth/register",
        data
      );

      toast.success("Signup Successful");

      return res.data;

    } catch (error) {

      toast.error(
        error?.response?.data?.message || "Signup Failed"
      );

      throw error;
    }
  };

  // GET PROFILE (AUTO LOGIN AFTER REFRESH)
  const fetchProfile = async () => {

    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {

      const res = await axios.get(
        "https://ai-social-media-content-pipeline-81g3.onrender.com/api/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(res.data);

    } catch (error) {

      localStorage.removeItem("token");
      setUser(null);

    } finally {
      setLoading(false);
    }
  };

  // LOGOUT
  const logout = () => {

    localStorage.removeItem("token");
    setUser(null);

    toast.success("Logged out");

  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
export const useAuth = () => useContext(AuthContext);