import React, { useState, useEffect } from 'react';
import PlayerCard from '../components/players/PlayerCard';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchPlayers } from '../api';

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeWing, setActiveWing] = useState('All');
  const [activePosition, setActivePosition] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPlayers = async () => {
      try {
        const { data } = await fetchPlayers();
        setPlayers(data.data);
      } catch (error) {
        console.error('Error fetching players:', error);
      } finally {
        setLoading(false);
      }
    };
    getPlayers();
  }, []);

  const filteredPlayers = players.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const wingName = p.Wing ? p.Wing.name : (p.wing_id === 1 ? 'Kawoosa' : 'Kunzer');
    const matchesWing = activeWing === 'All' || wingName.includes(activeWing);
    const matchesPosition = activePosition === 'All' || p.position === activePosition;
    return matchesSearch && matchesWing && matchesPosition;
  });

  return (
    <div style={{ backgroundColor: 'var(--bg-deep)', minHeight: '100vh', padding: '5rem 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 className="text-gradient" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '1rem' }}>
            OUR TALENTED PLAYERS
          </h1>
          <div style={{ width: '5rem', height: '4px', background: 'var(--primary)', margin: '0 auto 1.5rem', borderRadius: '2px', boxShadow: '0 0 15px var(--primary-glow)' }} />
          <p style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.85rem', fontWeight: 600 }}>
            Meet the stars of Kawoosa Khalisa Football Academy
          </p>
        </div>

        {/* Filters Bar */}
        <div className="glass-effect" style={{ padding: '1.5rem', marginBottom: '3rem', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '24rem' }}>
            <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} size={18} />
            <input 
              type="text" 
              placeholder="SEARCH PLAYERS..."
              style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-light)', borderRadius: '4px', padding: '0.75rem 1rem 0.75rem 3rem', color: 'white', fontSize: '0.8rem', letterSpacing: '0.05em' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
            {/* Wing Filter */}
            <div style={{ display: 'flex', gap: '0.25rem', background: 'rgba(0,0,0,0.2)', padding: '0.25rem', borderRadius: '4px', border: '1px solid var(--border-light)' }}>
              {['All', 'Kawoosa', 'Kunzer'].map((w) => (
                <button
                  key={w}
                  onClick={() => setActiveWing(w)}
                  style={{ padding: '0.5rem 1rem', fontSize: '0.65rem', textTransform: 'uppercase', fontWeight: 900, letterSpacing: '0.1em', transition: 'var(--transition-smooth)', borderRadius: '2px', border: 'none', cursor: 'pointer', background: activeWing === w ? 'var(--primary)' : 'transparent', color: activeWing === w ? 'var(--bg-deep)' : 'var(--text-muted)' }}
                >
                  {w}
                </button>
              ))}
            </div>

            {/* Position Filter */}
            <div style={{ display: 'flex', gap: '0.25rem', background: 'rgba(0,0,0,0.2)', padding: '0.25rem', borderRadius: '4px', border: '1px solid var(--border-light)' }}>
              {['All', 'Forward', 'Midfielder', 'Defender', 'Goalkeeper'].map((pos) => (
                <button
                  key={pos}
                  onClick={() => setActivePosition(pos)}
                  style={{ padding: '0.5rem 1rem', fontSize: '0.65rem', textTransform: 'uppercase', fontWeight: 900, letterSpacing: '0.1em', transition: 'var(--transition-smooth)', borderRadius: '2px', border: 'none', cursor: 'pointer', background: activePosition === pos ? 'var(--primary)' : 'transparent', color: activePosition === pos ? 'var(--bg-deep)' : 'var(--text-muted)' }}
                >
                  {pos}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Kawoosa Section */}
        {filteredPlayers.filter(p => (p.Wing ? p.Wing.name : (p.wing_id === 1 ? 'Kawoosa' : 'Kunzer')).includes('Kawoosa')).length > 0 && (
          <div style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem', color: 'var(--primary)', letterSpacing: '0.1em' }}>
              KAWOOSA WING
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
              <AnimatePresence mode="popLayout">
                {filteredPlayers.filter(p => (p.Wing ? p.Wing.name : (p.wing_id === 1 ? 'Kawoosa' : 'Kunzer')).includes('Kawoosa')).map((player) => (
                  <PlayerCard key={player.id} player={player} />
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Kunzer Section */}
        {filteredPlayers.filter(p => (p.Wing ? p.Wing.name : (p.wing_id === 1 ? 'Kawoosa' : 'Kunzer')).includes('Kunzer')).length > 0 && (
          <div style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem', color: 'white', letterSpacing: '0.1em' }}>
              KUNZER WING
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
              <AnimatePresence mode="popLayout">
                {filteredPlayers.filter(p => (p.Wing ? p.Wing.name : (p.wing_id === 1 ? 'Kawoosa' : 'Kunzer')).includes('Kunzer')).map((player) => (
                  <PlayerCard key={player.id} player={player} />
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {filteredPlayers.length === 0 && (
          <div style={{ padding: '5rem 0', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>NO PLAYERS FOUND</h3>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.75rem', marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'underline' }}>RESET FILTERS AND TRY AGAIN</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Players;
