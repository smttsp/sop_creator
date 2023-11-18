'use client'
import { useState } from "react";
import { motion } from "framer-motion";
import SignInForm from "./SignIn";
import SignUpForm from "./SignUp";

const Auth = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false)
  const toggleSignIn = () => {
      setShowSignIn(!showSignIn);
      if (showSignUp) {
          setShowSignUp(!showSignUp)
      }
  };
  const toggleSignUp = () => {
      setShowSignUp(!showSignUp)
      if (showSignIn) {
          setShowSignIn(!showSignIn)
      }
  }
  return (
    <div className="flex gap-2 h-10">
      <motion.button
        whileHover={{ scale: 1.05, fontWeight: "bold", color: "#4a5568" }}
        whileTap={{ scale: 0.95 }}
        className="bg-white h-full flexCenter text-gray-850 font-semibold px-4 rounded-md hover:font-bold hover:text-black"
        onClick={toggleSignIn}
      >
        Login
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05, fontWeight: "bold" }}
        whileTap={{ scale: 0.95 }}
        className="bg-gray-850 h-full flexCenter text-white font-semibold px-4 rounded-md hover:font-bold"
        onClick={toggleSignUp}
      >
        Sign in
      </motion.button>
      {showSignIn && <SignInForm onClose={toggleSignIn}/>}
      {showSignUp && <SignUpForm onClose={toggleSignUp}/>}
    </div>
  );
};

export default Auth;










