import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../utils/common";
import { FiMenu, FiX } from "react-icons/fi";

function Navbar() {
  const user = getCurrentUser();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("e-commerce-user-token");
    localStorage.removeItem("e-commerce-user-details");
    window.location.href = "/";
  };

  return (
    <nav className="bg-gray-900 shadow-md text-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/">
          <h1 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-cyan-400 hover:to-blue-500 transition-all duration-500">
            UrbanKart
          </h1>
        </Link>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/" className="nav-link">Home</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <button onClick={handleLogout} className="nav-link">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="nav-link">Signup</Link>
            </>
          )}
          <Link to="/user/cart" aria-label="View Cart" className="text-2xl">🛒</Link>
        </div>
      </div>

      {/* Mobile Links */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link to="/" className="mobile-link" onClick={() => setIsOpen(false)}>Home</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="mobile-link" onClick={() => setIsOpen(false)}>Dashboard</Link>
              <button onClick={handleLogout} className="mobile-link w-full text-left">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="mobile-link" onClick={() => setIsOpen(false)}>Login</Link>
              <Link to="/signup" className="mobile-link" onClick={() => setIsOpen(false)}>Signup</Link>
            </>
          )}
          <Link to="/user/cart" className="mobile-link" onClick={() => setIsOpen(false)}>🛒 Cart</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
