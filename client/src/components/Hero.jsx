import React, { useEffect, useState } from 'react';

const carouselImages = [
  "/banners/banner1.jpg",
  "/banners/banner2.jpg",
  "/banners/banner3.jpg"
];

const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % carouselImages.length);
    }, 5000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex justify-center relative my-6">
      <img
        src={carouselImages[index]}
        alt={`UrbanKart Banner ${index + 1}`}
        className="w-[80%] max-h-[500px] rounded-2xl shadow-xl object-cover transition-all duration-700 ease-in-out"
      />
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[80%] h-full flex items-center justify-center">
        <div className="backdrop-blur-md bg-black/30 p-6 rounded-xl w-[95%] h-[90%] text-center text-white">
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white leading-relaxed">
            Discover timeless comfort and modern elegance, all under one roof.<br />
            From chic cushions to cozy rugs — <strong>UrbanKart</strong> transforms your space.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
