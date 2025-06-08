import React,{useEffect, useState} from 'react'
import axios from 'axios';
import toast, {Toaster} from 'react-hot-toast';
import ProductCard from '../components/ProductCard';

function Home() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const loadProducts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/products=${search}`, {
        headers: {
          Authorization: localStorage.getItem("e-commerce-user-token") || ""
        }
      });
      setProducts(response.data.data);
    } catch (error) {
      toast.error("Failed to load products. Please try again later.");
    }
  }
  

  useEffect(() => {
    loadProducts();
  }, [search]);

  return (
    <div>
      <div>
        <input
         type="text" placeholder='Search products...' className='w-full max-w-md mx-auto p-2 border border-gray-300 rounded-lg'
         value={search}
         onChange={(e)=> setSearch(e.target.value)} 
         />
      </div>
      <div className='flex flex-wrap justify-center items-center gap-4 p-4'>
      {products.map((product)=>{
        return <ProductCard key={product._id}{...product}/>
      })}
      </div>
    <Toaster />  
    </div>
  );
}

export default Home