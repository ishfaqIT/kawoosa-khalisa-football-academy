import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, UserCheck, Calendar, Newspaper, Image, ClipboardList,
  LayoutDashboard, LogOut, Plus, Trash2, CheckCircle, XCircle,
  Activity, Menu, X, Upload, ChevronDown, ImageIcon, Link2
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import useAcademyStore from '../../store/useAcademyStore';
import {
  fetchPlayers, createPlayer, deletePlayer,
  fetchCoaches, createCoach, deleteCoach,
  fetchNews, createNews, deleteNews,
  fetchEvents, createEvent, deleteEvent,
  fetchFixtures, createFixture, deleteFixture,
  fetchGallery, createGalleryItem, deleteGalleryItem,
  fetchRegistrations, updateRegistration, deleteRegistration,
  uploadImage
} from '../../api';

// ─── Sidebar Config ──────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'players', label: 'Players', icon: Users },
  { id: 'coaches', label: 'Coaches', icon: UserCheck },
  { id: 'news', label: 'News', icon: Newspaper },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'fixtures', label: 'Fixtures', icon: Activity },
  { id: 'gallery', label: 'Gallery', icon: Image },
  { id: 'registrations', label: 'Registrations', icon: ClipboardList },
];

// ─── Reusable UI ─────────────────────────────────────────────────────────────
const ss = { // shared styles
  input: {
    width: '100%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '8px', padding: '0.75rem 1rem', color: 'white', fontSize: '0.875rem',
    outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s',
  },
  select: {
    width: '100%', background: '#0d2347', border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '8px', padding: '0.75rem 1rem', color: 'white', fontSize: '0.875rem',
    outline: 'none', boxSizing: 'border-box', cursor: 'pointer', appearance: 'none',
    WebkitAppearance: 'none',
  },
  textarea: {
    width: '100%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '8px', padding: '0.75rem 1rem', color: 'white', fontSize: '0.875rem',
    outline: 'none', boxSizing: 'border-box', resize: 'vertical', minHeight: '96px',
  }
};

const Table = ({ headers, children }) => (
  <div style={{ overflowX: 'auto' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
      <thead>
        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          {headers.map(h => (
            <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', color: '#7a9abf', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.68rem', fontWeight: 700, whiteSpace: 'nowrap' }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  </div>
);

const Td = ({ children, style = {} }) => (
  <td style={{ padding: '0.85rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#a8bfd6', verticalAlign: 'middle', ...style }}>{children}</td>
);

const ActionBtn = ({ onClick, color, icon: Icon, title }) => (
  <button title={title} onClick={onClick}
    style={{ background: 'transparent', border: 'none', cursor: 'pointer', color, padding: '0.35rem', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
    onMouseEnter={e => e.currentTarget.style.background = `${color}22`}
    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
    <Icon size={15} />
  </button>
);

const Modal = ({ title, onClose, children }) => (
  <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
    <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.2 }}
      style={{ background: 'linear-gradient(145deg, #0d2347 0%, #061228 100%)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', width: '100%', maxWidth: '520px', padding: '2rem', maxHeight: '92vh', overflowY: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ fontWeight: 800, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'white' }}>{title}</h3>
        <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#7a9abf', cursor: 'pointer', borderRadius: '8px', padding: '0.35rem', display: 'flex' }}><X size={18} /></button>
      </div>
      {children}
    </motion.div>
  </div>
);

const Field = ({ label, children }) => (
  <div style={{ marginBottom: '1rem' }}>
    <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7a9abf', marginBottom: '0.4rem' }}>{label}</label>
    {children}
  </div>
);

// Select with custom arrow icon
const StyledSelect = ({ value, onChange, options }) => (
  <div style={{ position: 'relative' }}>
    <select value={value} onChange={onChange} style={ss.select}>
      {options.map(o => <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>)}
    </select>
    <ChevronDown size={15} style={{ position: 'absolute', right: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: '#7a9abf', pointerEvents: 'none' }} />
  </div>
);

// ─── Image Uploader ───────────────────────────────────────────────────────────
const ImageUploader = ({ value, onChange, label = 'Image' }) => {
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState('upload'); // 'upload' | 'url'
  const [drag, setDrag] = useState(false);

  const handleFile = async (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) { setError('Please select an image file.'); return; }
    if (file.size > 5 * 1024 * 1024) { setError('Max file size is 5MB.'); return; }
    setError('');
    setUploading(true);
    try {
      const url = await uploadImage(file);
      onChange({ target: { value: url } });
    } catch (e) {
      setError('Upload failed. Check server is running.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Field label={label}>
      {/* Mode toggle */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.6rem' }}>
        {[{ id: 'upload', icon: Upload, txt: 'Upload File' }, { id: 'url', icon: Link2, txt: 'Paste URL' }].map(m => {
          const Icon = m.icon;
          return (
            <button key={m.id} type="button" onClick={() => setMode(m.id)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.35rem 0.85rem', borderRadius: '6px', border: `1px solid ${mode === m.id ? '#39FF14' : 'rgba(255,255,255,0.12)'}`, background: mode === m.id ? 'rgba(57,255,20,0.1)' : 'transparent', color: mode === m.id ? '#39FF14' : '#7a9abf', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s' }}>
              <Icon size={13} /> {m.txt}
            </button>
          );
        })}
      </div>

      {mode === 'upload' ? (
        /* Drag & Drop Zone */
        <div
          onDragEnter={e => { e.preventDefault(); setDrag(true); }}
          onDragOver={e => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={e => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
          onClick={() => fileRef.current?.click()}
          style={{ border: `2px dashed ${drag ? '#39FF14' : 'rgba(255,255,255,0.15)'}`, borderRadius: '10px', padding: '1.25rem', textAlign: 'center', cursor: 'pointer', background: drag ? 'rgba(57,255,20,0.06)' : 'rgba(255,255,255,0.03)', transition: 'all 0.2s', position: 'relative' }}>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />
          {value ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center' }}>
              <img src={value} alt="preview" style={{ width: '52px', height: '52px', objectFit: 'cover', borderRadius: '8px' }} onError={e => e.currentTarget.style.display = 'none'} />
              <div style={{ textAlign: 'left' }}>
                <p style={{ fontSize: '0.78rem', color: '#39FF14', fontWeight: 700 }}>✓ Image selected</p>
                <p style={{ fontSize: '0.65rem', color: '#7a9abf' }}>Click or drop to replace</p>
              </div>
            </div>
          ) : (
            <div>
              {uploading ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '28px', height: '28px', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: '#39FF14', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                  <p style={{ fontSize: '0.75rem', color: '#39FF14', fontWeight: 700 }}>Uploading...</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <Upload size={28} color="#39FF14" />
                  <p style={{ fontSize: '0.82rem', color: 'white', fontWeight: 700 }}>Click to upload or drag & drop</p>
                  <p style={{ fontSize: '0.68rem', color: '#7a9abf' }}>PNG, JPG, WEBP, GIF — max 5MB</p>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        /* URL input */
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Link2 size={14} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#7a9abf' }} />
            <input type="url" placeholder="https://example.com/image.jpg" value={value} onChange={onChange}
              style={{ ...ss.input, paddingLeft: '2.4rem' }} />
          </div>
          {value && <img src={value} alt="preview" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0, border: '1px solid rgba(255,255,255,0.15)' }} onError={e => e.currentTarget.style.display = 'none'} />}
        </div>
      )}

      {error && <p style={{ fontSize: '0.72rem', color: '#ef4444', marginTop: '0.4rem', fontWeight: 600 }}>⚠ {error}</p>}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </Field>
  );
};

const Badge = ({ status }) => {
  const map = { Upcoming: '#39FF14', Completed: '#3b82f6', Pending: '#f59e0b', Approved: '#39FF14', Rejected: '#ef4444', Published: '#39FF14', Draft: '#6b7280', Postponed: '#f59e0b', Cancelled: '#ef4444' };
  const c = map[status] || '#6b7280';
  return <span style={{ padding: '0.2rem 0.7rem', borderRadius: '20px', fontSize: '0.65rem', fontWeight: 700, background: `${c}22`, color: c, letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{status}</span>;
};

const SaveBtn = () => (
  <button type="submit" style={{ width: '100%', padding: '0.85rem', background: 'linear-gradient(90deg, #39FF14, #00FF87)', border: 'none', borderRadius: '8px', color: '#0A1F44', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer', marginTop: '0.5rem', letterSpacing: '0.05em' }}>
    Save
  </button>
);

// ─── Dashboard Section ────────────────────────────────────────────────────────
const chartData = [
  { d: 'Mon', v: 420 }, { d: 'Tue', v: 380 }, { d: 'Wed', v: 510 },
  { d: 'Thu', v: 290 }, { d: 'Fri', v: 630 }, { d: 'Sat', v: 490 }, { d: 'Sun', v: 550 },
];

const DashboardSection = ({ stats }) => (
  <div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.2rem', marginBottom: '2rem' }}>
      {stats.map(s => (
        <div key={s.label} style={{ background: 'linear-gradient(145deg, rgba(10,31,68,0.9), rgba(5,15,34,0.9))', border: '1px solid rgba(57,255,20,0.15)', borderRadius: '14px', padding: '1.4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ color: '#7a9abf', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>{s.label}</p>
              <p style={{ fontSize: '2rem', fontWeight: 900, color: '#39FF14' }}>{s.value}</p>
            </div>
            <div style={{ padding: '0.6rem', background: 'rgba(57,255,20,0.1)', borderRadius: '10px', color: '#39FF14' }}><s.icon size={20} /></div>
          </div>
        </div>
      ))}
    </div>
    <div style={{ background: 'linear-gradient(145deg, rgba(10,31,68,0.9), rgba(5,15,34,0.9))', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '1.5rem' }}>
      <h3 style={{ fontWeight: 700, fontSize: '0.8rem', color: '#7a9abf', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.2rem' }}>Weekly Engagement</h3>
      <div style={{ height: '200px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#39FF14" stopOpacity={0.3} /><stop offset="95%" stopColor="#39FF14" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="d" stroke="rgba(255,255,255,0.25)" fontSize={11} axisLine={false} tickLine={false} />
            <YAxis stroke="rgba(255,255,255,0.25)" fontSize={11} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: '#0d2347', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px', color: 'white' }} />
            <Area type="monotone" dataKey="v" stroke="#39FF14" strokeWidth={2} fill="url(#g1)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

// ─── Players Section ──────────────────────────────────────────────────────────
const PlayersSection = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', position: 'Forward', jersey_no: '', wing_id: 1, bio: '', photo_url: '' });
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const load = async () => { setLoading(true); try { const { data } = await fetchPlayers(); setPlayers(data.data || []); } catch {} setLoading(false); };
  useEffect(() => { load(); }, []);
  const handleCreate = async (e) => { e.preventDefault(); await createPlayer(form); setShowModal(false); setForm({ name: '', position: 'Forward', jersey_no: '', wing_id: 1, bio: '', photo_url: '' }); load(); };
  const handleDelete = async (id) => { if (window.confirm('Delete player?')) { await deletePlayer(id); load(); } };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontWeight: 900, fontSize: '1.15rem', color: 'white' }}>Players <span style={{ color: '#39FF14' }}>({players.length})</span></h2>
        <button onClick={() => setShowModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem', background: '#39FF14', border: 'none', borderRadius: '8px', color: '#0A1F44', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer' }}><Plus size={16} /> Add Player</button>
      </div>
      <div style={{ background: 'linear-gradient(145deg, rgba(10,31,68,0.9), rgba(5,15,34,0.9))', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', overflow: 'hidden' }}>
        {loading ? <p style={{ padding: '2rem', color: '#7a9abf' }}>Loading...</p> : (
          <Table headers={['#', 'Photo', 'Name', 'Position', 'Wing', 'Jersey', 'Actions']}>
            {players.map((p, i) => (
              <tr key={p.id}>
                <Td>{i + 1}</Td>
                <Td><img src={p.photo_url || 'https://via.placeholder.com/40'} alt={p.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(57,255,20,0.3)' }} onError={e => e.currentTarget.src = 'https://via.placeholder.com/40'} /></Td>
                <Td style={{ color: 'white', fontWeight: 700 }}>{p.name}</Td>
                <Td>{p.position}</Td>
                <Td>{p.Wing?.name || (p.wing_id === 1 ? 'Kawoosa' : 'Kunzer')}</Td>
                <Td>#{p.jersey_no}</Td>
                <Td><ActionBtn onClick={() => handleDelete(p.id)} color="#ef4444" icon={Trash2} title="Delete" /></Td>
              </tr>
            ))}
          </Table>
        )}
      </div>
      {showModal && (
        <Modal title="Add New Player" onClose={() => setShowModal(false)}>
          <form onSubmit={handleCreate}>
            <Field label="Full Name"><input style={ss.input} required value={form.name} onChange={e => f('name', e.target.value)} placeholder="e.g. Adil Ahmad" /></Field>
            <Field label="Position">
              <StyledSelect value={form.position} onChange={e => f('position', e.target.value)} options={['Forward', 'Midfielder', 'Defender', 'Goalkeeper']} />
            </Field>
            <Field label="Wing">
              <StyledSelect value={form.wing_id} onChange={e => f('wing_id', Number(e.target.value))} options={[{ value: 1, label: 'Kawoosa Wing' }, { value: 2, label: 'Kunzer Wing' }]} />
            </Field>
            <Field label="Jersey No"><input style={ss.input} type="number" value={form.jersey_no} onChange={e => f('jersey_no', e.target.value)} placeholder="e.g. 10" /></Field>
            <ImageUploader value={form.photo_url} onChange={e => f('photo_url', e.target.value)} />
            <Field label="Bio"><textarea style={ss.textarea} value={form.bio} onChange={e => f('bio', e.target.value)} placeholder="Short player bio..." /></Field>
            <SaveBtn />
          </form>
        </Modal>
      )}
    </div>
  );
};

// ─── Coaches Section ──────────────────────────────────────────────────────────
const CoachesSection = () => {
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', role: 'Head Coach', wing_id: 1, experience_yrs: '', qualifications: '', bio: '', photo_url: '' });
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const load = async () => { setLoading(true); try { const { data } = await fetchCoaches(); setCoaches(data.data || []); } catch {} setLoading(false); };
  useEffect(() => { load(); }, []);
  const handleCreate = async (e) => { e.preventDefault(); await createCoach(form); setShowModal(false); setForm({ name: '', role: 'Head Coach', wing_id: 1, experience_yrs: '', qualifications: '', bio: '', photo_url: '' }); load(); };
  const handleDelete = async (id) => { if (window.confirm('Delete coach?')) { await deleteCoach(id); load(); } };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontWeight: 900, fontSize: '1.15rem', color: 'white' }}>Coaches <span style={{ color: '#39FF14' }}>({coaches.length})</span></h2>
        <button onClick={() => setShowModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem', background: '#39FF14', border: 'none', borderRadius: '8px', color: '#0A1F44', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer' }}><Plus size={16} /> Add Coach</button>
      </div>
      <div style={{ background: 'linear-gradient(145deg, rgba(10,31,68,0.9), rgba(5,15,34,0.9))', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', overflow: 'hidden' }}>
        {loading ? <p style={{ padding: '2rem', color: '#7a9abf' }}>Loading...</p> : (
          <Table headers={['Photo', 'Name', 'Role', 'Wing', 'Exp', 'Actions']}>
            {coaches.map(c => (
              <tr key={c.id}>
                <Td><img src={c.photo_url || 'https://via.placeholder.com/40'} alt={c.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(57,255,20,0.3)' }} onError={e => e.currentTarget.src = 'https://via.placeholder.com/40'} /></Td>
                <Td style={{ color: 'white', fontWeight: 700 }}>{c.name}</Td>
                <Td>{c.role}</Td>
                <Td>{c.Wing?.name || (c.wing_id === 1 ? 'Kawoosa' : 'Kunzer')}</Td>
                <Td>{c.experience_yrs ? `${c.experience_yrs} yrs` : '—'}</Td>
                <Td><ActionBtn onClick={() => handleDelete(c.id)} color="#ef4444" icon={Trash2} title="Delete" /></Td>
              </tr>
            ))}
          </Table>
        )}
      </div>
      {showModal && (
        <Modal title="Add Coach" onClose={() => setShowModal(false)}>
          <form onSubmit={handleCreate}>
            <Field label="Full Name"><input style={ss.input} required value={form.name} onChange={e => f('name', e.target.value)} placeholder="e.g. Bashrat Ahmad" /></Field>
            <Field label="Role">
              <StyledSelect value={form.role} onChange={e => f('role', e.target.value)} options={['Head Coach', 'Assistant Coach', 'Goalkeeper Coach', 'Fitness Trainer', 'Scout']} />
            </Field>
            <Field label="Wing">
              <StyledSelect value={form.wing_id} onChange={e => f('wing_id', Number(e.target.value))} options={[{ value: 1, label: 'Kawoosa Wing' }, { value: 2, label: 'Kunzer Wing' }]} />
            </Field>
            <Field label="Experience (Years)"><input style={ss.input} type="number" value={form.experience_yrs} onChange={e => f('experience_yrs', e.target.value)} placeholder="e.g. 8" /></Field>
            <Field label="Qualifications"><input style={ss.input} value={form.qualifications} onChange={e => f('qualifications', e.target.value)} placeholder="e.g. UEFA B License" /></Field>
            <ImageUploader value={form.photo_url} onChange={e => f('photo_url', e.target.value)} />
            <Field label="Bio"><textarea style={ss.textarea} value={form.bio} onChange={e => f('bio', e.target.value)} placeholder="Brief coach background..." /></Field>
            <SaveBtn />
          </form>
        </Modal>
      )}
    </div>
  );
};

// ─── News Section ─────────────────────────────────────────────────────────────
const NewsSection = () => {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', excerpt: '', content: '', author: 'Admin', status: 'Published', image_url: '' });
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const load = async () => { try { const { data } = await fetchNews(); setItems(data.data || []); } catch {} };
  useEffect(() => { load(); }, []);
  const handleCreate = async (e) => { e.preventDefault(); await createNews(form); setShowModal(false); load(); };
  const handleDelete = async (id) => { if (window.confirm('Delete?')) { await deleteNews(id); load(); } };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontWeight: 900, fontSize: '1.15rem', color: 'white' }}>News <span style={{ color: '#39FF14' }}>({items.length})</span></h2>
        <button onClick={() => setShowModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem', background: '#39FF14', border: 'none', borderRadius: '8px', color: '#0A1F44', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer' }}><Plus size={16} /> Add Article</button>
      </div>
      <div style={{ background: 'linear-gradient(145deg, rgba(10,31,68,0.9), rgba(5,15,34,0.9))', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', overflow: 'hidden' }}>
        <Table headers={['Image', 'Title', 'Author', 'Status', 'Date', 'Actions']}>
          {items.map(n => (
            <tr key={n.id}>
              <Td>{n.image_url && <img src={n.image_url} alt="" style={{ width: '48px', height: '32px', objectFit: 'cover', borderRadius: '6px' }} />}</Td>
              <Td style={{ color: 'white', fontWeight: 700, maxWidth: '240px' }}>{n.title}</Td>
              <Td>{n.author}</Td>
              <Td><Badge status={n.status} /></Td>
              <Td>{new Date(n.createdAt).toLocaleDateString()}</Td>
              <Td><ActionBtn onClick={() => handleDelete(n.id)} color="#ef4444" icon={Trash2} title="Delete" /></Td>
            </tr>
          ))}
        </Table>
      </div>
      {showModal && (
        <Modal title="Add News Article" onClose={() => setShowModal(false)}>
          <form onSubmit={handleCreate}>
            <Field label="Title"><input style={ss.input} required value={form.title} onChange={e => f('title', e.target.value)} placeholder="Article headline..." /></Field>
            <Field label="Excerpt"><input style={ss.input} value={form.excerpt} onChange={e => f('excerpt', e.target.value)} placeholder="Short summary..." /></Field>
            <Field label="Content"><textarea style={ss.textarea} required value={form.content} onChange={e => f('content', e.target.value)} placeholder="Full article content..." /></Field>
            <Field label="Author"><input style={ss.input} value={form.author} onChange={e => f('author', e.target.value)} /></Field>
            <ImageUploader value={form.image_url} onChange={e => f('image_url', e.target.value)} label="Cover Image URL" />
            <Field label="Status">
              <StyledSelect value={form.status} onChange={e => f('status', e.target.value)} options={['Published', 'Draft']} />
            </Field>
            <SaveBtn />
          </form>
        </Modal>
      )}
    </div>
  );
};

// ─── Events Section ───────────────────────────────────────────────────────────
const EventsSection = () => {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', event_date: '', location: '', type: 'Training', image_url: '' });
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const load = async () => { try { const { data } = await fetchEvents(); setItems(data.data || []); } catch {} };
  useEffect(() => { load(); }, []);
  const handleCreate = async (e) => { e.preventDefault(); await createEvent(form); setShowModal(false); load(); };
  const handleDelete = async (id) => { if (window.confirm('Delete?')) { await deleteEvent(id); load(); } };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontWeight: 900, fontSize: '1.15rem', color: 'white' }}>Events <span style={{ color: '#39FF14' }}>({items.length})</span></h2>
        <button onClick={() => setShowModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem', background: '#39FF14', border: 'none', borderRadius: '8px', color: '#0A1F44', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer' }}><Plus size={16} /> Add Event</button>
      </div>
      <div style={{ background: 'linear-gradient(145deg, rgba(10,31,68,0.9), rgba(5,15,34,0.9))', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', overflow: 'hidden' }}>
        <Table headers={['Title', 'Type', 'Date', 'Location', 'Actions']}>
          {items.map(ev => (
            <tr key={ev.id}>
              <Td style={{ color: 'white', fontWeight: 700 }}>{ev.title}</Td>
              <Td><Badge status={ev.type} /></Td>
              <Td>{new Date(ev.event_date).toLocaleDateString()}</Td>
              <Td>{ev.location}</Td>
              <Td><ActionBtn onClick={() => handleDelete(ev.id)} color="#ef4444" icon={Trash2} title="Delete" /></Td>
            </tr>
          ))}
        </Table>
      </div>
      {showModal && (
        <Modal title="Add Event" onClose={() => setShowModal(false)}>
          <form onSubmit={handleCreate}>
            <Field label="Title"><input style={ss.input} required value={form.title} onChange={e => f('title', e.target.value)} placeholder="Event name..." /></Field>
            <Field label="Description"><textarea style={ss.textarea} value={form.description} onChange={e => f('description', e.target.value)} placeholder="Event details..." /></Field>
            <Field label="Event Date"><input style={ss.input} type="datetime-local" required value={form.event_date} onChange={e => f('event_date', e.target.value)} /></Field>
            <Field label="Location"><input style={ss.input} required value={form.location} onChange={e => f('location', e.target.value)} placeholder="e.g. Kawoosa Main Ground" /></Field>
            <Field label="Type">
              <StyledSelect value={form.type} onChange={e => f('type', e.target.value)} options={['Training', 'Match', 'Trial', 'Meeting', 'Other']} />
            </Field>
            <ImageUploader value={form.image_url} onChange={e => f('image_url', e.target.value)} label="Event Image URL" />
            <SaveBtn />
          </form>
        </Modal>
      )}
    </div>
  );
};

// ─── Fixtures Section ─────────────────────────────────────────────────────────
const FixturesSection = () => {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ home_team: '', away_team: '', match_date: '', location: '', competition: '', status: 'Upcoming', home_score: '', away_score: '' });
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const load = async () => { try { const { data } = await fetchFixtures(); setItems(data.data || []); } catch {} };
  useEffect(() => { load(); }, []);
  const handleCreate = async (e) => { e.preventDefault(); await createFixture(form); setShowModal(false); load(); };
  const handleDelete = async (id) => { if (window.confirm('Delete?')) { await deleteFixture(id); load(); } };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontWeight: 900, fontSize: '1.15rem', color: 'white' }}>Fixtures <span style={{ color: '#39FF14' }}>({items.length})</span></h2>
        <button onClick={() => setShowModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem', background: '#39FF14', border: 'none', borderRadius: '8px', color: '#0A1F44', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer' }}><Plus size={16} /> Add Fixture</button>
      </div>
      <div style={{ background: 'linear-gradient(145deg, rgba(10,31,68,0.9), rgba(5,15,34,0.9))', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', overflow: 'hidden' }}>
        <Table headers={['Home', 'Away', 'Score', 'Competition', 'Date', 'Status', 'Actions']}>
          {items.map(fi => (
            <tr key={fi.id}>
              <Td style={{ color: '#39FF14', fontWeight: 700 }}>{fi.home_team}</Td>
              <Td>{fi.away_team}</Td>
              <Td style={{ color: 'white', fontWeight: 800, letterSpacing: '0.05em' }}>{fi.home_score != null ? `${fi.home_score} – ${fi.away_score}` : '—'}</Td>
              <Td>{fi.competition || '—'}</Td>
              <Td>{new Date(fi.match_date).toLocaleDateString()}</Td>
              <Td><Badge status={fi.status} /></Td>
              <Td><ActionBtn onClick={() => handleDelete(fi.id)} color="#ef4444" icon={Trash2} title="Delete" /></Td>
            </tr>
          ))}
        </Table>
      </div>
      {showModal && (
        <Modal title="Add Fixture" onClose={() => setShowModal(false)}>
          <form onSubmit={handleCreate}>
            <Field label="Home Team"><input style={ss.input} required value={form.home_team} onChange={e => f('home_team', e.target.value)} placeholder="e.g. KKFA Kawoosa" /></Field>
            <Field label="Away Team"><input style={ss.input} required value={form.away_team} onChange={e => f('away_team', e.target.value)} placeholder="e.g. Royal FC" /></Field>
            <Field label="Match Date"><input style={ss.input} type="datetime-local" required value={form.match_date} onChange={e => f('match_date', e.target.value)} /></Field>
            <Field label="Location"><input style={ss.input} value={form.location} onChange={e => f('location', e.target.value)} placeholder="e.g. Kawoosa Ground" /></Field>
            <Field label="Competition"><input style={ss.input} value={form.competition} onChange={e => f('competition', e.target.value)} placeholder="e.g. Regional League" /></Field>
            <Field label="Status">
              <StyledSelect value={form.status} onChange={e => f('status', e.target.value)} options={['Upcoming', 'Completed', 'Postponed', 'Cancelled']} />
            </Field>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Field label="Home Score"><input style={ss.input} type="number" value={form.home_score} onChange={e => f('home_score', e.target.value)} placeholder="0" /></Field>
              <Field label="Away Score"><input style={ss.input} type="number" value={form.away_score} onChange={e => f('away_score', e.target.value)} placeholder="0" /></Field>
            </div>
            <SaveBtn />
          </form>
        </Modal>
      )}
    </div>
  );
};

// ─── Gallery Section ──────────────────────────────────────────────────────────
const GallerySection = () => {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', image_url: '', category: 'General' });
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const load = async () => { try { const { data } = await fetchGallery(); setItems(data.data || []); } catch {} };
  useEffect(() => { load(); }, []);
  const handleCreate = async (e) => { e.preventDefault(); await createGalleryItem(form); setShowModal(false); load(); };
  const handleDelete = async (id) => { if (window.confirm('Delete image?')) { await deleteGalleryItem(id); load(); } };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontWeight: 900, fontSize: '1.15rem', color: 'white' }}>Gallery <span style={{ color: '#39FF14' }}>({items.length})</span></h2>
        <button onClick={() => setShowModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem', background: '#39FF14', border: 'none', borderRadius: '8px', color: '#0A1F44', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer' }}><Plus size={16} /> Add Image</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
        {items.map(img => (
          <div key={img.id} style={{ background: 'linear-gradient(145deg, rgba(10,31,68,0.9), rgba(5,15,34,0.9))', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ position: 'relative' }}>
              <img src={img.image_url} alt={img.title} style={{ width: '100%', height: '140px', objectFit: 'cover', display: 'block' }} onError={e => e.currentTarget.style.background = '#0d2347'} />
              <button onClick={() => handleDelete(img.id)} style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'rgba(239,68,68,0.85)', border: 'none', borderRadius: '6px', padding: '0.3rem', cursor: 'pointer', color: 'white', display: 'flex' }}><Trash2 size={13} /></button>
            </div>
            <div style={{ padding: '0.75rem' }}>
              <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'white', marginBottom: '0.2rem' }}>{img.title || '—'}</p>
              <p style={{ fontSize: '0.65rem', color: '#7a9abf' }}>{img.category}</p>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <Modal title="Add Gallery Image" onClose={() => setShowModal(false)}>
          <form onSubmit={handleCreate}>
            <Field label="Title"><input style={ss.input} value={form.title} onChange={e => f('title', e.target.value)} placeholder="Optional title..." /></Field>
            <ImageUploader value={form.image_url} onChange={e => f('image_url', e.target.value)} label="Image URL *" />
            <Field label="Category">
              <StyledSelect value={form.category} onChange={e => f('category', e.target.value)} options={['General', 'Matches', 'Training', 'Events', 'Ceremonies']} />
            </Field>
            <SaveBtn />
          </form>
        </Modal>
      )}
    </div>
  );
};

// ─── Registrations Section ────────────────────────────────────────────────────
const RegistrationsSection = () => {
  const [items, setItems] = useState([]);
  const load = async () => { try { const { data } = await fetchRegistrations(); setItems(data.data || []); } catch {} };
  useEffect(() => { load(); }, []);
  const handleStatus = async (id, status) => { await updateRegistration(id, { status }); load(); };
  const handleDelete = async (id) => { if (window.confirm('Delete registration?')) { await deleteRegistration(id); load(); } };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontWeight: 900, fontSize: '1.15rem', color: 'white' }}>Registrations <span style={{ color: '#39FF14' }}>({items.length})</span></h2>
      </div>
      <div style={{ background: 'linear-gradient(145deg, rgba(10,31,68,0.9), rgba(5,15,34,0.9))', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', overflow: 'hidden' }}>
        <Table headers={['Player', 'Parent', 'Phone', 'Wing', 'Position', 'Status', 'Actions']}>
          {items.map(r => (
            <tr key={r.id}>
              <Td style={{ color: 'white', fontWeight: 700 }}>{r.player_name}</Td>
              <Td>{r.parent_name}</Td>
              <Td>{r.phone}</Td>
              <Td>{r.Wing?.name || '—'}</Td>
              <Td>{r.position || '—'}</Td>
              <Td><Badge status={r.status} /></Td>
              <Td>
                <div style={{ display: 'flex', gap: '0.25rem' }}>
                  <ActionBtn onClick={() => handleStatus(r.id, 'Approved')} color="#39FF14" icon={CheckCircle} title="Approve" />
                  <ActionBtn onClick={() => handleStatus(r.id, 'Rejected')} color="#ef4444" icon={XCircle} title="Reject" />
                  <ActionBtn onClick={() => handleDelete(r.id)} color="#6b7280" icon={Trash2} title="Delete" />
                </div>
              </Td>
            </tr>
          ))}
        </Table>
      </div>
    </div>
  );
};

// ─── Sidebar (defined OUTSIDE AdminDashboard to prevent remounting) ───────────
const AdminSidebar = ({ active, setActive, setSidebarOpen, user, logout }) => (
  <aside style={{ width: '230px', minWidth: '230px', background: 'linear-gradient(180deg, #061228 0%, #040d1e 100%)', borderRight: '1px solid rgba(255,255,255,0.07)', padding: '1.5rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100vh', overflowY: 'auto' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0.75rem' }}>
      <div style={{ width: '2.2rem', height: '2.2rem', background: '#39FF14', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <span style={{ color: '#0A1F44', fontWeight: 900, fontSize: '0.78rem' }}>KK</span>
      </div>
      <div>
        <p style={{ fontWeight: 900, fontSize: '0.85rem', color: 'white', letterSpacing: '0.02em' }}>KKFA Admin</p>
        <p style={{ fontSize: '0.62rem', color: '#7a9abf', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{user?.role}</p>
      </div>
    </div>
    <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', flex: 1 }}>
      {NAV_ITEMS.map(item => {
        const isActive = active === item.id;
        const Icon = item.icon;
        return (
          <button key={item.id} onClick={() => { setActive(item.id); setSidebarOpen(false); }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', padding: '0.7rem 0.85rem', borderRadius: '10px', border: 'none', cursor: 'pointer', background: isActive ? '#39FF14' : 'transparent', color: isActive ? '#0A1F44' : '#a8bfd6', fontWeight: isActive ? 800 : 500, fontSize: '0.85rem', width: '100%', textAlign: 'left', transition: 'all 0.15s' }}
            onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(57,255,20,0.08)'; }}
            onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}>
            <Icon size={16} />
            {item.label}
          </button>
        );
      })}
    </nav>
    <button onClick={logout} style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', padding: '0.7rem 0.85rem', borderRadius: '10px', border: 'none', cursor: 'pointer', background: 'rgba(239,68,68,0.1)', color: '#ef4444', fontWeight: 700, fontSize: '0.85rem', width: '100%', margin: '0 0 0.5rem' }}>
      <LogOut size={16} /> Logout
    </button>
    <div style={{ textAlign: 'center', padding: '0.5rem', opacity: 0.6 }}>
      <p style={{ fontSize: '0.62rem', color: '#7a9abf' }}>Developed by</p>
      <a href="https://ishfaqit-ishfaq-portfolio-hizya93l8.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.65rem', color: '#39FF14', fontWeight: 700, textDecoration: 'none' }}>
        Ishfaq Ahmad Malik
      </a>
    </div>
  </aside>
);

// ─── Main AdminDashboard ──────────────────────────────────────────────────────
const AdminDashboard = () => {
  const [active, setActive] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState([]);
  const { user, logout } = useAcademyStore();

  useEffect(() => {
    (async () => {
      try {
        const [pl, co, nw, ev, fx] = await Promise.all([fetchPlayers(), fetchCoaches(), fetchNews(), fetchEvents(), fetchFixtures()]);
        setStats([
          { label: 'Players', value: pl.data.data?.length ?? 0, icon: Users },
          { label: 'Coaches', value: co.data.data?.length ?? 0, icon: UserCheck },
          { label: 'News', value: nw.data.data?.length ?? 0, icon: Newspaper },
          { label: 'Events', value: ev.data.data?.length ?? 0, icon: Calendar },
          { label: 'Fixtures', value: fx.data.data?.length ?? 0, icon: Activity },
        ]);
      } catch {}
    })();
  }, []);

  // ── Render the active section (use a switch/function to avoid premature JSX evaluation)
  const renderSection = () => {
    switch (active) {
      case 'dashboard':    return <DashboardSection stats={stats} />;
      case 'players':      return <PlayersSection />;
      case 'coaches':      return <CoachesSection />;
      case 'news':         return <NewsSection />;
      case 'events':       return <EventsSection />;
      case 'fixtures':     return <FixturesSection />;
      case 'gallery':      return <GallerySection />;
      case 'registrations':return <RegistrationsSection />;
      default:             return <DashboardSection stats={stats} />;
    }
  };

  const sidebarProps = { active, setActive, setSidebarOpen, user, logout };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#040d1e', color: 'white', display: 'flex' }}>
      {/* Desktop Sidebar */}
      <div className="admin-desktop-sidebar">
        <AdminSidebar {...sidebarProps} />
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 98 }} />
            <motion.div initial={{ x: -240 }} animate={{ x: 0 }} exit={{ x: -240 }} transition={{ duration: 0.22 }} style={{ position: 'fixed', top: 0, left: 0, zIndex: 99 }}>
              <AdminSidebar {...sidebarProps} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto', minWidth: 0 }}>
        {/* Top Bar */}
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: 'rgba(4,13,30,0.96)', backdropFilter: 'blur(12px)', zIndex: 50 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <button className="admin-menu-toggle" onClick={() => setSidebarOpen(true)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', cursor: 'pointer', borderRadius: '8px', padding: '0.45rem', display: 'none', alignItems: 'center' }}><Menu size={20} /></button>
            <h1 style={{ fontWeight: 800, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'white' }}>
              {NAV_ITEMS.find(n => n.id === active)?.label || 'Dashboard'}
            </h1>
          </div>
          <span style={{ fontSize: '0.75rem', color: '#7a9abf' }}>Welcome, <strong style={{ color: '#39FF14' }}>{user?.name}</strong></span>
        </div>

        {/* Page Content */}
        <div style={{ padding: '1.5rem 2rem', flex: 1 }}>
          <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }}>
            {renderSection()}
          </motion.div>
        </div>
      </main>

      <style>{`
        @media (max-width: 900px) {
          .admin-desktop-sidebar { display: none !important; }
          .admin-menu-toggle { display: flex !important; }
        }
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.3); }
        select option { background: #0d2347; color: white; }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
