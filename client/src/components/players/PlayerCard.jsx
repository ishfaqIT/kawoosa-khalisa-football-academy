import React from 'react';
import { motion } from 'framer-motion';
import { Award, Zap, Activity } from 'lucide-react';

const PlayerCard = ({ player }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -10 }}
      className="premium-card group"
      style={{ padding: 0, height: '450px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
    >
      {/* Background Glow */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,7,10,1), transparent)', opacity: 0.9, zIndex: 10, pointerEvents: 'none' }} />

      {/* Jersey Number */}
      <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 20 }}>
        <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', border: '1px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 900, color: 'var(--primary)', background: 'rgba(5,7,10,0.8)', boxShadow: '0 0 15px var(--primary-glow)' }}>
          {player.jersey_no || '?' }
        </div>
      </div>

      {/* Player Image Placeholder (Cinematic Style) */}
      <div style={{ width: '100%', height: '320px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {player.photo_url ? (
          <img src={player.photo_url} alt={player.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} />
        ) : (
          <div style={{ color: 'var(--text-dim)', fontSize: '6rem', fontWeight: 900, opacity: 0.2, userSelect: 'none' }}>
            {player.name.split(' ').map(n => n[0]).join('')}
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '1.5rem', zIndex: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span style={{ padding: '0.25rem 0.5rem', background: 'var(--primary)', color: 'white', fontSize: '0.55rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', borderRadius: '2px' }}>
            {player.position}
          </span>
          <span style={{ padding: '0.25rem 0.5rem', background: 'rgba(255,255,255,0.1)', color: 'white', fontSize: '0.55rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', borderRadius: '2px' }}>
            {player.Wing ? (player.Wing.name.includes('Kawoosa') ? 'Kawoosa' : 'Kunzer') : (player.wing_id === 1 ? 'Kawoosa' : 'Kunzer')}
          </span>
        </div>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
          {player.name}
        </h3>

        {/* Mini Stats Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', borderTop: '1px solid var(--border-light)', paddingTop: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ color: 'white', fontSize: '1.25rem', fontWeight: 900 }}>{player.goals || 0}</span>
            <span style={{ fontSize: '0.55rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Goals</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
             <span style={{ color: 'white', fontSize: '1.25rem', fontWeight: 900 }}>{player.assists || 0}</span>
            <span style={{ fontSize: '0.55rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Assists</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
             <span style={{ color: 'white', fontSize: '1.25rem', fontWeight: 900 }}>{player.apps || 0}</span>
            <span style={{ fontSize: '0.55rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Apps</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PlayerCard;
