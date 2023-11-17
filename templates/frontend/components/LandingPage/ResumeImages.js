// components/ImageContainer.js
import { motion } from 'framer-motion';
import Image from 'next/image';

const ResumeImage = ({imageUrl, alt}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg mx-auto"
    >
      <Image
        src={imageUrl} 
        alt={alt}
        width={800} 
        height={500}
        className="w-full h-auto"
      />
    </motion.div>
  );
};

export default ResumeImage;
