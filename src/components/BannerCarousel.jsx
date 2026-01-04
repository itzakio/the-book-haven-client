import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router";


const slides = [
  {
    id: 1,
    title: "Explore Thousands of Books",
    subtitle: "Find your next great read from our massive collection.",
    img: "https://i.pinimg.com/1200x/67/18/22/671822c2f63dd5f65d8fd15c9710420b.jpg",
  },
  {
    id: 2,
    title: "Your Digital Library",
    subtitle: "Borrow, read, and enjoy — anytime, anywhere.",
    img: "https://i.pinimg.com/1200x/35/f0/d1/35f0d1084ae0b965f87c22e8f64f8e18.jpg",
  },
  {
    id: 3,
    title: "Discover New Worlds",
    subtitle: "Dive into adventures with our curated book categories.",
    img: "https://i.pinimg.com/736x/2e/aa/b6/2eaab6e4308b76f52108bc110a6df0fd.jpg",
  },
];

const BannerCarousel = () => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  // autoplay
  const startAutoPlay = () => {
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);
  };

  useEffect(() => {
    startAutoPlay();
    return () => clearTimeout(timeoutRef.current);
  }, [current]);

  // manual slide buttons
  const nextSlide = () => {
    clearTimeout(timeoutRef.current);
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    clearTimeout(timeoutRef.current);
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <section className="relative overflow-hidden bg-gray-900">
      <div className="w-full h-[380px] sm:h-[450px] md:h-[550px] relative">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute w-full h-full transition-all duration-700 ${
              current === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.img}
              className="w-full h-full object-cover brightness-75"
              alt=""
            />

            {/* TEXT SECTION */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
                {slide.title}
              </h2>

              <p className="text-sm sm:text-lg md:text-xl text-gray-200 mt-3 md:mt-4 max-w-xl">
                {slide.subtitle}
              </p>

              {/* ACTION BUTTONS */}
              <div className="flex gap-4 mt-5 md:mt-6">
                <Link to="/all-books" className="btn rounded-none py-2 px-3 font-medium bg-primary text-white">
                  All Books
                </Link>

                <Link
                  to="/dashboard/add-book"
                  className="btn btn-outline rounded-none py-2 px-3 font-medium hover:bg-primary text-white"
                >
                  Create Book
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 right-4 space-x-5 z-999">
        {/* PREV BUTTON */}
      <button
        onClick={prevSlide}
        className=" btn btn-circle bg-black/40 text-white border-none hover:bg-black"
      >
        ❮
      </button>

      {/* NEXT BUTTON */}
      <button
        onClick={nextSlide}
        className=" btn btn-circle bg-black/40 text-white border-none hover:bg-black"
      >
        ❯
      </button>
      </div>

      {/* DOTS */}
      <div className="absolute bottom-5 w-full flex justify-center space-x-2">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 w-3 rounded-full cursor-pointer transition-all ${
              current === index ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default BannerCarousel;
