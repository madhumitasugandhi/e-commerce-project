import React, {use, useEffect, useState} from 'react'
import { getCurrentUser, getJwtToken } from '../utils/comman';
import toast from 'react-hot-toast';
import axios from 'axios';
import OrderCard from '../components/OrderCard';

function UserOrder() {

const [user, setUser] = useState({});
const [orders, setOrders] = useState([]);

const loadUSerOrders = async () => {
  if(!user._id) {
    toast.error("User not found, please login again.");
    return;
  }
try{
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
  if (user ) {
    loadUSerOrders();
  } else {
    toast.error("Please log in to view your orders.");
  }
}, [user]);


  return (
    <div>
      <h1>My Orders</h1>
      <p>
        Welcome, {user.name ? user.name : "Guest"}! Here you can view your orders.
        {user.email ? ` Your email is ${user.email}` : " Please log in to see your orders."}
      </p>
      <div>{
        orders.map((order)=>{
          return<OrderCard 
          key={order._id}
          order={order}
            />
        })
        }</div>
    </div>
  )
}

export default UserOrder