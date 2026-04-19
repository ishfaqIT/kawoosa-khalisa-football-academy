import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { fetchEvents } from '../api';

const EventCard = ({ event }) => (
  <motion.div whileHover={{ y: -6 }} className="premium-card" style={{ padding: 0, overflow: 'hidden' }}>
    <div style={{ height: '12rem', position: 'relative', overflow: 'hidden' }}>
      <img
        src={event.image_url || 'https://images.unsplash.com/photo-1431324155629-1a6eda1eed15?auto=format&fit=crop&q=80&w=800'}
        alt={event.title}
        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      />
      <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
        <span style={{ padding: '0.25rem 0.75rem', background: 'var(--primary)', color: 'var(--bg-deep)', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', borderRadius: '4px' }}>
          {event.type}
        </span>
      </div>
    </div>
    <div style={{ padding: '1.5rem' }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '0.75rem' }}>{event.title}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
          <Calendar size={13} color="var(--primary)" /> {new Date(event.event_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
          <MapPin size={13} color="var(--primary)" /> {event.location}
        </span>
      </div>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6 }}>{event.description}</p>
    </div>
  </motion.div>
);

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchEvents()
      .then(({ data }) => setEvents(data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const types = ['All', 'Training', 'Match', 'Trial', 'Meeting', 'Other'];
  const filtered = filter === 'All' ? events : events.filter(e => e.type === filter);

  return (
    <div style={{ backgroundColor: 'var(--bg-deep)', minHeight: '100vh', padding: '5rem 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 className="text-gradient" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '1rem' }}>EVENTS</h1>
          <div style={{ width: '5rem', height: '4px', background: 'var(--primary)', margin: '0 auto 1.5rem', borderRadius: '2px', boxShadow: '0 0 15px var(--primary-glow)' }} />
          <p style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.85rem', fontWeight: 600 }}>
            Upcoming activities and academy events.
          </p>
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem', marginBottom: '3rem' }}>
          {types.map(t => (
            <button key={t} onClick={() => setFilter(t)} style={{ padding: '0.5rem 1.25rem', border: `1px solid ${filter === t ? 'var(--primary)' : 'var(--border-light)'}`, background: filter === t ? 'var(--primary)' : 'transparent', color: filter === t ? 'var(--bg-deep)' : 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', borderRadius: '4px', cursor: 'pointer', transition: 'all 0.2s' }}>
              {t}
            </button>
          ))}
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--text-dim)', padding: '4rem 0' }}>Loading events...</p>
        ) : filtered.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-dim)', padding: '4rem 0' }}>No events found.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {filtered.map(ev => <EventCard key={ev.id} event={ev} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
