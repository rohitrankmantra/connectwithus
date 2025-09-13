// src/components/GiveHero.jsx
import React from "react";
import { motion } from "framer-motion";
import img1 from "../assets/images/hero1.jpg";

function GiveHero() {
  return (
    <section className="relative w-full h-[70vh] font-inter overflow-hidden">
      {/* Background Image */}
      <img
        src={img1}
        alt="Donation background"
        className="absolute inset-0 w-full h-full object-cover scale-105 animate-pulse-slow"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-3xl md:text-5xl font-extrabold mb-4 drop-shadow-xl"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          Give With <span className="text-yellow-400">Purpose</span>
        </motion.h1>

        <motion.p
          className="text-base md:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Your donation helps us spread God’s word, support our ministries, and 
          make a lasting impact in communities worldwide. <br />
          <span className="text-yellow-300">Every gift matters.</span>
        </motion.p>

        <motion.a
          href="#donation-form"
          className="inline-block mt-6 px-10 py-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-full shadow-xl transition-transform duration-300 hover:scale-105 hover:shadow-yellow-400/50"
          whileHover={{ y: -2 }}
        >
          Make a Donation
        </motion.a>
      </motion.div>

      {/* Slow Zoom Animation */}
      <style>{`
        .animate-pulse-slow {
          animation: zoomInOut 12s ease-in-out infinite alternate;
        }
        @keyframes zoomInOut {
          0% { transform: scale(1.05); }
          100% { transform: scale(1.1); }
        }
      `}</style>
    </section>
  );
}

export default GiveHero;
