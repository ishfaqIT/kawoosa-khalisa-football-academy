import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2 } from 'lucide-react';
import { fetchGallery } from '../api';

const Gallery = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchGallery()
      .then(({ data }) => setMedia(data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categories = ['ALL', ...new Set(media.map(m => m.category?.toUpperCase()).filter(Boolean))];
  const filtered = activeFilter === 'ALL' ? media : media.filter(m => m.category?.toUpperCase() === activeFilter);

  return (
    <div style={{ backgroundColor: 'var(--bg-deep)', minHeight: '100vh', padding: '5rem 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 className="text-gradient" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '1rem' }}>GALLERY</h1>
          <div style={{ width: '5rem', height: '4px', background: 'var(--primary)', margin: '0 auto 1.5rem', borderRadius: '2px', boxShadow: '0 0 15px var(--primary-glow)' }} />
          <p style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.85rem', fontWeight: 600 }}>
            Moments from the academy.
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem', marginBottom: '3rem' }}>
          {categories.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              style={{ padding: '0.5rem 1.25rem', border: `1px solid ${activeFilter === f ? 'var(--primary)' : 'var(--border-light)'}`, background: activeFilter === f ? 'var(--primary)' : 'transparent', color: activeFilter === f ? 'var(--bg-deep)' : 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', borderRadius: '4px', cursor: 'pointer', transition: 'all 0.2s' }}>
              {f}
            </button>
          ))}
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--text-dim)', padding: '4rem 0' }}>Loading gallery...</p>
        ) : filtered.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-dim)', padding: '4rem 0' }}>No images found.</p>
        ) : (
          <div style={{ columns: '3 250px', gap: '1rem' }}>
            {filtered.map(img => (
              <motion.div key={img.id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                style={{ marginBottom: '1rem', breakInside: 'avoid', position: 'relative', overflow: 'hidden', borderRadius: '12px', cursor: 'pointer', border: '1px solid var(--border-light)' }}
                onClick={() => setSelected(img)}>
                <img src={img.image_url} alt={img.title} style={{ width: '100%', display: 'block', transition: 'transform 0.5s ease' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)', opacity: 0, transition: 'opacity 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = 1; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = 0; }}>
                  <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', right: '1rem' }}>
                    <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'white' }}>{img.title}</p>
                    <p style={{ fontSize: '0.65rem', color: 'var(--primary)', textTransform: 'uppercase' }}>{img.category}</p>
                  </div>
                  <Maximize2 size={18} style={{ position: 'absolute', top: '1rem', right: '1rem', color: 'white' }} />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
            onClick={() => setSelected(null)}>
            <button onClick={() => setSelected(null)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', padding: '0.5rem', color: 'white', cursor: 'pointer', display: 'flex' }}><X size={22} /></button>
            <img src={selected.image_url} alt={selected.title} style={{ maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain', borderRadius: '12px' }} onClick={e => e.stopPropagation()} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
