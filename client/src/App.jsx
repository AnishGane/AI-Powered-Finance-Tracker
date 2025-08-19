import React, { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import { Route, Routes, Outlet, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import PageNotFound from "./pages/PageNotFound";
import LandingPage from "./pages/LandingPage";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import Chart from "./pages/Chart";
import Transaction from "./pages/Transaction";
import Settings from "./pages/Settings";
import Sidebar from "./components/Sidebar";
import { useFinance } from "./context/FinanceContext";

const MainLayout = () => {
  const { token } = useFinance();
  const location = useLocation();
  const isLogin = location.pathname === "/login";
  return (
    <>
      {!token && !isLogin && <Navbar />}
      {token ? (
        <div className="flex min-h-screen w-full bg-[#F7F4EA]">
          <Sidebar />
          <div className="flex min-h-screen flex-1 flex-col">
            <main className="flex-1">
              <Outlet />
            </main>
            <Footer />
          </div>
        </div>
      ) : (
        <div className="flex min-h-screen w-full flex-col bg-[#F7F4EA]">
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
};

const LandingOrRedirect = () => {
  const { token } = useFinance();
  return token ? <Navigate to="/dashboard" replace /> : <LandingPage />;
};

const LoginOrRedirect = () => {
  const { token } = useFinance();
  return token ? <Navigate to="/dashboard" replace /> : <Login />;
};

const App = () => {
  return (
    <div className="w-full bg-[#F7F4EA]">
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
            borderRadius: "12px",
            padding: "16px",
            fontSize: "14px",
            fontWeight: "500",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          },
          success: {
            duration: 3000,
            style: {
              background: "linear-gradient(135deg, #10B981, #059669)",
              color: "#fff",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#10B981",
            },
          },
          error: {
            duration: 3000,
            style: {
              background: "linear-gradient(135deg, #EF4444, #DC2626)",
              color: "#fff",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#EF4444",
            },
          },
        }}
      />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingOrRedirect />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginOrRedirect />} />
          <Route path="/charts" element={<Chart />} />
          <Route path="/transactions" element={<Transaction />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default App;
