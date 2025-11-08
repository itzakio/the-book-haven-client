import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1500&q=80",
    title: "Empower Your Digital Journey",
    subtitle: "Join ICT_Solution to master web technologies today.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1500&q=80",
    title: "Learn React, Node, and Beyond",
    subtitle: "Turn your ideas into amazing web applications.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1500&q=80",
    title: "Your Coding Future Starts Here",
    subtitle: "Get guided lessons and live mentorship.",
  },
];

export default function BannerSlider() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  // Optional: auto-slide every 5s
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[80vh] overflow-hidden shadow-lg">
      <AnimatePresence>
        <motion.div
          key={slides[index].id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slides[index].image})` }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Text content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
            <motion.h2
              key={slides[index].title}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 2 }}
              className="text-4xl md:text-6xl font-bold mb-4"
            >
              {slides[index].title}
            </motion.h2>

            <motion.p
              key={slides[index].subtitle}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration:2.1 }}
              className="text-lg md:text-2xl max-w-2xl"
            >
              {slides[index].subtitle}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Custom buttons */}
      <div className="absolute right-4 bottom-4 w-40 flex justify-around z-999">
        <button
        onClick={prevSlide}
        className=" bg-white/20 hover:bg-white/40 p-3 rounded-full text-white transition"
      >
        <FaChevronLeft size={32}/>
      </button>

      <button
        onClick={nextSlide}
        className=" bg-white/20 hover:bg-white/40 p-3 rounded-full text-white transition"
      >
        <FaChevronRight size={32}/>
      </button>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === i ? "bg-white" : "bg-white/40"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
