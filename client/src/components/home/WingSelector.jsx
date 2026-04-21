import React from 'react';
import { motion } from 'framer-motion';
import useAcademyStore from '../../store/useAcademyStore';

import { fetchWings } from '../../api';

const WingSelector = () => {
  const { activeWing, setActiveWing } = useAcademyStore();
  const [wings, setWings] = React.useState([{ _id: 'all', name: 'Elite Academy' }]);

  React.useEffect(() => {
    fetchWings().then(res => {
      if (res.data.success) {
        setWings([{ _id: 'all', name: 'Elite Academy' }, ...res.data.data]);
      }
    }).catch(() => {});
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '3rem 1rem' }}>
      <div className="glass-effect" style={{ padding: '0.5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem', borderRadius: '2rem' }}>
        {wings.map((wing) => (
          <button
            key={wing._id || wing.id}
            onClick={() => setActiveWing(wing._id || wing.id)}
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
              color: activeWing === (wing._id || wing.id) ? 'white' : 'var(--text-dim)',
            }}
          >
            {activeWing === (wing._id || wing.id) && (
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
