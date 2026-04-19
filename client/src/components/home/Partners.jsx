import { motion } from 'framer-motion';
import { Shield, MapPin, Trophy, Star, ShoppingBag } from 'lucide-react';

const partners = [
  { name: 'Kashmir Sports Council', color: '#3b82f6', icon: <Trophy size={20} /> },
  { name: 'DFA Budgam', color: '#f59e0b', icon: <MapPin size={20} /> },
  { name: 'DFA Srinagar', color: '#10b981', icon: <Shield size={20} /> },
  { name: 'OLD City FC', color: '#8b5cf6', icon: <Star size={20} /> },
  { name: 'Maams Sports and Stationary', color: '#ef4444', icon: <ShoppingBag size={20} /> }
];

const Partners = () => {
  return (
    <section style={{ padding: '8rem 0', borderTop: '1px solid var(--border-light)' }}>
      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <span style={{ color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.4em', textTransform: 'uppercase' }}>
          STRATEGIC ALLIANCE
        </span>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginTop: '0.5rem' }} className="text-gradient">
          OUR PARTNERS
        </h2>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
        gap: '1.5rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {partners.map((partner, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            style={{ 
              background: 'linear-gradient(145deg, rgba(10,31,68,0.9), rgba(5,15,34,0.9))',
              border: '1px solid var(--border-light)',
              borderRadius: '1.25rem',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Background Glow */}
            <div style={{ 
              position: 'absolute', 
              top: '-20%', 
              right: '-20%', 
              width: '60%', 
              height: '60%', 
              background: `radial-gradient(circle, ${partner.color}22 0%, transparent 70%)`,
              pointerEvents: 'none'
            }} />

            <div style={{ 
              width: '3.5rem', 
              height: '3.5rem', 
              background: `${partner.color}15`, 
              borderRadius: '1rem', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              color: partner.color,
              marginBottom: '1.25rem',
              border: `1px solid ${partner.color}33`
            }}>
              {partner.icon}
            </div>

            <h4 style={{ 
              fontSize: '0.85rem', 
              fontWeight: 800, 
              color: 'white', 
              lineHeight: 1.4,
              textTransform: 'uppercase',
              letterSpacing: '0.02em'
            }}>
              {partner.name}
            </h4>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Partners;
