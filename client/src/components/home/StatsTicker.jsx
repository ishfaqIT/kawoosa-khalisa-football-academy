import React from 'react';

const fixtures = [
  "KKFA (Kawoosa) vs Royal FC - SUN 4:00 PM",
  "KKFA (Kunzer) vs Elite Academy - SAT 3:30 PM",
  "U-17 Trials starting Next Monday - Register Now!",
  "Kawoosa Khalisa Wing won 3-1 against Valley United",
  "Kunzer Wing Training Camp - May 10th-15th",
];

const StatsTicker = () => {
  return (
    <div style={{ 
      background: 'rgba(5, 7, 10, 0.5)', 
      color: 'var(--primary)', 
      padding: '0.75rem 0', 
      overflow: 'hidden', 
      whiteSpace: 'nowrap', 
      borderTop: '1px solid var(--border-light)', 
      borderBottom: '1px solid var(--border-light)',
      position: 'relative',
      zIndex: 20
    }}>
      <div className="animate-marquee">
        {[...fixtures, ...fixtures].map((text, i) => (
          <span key={i} style={{ margin: '0 3rem', display: 'flex', alignItems: 'center', fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            <span style={{ width: '0.5rem', height: '0.5rem', background: 'var(--primary)', borderRadius: '50%', marginRight: '1rem', display: 'inline-block', boxShadow: '0 0 10px var(--primary-glow)' }} />
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default StatsTicker;
