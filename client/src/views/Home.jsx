import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ProductCard from '../components/ProductCard';
import { ShoppingCart as ShoppingCartIcon } from 'lucide-react';
import { api } from '../utils/common';

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  const loadProducts = async () => {
    try {
      const response = await api.get(
        `/products?search=${search}`,
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
 
  <div className="group inline-block mb-4">
    <h1 className="text-6xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500 transform group-hover:from-cyan-400 group-hover:to-blue-500 group-hover:scale-105">
      UrbanKart
    </h1>
  </div>

  <p className="text-gray-400 text-lg mb-6">
    Your one-stop shop for all things stylish, convenient, and affordable.<br />
    Explore a world of products tailored just for you.
  </p>

  <input
    type="text"
    placeholder="Search products..."
    className="w-full max-w-md p-2 text-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-500"
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
     
      <Toaster position="top-right" />
    </div>
  );
}

export default Home;
