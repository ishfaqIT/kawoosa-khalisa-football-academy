import React from 'react';
import { motion } from 'framer-motion';

const KKFACrest = ({ className = "w-32 h-32" }) => {
  return (
    <div className={`${className} relative flex items-center justify-center`}>
      <motion.svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full h-full"
      >
        {/* Shield Outer Border */}
        <motion.path
          d="M100 20 L160 40 C160 120 100 180 100 180 C100 180 40 120 40 40 L100 20 Z"
          stroke="#00FF87"
          strokeWidth="4"
        />
        
        {/* Inner Shield */}
        <motion.path
          d="M100 30 L150 47 C150 115 100 170 100 170 C100 170 50 115 50 47 L100 30 Z"
          stroke="#FFD700"
          strokeWidth="2"
        />

        {/* Football Shape */}
        <motion.circle
          cx="100"
          cy="100"
          r="30"
          stroke="#00FF87"
          strokeWidth="2"
        />
        
        <motion.path
          d="M80 80 L120 120 M120 80 L80 120 M100 70 L100 130 M70 100 L130 100"
          stroke="#00FF87"
          strokeWidth="1"
        />

        {/* Text Area */}
        <defs>
          <path
            id="arcPath"
            d="M55 60 A60 60 0 0 1 145 60"
          />
        </defs>
        
        <motion.text
          className="font-orbitron font-bold"
          fill="#00FF87"
          fontSize="14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          <textPath href="#arcPath" startOffset="50%" textAnchor="middle">
            K K F A
          </textPath>
        </motion.text>
        
        <motion.text
          x="100"
          y="150"
          textAnchor="middle"
          fill="#FFD700"
          fontSize="10"
          className="font-orbitron"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
        >
          EST. 2016
        </motion.text>
      </motion.svg>
    </div>
  );
};

export default KKFACrest;
