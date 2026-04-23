import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const STATS = [
  { label: 'Ασθενείς', value: '124', sub: '+8 αυτό τον μήνα', color: '#2B3BF0', bg: '#eef0fe', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg> },
  { label: 'Ραντεβού Σήμερα', value: '12', sub: '3 εκκρεμούν', color: '#10b981', bg: '#ecfdf5', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
  { label: 'Έσοδα Μήνα', value: '€8.420', sub: '+12% vs προηγ.', color: '#f59e0b', bg: '#fffbeb', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
  { label: 'Ποσοστό Επιτυχίας', value: '94%', sub: '89 ολοκληρωμένα', color: '#8b5cf6', bg: '#f5f3ff', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg> },
];

const RECENT = [
  { name: 'Αντιγόνη Παπαδοπούλου', service: 'Δερματολογία', date: '22/04/2026', status: 'Ολοκληρώθηκε', initials: 'ΑΠ' },
  { name: 'Μένη Κωστοπούλου', service: 'Ενδοδοντολογία', date: '22/04/2026', status: 'Σε εξέλιξη', initials: 'ΜΚ' },
  { name: 'Σοφία Μαρκοπούλου', service: 'Αισθητική', date: '21/04/2026', status: 'Ολοκληρώθηκε', initials: 'ΣΜ' },
  { name: 'Δήμητρα Λαζαρίδου', service: 'Laser', date: '21/04/2026', status: 'Ολοκληρώθηκε', initials: 'ΔΛ' },
];

const STATUS = {
  'Ολοκληρώθηκε': { bg: '#ecfdf5', color: '#065f46' },
  'Σε εξέλιξη': { bg: '#eef0fe', color: '#1a1f3a' },
};

const UPCOMING = [
  { time: '10:30', patient: 'Μένη Κ.', service: 'Ενδοδοντολογία' },
  { time: '12:00', patient: 'Γιώργος Τ.', service: 'Laser' },
  { time: '14:30', patient: 'Σοφία Μ.', service: 'Αισθητική' },
];

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Καλημέρα' : hour < 18 ? 'Καλησπέρα' : 'Καλό βράδυ';

  return (
    <div style={{ padding: '24px', maxWidth: 1200, animation: 'fadeIn 0.3s ease' }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.4px', marginBottom: 4 }}>
          {greeting}, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p style={{ color: 'var(--text-2)', fontSize: 13.5 }}>
          {new Date().toLocaleDateString('el-GR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 24 }}>
        {STATS.map((s, i) => (
          <div key={i} style={{
            background: '#fff', borderRadius: 14, padding: '18px 20px',
            border: '1px solid var(--border)', boxShadow: 'var(--shadow)',
            animation: `fadeIn 0.3s ease ${i * 0.06}s both`,
            transition: 'transform 0.15s, box-shadow 0.15s',
            cursor: 'default',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--shadow)'; }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: 'var(--text-2)', fontWeight: 500 }}>{s.label}</div>
              <div style={{ padding: 8, borderRadius: 10, background: s.bg, color: s.color }}>{s.icon}</div>
            </div>
            <div style={{ fontSize: 30, fontWeight: 700, color: s.color, letterSpacing: '-1px', lineHeight: 1, marginBottom: 6 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Two columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 16 }}>
        {/* Recent patients */}
        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid var(--border)', boxShadow: 'var(--shadow)', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 14, fontWeight: 600 }}>Πρόσφατοι Ασθενείς</span>
            <button onClick={() => navigate('/patients')} style={{
              background: 'none', color: 'var(--primary)', fontSize: 12.5, fontWeight: 500, padding: '4px 10px', borderRadius: 6,
            }}
              onMouseEnter={e => e.target.style.background = 'var(--primary-light)'}
              onMouseLeave={e => e.target.style.background = 'none'}
            >Δες όλους →</button>
          </div>
          <div>
            {RECENT.map((p, i) => (
              <div key={i} style={{
                padding: '13px 20px', display: 'flex', alignItems: 'center', gap: 12,
                borderBottom: i < RECENT.length - 1 ? '1px solid var(--border-light)' : 'none',
                transition: 'background 0.12s', cursor: 'pointer',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: '50%', background: 'var(--primary-light)',
                  color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 600, flexShrink: 0,
                }}>{p.initials}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 500, marginBottom: 2 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-2)' }}>{p.service}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 4 }}>{p.date}</div>
                  <span style={{
                    fontSize: 11, padding: '3px 8px', borderRadius: 20, fontWeight: 500,
                    background: STATUS[p.status]?.bg || '#f3f4f6',
                    color: STATUS[p.status]?.color || '#374151',
                  }}>{p.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming today */}
        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid var(--border)', boxShadow: 'var(--shadow)', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>Σήμερα</div>
            <div style={{ fontSize: 12, color: 'var(--text-2)' }}>Επερχόμενα ραντεβού</div>
          </div>
          <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {UPCOMING.map((a, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px',
                borderRadius: 10, background: 'var(--bg)', border: '1px solid var(--border-light)',
                animation: `fadeIn 0.3s ease ${i * 0.08}s both`,
              }}>
                <div style={{
                  fontFamily: "'DM Mono', monospace", fontSize: 13, fontWeight: 500,
                  color: 'var(--primary)', background: 'var(--primary-light)',
                  padding: '4px 8px', borderRadius: 6, flexShrink: 0,
                }}>{a.time}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{a.patient}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-2)' }}>{a.service}</div>
                </div>
              </div>
            ))}
            <button onClick={() => navigate('/appointments')} style={{
              marginTop: 4, padding: '9px', borderRadius: 10, background: 'var(--primary)',
              color: '#fff', fontSize: 13, fontWeight: 500,
              boxShadow: '0 2px 8px rgba(43,59,240,0.25)',
            }}
              onMouseEnter={e => e.target.style.background = 'var(--primary-hover)'}
              onMouseLeave={e => e.target.style.background = 'var(--primary)'}
            >Όλα τα ραντεβού →</button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .dashboard-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
