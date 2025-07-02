import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 px-4 py-10 shadow-inner">
            <div className="w-[90%] mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">

                {/* Brand Section */}
                <div className="flex flex-col items-center text-center md:items-start md:text-left">
                    <Link to="/" className="group inline-block">
                        <h1 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-cyan-400 hover:to-blue-500 transition-all duration-500">
          UrbanKart
        </h1>
                    </Link>
                    <p className="text-gray-400 text-md leading-snug mt-3 tracking-wide italic max-w-xs">
                        Elevate your lifestyle — style, comfort, and convenience delivered to your door.
                    </p>
                </div>



                {/* Navigation Links */}
                <div>
                    <h2 className="text-lg font-semibold mb-3 text-white">Quick Links</h2>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/" className="hover:text-white transition">Home</Link></li>
                        <li><Link to="/user/cart" className="hover:text-white transition">Cart</Link></li>
                        <li><Link to="/profile" className="hover:text-white transition">Profile</Link></li>
                        <li><Link to="/signup" className="hover:text-white transition">Signup</Link></li>
                        <li><Link to="/login" className="hover:text-white transition">Login</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h2 className="text-lg font-semibold mb-3 text-white">Contact</h2>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li>Email: support@urbankart.com</li>
                        <li>Phone: +91 98765 43210</li>
                        <li>Mon–Sat: 9AM–8PM</li>
                    </ul>
                </div>

                {/* Social Media Links */}
                <div>
                    <h2 className="text-lg font-semibold mb-3 text-white">Follow Us</h2>
                    <div className="flex justify-center md:justify-start gap-4 text-xl">
                        <a href="#" className="hover:text-blue-400 transition"><FaFacebookF /></a>
                        <a href="#" className="hover:text-pink-400 transition"><FaInstagram /></a>
                        <a href="#" className="hover:text-sky-400 transition"><FaTwitter /></a>
                        <a href="#" className="hover:text-blue-500 transition"><FaLinkedinIn /></a>
                    </div>
                </div>
            </div>

            {/* Bottom Copyright */}
            <div className="mt-10 border-t border-gray-700 pt-4 text-center text- text-gray-500">
                &copy; 2025 <span className="font-semibold text-white">UrbanKart</span>. All Rights Reserved.
            </div>
        </footer>
    );
}

export default Footer;
