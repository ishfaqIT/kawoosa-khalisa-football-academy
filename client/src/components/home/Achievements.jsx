import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Target, Star } from 'lucide-react';

const achievements = [
  {
    icon: <Trophy size={32} />,
    title: "Regional Champions",
    year: "2023",
    description: "Our U-17 wing secured the North Zone championship title with an unbeaten record."
  },
  {
    icon: <Award size={32} />,
    title: "Best Youth Academy",
    year: "2022",
    description: "Awarded 'Most Innovative Training Program' by the State Football Association."
  },
  {
    icon: <Star size={32} />,
    title: "Pro Pipeline",
    year: "2025",
    description: "Milestone reached: 20+ players signed by high-tier domestic clubs for the 24/25 season."
  },
  {
    icon: <Target size={32} />,
    title: "Elite Infrastructure",
    year: "2024",
    description: "Full modernization of our Kawoosa and Kunzer training facilities completed."
  }
];

const Achievements = () => {
  return (
    <section style={{ padding: '8rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase' }}
        >
          Institutional Excellence
        </motion.span>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginTop: '0.5rem' }} className="text-gradient">
          HONOURS & ACHIEVEMENTS
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        {achievements.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="premium-card"
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '1.5rem',
              backgroundImage: 'radial-gradient(circle at top right, rgba(57, 255, 20, 0.05), transparent)'
            }}
          >
            <div style={{ color: 'var(--primary)', width: 'fit-content', padding: '1rem', background: 'rgba(57, 255, 20, 0.1)', borderRadius: '1rem' }}>
              {item.icon}
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', margin: 0 }}>{item.title}</h3>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, opacity: 0.6 }}>{item.year}</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Achievements;
