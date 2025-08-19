import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FinanceContext = createContext();

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [tokenExpiresAt, setTokenExpiresAt] = useState(
    parseInt(localStorage.getItem("tokenExpiresAt") || "0", 10),
  );
  const [username, setUsername] = useState("");
  const currency = "₹";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const logoutTimerRef = useRef(null);

  const isTokenExpired = () => {
    if (!token) return true;
    if (!tokenExpiresAt) return true;
    return Date.now() >= tokenExpiresAt;
  };

  const clearLogoutTimer = () => {
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current = null;
    }
  };

  const scheduleAutoLogout = (msUntilExpiry) => {
    clearLogoutTimer();
    if (msUntilExpiry > 0) {
      logoutTimerRef.current = setTimeout(() => {
        logout();
      }, msUntilExpiry);
    }
  };

  const showUsername = async () => {
    try {
      const res = await api.get("/api/user/getusername", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setUsername(res.data.username);
      }
    } catch (error) {
      console.error("Failed to fetch username", error);
    }
  };

  // Fetch all transactions for the logged-in user
  const fetchTransactions = async () => {
    if (!token) return;
    try {
      const res = await api.get("/api/transaction/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setTransactions(res.data.transactions);
      }
    } catch (error) {
      console.error("Failed to fetch transactions", error);
    }
  };

  // Add a new transaction
  const addTransaction = async (txData) => {
    if (!token) return;
    try {
      const res = await api.post("/api/transaction/add", txData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (
        (res.status === 201 || res.status === 200) &&
        res.data &&
        res.data.success &&
        res.data.transaction
      ) {
        setTransactions((prev) => [res.data.transaction, ...prev]);
        return { success: true };
      }
      return {
        success: false,
        message: res.data?.message || "Failed to add transaction",
      };
    } catch (error) {
      return {
        success: false,
        message: error?.response?.data?.message || "Failed to add transaction",
      };
    }
  };

  // Edit a transaction
  const editTransaction = async (id, txData) => {
    if (!token) return { success: false, message: "No token" };
    try {
      const res = await api.put(`/api/transaction/edit/${id}`, txData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (
        (res.status === 200 || res.status === 201) &&
        res.data &&
        res.data.success &&
        res.data.transaction
      ) {
        setTransactions((prev) =>
          prev.map((tx) => (tx._id === id ? res.data.transaction : tx)),
        );
        return { success: true };
      }
      return {
        success: false,
        message: res.data?.message || "Failed to edit transaction",
      };
    } catch (error) {
      return {
        success: false,
        message: error?.response?.data?.message || "Failed to edit transaction",
      };
    }
  };

  // Delete a transaction
  const deleteTransaction = async (id) => {
    if (!token) return;
    try {
      const res = await api.delete(`/api/transaction/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setTransactions((prev) => prev.filter((tx) => tx._id !== id));
        return { success: true };
      }
      return { success: false, message: res.data.message };
    } catch (error) {
      console.error("Failed to delete transaction", error);
      return { success: false, message: "Failed to delete transaction" };
    }
  };

  // Logout: clear auth and data, navigate to login
  const logout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiresAt");
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      localStorage.removeItem("userId");
      clearLogoutTimer();
      setToken("");
      setTokenExpiresAt(0);
      setUsername("");
      setTransactions([]);
      navigate("/");
    } catch (e) {
      navigate("/");
    }
  };

  // Initialize auth state on mount; clear if expired
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedExpiryRaw = localStorage.getItem("tokenExpiresAt");
    const storedExpiry = storedExpiryRaw ? parseInt(storedExpiryRaw, 10) : 0;

    if (!storedToken || !storedExpiry || Date.now() >= storedExpiry) {
      // Expired or missing -> force logout/cleanup
      logout();
      return;
    }

    // Token valid; ensure state and schedule auto-logout
    if (!token) setToken(storedToken);
    if (!tokenExpiresAt) setTokenExpiresAt(storedExpiry);
    scheduleAutoLogout(storedExpiry - Date.now());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When token changes (e.g., after login), schedule auto-logout based on latest expiry
  useEffect(() => {
    if (!token) {
      clearLogoutTimer();
      return;
    }
    const storedExpiryRaw = localStorage.getItem("tokenExpiresAt");
    const storedExpiry = storedExpiryRaw ? parseInt(storedExpiryRaw, 10) : 0;
    if (!storedExpiry || Date.now() >= storedExpiry) {
      logout();
      return;
    }
    setTokenExpiresAt(storedExpiry);
    scheduleAutoLogout(storedExpiry - Date.now());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // Axios interceptor to handle 401/403 and logout automatically
  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error?.response?.status;
        if (status === 401 || status === 403) {
          logout();
        }
        return Promise.reject(error);
      },
    );
    return () => {
      api.interceptors.response.eject(interceptorId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    transactions,
    setTransactions,
    currency,
    backendUrl,
    navigate,
    api,
    username,
    setUsername,
    token,
    setToken,
    tokenExpiresAt,
    fetchTransactions,
    addTransaction,
    editTransaction,
    deleteTransaction,
    showUsername,
    logout,
  };

  return (
    <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);
