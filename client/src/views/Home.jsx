import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ProductCard from "../components/ProductCard";
import { api } from "../utils/common";
import Hero from "../components/Hero";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    document.title = "UrbanKart - Home";
  }, []);

  const loadProducts = async () => {
    try {
      const response = await api.get(`/products?search=${search}`, {
        headers: {
          Authorization: localStorage.getItem("e-commerce-user-token") || "",
        },
      });
      setProducts(response.data.data);
    } catch (error) {
      toast.error("Failed to load products. Please try again later.");
    }
  };

  // Debounce search
  useEffect(() => {
    const delay = setTimeout(() => {
      loadProducts();
    }, 400);
    return () => clearTimeout(delay);
  }, [search]);

  // Scroll to top when category changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedCategory]);

  // Category extraction
  const allTags = products.flatMap((product) =>
    Array.isArray(product.category)
      ? product.category
      : typeof product.category === "string"
      ? product.category.split(",")
      : []
  );

  const uniqueCategories = [
    ...new Set(
      allTags
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "")
        .map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase())
    ),
  ];

  const categories = ["All", ...uniqueCategories];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => {
          const tags = Array.isArray(product.category)
            ? product.category
            : typeof product.category === "string"
            ? product.category.split(",")
            : [];
          return tags
            .map((tag) => tag.trim().toLowerCase())
            .includes(selectedCategory.toLowerCase());
        });

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4">
      <div className="py-6 text-center">
        <h1 className="inline-block text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-cyan-400 hover:to-blue-500 transition-all duration-500">
          UrbanKart
        </h1>
      </div>

      <Hero />

      {/* Why Shop With Us Section */}
      <div className="w-full py-16 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 leading-snug">
            Why Shop With{" "}
            <span className="inline-block text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-cyan-400 hover:to-blue-500 transition-all duration-500">
              UrbanKart?
            </span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 px-2 sm:px-0">
            {[
              {
                icon: "🚚",
                title: "Fast Delivery",
                desc: "Get your orders within 2–3 days anywhere in India.",
              },
              {
                icon: "🔐",
                title: "Secure Payment",
                desc: "100% secure payment with end-to-end encryption.",
              },
              {
                icon: "💎",
                title: "Premium Quality",
                desc: "Only top-rated, verified, and durable products.",
              },
              {
                icon: "↩️",
                title: "Easy Returns",
                desc: "7-day hassle-free returns and quick refunds.",
              },
              {
                icon: "📞",
                title: "24/7 Support",
                desc: "Always here to help with any queries or issues.",
              },
              {
                icon: "🏷️",
                title: "Exclusive Offers",
                desc: "Get access to member-only discounts and deals.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="relative p-6 bg-gray-800/70 backdrop-blur rounded-2xl shadow-md hover:shadow-blue-500/30 transition-all duration-300 group"
              >
                <div className="flex items-center justify-center w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-white text-3xl shadow-md group-hover:scale-105 transition">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center my-6 px-2">
        <input
          aria-label="Search products"
          type="text"
          placeholder="Search products..."
          className="w-full max-w-md p-2 text-white rounded-md border border-gray-500 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 px-2">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-blue-600 hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 px-4 pb-12">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product._id} {...product} />
          ))
        ) : (
          <p className="text-gray-400 text-lg col-span-full text-center">
            No products found. Try adjusting your search or filters.
          </p>
        )}
      </div>

      <Toaster position="top-right" />
    </div>
  );
}

export default Home;
