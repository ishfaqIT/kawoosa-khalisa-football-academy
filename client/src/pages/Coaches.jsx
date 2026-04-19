import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Award } from 'lucide-react';
import { fetchCoaches } from '../api';

const CoachCard = ({ coach }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -6 }}
    className="premium-card"
    style={{ padding: 0, overflow: 'hidden', textAlign: 'center' }}
  >
    <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
      <img
        src={coach.photo_url || 'https://via.placeholder.com/300x240?text=Coach'}
        alt={coach.name}
        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        onError={e => { e.currentTarget.src = 'https://via.placeholder.com/300x240?text=Coach'; }}
      />
      {/* Wing badge */}
      <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
        <span style={{ padding: '0.25rem 0.7rem', background: 'var(--primary)', color: 'var(--bg-deep)', fontSize: '0.6rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', borderRadius: '4px' }}>
          {coach.Wing?.name?.split(' ')[0] || 'KKFA'}
        </span>
      </div>
      {coach.is_active && (
        <div style={{ position: 'absolute', top: '1rem', right: '1rem', width: '10px', height: '10px', borderRadius: '50%', background: '#39FF14', boxShadow: '0 0 8px #39FF14' }} />
      )}
    </div>

    <div style={{ padding: '1.5rem' }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.25rem' }}>{coach.name}</h3>
      <p style={{ color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>{coach.role}</p>

      {coach.bio && (
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1rem' }}>
          {coach.bio.slice(0, 100)}{coach.bio.length > 100 ? '...' : ''}
        </p>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', fontSize: '0.7rem', color: 'var(--text-dim)', flexWrap: 'wrap' }}>
        {coach.experience_yrs && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Award size={12} color="var(--primary)" /> {coach.experience_yrs} yrs exp
          </span>
        )}
        {coach.Wing?.name && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <MapPin size={12} color="var(--primary)" /> {coach.Wing.name}
          </span>
        )}
      </div>

      {coach.qualifications && (
        <div style={{ marginTop: '1rem', padding: '0.5rem 0.75rem', background: 'rgba(57,255,20,0.05)', border: '1px solid rgba(57,255,20,0.2)', borderRadius: '6px', fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 600 }}>
          {coach.qualifications}
        </div>
      )}
    </div>
  </motion.div>
);

const Coaches = () => {
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchCoaches()
      .then(({ data }) => setCoaches(data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const wings = ['All', 'Kawoosa', 'Kunzer'];
  const filtered = filter === 'All' ? coaches : coaches.filter(c =>
    c.Wing?.name?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: 'var(--bg-deep)', minHeight: '100vh', padding: '5rem 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 className="text-gradient" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '1rem' }}>OUR COACHES</h1>
          <div style={{ width: '5rem', height: '4px', background: 'var(--primary)', margin: '0 auto 1.5rem', borderRadius: '2px', boxShadow: '0 0 15px var(--primary-glow)' }} />
          <p style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.85rem', fontWeight: 600 }}>
            The dedicated coaching staff at Kawoosa Khalisa Football Academy.
          </p>
        </div>

        {/* Filter */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '3rem' }}>
          {wings.map(w => (
            <button key={w} onClick={() => setFilter(w)}
              style={{ padding: '0.5rem 1.5rem', border: `1px solid ${filter === w ? 'var(--primary)' : 'var(--border-light)'}`, background: filter === w ? 'var(--primary)' : 'transparent', color: filter === w ? 'var(--bg-deep)' : 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', borderRadius: '4px', cursor: 'pointer', transition: 'all 0.2s' }}>
              {w}
            </button>
          ))}
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--text-dim)', padding: '4rem 0' }}>Loading coaches...</p>
        ) : filtered.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-dim)', padding: '4rem 0' }}>No coaches found.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
            {filtered.map(c => <CoachCard key={c.id} coach={c} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Coaches;
