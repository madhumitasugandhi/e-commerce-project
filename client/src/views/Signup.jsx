import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

//Signup.jsx component
import Button from "../components/Button.jsx";
import Input from "../components/Input.jsx";
import { getCurrentUser } from '../utils/common';

function Signup() {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    rePassword: "",
  });

const processSignup = async () => {
  toast.loading("Please wait, signing up...");
  try {
    const response = await axios.post(`
      ${import.meta.env.VITE_API_URL}/signup`, 
      signupData
    
    );
    console.log(response)
    toast.dismiss();
    console.log("Signup successful:", response.data);
    toast.success("Signup successful!"); 

    setSignupData({
      name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    rePassword: "",
    })
    setTimeout(() => {
      window.location.href = "/login"; // Redirect to login page after successful signup
    }, 4000);
  } catch (error) {
    toast.dismiss();
   setError(error.response.data.message);
    const errorMessage = error.response?.data?.message || "An error occurred during signup.";
    toast.error(errorMessage);
    console.error(error);
  }
};

const [error, setError] = useState("");

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
          Create Your Account
        </h1>
        <form className="space-y-3 sm:space-y-4">
         <Input
              label={"Full Name"}
              name="name"
              placeholder="Enter your full name"
              value={signupData.name}
              onChange={(value) => {setSignupData({ ...signupData, name: value })
              setError("");
            }}
            />

            <Input
              label={"Email Address"}
              name="email"
              type="email"
              placeholder="Enter your email address"
              value={signupData.email}
              onChange={(value) => {setSignupData({ ...signupData, email: value })
              setError("");}}
            />

          <Input
            label={"Phone Number"}
            name="phone"
            type="tel"
            placeholder="Enter your phone number"
            value={signupData.phone}
            onChange={(value) => {setSignupData({ ...signupData, phone: value })
            setError("");}}  
          />

          <Input
            label={"Address"}
            name="address"
            placeholder="Enter your address"
            value={signupData.address}
            onChange={(value) => {setSignupData({ ...signupData, address: value })
            setError("");}
            }
          />
          
          <Input
            label={"Password"}
            name="password"
            type="password"
            placeholder="Enter your password"
            value={signupData.password}
            onChange={(value) => {setSignupData({ ...signupData, password: value })
            setError("");}} 
          />
          <Input
            label={"Confirm Password"}
            name="rePassword"
            type="password"
            placeholder="Re-enter your password"
            value={signupData.rePassword}
            onChange={(value) => {setSignupData({ ...signupData, rePassword: value })
            setError("");}}
          />
          <p className="text-red-600">{error}</p>
          <p>
            <span className="text-white">Already have an account?{" "}</span>
            <Link to="/login" className="text-blue-400 hover:underline px-4">
              Login here
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
            label="Sign Up"
            variant="primary"
            onClick={() => processSignup()} />

            
          </div>
        </form>
      </div>
      <Toaster/>
    </div>
  );
}

export default Signup;
