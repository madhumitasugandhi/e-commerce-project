import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 px-4 py-10 shadow-inner">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 text-center lg:text-left">
        {/* Brand */}
        <div className="flex flex-col items-center lg:items-start">
          <Link to="/" className="group">
            <h1 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-cyan-400 hover:to-blue-500 transition-all duration-500">
              UrbanKart
            </h1>
          </Link>
          <p className="text-gray-400 text-sm mt-3 max-w-xs leading-relaxed">
            Elevate your lifestyle — style, comfort, and convenience delivered
            to your door.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center lg:items-start">
          <h2 className="text-lg font-semibold text-white mb-3">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/user/cart" className="hover:text-white transition">Cart</Link></li>
            <li><Link to="/profile" className="hover:text-white transition">Profile</Link></li>
            <li><Link to="/signup" className="hover:text-white transition">Signup</Link></li>
            <li><Link to="/login" className="hover:text-white transition">Login</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center lg:items-start">
          <h2 className="text-lg font-semibold text-white mb-3">Contact</h2>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Email: support@urbankart.com</li>
            <li>Phone: +91 98765 43210</li>
            <li>Mon–Sat: 9AM–8PM</li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center lg:items-start">
          <h2 className="text-lg font-semibold text-white mb-3">Follow Us</h2>
          <div className="flex justify-center lg:justify-start gap-4 text-xl">
            <a href="#" className="hover:text-blue-400 transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-pink-400 transition"><FaInstagram /></a>
            <a href="#" className="hover:text-sky-400 transition"><FaTwitter /></a>
            <a href="#" className="hover:text-blue-500 transition"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 pt-4 border-t border-gray-700 text-center text-sm text-gray-500">
        &copy; 2025 <span className="font-semibold text-white">UrbanKart</span>. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
