import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Players from './pages/Players';
import Coaches from './pages/Coaches';
import Fixtures from './pages/Fixtures';
import Events from './pages/Events';
import News from './pages/News';
import Gallery from './pages/Gallery';
import Shop from './pages/Shop';
import Register from './pages/Register';
import Contact from './pages/Contact';
import AdminDashboard from './pages/admin/AdminDashboard';
import Login from './pages/admin/Login';
import useAcademyStore from './store/useAcademyStore';

const ProtectedRoute = ({ children }) => {
  const user = useAcademyStore((state) => state.user);
  if (!user) {
    return <Login />;
  }
  return children;
};

const NotFound = () => (
  <Layout>
    <div style={{ padding: '5rem 0', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 className="text-gradient" style={{ fontSize: '10rem', lineHeight: 1 }}>404</h1>
      <p style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.4em', marginBottom: '2.5rem', fontWeight: 700 }}>Sector Not Found</p>
      <button onClick={() => window.location.href = '/'} className="btn btn-outline">Return to Base</button>
    </div>
  </Layout>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes with Main Layout */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/players" element={<Layout><Players /></Layout>} />
        <Route path="/coaches" element={<Layout><Coaches /></Layout>} />
        <Route path="/fixtures" element={<Layout><Fixtures /></Layout>} />
        <Route path="/events" element={<Layout><Events /></Layout>} />
        <Route path="/news" element={<Layout><News /></Layout>} />
        <Route path="/gallery" element={<Layout><Gallery /></Layout>} />
        <Route path="/shop" element={<Layout><Shop /></Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />

        {/* Admin Routes - No Main Layout */}
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/*" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
