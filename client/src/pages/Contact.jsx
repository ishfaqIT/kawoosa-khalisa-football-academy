import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, ChevronDown } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid var(--border-light)' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ width: '100%', padding: '1.5rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}
      >
        <span style={{ fontWeight: 900, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: isOpen ? 'var(--primary)' : 'white', transition: 'color 0.3s ease' }}>{question}</span>
        <div style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s ease', color: isOpen ? 'var(--primary)' : 'var(--text-dim)' }}>
           <ChevronDown size={20} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{ paddingBottom: '1.5rem', color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.95rem' }}>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Contact = () => {
  const faqs = [
    { question: "How can I join the academy?", answer: "Prospective players can join through our seasonal trials. Keep an eye on the events page or register your interest on the Join Academy page." },
    { question: "What is the age limit for students?", answer: "We accept students from age 6 up to 19, categorized into various age-specific cohorts (U-10, U-13, U-15, U-17, U-19)." },
    { question: "What are the academy's training hours?", answer: "Morning sessions run from 6:00 AM to 8:30 AM. Evening sessions are from 4:30 PM to 6:30 PM. Specific timings vary by wing." },
    { question: "Are there separate wings for different regions?", answer: "Yes, we currently operate the Kawoosa Khalisa Wing and the Kunzer Wing to serve local talent in those respective sectors." },
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-deep)', minHeight: '100vh', padding: '5rem 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 className="text-gradient" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '1rem' }}>
            GET IN TOUCH
          </h1>
          <div style={{ width: '5rem', height: '4px', background: 'var(--primary)', margin: '0 auto 1.5rem', borderRadius: '2px', boxShadow: '0 0 15px var(--primary-glow)' }} />
          <p style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.85rem', fontStyle: 'italic', fontWeight: 600 }}>
            "We'd love to hear from you."
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '4rem', alignItems: 'flex-start', marginBottom: '6rem' }}>
           {/* Contact Form */}
           <motion.div
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             className="premium-card"
             style={{ padding: '3rem' }}
           >
           <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '-0.02em' }}>SEND A <span className="text-gradient">MESSAGE</span></h2>
              <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                       <label style={{ fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-dim)' }}>Your Name</label>
                       <input type="text" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-light)', padding: '1rem', borderRadius: '4px', color: 'white', fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.3s ease' }} onFocus={(e) => e.target.style.borderColor = 'var(--primary)'} onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'} placeholder="John Doe" />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                       <label style={{ fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-dim)' }}>Email Address</label>
                       <input type="email" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-light)', padding: '1rem', borderRadius: '4px', color: 'white', fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.3s ease' }} onFocus={(e) => e.target.style.borderColor = 'var(--primary)'} onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'} placeholder="ops@sector.com" />
                    </div>
                 </div>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-dim)' }}>Subject / Category</label>
                    <select style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-light)', padding: '1rem', borderRadius: '4px', color: 'white', fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.3s ease', appearance: 'none' }} onFocus={(e) => e.target.style.borderColor = 'var(--primary)'} onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'}>
                       <option style={{ background: 'var(--bg-deep)' }}>General Inquiry</option>
                       <option style={{ background: 'var(--bg-deep)' }}>Enrollment Support</option>
                       <option style={{ background: 'var(--bg-deep)' }}>Partnership Ops</option>
                       <option style={{ background: 'var(--bg-deep)' }}>Media Access</option>
                    </select>
                 </div>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-dim)' }}>Your Message</label>
                    <textarea rows="5" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-light)', padding: '1rem', borderRadius: '4px', color: 'white', fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.3s ease', resize: 'vertical' }} onFocus={(e) => e.target.style.borderColor = 'var(--primary)'} onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'} placeholder="Type your message..."></textarea>
                 </div>
                 <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', display: 'flex', gap: '0.5rem', marginTop: '1rem' }} onClick={(e) => e.preventDefault()}>
                    SEND MESSAGE <Send size={16} />
                 </button>
              </form>
           </motion.div>

           {/* Info & Map */}
           <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                 {[
                   { icon: Phone, title: 'VOICE COMMS', val: '+91 123 456 7890', sub: 'Mon-Sun, 9AM-6PM' },
                   { icon: Mail, title: 'DIGITAL MAIL', val: 'ops@kkfa.academy', sub: '24/7 Response Window' },
                   { icon: MapPin, title: 'HQ LOCATION', val: 'Kawoosa, Kashmir', sub: 'Sector Alpha-1' },
                   { icon: MessageSquare, title: 'WHATSAPP', val: '+91 987 654 3210', sub: 'Instant Support' },
                 ].map((item, i) => (
                   <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <div style={{ width: '3rem', height: '3rem', background: 'rgba(0,255,135,0.1)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                         <item.icon size={24} />
                      </div>
                      <h4 style={{ fontWeight: 900, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'white' }}>{item.title}</h4>
                      <p style={{ fontSize: '0.9rem', fontWeight: 700, margin: 0 }}>{item.val}</p>
                      <p style={{ fontSize: '0.65rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>{item.sub}</p>
                   </div>
                 ))}
              </div>

              {/* Map Placeholder */}
              <div className="premium-card group" style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: 0 }}>
                 <div style={{ position: 'absolute', inset: 0, transition: 'filter 0.5s ease', filter: 'grayscale(100%) opacity(0.5)' }} onMouseEnter={(e) => e.currentTarget.style.filter = 'grayscale(0) opacity(1)'} onMouseLeave={(e) => e.currentTarget.style.filter = 'grayscale(100%) opacity(0.5)'}>
                    <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Map" />
                 </div>
                 <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', background: 'rgba(5,7,10,0.8)', padding: '1.5rem', borderRadius: '8px', backdropFilter: 'blur(5px)' }}>
                    <span style={{ color: 'var(--primary)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '0.75rem', display: 'block', marginBottom: '0.5rem' }}>MAP ENCRYPTED</span>
                    <button style={{ background: 'transparent', border: 'none', color: 'white', textTransform: 'uppercase', fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.1em', cursor: 'pointer', textDecoration: 'underline' }}>OPEN TACTICAL OVERLAY</button>
                 </div>
              </div>
           </div>
        </div>

        {/* FAQ Section */}
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
           <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '1rem' }}>HELP <span className="text-gradient">CENTER</span></h2>
              <div style={{ width: '3rem', height: '3px', background: 'var(--primary)', margin: '0 auto' }} />
           </div>
           <div style={{ display: 'flex', flexDirection: 'column' }}>
              {faqs.map((faq, i) => (
                <FAQItem key={i} {...faq} />
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
