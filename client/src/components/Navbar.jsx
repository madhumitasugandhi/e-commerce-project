import React from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../utils/common";

function Navbar() {
  const user = getCurrentUser();

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-900 shadow-md">
      <Link to="/">
        <h1 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-cyan-400 hover:to-blue-500 transition-all duration-500">
          UrbanKart
        </h1>
      </Link>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Link
              to="/dashboard"
              className="px-4 py-2 text-gray-200 rounded-md transition-all duration-500 hover:bg-gray-800"
            >
              Dashboard
            </Link>
            <button
              onClick={() => {
                localStorage.removeItem("e-commerce-user-token");
                localStorage.removeItem("e-commerce-user-details");
                window.location.href = "/";
              }}
              className="px-4 py-2 text-gray-200 rounded-md transition-all duration-500 hover:bg-gray-800"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 text-gray-200 rounded-md transition-all duration-500 hover:bg-gray-800"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 text-gray-200 rounded-md transition-all duration-500 hover:bg-gray-800"
            >
              Signup
            </Link>
          </>
        )}
        <Link to="/user/cart" aria-label="View Cart">
          🛒
        </Link>
      </div>
    </nav>
  )
}

export default Navbar;
