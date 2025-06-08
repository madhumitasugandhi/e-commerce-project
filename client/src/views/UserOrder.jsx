import React, { useEffect, useState } from 'react'
import { getCurrentUser, getJwtToken, getReadableTimestamp } from '../utils/common';
import toast from 'react-hot-toast';
import axios from 'axios';
import OrderCard from '../components/OrderCard';
import { SquareX as CancelIcon } from 'lucide-react';

function UserOrder() {

  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);

  const loadUSerOrders = async () => {
    if (!user._id) {
      toast.error("User not found, please login again.");
      return;
    }
    try {
      const response = await axios.get(`${process.env.VITE_API_URL}/orders/users/${user._id}`, {
        headers: {
          Authorization: getJwtToken()
        }
      });
      console.log(response.data.data);
      setOrders(response.data.data);

    }
    catch (error) {
      console.error("Error fetching user orders:", error);
      toast.error("Failed to load orders. Please try again later.");
    }
  };

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

  useEffect(() => {
    if (user) {
      loadUSerOrders();
    } else {
      toast.error("Please log in to view your orders.");
    }
  }, [user]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});

  const OrderViewDialog = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const {
      _id,
      products,
      totalBill,
      deliveryAddress,
      phone,
      paymentMode,
      status,
      createdAt,
    } = selectedOrder;

    return (
      <div
        className="min-h-screen bg-gray-400 fixed top-0 left-0 w-full bg-opacity-75 z-50 flex justify-center items-center"
        onClick={onClose}
      >
        <div
          className="bg-white w-1/2 min-h-96 rounded-lg px-10 py-5 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="text-red-500 absolute top-2 right-4"
            onClick={onClose}
          >
            <CancelIcon size={24} />
          </button>

          <h1 className="text-2xl font-bold mb-10">Order Details</h1>

          <p>Order ID: {_id}</p>
          <p>Ordered On: {getReadableTimestamp(createdAt)}</p>
          <p>Payment Mode: {paymentMode}</p>
          <p>Delivery Address: {deliveryAddress}</p>
          <p>Phone: {phone}</p>
          <p>Status: {status}</p>

          {products.map((product) => {
            const { productId, quantity, price } = product;
            const { name, images } = productId;

            return (
              <div className="flex items-center space-x-4 mb-4 shadow-md border border-gray-200 rounded-md">
                <img src={images[0]} alt={name} className="w-20 h-20" />
                <div>
                  <p>{name}</p>
                  <p>
                    ₹{price} x {quantity}
                  </p>
                </div>
              </div>
            );
          })}

          <p className="text-lg font-bold mt-3 border-t-2 pt-4">
            Bill Amount: ₹{totalBill}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h1>My Orders</h1>
      <p>
        Welcome, {user.name ? user.name : "Guest"}! Here you can view your orders.
        {user.email ? ` Your email is ${user.email}` : " Please log in to see your orders."}
      </p>
      <div>{
        orders.map((order) => {
          return <OrderCard
            key={order._id}
            order={order}
            onClick={() => {
              setSelectedOrder(order);
              setIsDialogOpen(true);
            }
            }
          />
        })}
      </div>

      <OrderViewDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setSelectedOrder({});
        }}
      />
    </div>
  )
}

export default UserOrder;