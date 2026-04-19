import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: "Omar Farooq",
    role: "U-17 Captain",
    text: "Joining KKFA was the turning point of my career. The discipline and tactical knowledge I've gained here is comparable to professional clubs.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Dr. Sajad Ahmad",
    role: "Parent",
    text: "As a parent, I'm impressed by how the academy balances football training with personality development and academic focus.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Ishfaq Nazir",
    role: "Senior Wing Player",
    text: "The infrastructure at our Kunzer wing is top-class. Having access to high-quality equipment and experienced coaches makes all the difference.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  }
];

const Testimonials = () => {
  return (
    <section style={{ padding: '8rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }} className="text-gradient">
          VOICES OF THE ACADEMY
        </h2>
        <p style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.8rem', fontWeight: 600, marginTop: '1rem' }}>
          What our players and parents say about us
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
        {testimonials.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
            className="premium-card"
            style={{ 
              position: 'relative',
              paddingTop: '4rem'
            }}
          >
            <div style={{ position: 'absolute', top: '-1.5rem', left: '2rem', width: '4rem', height: '4rem', borderRadius: '50%', border: '4px solid var(--bg-deep)', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.3)' }}>
              <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            
            <Quote size={24} color="var(--primary)" style={{ position: 'absolute', top: '2rem', right: '2rem', opacity: 0.3 }} />

            <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.5rem' }}>
              {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} fill="var(--primary)" color="var(--primary)" />)}
            </div>

            <p style={{ color: 'var(--text-main)', fontStyle: 'italic', marginBottom: '2rem', lineHeight: 1.8, fontSize: '0.95rem' }}>
              "{item.text}"
            </p>

            <div>
              <h4 style={{ fontSize: '1rem', margin: 0, color: 'var(--primary)' }}>{item.name}</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{item.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
