import React from 'react';
import { motion } from 'framer-motion';

const AnimatedIcon = ({ children, className = "", delay = 0, ...props }) => {
  return (
    <motion.div
      className={`inline-flex items-center justify-center ${className}`}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: delay,
        type: "spring",
        stiffness: 200,
        damping: 12
      }}
      whileHover={{ 
        scale: 1.2, 
        rotate: 5,
        transition: { duration: 0.2 }
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedIcon; 