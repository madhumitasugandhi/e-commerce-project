import React from 'react'
import { getReadableTimestamp } from '../utils/common';

function OrderCard({order, onClick}) {
    if (!order) {
        return <p>No order details available.</p>;
    }

    const {_id, status, products, createdAt, totalBill, deliveryAddress} = order;
    return (
        <div>
           <p>Order ID:{_id}, Ordered On : {getReadableTimestamp(createdAt)} </p>
           <p>{products.map((products)=> products.productId.name).join(", ")}
           </p>
           <p>Total Amount:₹{totalBill}</p>
            <p>Address:{deliveryAddress}</p>


           
           <span>Status: {status}</span>
        </div>
    )
}


export default OrderCard