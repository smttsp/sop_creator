import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TextAnimation from './TextAnimation';
import Attraction from './Attraction';

const ElaborateBg = () => {
  const [showTextAnimation, setShowTextAnimation] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowTextAnimation(true);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="w-full mt-10 pt-6 bg-gradient-to-b from-white via-pink-200 to-green-300 h-auto bg-black px-3">
      <AnimatePresence>
        {showTextAnimation && (
          <motion.div
            key="textAnimation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-white"
          >
            <TextAnimation text="Craft standout resumes, unlock opportunities with our powerful cover letter generator." speed={50} />
          </motion.div>
        )}
      </AnimatePresence>
      <Attraction/>
    </div>
  );
};

export default ElaborateBg;
