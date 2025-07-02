import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Button from "../components/Button";
import Input from "../components/Input";
import { getJwtToken, api } from "../utils/common";

function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState(localStorage.getItem("address") || "");
  const [phone, setPhone] = useState(localStorage.getItem("phone") || "");
  const [paymentMode, setPaymentMode] = useState("COD");

  useEffect(() => {
    document.title = "UrbanKart - Cart";
    loadCart();
  }, []);

  const loadCart = () => {
    try {
      const stored = JSON.parse(localStorage.getItem("cart") || "[]");
      setCart(Array.isArray(stored) ? stored : []);
    } catch {
      setCart([]);
    }
  };

  useEffect(() => {
    const sum = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(sum);
  }, [cart]);

  const applyCoupon = () => {
    if (coupon === "URBAN10") {
      const off = Math.min(200, total * 0.1);
      setDiscount(off);
      toast.success(`Coupon applied! ₹${off.toFixed(0)} off`);
    } else {
      setDiscount(0);
      toast.error("Invalid coupon code");
    }
  };

  const placeOrder = async () => {
    if (!name || !address || !phone) {
      toast.error("Please fill all fields");
      return;
    }
    localStorage.setItem("address", address);
    localStorage.setItem("phone", phone);

    try {
      const orderBody = {
        products: cart.map((p) => ({
          productId: p.productId,
          quantity: p.quantity,
          price: p.price,
        })),
        deliveryAddress: address,
        paymentMode,
        phone,
        coupon: coupon || null,
      };
      await api.post("/orders", orderBody, {
        headers: { Authorization: getJwtToken() },
      });
      toast.success("Order placed!");
      localStorage.removeItem("cart");
      setTimeout(() => (window.location.href = "/user/orders"), 1500);
    } catch {
      toast.error("Failed to place order");
    }
  };

  const CheckoutDialog = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50" onClick={onClose}>
        <div className="bg-gray-900 text-white p-6 rounded-xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
          <h2 className="text-2xl font-bold mb-6 text-center">Checkout</h2>
          <Input label="Name" val={name} onChange={setName} placeholder="Your name" />
          <Input label="Address" val={address} onChange={setAddress} placeholder="Delivery address" />
          <Input label="Phone" val={phone} onChange={setPhone} placeholder="Phone number" />

          <div className="mt-4">
            <label className="text-sm">Payment Mode</label>
            <select value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}
              className="w-full p-2 rounded-lg bg-gray-800 border text-white mt-1">
              <option value="COD">COD</option>
              <option value="UPI">UPI</option>
            </select>
          </div>

          <div className="mt-4">
            <Input label="Coupon Code" val={coupon} onChange={setCoupon} placeholder="e.g. URBAN10" />
            <Button label="Apply Coupon" variant="secondary" onClick={applyCoupon} />
            {discount > 0 && <p className="mt-2 text-green-400">Discount: ₹{discount.toFixed(0)}</p>}
          </div>

          <div className="mt-6 text-center">
            <Button label="Continue to Payment" variant="primary" onClick={() => {
              setIsCheckoutOpen(false);
              setIsPaymentOpen(true);
            }} />
          </div>
        </div>
      </div>
    );
  };

  const PaymentDialog = ({ isPaymentOpen }) => {
    if (!isPaymentOpen) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div className="bg-gray-900 text-white p-6 rounded-xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
          <h2 className="text-2xl font-semibold text-center mb-6">Complete Your Payment</h2>
          {paymentMode === "UPI" && (
            <div className="flex flex-col items-center">
              <img src="/upi-sample.png" alt="UPI QR" className="h-40 mb-4" />
              <p className="mb-4">Scan to pay via UPI</p>
            </div>
          )}
          <Button label="Complete Payment" variant="primary" onClick={() => {
            toast.success("Payment Successful");
            placeOrder();
          }} />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-4">
      <h1 className="text-center text-3xl font-bold mb-8">🛒 My Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center text-gray-400">Cart is empty.</p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {cart.map((p) => (
            <div key={p.productId} className="flex flex-col md:flex-row bg-gray-800 p-4 rounded-xl items-center gap-4 shadow-md">
              <img src={p.image} alt={p.name} className="h-24 w-24 object-contain bg-gray-700 rounded-md" />
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-lg font-semibold">{p.name}</h2>
                <p className="text-gray-400">₹{p.price} × {p.quantity}</p>
                <p className="text-green-400 font-bold mt-1">₹{p.price * p.quantity}</p>
              </div>
              <Button label="Remove" variant="danger" onClick={() => {
                const updated = cart.filter((c) => c.productId !== p.productId);
                setCart(updated);
                localStorage.setItem("cart", JSON.stringify(updated));
                toast.success("Removed");
              }} />
            </div>
          ))}
          <div className="bg-gray-800 rounded-xl p-6 shadow-md text-right">
            <p className="text-xl font-semibold">Subtotal: ₹{total.toFixed(0)}</p>
            {discount > 0 && <p className="text-green-400">Discount: -₹{discount.toFixed(0)}</p>}
            <p className="text-2xl font-bold">Total: ₹{(total - discount).toFixed(0)}</p>
            <div className="mt-4">
              <Button label="Checkout" variant="primary" onClick={() => setIsCheckoutOpen(true)} />
            </div>
          </div>
        </div>
      )}
      <CheckoutDialog isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
      <PaymentDialog isPaymentOpen={isPaymentOpen}/>
      <Toaster />
    </div>
  );
}

export default Cart;
