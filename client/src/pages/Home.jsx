import React from 'react';
import Hero from '../components/home/Hero';
import WingSelector from '../components/home/WingSelector';
import AcademyStats from '../components/home/AcademyStats';
import Achievements from '../components/home/Achievements';
import Highlights from '../components/home/Highlights';
import Testimonials from '../components/home/Testimonials';
import Partners from '../components/home/Partners';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';

const Home = () => {
  return (
    <div style={{ backgroundColor: 'var(--bg-deep)', minHeight: '100vh' }}>
      <Hero />

      <div className="container" style={{ padding: '0 2rem' }}>
        <div style={{ marginTop: '4rem' }}>
          <WingSelector />
        </div>

        {/* Tactical Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', margin: '8rem 0 4rem' }}
        >
          <span style={{ color: 'var(--primary)', fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.4em', textTransform: 'uppercase' }}>
            Mission Control
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', margin: '0.5rem 0 1rem' }} className="text-gradient">
            ACADEMY DATA FEED
          </h2>
          <div style={{ width: '5rem', height: '4px', background: 'var(--primary)', margin: '0 auto 1.5rem', borderRadius: '2px', boxShadow: '0 0 15px var(--primary-glow)' }} />
          <p style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.8rem', fontWeight: 600 }}>
            Real-time performance analytics & tactical status
          </p>
        </motion.div>

        <AcademyStats />

        <Highlights />

        <Achievements />

        <Testimonials />

        {/* Final CTA */}
        <section style={{ padding: '8rem 0' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{ 
              background: 'linear-gradient(135deg, rgba(57, 255, 20, 0.1) 0%, rgba(10, 31, 68, 0.9) 100%)',
              border: '1px solid var(--primary-glow)',
              borderRadius: '3rem',
              padding: '6rem 4rem',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{ 
              position: 'absolute', 
              top: '-10%', 
              right: '-5%', 
              width: '40%', 
              height: '140%', 
              background: 'radial-gradient(circle, var(--primary-glow) 0%, transparent 70%)',
              opacity: 0.1,
              pointerEvents: 'none'
            }} />

            <Zap size={48} color="var(--primary)" style={{ margin: '0 auto 2rem', filter: 'drop-shadow(0 0 15px var(--primary-glow))' }} />
            
            <h2 style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', marginBottom: '1.5rem', lineHeight: 1.1 }}>
              READY TO BECOME <br /> <span className="text-gradient">A LEGEND?</span>
            </h2>
            
            <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '40rem', margin: '0 auto 3rem', lineHeight: 1.6 }}>
              Join Kashmir's most elite youth football infrastructure. Developing young talent since 2016.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem' }}>
              <button className="btn btn-primary" onClick={() => window.location.href = '/register'}>
                APPLY FOR TRIALS <ArrowRight size={18} />
              </button>
              <button className="btn btn-outline" onClick={() => window.location.href = '/about'}>
                EXPLORE ACADEMY
              </button>
            </div>
          </motion.div>
        </section>

        <Partners />

        <div style={{ padding: '5rem 0', textAlign: 'center', color: 'var(--text-dim)', borderTop: '1px solid var(--border-light)', textTransform: 'uppercase', letterSpacing: '0.4em', fontSize: '0.7rem', fontWeight: 700 }}>
          EST. 2016 • KASHMIR • KAWOOSA KHALISA FOOTBALL ACADEMY
        </div>
      </div>
    </div>
  );
};

export default Home;
