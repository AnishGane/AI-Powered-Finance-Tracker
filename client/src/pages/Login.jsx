import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFinance } from "../context/FinanceContext";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { navigate, api, setToken, setUsername } = useFinance();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (
      (currentState === "Sign up" && (!name || !email || !password)) ||
      (currentState === "Login" && (!email || !password))
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setIsLoading(true);
    try {
      if (currentState === "Sign up") {
        const response = await api.post("/api/user/register", {
          name,
          email,
          password,
        });
        if (response.data.success) {
          toast.success("Registration successful! Please login.", {
            duration: 2000,
            position: "bottom-right",
          });
          setCurrentState("Login");
          setName("");
          setEmail("");
          setPassword("");
        } else {
          toast.error(response.data.message || "Registration failed", {
            duration: 2000,
            position: "bottom-right",
          });
        }
      } else {
        const response = await api.post("/api/user/login", {
          email,
          password,
        });
        if (response.data.success) {
          if (setToken) setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          // Set 1-day expiry (in ms)
          const expiresAt = Date.now() + 24 * 60 * 60 * 1000;
          localStorage.setItem("tokenExpiresAt", String(expiresAt));
          if (setUsername) setUsername(response.data.user.name);
          localStorage.setItem("username", response.data.user.name);
          localStorage.setItem("email", response.data.user.email);
          // Save userId for optional routes that require it
          if (response.data.user?._id) {
            localStorage.setItem("userId", response.data.user._id);
          }
          toast.success("Login successful!", {
            duration: 2000,
            position: "bottom-right",
          });
          navigate("/dashboard");
        } else {
          toast.error(response.data.message || "Login failed", {
            duration: 2000,
            position: "bottom-right",
          });
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
      if (error.response?.status === 401) {
        // handleTokenExpiration();
        navigate("/login");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid input data", {
          duration: 2000,
          position: "bottom-right",
        });
      } else {
        toast.error("An error occurred. Please try again.", {
          duration: 2000,
          position: "bottom-right",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#F7F4EA] px-4 py-12">
      {/* Hero Section */}
      <section className="mb-10 w-full max-w-md text-center">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl">
          Welcome Back
        </h1>
        <p className="mb-4 text-gray-600">
          Sign in to your Spend
          <span className="font-semibold text-[#FE4A49]">Wise</span> account
        </p>
      </section>
      {/* Login Form */}
      <section className="flex w-full max-w-md flex-col gap-6 rounded-2xl bg-white p-8 pb-20 shadow-lg">
        <form onSubmit={onSubmitHandler} className="flex flex-col gap-5">
          {currentState === "Sign up" && (
            <div>
              <label
                className="mb-1 block font-medium text-gray-700"
                htmlFor="name"
              >
                Username
              </label>
              <input
                id="name"
                type="text"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-[#FE4A49] focus:ring-2 focus:ring-[#FE4A49]/20 focus:outline-none"
                placeholder="Jay Kishan"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div>
            <label
              className="mb-1 block font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-[#FE4A49] focus:ring-2 focus:ring-[#FE4A49]/20 focus:outline-none"
              placeholder="you@email.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              className="mb-1 block font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-[#FE4A49] focus:ring-2 focus:ring-[#FE4A49]/20 focus:outline-none"
                placeholder="Your password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {showPassword ? (
                <FaEyeSlash
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-neutral-700"
                />
              ) : (
                <FaEye
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-neutral-700"
                />
              )}
            </div>
          </div>
          {currentState === "Login" && (
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 focus:ring-[#FE4A49]"
                />
                Remember me
              </label>

              <Link
                to="#"
                className="text-sm font-medium text-[#FE4A49] hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          )}
          <button
            type="submit"
            className="mt-2 cursor-pointer rounded bg-[#FE4A49] px-8 py-3 text-lg font-semibold text-white shadow-lg transition hover:bg-red-600/90 focus:ring-2 focus:ring-[#FE4A49] focus:ring-offset-2 focus:outline-none"
            disabled={isLoading}
          >
            {isLoading
              ? currentState === "Login"
                ? "Signing In..."
                : "Signing Up..."
              : currentState}
          </button>
        </form>
        <div className="text-center text-sm text-gray-600">
          <p className="text-sm">
            {currentState === "Login"
              ? "Don't have an account? "
              : "Already have an account? "}
            <button
              type="button"
              onClick={() =>
                setCurrentState(currentState === "Login" ? "Sign up" : "Login")
              }
              className="cursor-pointer text-blue-600 hover:underline"
            >
              {currentState === "Login" ? "Sign up" : "Login"}
            </button>
          </p>
        </div>
      </section>
      {/* Brand Footer */}
      <div className="mt-10 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} SpendWise. All rights reserved.
      </div>
    </div>
  );
};

export default Login;
