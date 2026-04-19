import React from 'react';
import { motion } from 'framer-motion';
import useAcademyStore from '../../store/useAcademyStore';

const wings = [
  { id: 'all', name: 'Elite Academy' },
  { id: 'kawoosa', name: 'Kawoosa Khalisa Wing' },
  { id: 'kunzer', name: 'Kunzer Wing' },
];

const WingSelector = () => {
  const { activeWing, setActiveWing } = useAcademyStore();

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '3rem 0' }}>
      <div className="glass-effect" style={{ padding: '0.5rem', display: 'flex', gap: '0.5rem', borderRadius: '4rem' }}>
        {wings.map((wing) => (
          <button
            key={wing.id}
            onClick={() => setActiveWing(wing.id)}
            style={{ 
              padding: '0.75rem 1.5rem', 
              borderRadius: '3rem', 
              fontSize: '0.75rem', 
              fontWeight: 700, 
              textTransform: 'uppercase', 
              letterSpacing: '0.1em', 
              transition: 'var(--transition-smooth)',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              backgroundColor: 'transparent',
              color: activeWing === wing.id ? 'white' : 'var(--text-dim)',
            }}
          >
            {activeWing === wing.id && (
              <motion.div
                layoutId="wing-bg"
                style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  background: 'var(--primary)', 
                  borderRadius: '3rem', 
                  zIndex: -1,
                  boxShadow: '0 0 15px var(--primary-glow)'
                }}
                transition={{ duration: 0.3 }}
              />
            )}
            {wing.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WingSelector;
