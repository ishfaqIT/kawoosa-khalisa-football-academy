import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { fetchStats } from '../../api';

const Counter = ({ value, label, suffix = "+" }) => {
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
        <span style={{ color: 'var(--primary)' }}>{suffix}</span>
      </motion.span>
      <span className="stat-label">
        {label}
      </span>
    </div>
  );
};

const AcademyStats = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats().then(res => {
      if (res.data.success) setStats(res.data.data);
    }).catch(() => {});
  }, []);

  return (
    <section style={{ padding: '5rem 0', position: 'relative' }}>
      <div className="container grid-auto-fit">
        <Counter value={stats?.players || 250} label="Players Enrolled" />
        <Counter value={stats?.coaches || 18} label="Expert Coaches" />
        <Counter value={stats?.fixtures || 120} label="Matches Played" />
        <Counter value={stats?.trophies || 12} label="Trophies Won" />
        <Counter value={stats?.yearsActive || 8} label="Years Active" />
        <Counter value={stats?.goalsScored || 450} label="Goals Scored" />
      </div>
    </section>
  );
};

export default AcademyStats;
