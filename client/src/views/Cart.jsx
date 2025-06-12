import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Button from "../components/Button";
import Input from "../components/Input";
import axios from "axios";
import { getJwtToken } from "../utils/common";

function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMode, setPaymentMode] = useState("COD");

  const loadCart = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  };

  const removeItemFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.productId !== productId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    toast.success("Product removed from cart");
  };

  useEffect(() => {
    let totalVal = 0;
    cart.forEach((product) => {
      totalVal += product.price * product.quantity;
    });
    setTotal(totalVal);
  }, [cart]);

  useEffect(() => {
    loadCart();
  }, []);

  const placeOrder = async () => {
    const orderBody = {
      products: cart.map((product) => ({
        productId: product.productId,
        quantity: product.quantity,
        price: product.price,
      })),
      deliveryAddress: address,
      paymentMode,
      phone,
    };

    await axios.post(`${import.meta.env.VITE_API_URL}/orders`, orderBody, {
      headers: { Authorization: getJwtToken() },
    });

    toast.success("Order Placed Successfully");
    localStorage.removeItem("cart");
    setTimeout(() => {
      window.location.href = "/user/orders";
    }, 2000);
  };

  const CheckoutDialog = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50" onClick={onClose}>
        <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">Checkout</h2>
          <Input label="Name" val={name} onChange={setName} placeholder="Enter your name" />
          <Input label="Address" val={address} onChange={setAddress} placeholder="Enter your address" />
          <Input label="Phone" val={phone} onChange={setPhone} placeholder="Enter your phone number" />
          <label className="block text-sm mt-4 mb-2">Payment Mode</label>
          <select
            value={paymentMode}
            onChange={(e) => setPaymentMode(e.target.value)}
            className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
          >
            <option value="COD">Cash on Delivery</option>
            <option value="UPI">UPI</option>
          </select>
          <div className="mt-6 text-center">
            <Button label="Place Order" variant="primary" onClick={() => { setIsCheckoutOpen(false); setIsPaymentOpen(true); }} />
          </div>
        </div>
      </div>
    );
  };

  const PaymentDialog = ({ isPaymentOpen }) => {
    if (!isPaymentOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg w-full max-w-md mx-4">
          <h2 className="text-xl md:text-2xl font-semibold text-center mb-6">Complete Your Payment</h2>
          <Button
            label="Complete Payment"
            variant="primary"
            onClick={() => {
              toast.success("Payment Successful");
              placeOrder();
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white py-10 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">🛒 My Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-400">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col items-center gap-6 max-w-4xl mx-auto">
          {cart.map(({ image, name, price, quantity, productId }) => (
            <div
              key={productId}
              className="bg-gray-800 rounded-xl p-4 md:p-6 w-full flex flex-col md:flex-row items-center gap-4 md:gap-6 shadow-md"
            >
              <img
                src={image}
                alt={name}
                className="h-24 w-24 md:h-32 md:w-32 object-contain bg-gray-700 rounded-md"
              />
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-lg md:text-xl font-semibold">{name}</h2>
                <p className="text-gray-400">Price: ₹{price} | Qty: {quantity}</p>
                <p className="text-green-400 font-bold mt-1">Total: ₹{price * quantity}</p>
              </div>
              <Button
                label="Remove"
                variant="danger"
                onClick={() => {
                  removeItemFromCart(productId);
                }} />
            </div>
          ))}

          <div className="bg-gray-800 rounded-xl p-6 w-full text-right mt-4 shadow-md">
            <h3 className="text-xl md:text-2xl font-semibold text-center md:text-right">Total: ₹{total}</h3>
            <div className="mt-4 text-center md:text-right">
              <Button 
              label="Proceed to Checkout" variant="primary" 
              onClick={() => setIsCheckoutOpen(true)} />
            </div>
          </div>
        </div>
      )}

      <CheckoutDialog isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
      <PaymentDialog isPaymentOpen={isPaymentOpen} />
      <Toaster />
    </div>
  );
}

export default Cart;
