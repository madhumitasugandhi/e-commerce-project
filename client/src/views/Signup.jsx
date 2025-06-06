import React from "react";
import { useState } from "react";
import Button from "../components/Button.jsx";
import Input from "../components/Input.jsx";

function Signup() {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    rePassword: "",
  });


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
            }}
            />

            <Input
              label={"Email Address"}
              name="email"
              type="email"
              placeholder="Enter your email address"
              value={signupData.email}
              onChange={(value) => setSignupData({ ...signupData, email: value })}
            />

          <Input
            label={"Phone Number"}
            name="phone"
            type="tel"
            placeholder="Enter your phone number"
            value={signupData.phone}
            onChange={(value) => setSignupData({ ...signupData, phone: value })}  
          />

          <Input
            label={"Address"}
            name="address"
            placeholder="Enter your address"
            value={signupData.address}
            onChange={(value) => setSignupData({ ...signupData, address: value })}
          />
          
          <Input
            label={"Password"}
            name="password"
            type="password"
            placeholder="Enter your password"
            value={signupData.password}
            onChange={(value) => setSignupData({ ...signupData, password: value })} 
          />
          <Input
            label={"Confirm Password"}
            name="rePassword"
            type="password"
            placeholder="Re-enter your password"
            value={signupData.rePassword}
            onChange={(value) => setSignupData({ ...signupData, rePassword: value })}
          />

          <Button
            label="Sign Up"
            variant="primary"
            onClick={(e) => {
              e.preventDefault();
              // Handle signup logic here
              console.log("Signup Data:", signupData);
            }} />
        </form>
      </div>
    </div>
  );
}

export default Signup;
