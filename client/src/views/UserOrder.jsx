import React, { useEffect, useState } from 'react';
import { getCurrentUser, getReadableTimestamp, api } from '../utils/common';
import toast from 'react-hot-toast';
import axios from 'axios';
import OrderCard from '../components/OrderCard';
import { SquareX as CancelIcon } from 'lucide-react';



function UserOrder() {
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});

  const loadUserOrders = async () => {
    if (!user._id) {
      toast.error('User not found, please login again.');
      return;
    }
    try {

      const response = await api.get(`/orders/user/${user._id}`);
      setOrders(response.data.data);

    } catch (error) {
      
      console.error('Error fetching user orders:', error);
      toast.error('Failed to load orders. Please try again later.');
    }
  };

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setUser(user);
    } else {
      toast.error('User not found, please login again.');
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    }
  }, []);

  useEffect(() => {
    if (user?._id) loadUserOrders();
  }, [user]);

  const OrderViewDialog = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const {
    _id,
    products = [],
    totalBill = 0,
    deliveryAddress,
    phone,
    paymentMode,
    status,
    createdAt,
  } = selectedOrder;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center px-4 py-6"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 text-white w-full max-w-2xl rounded-2xl shadow-2xl border border-gray-700 p-6 sm:p-8 relative overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
       
        <button
          className="absolute top-4 right-4 text-red-400 hover:text-red-300 transition"
          onClick={onClose}
        >
          <CancelIcon size={22} />
        </button>

        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          Order Details
        </h2>

      
        <div className="space-y-2 text-sm text-gray-300 mb-6">
          <p><span className="text-gray-400">Order ID:</span> {_id}</p>
          <p><span className="text-gray-400">Ordered On:</span> {getReadableTimestamp(createdAt)}</p>
          <p><span className="text-gray-400">Payment Mode:</span> {paymentMode}</p>
          <p><span className="text-gray-400">Delivery Address:</span> {deliveryAddress}</p>
          <p><span className="text-gray-400">Phone:</span> {phone}</p>
          <p><span className="text-gray-400">Status:</span> {status}</p>
        </div>

       
        <h3 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">Products</h3>

        {products.length === 0 ? (
          <p className="text-gray-400">No products found.</p>
        ) : (
          <div className="space-y-4">
            {products.map((product, i) => {
              const { productId, quantity, price } = product;
              const name = productId?.name || "Unnamed Product";
              const images = productId?.images || [];

              return (
                <div
                  key={i}
                  className="flex items-center space-x-4 p-3 rounded-lg bg-gray-800 shadow-md"
                >
                  <img
                    src={images?.[0] || "https://via.placeholder.com/100"}
                    alt={name}
                    className="w-16 h-16 object-cover rounded-md border border-gray-600"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/100";
                    }}
                  />
                  <div>
                    <p className="font-medium text-white">{name}</p>
                    <p className="text-gray-400 text-sm">
                      ₹{price} × {quantity}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Total */}
        <p className="text-xl font-bold text-right mt-6 border-t border-gray-700 pt-4">
          Total: ₹{totalBill}
        </p>
      </div>
    </div>
  );
};


  return (
    <div className="min-h-screen bg-gray-900 px-4 sm:px-6 lg:px-8 py-10 text-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">My Orders</h1>
        <p className="text-center text-gray-400 mb-8">
          Welcome, <span className="text-white">{user.name || 'Guest'}</span>!
          {user.email ? (
            <> Your email is <span className="text-white">{user.email}</span></>
          ) : (
            <> Please log in to see your orders.</>
          )}
        </p>

        {orders.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <p>No orders found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {orders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                onClick={() => {
                  setSelectedOrder(order);
                  setIsDialogOpen(true);
                }}
              />
            ))}
          </div>
        )}
      </div>

      <OrderViewDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setSelectedOrder({});
        }}
      />
    </div>
  );
}

export default UserOrder;
