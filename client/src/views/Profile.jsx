import React, { useState, useEffect } from "react";
import { api } from "../utils/common";
import toast from "react-hot-toast";

function Profile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("e-commerce-user-details");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        fetchUserOrders();
      } catch {
        toast.error("Invalid user data. Please login again.");
        handleLogout();
      }
    }
  }, []);

  const fetchUserOrders = async () => {
    try {
      const response = await api.get("/orders/user", {
        headers: { Authorization: localStorage.getItem("e-commerce-user-token") },
      });
      setOrders(response.data?.data || []);
    } catch (error) {
      toast.error("Failed to load orders.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("e-commerce-user-token");
    localStorage.removeItem("e-commerce-user-details");
    toast.success("Logged out successfully!");
    setTimeout(() => (window.location.href = "/login"), 1000);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 bg-gray-900">
        <p>Please login first.</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen p-6 text-gray-200 bg-gray-900"
    >
      <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-2xl shadow-2xl mt-12">
        <h1 className="text-4xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
          Your Profile
        </h1>

        <div className="mb-6 p-4 bg-gray-900 rounded-lg space-y-2">
          <p className="text-lg"><span className="font-semibold text-cyan-400">Username:</span> {user?.name}</p>
          <p className="text-lg"><span className="font-semibold text-cyan-400">Email:</span> {user?.email}</p>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 mb-8 font-semibold text-white bg-red-500 rounded-md shadow-md transition-all duration-300 hover:bg-red-600"
        >
          Logout
        </button>

        <div>
          <h2 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            Your Orders
          </h2>

          {orders.length > 0 ? (
            <ul className="space-y-4">
              {orders.map((order) => (
                <li key={order._id} className="p-4 bg-gray-900 rounded-md shadow-md">
                  <p className="mb-1">
                    <span className="font-semibold text-cyan-400">Order ID:</span> {order._id}
                  </p>
                  <p className="mb-1">
                    <span className="font-semibold text-cyan-400">Total Bill:</span> ₹{order.totalBill}
                  </p>
                  <p className="font-semibold text-cyan-400 mb-1">Products:</p>
                  <ul className="list-disc list-inside text-sm ml-3">
                    {order.products?.map((p, idx) => (
                      <li key={idx}>
                        {p.quantity} × {p.productId?.name || "Unnamed"} (₹{p.price} each)
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 mt-4">You have no orders yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
