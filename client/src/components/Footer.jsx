import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="p-6 bg-gray-900 shadow-md">
            <div className="flex flex-col items-center mb-6">
                <Link to="/">
                    <h1 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-cyan-400 hover:to-blue-500 transition-all duration-500 mb-2">
                        UrbanKart
                    </h1>
                </Link>
                <p className="text-gray-400 mb-4">
                    Your one-stop shop for all things stylish, convenient, and affordable.
                </p>
                <ul className="flex space-x-6">
                    <li>
                        <Link to="/" className="text-gray-400 hover:text-gray-200 transition-all">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/user/cart" className="text-gray-400 hover:text-gray-200 transition-all">
                            Cart
                        </Link>
                    </li>
                    <Link to="/profile" className="text-gray-400 hover:text-gray-200 transition-all">
                        Profile
                    </Link>

                    <li>
                        <Link to="/signup" className="text-gray-400 hover:text-gray-200 transition-all">
                            Signup
                        </Link>
                    </li>
                    <li>
                        <Link to="/login" className="text-gray-400 hover:text-gray-200 transition-all">
                            Login
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="flex flex-col items-center">
                <p className="text-gray-500">
                    &copy; 2025 <b>UrbanKart</b>. All Rights Reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer;
