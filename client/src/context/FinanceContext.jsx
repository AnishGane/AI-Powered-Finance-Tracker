import React, { createContext, useContext, useState } from "react";
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
  // Example state: you can expand this as needed
  const [transactions, setTransactions] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const currency = "₹";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const value = {
    transactions,
    setTransactions,
    currency,
    backendUrl,
    navigate,
    api,
  };

  return (
    <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);
