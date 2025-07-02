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
    <div className="w-full px-2 sm:px-4 md:px-6 lg:px-10 xl:px-20 relative my-6">
      <div className="relative w-full rounded-2xl overflow-hidden">
        <img
          src={carouselImages[index]}
          alt={`UrbanKart Banner ${index + 1}`}
          className="w-full h-[220px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover rounded-2xl shadow-xl transition-all duration-700 ease-in-out"
        />
        <div className="absolute inset-0 flex items-center justify-center px-2 sm:px-4 md:px-10 lg:px-20">
          <div className="backdrop-blur-md bg-black/40 px-4 py-6 sm:px-10 sm:py-10 md:px-12 md:py-12 lg:px-30  lg:py-24 rounded-xl text-center text-white max-w-4xl w-full">
            <p className="text-sm sm:text-base md:text-xl lg:text-3xl font-semibold leading-snug sm:leading-normal lg:leading-relaxed">
              Discover timeless comfort and modern elegance, all under one roof.<br />
              From chic cushions to cozy rugs — <strong>UrbanKart</strong> transforms your space.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;
