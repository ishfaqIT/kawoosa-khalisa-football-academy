import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Send } from 'lucide-react';
import KKFACrest from '../ui/KKFACrest';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand & Mission */}
          <div className="footer-logo">
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <KKFACrest style={{ width: '4rem', height: '4rem' }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 900, lineHeight: 1 }}>KKFA</span>
                <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--primary)', fontWeight: 700 }}>
                  Academy of Excellence
                </span>
              </div>
            </Link>
            <p>
              Forging the next generation of football legends through elite training, tactical mastery, and athletic precision across our elite wings.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  style={{ 
                    width: '2.5rem', 
                    height: '2.5rem', 
                    borderRadius: '50%', 
                    background: 'var(--border-light)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    color: 'var(--text-muted)',
                    transition: 'var(--transition-smooth)'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.color = 'white'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--border-light)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h4>Quick Access</h4>
            <ul>
              <li><Link to="/about">Origins</Link></li>
              <li><Link to="/players">Squads</Link></li>
              <li><Link to="/coaches">Coaches</Link></li>
              <li><Link to="/fixtures">Fixtures</Link></li>
              <li><Link to="/events">Events</Link></li>
            </ul>
          </div>

          {/* Wings Info */}
          <div className="footer-links">
            <h4>Resource Hub</h4>
            <ul>
              <li><Link to="/news">News</Link></li>
              <li><Link to="/shop">Shop</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/register">Join Us</Link></li>
              <li><Link to="/contact">Support</Link></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="footer-links">
            <h4>Base Ops</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem', color: 'var(--text-dim)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <MapPin size={16} color="var(--primary)" />
                <span>Kawoosa, Kashmir, IND</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Phone size={16} color="var(--primary)" />
                <span>+91 123 456 7890</span>
              </div>
              
              <div style={{ position: 'relative', marginTop: '1rem' }}>
                <input
                  type="email"
                  placeholder="Newsletter"
                  style={{ 
                    width: '100%', 
                    background: 'rgba(255,255,255,0.05)', 
                    border: '1px solid var(--border-light)', 
                    borderRadius: '0.5rem', 
                    padding: '0.75rem 1rem', 
                    color: 'white',
                    fontSize: '0.8rem'
                  }}
                />
                <button style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer' }}>
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            <p>© 2026 Kawoosa Khalisa Football Academy. All Rights Reserved.</p>
            <p style={{ fontSize: '0.75rem', marginTop: '0.5rem', color: 'var(--text-dim)' }}>
              Developed by <a href="https://ishfaqit-ishfaq-portfolio-hizya93l8.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontWeight: 700 }}>Ishfaq Ahmad Malik</a>
            </p>
          </div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <a href="#">Privacy Protocol</a>
            <a href="#">Terms of Ops</a>
          </div>
        </div>
      </div>
    </footer>
  );
};;

export default Footer;
