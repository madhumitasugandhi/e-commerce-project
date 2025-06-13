import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

//Signup.jsx component
import Button from "../components/Button.jsx";
import Input from "../components/Input.jsx";
import { getCurrentUser , api} from '../utils/common';


function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

const [error, setError] = useState("");

  const processLogin = async () => {
    toast.loading("Please wait, signing up...");
    try {
       const response = await api.post(`/login`, loginData);
      localStorage.setItem("e-commerce-user-token", response.data.token);
      localStorage.setItem("e-commerce-user-details",JSON.stringify(response.data.data));

      toast.dismiss();
      console.log(response.data);
      toast.success("Login successful!");

      setLoginData({
        email: "",
        password: "",
      })
    
      setTimeout(() => {
        window.location.href = "/dashboard"; 
      }, 2000);
    } catch (error) {
      toast.dismiss();
      setError(error.response.data.message);
      const errorMessage = error.response?.data?.message || "An error occurred during signup.";
      toast.error(errorMessage);
      console.error(error);
    }
  };

  
  useEffect(() => {
    // Check if user is already logged in
    // If logged in, redirect to dashboard
    const currentUsr = getCurrentUser();
    if(currentUsr) {
      toast.success(`Welcome back, ${currentUsr.name}`);
      setTimeout(() => {
        window.location.href = "/dashboard";
      },3000);
    }
  }, []);


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 sm:px-6 lg:px-8 py-8 sm:py-10 relative overflow-hidden">
      <div className="relative bg-gray-800 max-w-md w-full rounded-xl shadow-2xl border border-gray-700 p-5 sm:p-8 z-10">
        <h1 className="text-white text-2xl sm:text-3xl font-extrabold mb-6 sm:mb-8 text-center tracking-tight">
          Login to Your Account
        </h1>
        <form className="space-y-6">

          <Input
            label={"Email Address"}
            name="email"
            type="email"
            placeholder="Enter your email address"
            value={loginData.email}
            onChange={(value) => {
              setLoginData({ ...loginData, email: value })
              setError("");
            }}
          />
          <Input
            label={"Password"}
            name="password"
            type="password"
            placeholder="Enter your password"
            value={loginData.password}
            onChange={(value) => {
              setLoginData({ ...loginData, password: value })
              setError("");
            }}
          />
          
          <p className="text-red-600">{error}</p>
          <p>
            <span className="text-white">Don't have an account?{" "}</span>
            <Link to="/signup" className="text-blue-400 hover:underline px-4">
              Sign Up
            </Link>
          </p>

          <div className="flex justify-around mt-6 gap-8">
            <Button
              label="Cancle"
              variant="tertiary"
              onClick={() => {
                window.location.href = "/";
              }} />

            <Button
              label="Login"
              variant="primary"
              onClick={() => processLogin()} />


          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
}

export default Login;
