import {
  ChevronLeft as LeftArrow,
  Minus as MinusIcon,
  Plus as PlusIcon,
  ChevronRight as RightArrow,
} from "lucide-react";
import React, { useState } from "react";
import { shortText } from "../utils/common";
import Button from "./Button";
import toast from "react-hot-toast";

function ProductCard({
  _id,
  name,
  price,
  currentPrice,
  shortDescription,
  images,
  tags,
  category,
}) {
  const defaultImage = "https://via.placeholder.com/300x300?text=Product+Image";
  const [currentImage, setCurrentImage] = useState(
    Array.isArray(images) && images.length > 0 ? images[0] : defaultImage
  );
  const [quantity, setQuantity] = useState(1);

  const leftArrowClick = () => {
    const currentIndex = images.indexOf(currentImage);
    const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    setCurrentImage(images[newIndex]);
  };

  const rightArrowClick = () => {
    const currentIndex = images.indexOf(currentImage);
    const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    setCurrentImage(images[newIndex]);
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const product = {
      productId: _id,
      name,
      image: currentImage,
      quantity,
      price: currentPrice,
    };

    const existingIndex = cart.findIndex((item) => item.productId === _id);

    if (existingIndex > -1) {
      cart[existingIndex].quantity = quantity;
    } else {
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Product added to cart");
  };

  return (
    <div className="bg-gray-800 text-white rounded-2xl shadow-lg w-full max-w-xs p-8 m-6 relative transition-transform hover:scale-105 hover:shadow-indigo-500/40">
      <span className="absolute top-2 right-2 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
        {category}
      </span>

      <div className="relative h-36 my-4">
        <LeftArrow
          size={24}
          className="absolute top-1/2 -translate-y-1/2 left-0 z-10 cursor-pointer text-gray-400 hover:text-indigo-400"
          onClick={leftArrowClick}
        />
        <img
          src={currentImage}
          alt={name}
          className="w-full h-full object-contain rounded-md bg-gray-700"
        />
        <RightArrow
          size={24}
          className="absolute top-1/2 -translate-y-1/2 right-0 z-10 cursor-pointer text-gray-400 hover:text-indigo-400"
          onClick={rightArrowClick}
        />
      </div>

      <div className="mb-2 flex flex-wrap gap-2">
        {tags?.map((tag, idx) => (
          <span
            key={idx}
            className="bg-gray-700 text-gray-300 px-2 py-1 text-xs rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <h2 className="font-semibold text-lg">{shortText(name, 40)}</h2>
      <p className="text-sm text-gray-400 mb-2">
        {shortText(shortDescription, 80)}
      </p>

      <p className="text-xl mb-3">
        <del className="text-red-400 mr-2">₹{price}</del>
        <span className="font-bold text-green-400">₹{currentPrice}</span>
      </p>

      <div className="flex justify-center items-center mb-4">
        <MinusIcon
          className={`cursor-pointer ${
            quantity <= 1 ? "text-gray-600" : "text-white hover:text-indigo-300"
          }`}
          onClick={() => quantity > 1 && setQuantity(quantity - 1)}
        />
        <span className="mx-3 text-lg font-medium">{quantity}</span>
        <PlusIcon
          className="cursor-pointer text-white hover:text-indigo-300"
          onClick={() => setQuantity(quantity + 1)}
        />
      </div>

      <div className="flex justify-center">
        <Button label="Add to Cart" variant="primary" onClick={handleAddToCart} />
      </div>
    </div>
  );
}

export default ProductCard;
