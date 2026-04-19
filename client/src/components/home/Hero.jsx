import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import KKFACrest from '../ui/KKFACrest';

const ParticleField = () => {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', height: '120vh' }}>
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          style={{ position: 'absolute', background: 'var(--primary)', borderRadius: '50%', opacity: 0.1, width: "2px", height: "2px" }}
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
          }}
          animate={{
            y: ["-10%", "110%"],
          }}
          transition={{
            duration: Math.random() * 15 + 15,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * -20,
          }}
        />
      ))}
    </div>
  );
};

const TypewriterText = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span style={{ color: 'var(--primary)' }}>
      {displayText}
    </span>
  );
};

const Hero = () => {
  return (
    <section style={{ 
      position: 'relative', 
      minHeight: '95vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      overflow: 'hidden',
      paddingTop: '5rem'
    }}>
      <ParticleField />
      
      <div className="mesh-gradient" style={{ top: '10%' }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)', lineHeight: 1.1, marginBottom: '2rem' }}
          className="text-gradient"
        >
          KAWOOSA KHALISA <br />
          <TypewriterText text="FOOTBALL ACADEMY." />
        </motion.h1>

        <motion.div
           initial={{ scale: 0.9, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ delay: 1, duration: 1, type: 'spring' }}
        >
          <motion.h2
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: 'var(--primary)', fontStyle: 'italic', fontWeight: 800, letterSpacing: '0.1em', marginTop: '1rem', textTransform: 'uppercase' }}
          >
            "Young Kashmir, Healthy Kashmir"
          </motion.h2>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
