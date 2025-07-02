import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

import Button from "../components/Button.jsx";
import Input from "../components/Input.jsx";
import { getCurrentUser, api } from "../utils/common";

function Login() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const processLogin = async () => {
    toast.loading("Please wait, logging in...");
    try {
      const response = await api.post(`/login`, loginData);

      localStorage.setItem("e-commerce-user-token", response.data.token);
      localStorage.setItem("e-commerce-user-details", JSON.stringify(response.data.data));

      toast.dismiss();
      toast.success("Login successful!");

      setLoginData({ email: "", password: "" });

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    } catch (error) {
      toast.dismiss();
      const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      toast.success(`Welcome back, ${currentUser.name}`);
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 3000);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-gray-800 max-w-md w-full rounded-xl shadow-xl border border-gray-700 p-6 sm:p-8 z-10">
        <h1 className="text-white text-2xl sm:text-3xl font-bold text-center mb-6">
          Login to Your Account
        </h1>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <Input
            label="Email Address"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={loginData.email}
            autoComplete="email"
            onChange={(value) => {
              setLoginData({ ...loginData, email: value });
              setError("");
            }}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={loginData.password}
            autoComplete="current-password"
            onChange={(value) => {
              setLoginData({ ...loginData, password: value });
              setError("");
            }}
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <p className="text-center text-sm text-gray-300">
            Don&apos;t have an account?
            <Link to="/signup" className="text-blue-400 hover:underline ml-2">
              Sign up
            </Link>
          </p>

          <div className="flex justify-between mt-6 gap-4">
            <Button
              label="Cancel"
              variant="tertiary"
              onClick={() => (window.location.href = "/")}
            />
            <Button
              label="Login"
              variant="primary"
              onClick={processLogin}
            />
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
}

export default Login;
