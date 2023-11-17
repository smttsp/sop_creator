'use client'
import { motion } from "framer-motion";

const Promo = () => {
  return (
    <div className="w-full mx-auto mt-32 ">
      <div className="text-center">
        <p className="text-gray-850 text-5xl font-extrabold">Make yourself Ready </p>
        <p className="text-gray-850 text-5xl font-extrabold">For a new era of AI</p>
        <p className="text-gray-20 mt-4 mb-6">Your resume will be one of the top 10% in the world</p>
        <div className="flexCenter h-12 gap-10 mx-auto">
          <motion.button
            whileHover={{ scale: 1.05, fontWeight: "bold" }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-850 h-full flexCenter text-white font-semibold px-4 rounded-md w-48"
          >
            Start Free Trial
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, fontWeight: "bold", borderColor: "#4a5568", color: "#4a5568" }}
            whileTap={{ scale: 0.95 }}
            className="bg-white h-full flexCenter text-gray-850 font-semibold px-4 rounded-md w-48 border-2 border-gray-850"
          >
            Premium Version
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Promo;
