// src/components/LandingPage.js
import React from "react";
import { motion } from "framer-motion";

export default function LandingPage({ onLoginClick, onBrowseClick }) {
  return (
    <div className="landing-container min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <div className="text-center max-w-2xl">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-gray-800 mb-4"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Dobrodošli u <span className="text-purple-600">QuizZone</span> 🎓
        </motion.h1>
        <motion.p
          className="text-gray-600 text-lg mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Testirajte svoje znanje iz različitih oblasti – brzo, zabavno i besplatno!
        </motion.p>

        <div className="flex justify-center gap-4">
          <motion.button
            onClick={onLoginClick}
            className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-2xl shadow-md hover:bg-purple-700 transition"
            whileHover={{ scale: 1.05 }}
          >
            Prijavi se / Registruj se
          </motion.button>
          <motion.button
            onClick={onBrowseClick}
            className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-2xl shadow-md hover:bg-gray-300 transition"
            whileHover={{ scale: 1.05 }}
          >
            Pregledaj kvizove
          </motion.button>
        </div>
      </div>

      <motion.div
        className="mt-12 flex gap-8 flex-wrap justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="Student"
          className="w-32 h-32"
        />
        <img
          src="https://cdn-icons-png.flaticon.com/512/2942/2942789.png"
          alt="Knowledge"
          className="w-32 h-32"
        />
        <img
          src="https://cdn-icons-png.flaticon.com/512/1048/1048949.png"
          alt="Quiz"
          className="w-32 h-32"
        />
      </motion.div>
    </div>
  );
}
