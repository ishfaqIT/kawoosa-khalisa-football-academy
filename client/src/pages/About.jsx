import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Shield, Trophy, Users, MapPin } from 'lucide-react';


const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-deep)', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Cinematic Banner */}
      <section style={{ position: 'relative', height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img 
            src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=2000" 
            alt="Academy Background" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-deep), rgba(5,7,10,0.6), transparent)' }} />
        </div>
        
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 1rem' }}>
          <motion.h1 
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            animate={{ opacity: 1, letterSpacing: '0.1em' }}
            transition={{ duration: 1.5 }}
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 900, textTransform: 'uppercase', marginBottom: '1rem', color: 'white', lineHeight: 1 }}
          >
            OUR STORY
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            style={{ color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '1.1rem', fontWeight: 700 }}
          >
            Developing young talent since 2016
          </motion.p>
        </div>
      </section>

      {/* Origin Story */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '4rem', alignItems: 'center' }}>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, marginBottom: '2rem', textTransform: 'uppercase' }}>
              OUR <span className="text-gradient">GOAL</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              Kawoosa Khalisa Football Academy (KKFA) was started to give young players in Kashmir a professional place to learn and play football. We now have two branches in Kawoosa and Kunzer to help more children reach their full potential.
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.8 }}>
              We focus on teaching the skills of the game, while also building discipline and teamwork. Our academy helps bridge the gap between playing for fun and playing like a professional.
            </p>
          </motion.div>

          <div style={{ position: 'relative' }}>
            <div className="premium-card" style={{ padding: '1rem', position: 'relative', zIndex: 10, aspectRatio: '16/9' }}>
              <img 
                src="https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&q=80&w=1000" 
                alt="Training" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0.5rem' }}
              />
            </div>
            <div style={{ position: 'absolute', top: '-1rem', right: '-1rem', width: '100%', height: '100%', border: '1px solid var(--primary)', borderRadius: '1rem', opacity: 0.3, zIndex: 0 }} />
          </div>
        </div>
      </section>

      {/* Mission Vision Values */}
      <section style={{ padding: '6rem 0', background: 'rgba(255,255,255,0.02)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          {[
            { title: "MISSION", icon: Target, text: "To identify and nurture football talent using global best practices and modern training methodologies." },
            { title: "VISION", icon: Eye, text: "To become the premier football institute in India, producing world-class athletes for international stages." },
            { title: "VALUES", icon: Shield, text: "Discipline, Integrity, Precision, and Excellence in every touch and every tactical decision." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="premium-card"
              style={{ textAlign: 'center', padding: '3rem 2rem' }}
            >
              <div style={{ display: 'flex', justifyContent: 'center', color: 'var(--primary)', marginBottom: '1.5rem' }}>
                <item.icon size={48} strokeWidth={1} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{item.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Two Wings */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '3rem', fontWeight: 900, textAlign: 'center', marginBottom: '4rem', textTransform: 'uppercase' }}>
            ACADEMY <span className="text-gradient">WINGS</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {/* Kawoosa Wing */}
            <div className="premium-card" style={{ padding: '3rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--primary)' }}>KAWOOSA KHALISA WING</h3>
                <div style={{ padding: '0.75rem', background: 'rgba(0,255,135,0.1)', borderRadius: '50%', color: 'var(--primary)' }}><MapPin /></div>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-dim)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem' }}><span>Head Coach</span> <span style={{ color: 'white' }}>Mohammad Shafi</span></li>
                <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem' }}><span>Primary Ground</span> <span style={{ color: 'white' }}>KK Stadium</span></li>
                <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem' }}><span>Squad Size</span> <span style={{ color: 'white' }}>120+ Players</span></li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>Founded</span> <span style={{ color: 'white' }}>Mar 2016</span></li>
              </ul>
            </div>

            {/* Kunzer Wing */}
            <div className="premium-card" style={{ padding: '3rem', '--primary': 'var(--secondary)', '--primary-glow': 'rgba(255,255,255,0.5)' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--secondary)' }}>KUNZER WING</h3>
                <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', color: 'var(--secondary)' }}><MapPin /></div>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-dim)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem' }}><span>Head Coach</span> <span style={{ color: 'white' }}>Bashrat Ahmad</span></li>
                <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem' }}><span>Primary Ground</span> <span style={{ color: 'white' }}>Kunzer Central Ground</span></li>
                <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem' }}><span>Squad Size</span> <span style={{ color: 'white' }}>80+ Players</span></li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>Founded</span> <span style={{ color: 'white' }}>Jun 2016</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements / Honors */}
      <section style={{ padding: '6rem 0', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)', background: 'rgba(255,255,255,0.02)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '4rem', textTransform: 'uppercase' }}>HONOURS <span style={{ color: 'var(--secondary)' }}>& ACHIEVEMENTS</span></h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '3rem' }}>
               {[1, 2, 3, 4].map((i) => (
                  <motion.div key={i} whileHover={{ scale: 1.1 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '6rem', height: '6rem', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', background: 'rgba(255,255,255,0.05)' }}>
                       <Trophy color="var(--secondary)" size={40} />
                    </div>
                    <span style={{ fontWeight: 900, fontSize: '0.9rem', letterSpacing: '0.1em' }}>TITLE CUP {2023 + i}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', letterSpacing: '0.2em' }}>WINNERS</span>
                  </motion.div>
               ))}
            </div>
        </div>
      </section>
    </div>
  );
};

export default About;
