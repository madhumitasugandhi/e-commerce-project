import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ProductCard from '../components/ProductCard';
import { api } from '../utils/common';

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  const loadProducts = async () => {
    try {
      const response = await api.get(`/products?search=${search}`, {
        headers: {
          Authorization: localStorage.getItem('e-commerce-user-token') || '',
        },
      });
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
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500 transform group-hover:from-cyan-400 group-hover:to-blue-500 group-hover:scale-105">
            UrbanKart
          </h1>
        </div>
        <p className="text-gray-400 text-lg mb-6">
          Your one-stop shop for all things stylish, convenient, and affordable.<br />
          Explore a world of products tailored just for you.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-center text-white mt-16 mb-4">
        Why Shop With UrbanKart?
      </h2>
      <p className="text-center text-gray-400 max-w-2xl mx-auto mb-10 text-base">
        More than just shopping – we offer a seamless, secure, and satisfying experience from cart to doorstep.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
        {[
          {
            icon: '🚚',
            title: 'Fast Delivery',
            description:
              'Lightning-fast shipping across major cities so your products arrive on time, every time.',
          },
          {
            icon: '🔐',
            title: 'Secure Payments',
            description:
              'Industry-standard encryption and security protocols keep your data and payments safe.',
          },
          {
            icon: '🔁',
            title: 'Hassle-Free Returns',
            description:
              'Not satisfied? Enjoy quick, no-questions-asked returns within 7 days.',
          },
          {
            icon: '💬',
            title: '24/7 Support',
            description:
              'We’re here for you round-the-clock with fast and friendly customer care.',
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="relative bg-gray-800/60 border border-gray-700 rounded-3xl p-6 text-center backdrop-blur-lg transition hover:shadow-xl hover:-translate-y-1 duration-300"
          >
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-400 p-4 rounded-full shadow-lg text-white text-3xl">
                {feature.icon}
              </div>
            </div>
            <div className="mt-10">
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-300 leading-relaxed">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12 mb-6">
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
