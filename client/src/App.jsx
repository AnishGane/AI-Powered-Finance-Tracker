import React, { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import { Route, Routes, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import PageNotFound from "./pages/PageNotFound";
import LandingPage from "./pages/LandingPage";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

// Helper to dispatch a custom event when token changes
function setTokenInStorage(token) {
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
  window.dispatchEvent(new Event("tokenchange"));
}

const useToken = () => {
  const [hasToken, setHasToken] = useState(!!localStorage.getItem("token"));
  useEffect(() => {
    const checkToken = () => setHasToken(!!localStorage.getItem("token"));
    window.addEventListener("storage", checkToken);
    window.addEventListener("tokenchange", checkToken);
    return () => {
      window.removeEventListener("storage", checkToken);
      window.removeEventListener("tokenchange", checkToken);
    };
  }, []);
  return hasToken;
};

const MainLayout = () => {
  const hasToken = useToken();
  return (
    <>
      {!hasToken && <Navbar />}
      <Outlet />
      <Footer />
    </>
  );
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
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default App;
export { setTokenInStorage };
