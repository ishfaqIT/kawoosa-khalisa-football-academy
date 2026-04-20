import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, User, Share2, ArrowRight } from 'lucide-react';
import { fetchNews } from '../api';

const NewsCard = ({ article, isFeatured = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="premium-card"
    style={{ padding: 0, display: 'flex', flexDirection: isFeatured ? 'row' : 'column', flexWrap: 'wrap' }}
  >
    <div style={{ flex: isFeatured ? '1 1 300px' : 'none', height: isFeatured ? 'auto' : '16rem', position: 'relative', overflow: 'hidden', minHeight: isFeatured ? '300px' : 'auto' }}>
      <img
        src={article.image_url || 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=800'}
        alt={article.title}
        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease' }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      />
    </div>
    <div style={{ flex: isFeatured ? '1 1 300px' : 'none', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={12} color="var(--primary)" /> {new Date(article.createdAt).toLocaleDateString()}</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><User size={12} color="var(--primary)" /> {article.author}</span>
      </div>
      <h2 style={{ fontSize: isFeatured ? 'clamp(1.3rem, 3vw, 2rem)' : '1.1rem', fontWeight: 900, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
        {article.title}
      </h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        {article.excerpt || article.content?.slice(0, 140) + '...'}
      </p>
      <button style={{ background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', padding: 0 }}>
        READ MORE <ArrowRight size={14} />
      </button>
    </div>
  </motion.div>
);

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews()
      .then(({ data }) => setArticles(data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--bg-deep)', minHeight: '100vh', padding: '5rem 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 className="text-gradient" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '1rem' }}>LATEST NEWS</h1>
          <div style={{ width: '5rem', height: '4px', background: 'var(--primary)', margin: '0 auto 1.5rem', borderRadius: '2px', boxShadow: '0 0 15px var(--primary-glow)' }} />
          <p style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.85rem', fontWeight: 600 }}>
            Recent updates and reports from the academy.
          </p>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--text-dim)', padding: '4rem 0' }}>Loading news...</p>
        ) : articles.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-dim)', padding: '4rem 0' }}>No news articles published yet.</p>
        ) : (
          <>
            {/* Featured */}
            {articles[0] && (
              <div style={{ marginBottom: '4rem' }}>
                <NewsCard article={articles[0]} isFeatured />
              </div>
            )}
            {/* Grid */}
            {articles.length > 1 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '2rem' }}>
                {articles.slice(1).map(a => <NewsCard key={a.id} article={a} />)}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default News;
