import React from 'react';
import { getReadableTimestamp } from '../utils/common';

function OrderCard({ order, onClick }) {
  const { _id, status, products, createdAt, totalBill, deliveryAddress } = order;

  return (
    <div
      onClick={onClick}
      className="bg-gray-800 p-5 rounded-xl border border-gray-700 shadow-md hover:shadow-lg cursor-pointer transition-all relative"
    >
    
      <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">
        {status}
      </span>

     
      <p className="text-sm text-gray-400 mb-2">
        Order ID: <span className="text-gray-300">{_id.slice(-6)}</span>
      </p>
      <p className="text-sm text-gray-400 mb-4">
        Ordered On: <span className="text-gray-300">{getReadableTimestamp(createdAt)}</span>
      </p>

     
      <p className="text-white font-semibold text-lg mb-2 line-clamp-2">
        {products.map((p) => p.productId?.name || "Unnamed").join(', ')}
      </p>

    
      <p className="text-gray-300 text-sm mb-1">
        <span className="font-medium text-white">Total:</span> ₹{totalBill}
      </p>
      <p className="text-gray-400 text-sm">
        <span className="font-medium text-white">Address:</span> {deliveryAddress}
      </p>
    </div>
  );
}

export default OrderCard;
