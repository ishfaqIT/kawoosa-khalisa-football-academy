import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import { fetchFixtures } from '../api';

const FixtureRow = ({ fixture }) => {
  const isCompleted = fixture.status === 'Completed';
  const wingColor = fixture.home_team?.toLowerCase().includes('kawoosa') ? 'var(--primary)' : 'white';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="premium-card"
      style={{ padding: '1.25rem 1.5rem', marginBottom: '0.75rem', borderLeft: `4px solid ${wingColor}`, display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}
    >
      {/* Date */}
      <div style={{ minWidth: '70px', textAlign: 'center' }}>
        <p style={{ fontSize: '1.5rem', fontWeight: 900, lineHeight: 1, color: 'white' }}>
          {new Date(fixture.match_date).getDate()}
        </p>
        <p style={{ fontSize: '0.65rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase' }}>
          {new Date(fixture.match_date).toLocaleDateString('en', { month: 'short' })}
        </p>
      </div>

      {/* Teams & Score */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontWeight: 700, fontSize: '0.95rem', color: wingColor }}>{fixture.home_team}</span>
        <div style={{ textAlign: 'center' }}>
          {isCompleted ? (
            <span style={{ fontSize: '1.5rem', fontWeight: 900, color: 'white', letterSpacing: '0.05em' }}>
              {fixture.home_score} – {fixture.away_score}
            </span>
          ) : (
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>VS</span>
          )}
        </div>
        <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-muted)' }}>{fixture.away_team}</span>
      </div>

      {/* Meta */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', minWidth: '160px', textAlign: 'right' }}>
        {fixture.competition && <span style={{ fontSize: '0.65rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{fixture.competition}</span>}
        {fixture.location && <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.3rem', justifyContent: 'flex-end' }}><MapPin size={11} /> {fixture.location}</span>}
        <span style={{ fontSize: '0.65rem', padding: '0.2rem 0.6rem', borderRadius: '20px', fontWeight: 700, display: 'inline-block', alignSelf: 'flex-end', background: fixture.status === 'Upcoming' ? 'rgba(57,255,20,0.15)' : fixture.status === 'Completed' ? 'rgba(59,130,246,0.15)' : 'rgba(239,68,68,0.15)', color: fixture.status === 'Upcoming' ? '#39FF14' : fixture.status === 'Completed' ? '#3b82f6' : '#ef4444' }}>
          {fixture.status}
        </span>
      </div>
    </motion.div>
  );
};

const Fixtures = () => {
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('All');

  useEffect(() => {
    fetchFixtures()
      .then(({ data }) => setFixtures(data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const tabs = ['All', 'Upcoming', 'Completed'];
  const filtered = tab === 'All' ? fixtures : fixtures.filter(f => f.status === tab);

  return (
    <div style={{ backgroundColor: 'var(--bg-deep)', minHeight: '100vh', padding: '5rem 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 className="text-gradient" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '1rem' }}>FIXTURES & RESULTS</h1>
          <div style={{ width: '5rem', height: '4px', background: 'var(--primary)', margin: '0 auto 1.5rem', borderRadius: '2px', boxShadow: '0 0 15px var(--primary-glow)' }} />
          <p style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.85rem', fontWeight: 600 }}>
            Match schedules and results for both wings.
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2.5rem', justifyContent: 'center' }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: '0.5rem 1.5rem', border: `1px solid ${tab === t ? 'var(--primary)' : 'var(--border-light)'}`, background: tab === t ? 'var(--primary)' : 'transparent', color: tab === t ? 'var(--bg-deep)' : 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', borderRadius: '4px', cursor: 'pointer', transition: 'all 0.2s' }}>
              {t}
            </button>
          ))}
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--text-dim)', padding: '4rem 0' }}>Loading fixtures...</p>
        ) : filtered.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-dim)', padding: '4rem 0' }}>No fixtures found.</p>
        ) : (
          <div>{filtered.map(f => <FixtureRow key={f.id} fixture={f} />)}</div>
        )}
      </div>
    </div>
  );
};

export default Fixtures;
