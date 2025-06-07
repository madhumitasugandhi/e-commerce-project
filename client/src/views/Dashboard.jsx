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

// Importing utility functions and components
import { getCurrentUser, logout } from '../utils/comman';
import Button from '../components/Button';

const UserDetaileRow = ({ value, icon }) => {
    return (
        <p className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-900 border border-gray-700">
            {icon}<span className='ms-4'>{value}</span>
        </p>
    )
}

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
        }
        /*else {
            toast.error("User not found, please login again.");
            setTimeout(() => {
                window.location.href = "/login";
            }, 2000);
        }*/
    }, []);

    const handleLogout = () => {
        console.log('Logging out...');
    };

    return (
        <div className="bg-gray-900 min-h-screen">
            <h1 className="text-white text-3xl sm:text-3xl font-extrabold pt-6 sm:pt-8 mb-4 sm:mb-6 text-center tracking-tight">
                Dashboard
            </h1>
            <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-10 relative overflow-hidden">

                <div className="relative bg-gray-800 max-w-md w-full rounded-xl shadow-2xl border border-gray-700 p-5 sm:p-8 z-10">
                    <div className='flex mb-4 -mt-6 p-1'>
                    <Link to="/orders" className="flex items-center justify-center text-sm">
                        <div>
                            <ShoppingCartIcon size={30} className="text-white mx-auto mb-4 inline" />
                            <span className='text-white p-3 '>My Orders</span>
                        </div>
                    </Link>
                     <Link to="/orders" className="flex items-center justify-center text-sm ">
                        <div>
                            <ShoppingCartIcon size={30} className="text-white mx-auto mb-4 inline" />
                            <span className='text-white p-3 '>My Orders</span>
                        </div>
                    </Link>
                     <Link to="/orders" className="flex items-center justify-center text-sm ">
                        <div>
                            <ShoppingCartIcon size={30} className="text-white mx-auto mb-4 inline" />
                            <span className='text-white p-3'>My Orders</span>
                        </div>
                    </Link>
</div>
                    <div className="space-y-4 text-sm sm:text-base text-white">
                        <UserDetaileRow value={user.name} icon={<NameIcon size={18} />} />
                        <UserDetaileRow value={user.email} icon={<MailIcon size={18} />} />
                        <UserDetaileRow value={user.role} icon={<RoleIcon size={18} />} />

                        <div className="flex justify-center mt-6">
                            <Button
                                variant="primary"
                                onClick={() => {
                                    toast.success('Logging out...');
                                    logout();
                                }}
                                label={
                                    <span className="flex items-center gap-2 px-4">
                                        Logout
                                        <LogoutIcon size={16} />
                                    </span>
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Toaster />
        </div>
    );
}

export default Dashboard;
