import React from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, Zap, Shield, TrendingUp } from 'lucide-react';

const Highlights = () => {
  return (
    <section style={{ padding: '8rem 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))', gap: '4rem', alignItems: 'center', padding: '0 1rem' }}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase' }}>
            Tactical Evolution
          </span>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, margin: '1rem 0 2rem' }} className="text-gradient">
            WHERE TECHNIQUE MEETS TALENT
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2.5rem', lineHeight: 1.7 }}>
            Our academy utilizes cutting-edge tactical training and individual skill development to prepare players for the highest level of competition. From core basics to advanced field positioning, we cover it all.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ color: 'var(--primary)', padding: '0.5rem' }}><Zap size={24} /></div>
              <div>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.2rem' }}>Agility Training</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Explosive speed & control</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ color: 'var(--primary)', padding: '0.5rem' }}><TrendingUp size={24} /></div>
              <div>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.2rem' }}>Tactical IQ</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Game reading & positioning</p>
              </div>
            </div>
          </div>

          <button className="btn btn-primary" style={{ marginTop: '3rem' }}>
            LEARN OUR PHILOSOPHY
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          style={{ position: 'relative' }}
        >
          <div style={{ 
            width: '100%', 
            aspectRatio: '4/3', 
            borderRadius: '2rem', 
            overflow: 'hidden',
            border: '1px solid var(--border-light)',
            boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
            position: 'relative'
          }}>
            <img 
              src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1200" 
              alt="Training Highlight" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ 
              position: 'absolute', 
              inset: 0, 
              background: 'linear-gradient(to top, rgba(10,31,68,0.7), transparent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                style={{ 
                  background: 'transparent', 
                  border: 'none', 
                  color: 'var(--primary)', 
                  cursor: 'pointer',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {/* Pulsing Ripple Effect */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.5, 2],
                    opacity: [0.5, 0.3, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                  style={{ 
                    position: 'absolute',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'var(--primary)',
                    zIndex: -1
                  }}
                />
                
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <PlayCircle size={85} style={{ filter: 'drop-shadow(0 0 25px var(--primary-glow))' }} />
                </motion.div>
              </motion.button>
            </div>
          </div>

          {/* Floating Stats */}
          <div style={{ 
            position: 'absolute', 
            bottom: '-1rem', 
            right: '1rem',
            background: 'var(--bg-card)',
            backdropFilter: 'blur(10px)',
            padding: '1.5rem',
            borderRadius: '1.5rem',
            border: '1px solid var(--border-light)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '3rem', height: '3rem', background: 'rgba(57, 255, 20, 0.1)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                <Shield size={24} />
              </div>
              <div>
                <p style={{ fontSize: '0.65rem', color: 'var(--text-dim)', fontWeight: 800 }}>DEFENSIVE RATING</p>
                <p style={{ fontSize: '1.25rem', fontWeight: 900, color: 'white' }}>ELITE</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Highlights;
