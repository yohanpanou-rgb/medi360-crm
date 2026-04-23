import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NAV = [
  { path: '/dashboard', label: 'Dashboard', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg> },
  { path: '/patients', label: 'Ασθενείς', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { path: '/appointments', label: 'Ραντεβού', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
];

function Logo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ position: 'relative', width: 28, height: 18, flexShrink: 0 }}>
        <div style={{ position: 'absolute', left: 0, top: 0, width: 18, height: 18, borderRadius: '50%', background: 'rgba(255,255,255,0.25)' }} />
        <div style={{ position: 'absolute', left: 10, top: 0, width: 18, height: 18, borderRadius: '50%', background: '#2B3BF0' }} />
      </div>
      <div>
        <div style={{ color: '#fff', fontSize: 15, fontWeight: 500, letterSpacing: '-0.2px', lineHeight: 1 }}>medi360</div>
        <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 9, letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: 2 }}>CRM</div>
      </div>
    </div>
  );
}

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  // Close sidebar on route change (mobile)
  useEffect(() => { setSidebarOpen(false); }, [location]);

  const handleLogout = () => { logout(); navigate('/login'); };

  const currentPage = NAV.find(n => location.pathname.startsWith(n.path))?.label || '';

  const Sidebar = () => (
    <div style={{
      width: 'var(--sidebar-w)', background: 'var(--bg-sidebar)',
      display: 'flex', flexDirection: 'column', height: '100%',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* BG decoration */}
      <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(43,59,240,0.07)', pointerEvents: 'none' }} />

      {/* Logo area */}
      <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Logo />
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '10px 10px', overflowY: 'auto' }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.2)', letterSpacing: '1.5px', textTransform: 'uppercase', padding: '8px 10px 6px' }}>
          Μενού
        </div>
        {NAV.map((item, i) => (
          <NavLink key={item.path} to={item.path}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 12px', borderRadius: 10, marginBottom: 2,
              fontSize: 13.5, fontWeight: isActive ? 500 : 400,
              color: isActive ? '#fff' : 'rgba(255,255,255,0.45)',
              background: isActive ? 'rgba(43,59,240,0.35)' : 'transparent',
              transition: 'all 0.15s',
              animation: `slideIn 0.25s ease ${i * 0.05}s both`,
            })}
            onMouseEnter={e => {
              if (!e.currentTarget.style.background.includes('0.35')) {
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.color = 'rgba(255,255,255,0.75)';
              }
            }}
            onMouseLeave={e => {
              if (!e.currentTarget.style.background.includes('0.35')) {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'rgba(255,255,255,0.45)';
              }
            }}
          >
            <span style={{ opacity: 0.85, flexShrink: 0 }}>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div style={{ padding: '14px 14px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%', background: '#2B3BF0',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 600, color: '#fff', flexShrink: 0
          }}>{user?.initials}</div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ color: '#fff', fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name}</div>
            <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11 }}>{user?.role}</div>
          </div>
        </div>
        <button onClick={handleLogout} style={{
          width: '100%', padding: '7px', borderRadius: 8, background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.45)',
          fontSize: 12, fontWeight: 400,
        }}
          onMouseEnter={e => { e.target.style.background = 'rgba(239,68,68,0.15)'; e.target.style.color = '#fca5a5'; e.target.style.borderColor = 'rgba(239,68,68,0.2)'; }}
          onMouseLeave={e => { e.target.style.background = 'rgba(255,255,255,0.05)'; e.target.style.color = 'rgba(255,255,255,0.45)'; e.target.style.borderColor = 'rgba(255,255,255,0.08)'; }}
        >
          Αποσύνδεση
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Desktop sidebar */}
      {!isMobile && (
        <div style={{ flexShrink: 0, width: 'var(--sidebar-w)', height: '100vh' }}>
          <Sidebar />
        </div>
      )}

      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
            zIndex: 40, animation: 'overlayIn 0.2s ease',
          }}
        />
      )}

      {/* Mobile sidebar */}
      {isMobile && (
        <div style={{
          position: 'fixed', left: 0, top: 0, height: '100%',
          width: 'var(--sidebar-w)', zIndex: 50,
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.25s cubic-bezier(0.4,0,0.2,1)',
          boxShadow: sidebarOpen ? 'var(--shadow-lg)' : 'none',
        }}>
          <Sidebar />
        </div>
      )}

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Top bar */}
        <div style={{
          height: 56, background: 'var(--bg-card)', borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', paddingInline: 20, gap: 14, flexShrink: 0,
          boxShadow: '0 1px 0 var(--border)',
        }}>
          {isMobile && (
            <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{
              background: 'none', padding: 6, borderRadius: 8, color: 'var(--text)',
              display: 'flex', alignItems: 'center',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
          )}
          {isMobile && <Logo />}
          {!isMobile && (
            <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--text)' }}>{currentPage}</div>
          )}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%', background: 'var(--primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 600, color: '#fff',
            }}>{user?.initials}</div>
          </div>
        </div>

        {/* Page content */}
        <div style={{ flex: 1, overflow: 'auto', padding: '0' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
