import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Plus, Minus, CreditCard, ChevronRight } from 'lucide-react';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="premium-card group"
      style={{ padding: 0, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', background: 'rgba(255,255,255,0.05)', overflow: 'hidden' }}>
        <img 
          src={product.image} 
          alt={product.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease' }} 
          className="group-hover-scale-110"
        />
        {product.isNew && (
          <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
             <span style={{ padding: '0.25rem 0.75rem', background: 'var(--primary)', color: 'var(--bg-deep)', fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', borderRadius: '2px', boxShadow: '0 0 10px var(--primary-glow)' }}>NEW ARRIVAL</span>
          </div>
        )}
        <div className="group-hover-opacity-100" style={{ position: 'absolute', inset: 0, background: 'rgba(5,7,10,0.5)', backdropFilter: 'blur(2px)', opacity: 0, transition: 'opacity 0.3s ease', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center' }}>
           <button 
             onClick={() => onAddToCart(product)}
             className="btn group-hover-translate-y-0"
             style={{ background: 'white', color: 'var(--bg-deep)', boxShadow: '0 0 15px rgba(255,255,255,0.5)', transform: 'translateY(1rem)', transition: 'transform 0.3s ease, background 0.3s ease, color 0.3s ease' }}
             onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.boxShadow = '0 0 15px var(--primary-glow)'; }}
             onMouseLeave={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.boxShadow = '0 0 15px rgba(255,255,255,0.5)'; }}
           >
             ADD TO LOADOUT
           </button>
        </div>
      </div>
      
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem', gap: '1rem' }}>
           <h3 style={{ color: 'white', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', fontSize: '1rem', flex: 1, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{product.name}</h3>
           <span style={{ color: 'var(--primary)', fontWeight: 900, fontSize: '1.25rem', fontFamily: 'Impact, sans-serif', letterSpacing: '0.05em' }}>₹{product.price}</span>
        </div>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1.5rem' }}>{product.category}</p>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
           {['S', 'M', 'L', 'XL'].map(s => (
             <span key={s} style={{ width: '2rem', height: '2rem', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', border: '1px solid var(--border-light)', borderRadius: '2px', fontSize: '0.65rem', color: 'var(--text-dim)', cursor: 'pointer', transition: 'border-color 0.3s ease, color 0.3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'white'; e.currentTarget.style.color = 'white'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-light)'; e.currentTarget.style.color = 'var(--text-dim)'; }}>{s}</span>
           ))}
        </div>
      </div>
    </motion.div>
  );
};

const Shop = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const products = [
    { id: 1, name: "KAWOOSA HOME KIT 24/25", price: 1499, category: "Apparel", image: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=800", isNew: true },
    { id: 2, name: "KUNZER AWAY KIT 24/25", price: 1499, category: "Apparel", image: "https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&q=80&w=800", isNew: true },
    { id: 3, name: "ACADEMY TRAINING PANTS", price: 999, category: "Training", image: "https://images.unsplash.com/photo-1518458082568-d95c65e7a9f4?auto=format&fit=crop&q=80&w=800" },
    { id: 4, name: "KKFA STEALTH CAP", price: 499, category: "Accessories", image: "https://images.unsplash.com/photo-1533055640609-24b298df1f4a?auto=format&fit=crop&q=80&w=800" },
    { id: 5, name: "TACTICAL WATER BOTTLE", price: 299, category: "Accessories", image: "https://images.unsplash.com/photo-1523362628742-0c29a45192c1?auto=format&fit=crop&q=80&w=800" },
    { id: 6, name: "ELITE MATCH BALL", price: 2499, category: "Equipment", image: "https://images.unsplash.com/photo-1552667466-03310787e9c5?auto=format&fit=crop&q=80&w=800" },
  ];

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
     setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQty = (id, delta) => {
     setCart(prev => prev.map(item => {
        if (item.id === id) {
           const newQty = Math.max(1, item.qty + delta);
           return { ...item, qty: newQty };
        }
        return item;
     }));
  };

  const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  return (
    <div style={{ backgroundColor: 'var(--bg-deep)', minHeight: '100vh', padding: '5rem 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 className="text-gradient" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '1rem' }}>
            THE ARMORY
          </h1>
          <div style={{ width: '5rem', height: '4px', background: 'var(--primary)', margin: '0 auto 1.5rem', borderRadius: '2px', boxShadow: '0 0 15px var(--primary-glow)' }} />
          <p style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.85rem', fontStyle: 'italic', fontWeight: 600 }}>
            "Official merchandise and tactical equipment."
          </p>
        </div>

        {/* Shop Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '2rem' }}>
           <div style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
              {['ALL ITEMS', 'JERSEYS', 'TRAINING', 'ACCESSORIES'].map(c => (
                <button key={c} style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', cursor: 'pointer', transition: 'color 0.3s ease', whiteSpace: 'nowrap' }} onMouseEnter={(e) => e.currentTarget.style.color = 'white'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-dim)'}>{c}</button>
              ))}
           </div>
           <button 
             onClick={() => setIsCartOpen(true)}
             style={{ position: 'relative', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-light)', borderRadius: '50%', color: 'white', cursor: 'pointer', transition: 'border-color 0.3s ease, color 0.3s ease' }}
             onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; }}
             onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-light)'; e.currentTarget.style.color = 'white'; }}
           >
              <ShoppingBag size={20} />
              {cart.length > 0 && (
                <span style={{ position: 'absolute', top: '-0.25rem', right: '-0.25rem', width: '1.25rem', height: '1.25rem', background: 'var(--primary)', color: 'var(--bg-deep)', fontSize: '0.6rem', fontWeight: 900, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 10px var(--primary-glow)' }}>
                  {cart.length}
                </span>
              )}
           </button>
        </div>

        {/* Products Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: '2rem' }}>
           {products.map(product => (
             <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
           ))}
        </div>
      </div>

      {/* Cart Drawer */}
      <AnimatePresence>
         {isCartOpen && (
           <>
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               style={{ position: 'fixed', inset: 0, background: 'rgba(5,7,10,0.8)', backdropFilter: 'blur(5px)', zIndex: 200 }}
               onClick={() => setIsCartOpen(false)}
             />
             <motion.div 
               initial={{ x: '100%' }}
               animate={{ x: 0 }}
               exit={{ x: '100%' }}
               transition={{ type: 'spring', damping: 25, stiffness: 200 }}
               style={{ position: 'fixed', top: 0, right: 0, width: '100%', maxWidth: '28rem', height: '100%', background: 'var(--bg-deep)', borderLeft: '1px solid var(--border-light)', zIndex: 201, padding: '2rem', display: 'flex', flexDirection: 'column', boxShadow: '-10px 0 30px rgba(0,0,0,0.5)' }}
             >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-light)' }}>
                   <h2 style={{ fontSize: '1.5rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', color: 'white' }}>CURRENT <span className="text-gradient">LOADOUT</span></h2>
                   <button onClick={() => setIsCartOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', transition: 'color 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = 'white'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-dim)'}><X size={24} /></button>
                </div>

                <div style={{ flexGrow: 1, overflowY: 'auto', paddingRight: '0.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                   {cart.length === 0 ? (
                     <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                        <ShoppingBag size={64} color="rgba(255,255,255,0.1)" style={{ marginBottom: '1rem' }} />
                        <p style={{ color: 'var(--text-dim)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em' }}>LOADOUT IS EMPTY</p>
                        <button onClick={() => setIsCartOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '1rem', textDecoration: 'underline', cursor: 'pointer' }}>BROWSE ARMORY</button>
                     </div>
                   ) : (
                     cart.map(item => (
                        <div key={item.id} style={{ display: 'flex', gap: '1rem' }}>
                           <div style={{ width: '5rem', height: '5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem', overflow: 'hidden', flexShrink: 0 }}>
                              <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                           </div>
                           <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                              <div>
                                 <h4 style={{ color: 'white', fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>{item.name}</h4>
                                 <p style={{ color: 'var(--primary)', fontSize: '1.125rem', fontWeight: 900, fontFamily: 'Impact, sans-serif', letterSpacing: '0.05em' }}>₹{item.price}</p>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255,255,255,0.05)', padding: '0.25rem', borderRadius: '2px', border: '1px solid var(--border-light)' }}>
                                    <button onClick={() => updateQty(item.id, -1)} style={{ padding: '0.25rem', background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', transition: 'color 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = 'white'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-dim)'}><Minus size={12} /></button>
                                    <span style={{ color: 'white', fontWeight: 900, fontFamily: 'Impact, sans-serif', fontSize: '0.85rem' }}>{item.qty}</span>
                                    <button onClick={() => updateQty(item.id, 1)} style={{ padding: '0.25rem', background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', transition: 'color 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = 'white'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-dim)'}><Plus size={12} /></button>
                                 </div>
                                 <button onClick={() => removeFromCart(item.id)} style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', transition: 'color 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ff4444'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-dim)'}>REMOVE</button>
                              </div>
                           </div>
                        </div>
                     ))
                   )}
                </div>

                {cart.length > 0 && (
                  <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-light)' }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <span style={{ color: 'var(--text-dim)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.75rem' }}>SUBTOTAL</span>
                        <span style={{ color: 'white', fontWeight: 900, fontSize: '1.875rem', fontFamily: 'Impact, sans-serif', letterSpacing: '0.05em' }}>₹{total}</span>
                     </div>
                     <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', display: 'flex', gap: '0.75rem' }}>
                        <CreditCard size={18} /> INITIALIZE CHECKOUT
                     </button>
                     <p style={{ textAlign: 'center', fontSize: '0.5rem', color: 'var(--text-dim)', marginTop: '1rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>SECURE TRANSACTION ENCRYPTED BY ACADEMY PROTOCOL</p>
                  </div>
                )}
             </motion.div>
           </>
         )}
      </AnimatePresence>

      <style>{`
        .group-hover-scale-110 { transform: scale(1); }
        .group:hover .group-hover-scale-110 { transform: scale(1.1); }
        .group-hover-opacity-100 { opacity: 0; }
        .group:hover .group-hover-opacity-100 { opacity: 1; }
        .group-hover-translate-y-0 { transform: translateY(1rem); }
        .group:hover .group-hover-translate-y-0 { transform: translateY(0); }
      `}</style>
    </div>
  );
};

export default Shop;
