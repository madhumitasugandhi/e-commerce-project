import React from 'react'

function OrderCard() {

    const {_id, status, products} = order;
    return (
        <div>
           <p>Order ID:{_id}</p>
           <p></p>
           <span>{status}</span>
        </div>
    )
}

export default OrderCard