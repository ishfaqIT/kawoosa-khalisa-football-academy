import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, MapPin, Calendar, ClipboardCheck, ArrowLeft, ArrowRight, Download, CheckCircle2 } from 'lucide-react';
import { jsPDF } from 'jspdf';
import API from '../api';

const Register = () => {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '', dob: '', gender: 'Male',
    parentName: '', parentContact: '', email: '',
    address: '', school: '',
    wing: 'Kawoosa', position: 'Forward',
    experience: '0', medicalNotes: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Map frontend fields to backend schema
      const payload = {
        player_name: formData.fullName,
        dob: formData.dob,
        gender: formData.gender,
        parent_name: formData.parentName,
        phone: formData.parentContact,
        email: formData.email,
        address: formData.address || 'Kashmir',
        position: formData.position,
        medical_history: formData.medicalNotes,
        terms_accepted: true,
        // Map wing name to wing_id: 1=Kawoosa, 2=Kunzer
        wing_id: formData.wing === 'Kawoosa' ? 1 : 2,
        status: 'Pending'
      };
      await API.post('/register', payload);
      setIsSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFillColor(10, 10, 15);
    doc.rect(0, 0, 210, 297, 'F');
    
    doc.setTextColor(0, 255, 135);
    doc.setFontSize(22);
    doc.text("KKFA REGISTRATION SUMMARY", 20, 30);
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    let y = 50;
    Object.entries(formData).forEach(([key, val]) => {
      doc.text(`${key.toUpperCase()}: ${val}`, 20, y);
      y += 10;
    });
    
    doc.setTextColor(150, 150, 150);
    doc.text("ESTABLISHED 2016 - KAWOOSA KHALISA FOOTBALL ACADEMY", 20, 280);
    
    doc.save(`KKFA_Reg_${formData.fullName.replace(' ', '_')}.pdf`);
  };

  if (isSubmitted) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-deep)', padding: '2rem' }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="premium-card"
          style={{ maxWidth: '32rem', width: '100%', padding: '3rem', textAlign: 'center' }}
        >
          <div style={{ width: '5rem', height: '5rem', background: 'rgba(0,255,135,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
             <CheckCircle2 size={48} color="var(--primary)" />
          </div>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: '1rem', color: 'white' }}>APPLICATION <span className="text-gradient">RECEIVED</span></h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', marginBottom: '2rem', lineHeight: 1.6 }}>
            Thank you for applying to the KAWOOSA KHALISA FOOTBALL ACADEMY. We have received your details, and our team will get in touch with you within 48 hours.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
             <button onClick={downloadPDF} className="btn btn-primary" style={{ justifyContent: 'center' }}>
                <Download size={18} /> DOWNLOAD SUMMARY
             </button>
             <button onClick={() => window.location.href = '/'} className="btn btn-outline" style={{ justifyContent: 'center' }}>RETURN TO BASE</button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-deep)', minHeight: '100vh', padding: '5rem 0' }}>
      <div className="container" style={{ maxWidth: '56rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 className="text-gradient" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '1rem' }}>
            JOIN THE ACADEMY
          </h1>
          <div style={{ width: '5rem', height: '4px', background: 'var(--primary)', margin: '0 auto 1.5rem', borderRadius: '2px', boxShadow: '0 0 15px var(--primary-glow)' }} />
          <p style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.85rem', fontStyle: 'italic', fontWeight: 600 }}>
            "Start your football journey with us."
          </p>
        </div>

        {/* Progress Bar */}
        <div style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
           <div style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: '2px', background: 'rgba(255,255,255,0.05)', transform: 'translateY(-50%)', zIndex: 0 }} />
           {[1, 2, 3].map((s) => (
             <div key={s} style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.85rem', transition: 'all 0.5s ease', border: '2px solid', background: step >= s ? 'var(--primary)' : 'var(--bg-deep)', borderColor: step >= s ? 'var(--primary)' : 'rgba(255,255,255,0.1)', color: step >= s ? 'var(--bg-deep)' : 'var(--text-dim)', boxShadow: step >= s ? '0 0 15px var(--primary-glow)' : 'none' }}>
                   {s}
                </div>
                <span style={{ fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '0.75rem', color: step >= s ? 'white' : 'var(--text-dim)' }}>
                   {s === 1 ? 'Personal' : s === 2 ? 'Academy' : 'Medical'}
                </span>
             </div>
           ))}
        </div>

        {error && (
          <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', color: '#ef4444', fontSize: '0.85rem', fontWeight: 600 }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="premium-card" style={{ padding: '3rem' }}>
           <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}
                >
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-dim)' }}>Full Name</label>
                      <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-light)', padding: '1rem', borderRadius: '4px', color: 'white', fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.3s ease' }} onFocus={(e) => e.target.style.borderColor = 'var(--primary)'} onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'} />
                   </div>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-dim)' }}>Date of Birth</label>
                      <input type="date" name="dob" value={formData.dob} onChange={handleChange} required style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-light)', padding: '1rem', borderRadius: '4px', color: 'white', fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.3s ease' }} onFocus={(e) => e.target.style.borderColor = 'var(--primary)'} onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'} />
                   </div>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-dim)' }}>Guardian Name</label>
                      <input type="text" name="parentName" value={formData.parentName} onChange={handleChange} required style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-light)', padding: '1rem', borderRadius: '4px', color: 'white', fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.3s ease' }} onFocus={(e) => e.target.style.borderColor = 'var(--primary)'} onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'} />
                   </div>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-dim)' }}>Emergency Contact</label>
                      <input type="tel" name="parentContact" value={formData.parentContact} onChange={handleChange} required style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-light)', padding: '1rem', borderRadius: '4px', color: 'white', fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.3s ease' }} onFocus={(e) => e.target.style.borderColor = 'var(--primary)'} onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'} />
                   </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                   key="step2"
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}
                >
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-dim)' }}>Wing Preference</label>
                      <select name="wing" value={formData.wing} onChange={handleChange} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-light)', padding: '1rem', borderRadius: '4px', color: 'white', fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.3s ease', appearance: 'none' }} onFocus={(e) => e.target.style.borderColor = 'var(--primary)'} onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'}>
                         <option value="Kawoosa" style={{ background: 'var(--bg-deep)' }}>Kawoosa Khalisa Wing</option>
                         <option value="Kunzer" style={{ background: 'var(--bg-deep)' }}>Kunzer Wing</option>
                      </select>
                   </div>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-dim)' }}>Preferred Position</label>
                      <select name="position" value={formData.position} onChange={handleChange} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-light)', padding: '1rem', borderRadius: '4px', color: 'white', fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.3s ease', appearance: 'none' }} onFocus={(e) => e.target.style.borderColor = 'var(--primary)'} onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'}>
                         <option value="Forward" style={{ background: 'var(--bg-deep)' }}>Forward</option>
                         <option value="Midfielder" style={{ background: 'var(--bg-deep)' }}>Midfielder</option>
                         <option value="Defender" style={{ background: 'var(--bg-deep)' }}>Defender</option>
                         <option value="Goalkeeper" style={{ background: 'var(--bg-deep)' }}>Goalkeeper</option>
                      </select>
                   </div>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-dim)' }}>Playing Experience (Yrs)</label>
                      <input type="number" name="experience" value={formData.experience} onChange={handleChange} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-light)', padding: '1rem', borderRadius: '4px', color: 'white', fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.3s ease' }} onFocus={(e) => e.target.style.borderColor = 'var(--primary)'} onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'} />
                   </div>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-dim)' }}>School / College</label>
                      <input type="text" name="school" value={formData.school} onChange={handleChange} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-light)', padding: '1rem', borderRadius: '4px', color: 'white', fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.3s ease' }} onFocus={(e) => e.target.style.borderColor = 'var(--primary)'} onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'} />
                   </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                   key="step3"
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
                >
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-dim)' }}>Medical Notes / Allergies</label>
                      <textarea name="medicalNotes" value={formData.medicalNotes} onChange={handleChange} rows="4" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-light)', padding: '1rem', borderRadius: '4px', color: 'white', fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.3s ease', resize: 'vertical' }} onFocus={(e) => e.target.style.borderColor = 'var(--primary)'} onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'} placeholder="Enter any medical conditions or none..."></textarea>
                   </div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)', borderRadius: '4px' }}>
                      <input type="checkbox" required style={{ width: '1.25rem', height: '1.25rem', accentColor: 'var(--primary)' }} />
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em', lineHeight: 1.5, margin: 0 }}>I acknowledge that the information provided is accurate and I agree to the Academy's training protocol and terms of service.</p>
                   </div>
                </motion.div>
              )}
           </AnimatePresence>

           <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-light)', paddingTop: '2rem', marginTop: '3rem' }}>
              {step > 1 ? (
                <button type="button" onClick={prevStep} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', transition: 'color 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = 'white'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-dim)'}>
                   <ArrowLeft size={16} /> GO BACK
                </button>
              ) : <div />}
              
              {step < 3 ? (
                <button type="button" onClick={nextStep} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-light)', color: 'white', cursor: 'pointer', fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', transition: 'all 0.3s ease', borderRadius: '4px' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = 'var(--bg-deep)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'white'; }}>
                   NEXT <ArrowRight size={16} />
                </button>
              ) : (
                 <button type="submit" className="btn btn-primary" disabled={loading} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
                    {loading ? 'SUBMITTING...' : <><ClipboardCheck size={18} /> SUBMIT APPLICATION</>}
                 </button>
              )}
           </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
