import React, { useState, useEffect } from 'react';
import {
  Mail as MailIcon,
  IdCard as NameIcon,
  KeySquare as RoleIcon,
  LogOut as LogoutIcon,
  ShoppingCart as ShoppingCartIcon,
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

import { getCurrentUser, logout } from '../utils/common';
import Button from '../components/Button';

const UserDetailRow = ({ value, icon }) => (
  <p className="flex items-center justify-start px-3 py-2 rounded-lg bg-gray-900 border border-gray-700">
    {icon}<span className="ms-4">{value}</span>
  </p>
);

function Dashboard() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    role: '',
  });

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setUser(user);
    } else {
      toast.error("User not found, please login again.");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    }
  }, []);

  const handleLogout = () => {
    toast.success('Logging out...');
    logout();
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <h1 className="text-white text-3xl font-extrabold pt-6 mb-6 text-center">
        Dashboard
      </h1>

      <div className="flex justify-center px-4 py-8">
        <div className="bg-gray-800 max-w-md w-full rounded-xl shadow-2xl border border-gray-700 p-6 relative">
          <div className="flex justify-center gap-6 mb-6">
            <Link to="/user/orders" className="flex flex-col items-center text-sm text-white hover:text-gray-300 transition">
              <ShoppingCartIcon size={28} />
              <span className="mt-2">My Orders</span>
            </Link>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-white">
            <UserDetailRow value={user.name} icon={<NameIcon size={18} />} />
            <UserDetailRow value={user.email} icon={<MailIcon size={18} />} />
            <UserDetailRow value={user.role} icon={<RoleIcon size={18} />} />
          </div>

          <div className="flex justify-center mt-8">
            <Button
              variant="primary"
              onClick={handleLogout}
              label={
                <span className="flex items-center gap-2 px-4">
                  Logout <LogoutIcon size={16} />
                </span>
              }
            />
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  );
}

export default Dashboard;
