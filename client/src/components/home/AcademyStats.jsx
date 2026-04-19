import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

const Counter = ({ value, label }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  
  const spring = useSpring(0, {
    mass: 1,
    stiffness: 100,
    damping: 30,
  });
  
  const displayValue = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  useEffect(() => {
    return displayValue.onChange((v) => setCount(v));
  }, [displayValue]);

  return (
    <div ref={ref} className="stat-container">
      <motion.span className="stat-value">
        {count}
        <span style={{ color: 'var(--primary)' }}>+</span>
      </motion.span>
      <span className="stat-label">
        {label}
      </span>
    </div>
  );
};

const AcademyStats = () => {
  return (
    <section style={{ padding: '5rem 0', position: 'relative' }}>
      <div className="container grid-auto-fit">
        <Counter value={250} label="Players Enrolled" />
        <Counter value={18} label="Expert Coaches" />
        <Counter value={120} label="Matches Played" />
        <Counter value={12} label="Trophies Won" />
        <Counter value={9} label="Years Active" />
        <Counter value={450} label="Goals Scored" />
      </div>
    </section>
  );
};

export default AcademyStats;
