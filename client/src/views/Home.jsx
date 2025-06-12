import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import ProductCard from '../components/ProductCard';
import { ShoppingCart as ShoppingCartIcon, } from 'lucide-react';
import { Link } from 'react-router-dom';

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  const loadProducts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/products?search=${search}`,
        {
          headers: {
            Authorization: localStorage.getItem('e-commerce-user-token') || '',
          },
        }
      );
      setProducts(response.data.data);
    } catch (error) {
      toast.error('Failed to load products. Please try again later.');
    }
  };

  useEffect(() => {
    loadProducts();
  }, [search]);

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4">
      <div className="py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Explore Products</h1>
        <input
          type="text"
          placeholder="Search products..."
          className="w-full max-w-md p-2 text-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap justify-center gap-6 pb-12">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} {...product} />
          ))
        ) : (
          <p className="text-gray-400 mt-10 text-lg">No products found.</p>
        )}
      </div>
      <Link to="/user/cart" className="fixed top-10 right-10 border-2 p-2.5 rounded-full ">
          <ShoppingCartIcon size={30}/>
          
      </Link>
      <Toaster position="top-right" />
    </div>
  );
}

export default Home;
