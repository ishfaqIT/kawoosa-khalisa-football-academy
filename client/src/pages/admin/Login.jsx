import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail } from 'lucide-react';
import useAcademyStore from '../../store/useAcademyStore';
import API from '../../api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const login = useAcademyStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Connect to the Auth route using the configured API instance
      const { data } = await API.post('/auth/login', { email, password });


      if (data.success) {
        login(data.user, data.token);
        navigate('/admin/dashboard');
      } else {
        setError(data.error || 'Authentication Failed');
      }
    } catch (err) {
      console.error(err);
      setError('Server Error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-deep)', padding: '2rem' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="premium-card" 
        style={{ maxWidth: '400px', width: '100%', padding: '3rem 2rem', textAlign: 'center' }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '4rem', height: '4rem', backgroundColor: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px var(--primary-glow)' }}>
            <Lock size={24} color="var(--bg-deep)" />
          </div>
        </div>
        
        <h2 style={{ fontSize: '1.5rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.5rem', color: 'white' }}>SECURE LOGIN</h2>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2rem' }}>AUTHORIZED PERSONNEL ONLY</p>

        {error && (
           <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '0.75rem', borderRadius: '4px', border: '1px solid rgba(239, 68, 68, 0.2)', marginBottom: '1.5rem', fontSize: '0.8rem', fontWeight: 600 }}>
             {error}
           </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ position: 'relative' }}>
            <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
            <input 
              type="email" 
              placeholder="ADMIN EMAIL" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-light)', borderRadius: '4px', padding: '0.85rem 1rem 0.85rem 3rem', color: 'white', fontSize: '0.85rem', letterSpacing: '0.05em' }}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
            <input 
              type="password" 
              placeholder="ACCESS CODE" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-light)', borderRadius: '4px', padding: '0.85rem 1rem 0.85rem 3rem', color: 'white', fontSize: '0.85rem', letterSpacing: '0.05em' }}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={loading}
            style={{ justifyContent: 'center', width: '100%', padding: '1rem', marginTop: '1rem' }}
          >
            {loading ? 'AUTHENTICATING...' : 'INITIATE CONNECTION'}
          </button>
        </form>
        
        <button onClick={() => navigate('/')} style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '2rem', cursor: 'pointer', textDecoration: 'underline' }}>
          RETURN TO HOME
        </button>
      </motion.div>
    </div>
  );
};

export default Login;
