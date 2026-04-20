import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, User } from 'lucide-react';
import KKFACrest from '../ui/KKFACrest';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Players', path: '/players' },
  { name: 'Coaches', path: '/coaches' },
  { name: 'Fixtures', path: '/fixtures' },
  { name: 'Events', path: '/events' },
  { name: 'News', path: '/news' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Shop', path: '/shop' },
  { name: 'Join Us', path: '/register' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        {/* Logo */}
        <Link to="/" className="logo-group" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <KKFACrest style={{ width: '3.5rem', height: '3.5rem' }} />
          <div className="logo-text" style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1 }}>
              KKFA
            </span>
            <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-dim)', fontWeight: 600 }}>
              Academy Excellence
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="nav-links">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          ))}

          <Link to="/admin" className="user-icon" style={{ padding: '0.5rem', border: '1px solid var(--border-light)', borderRadius: '50%', color: 'var(--text-main)', display: 'flex' }}>
            <User size={18} />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mobile-menu"
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              width: '100%',
              background: 'var(--bg-card)',
              backdropFilter: 'blur(20px)',
              padding: '2rem',
              borderBottom: '1px solid var(--border-light)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              maxHeight: 'calc(100vh - 80px)',
              overflowY: 'auto'
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="nav-link"
                style={{ fontSize: '1.1rem', padding: '0.5rem 0' }}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/admin"
              className="btn btn-primary"
              style={{ justifyContent: 'center' }}
              onClick={() => setIsOpen(false)}
            >
              Admin Access
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
