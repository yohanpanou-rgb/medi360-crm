import React, { useState } from 'react';

const INITIAL = [
  { id: 1, name: 'Αντιγόνη Παπαδοπούλου', initials: 'ΑΠ', phone: '6901234567', email: 'antigo@email.gr', service: 'Δερματολογία', visits: 5, lastVisit: '22/04/2026', status: 'Ενεργός' },
  { id: 2, name: 'Μένη Κωστοπούλου', initials: 'ΜΚ', phone: '6912345678', email: 'meni@email.gr', service: 'Ενδοδοντολογία', visits: 3, lastVisit: '22/04/2026', status: 'Ενεργός' },
  { id: 3, name: 'Σοφία Μαρκοπούλου', initials: 'ΣΜ', phone: '6923456789', email: 'sofia@email.gr', service: 'Αισθητική', visits: 8, lastVisit: '21/04/2026', status: 'Ενεργός' },
  { id: 4, name: 'Δήμητρα Λαζαρίδου', initials: 'ΔΛ', phone: '6934567890', email: 'dimitra@email.gr', service: 'Laser', visits: 12, lastVisit: '21/04/2026', status: 'Ενεργός' },
  { id: 5, name: 'Γιώργος Τσέλιος', initials: 'ΓΤ', phone: '6945678901', email: 'giorgos@email.gr', service: 'Laser', visits: 2, lastVisit: '18/04/2026', status: 'Νέος' },
  { id: 6, name: 'Ελένη Παπαθανασίου', initials: 'ΕΠ', phone: '6956789012', email: 'eleni@email.gr', service: 'Δερματολογία', visits: 15, lastVisit: '15/04/2026', status: 'Ενεργός' },
];

const SERVICES = ['Όλες', 'Δερματολογία', 'Αισθητική', 'Laser', 'Ενδοδοντολογία'];

const SERVICE_COLORS = {
  'Δερματολογία': { bg: '#eef0fe', color: '#2B3BF0' },
  'Αισθητική': { bg: '#fdf2f8', color: '#9d174d' },
  'Laser': { bg: '#ecfdf5', color: '#065f46' },
  'Ενδοδοντολογία': { bg: '#fffbeb', color: '#92400e' },
};

function Modal({ onClose, onSave }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: 'Δερματολογία' });
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, animation: 'overlayIn 0.2s ease' }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background: '#fff', borderRadius: 16, padding: '28px', width: '100%', maxWidth: 420, boxShadow: 'var(--shadow-lg)', animation: 'modalIn 0.25s ease' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h2 style={{ fontSize: 17, fontWeight: 600 }}>Νέος Ασθενής</h2>
          <button onClick={onClose} style={{ background: 'none', fontSize: 20, color: 'var(--text-2)', padding: 4, lineHeight: 1 }}>×</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--text-2)', display: 'block', marginBottom: 6 }}>Ονοματεπώνυμο *</label>
            <input value={form.name} onChange={set('name')} placeholder="π.χ. Μαρία Παπαδοπούλου" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div>
              <label style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--text-2)', display: 'block', marginBottom: 6 }}>Τηλέφωνο</label>
              <input value={form.phone} onChange={set('phone')} placeholder="69xxxxxxxx" />
            </div>
            <div>
              <label style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--text-2)', display: 'block', marginBottom: 6 }}>Υπηρεσία</label>
              <select value={form.service} onChange={set('service')}>
                {SERVICES.slice(1).map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--text-2)', display: 'block', marginBottom: 6 }}>Email</label>
            <input type="email" value={form.email} onChange={set('email')} placeholder="email@example.gr" />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
          <button onClick={onClose} style={{
            flex: 1, padding: '10px', borderRadius: 8, background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-2)', fontSize: 13.5
          }}>Ακύρωση</button>
          <button onClick={() => form.name && onSave(form)} style={{
            flex: 2, padding: '10px', borderRadius: 8, background: 'var(--primary)', color: '#fff', fontSize: 13.5, fontWeight: 500,
            boxShadow: '0 2px 8px rgba(43,59,240,0.25)', opacity: form.name ? 1 : 0.5
          }}>Αποθήκευση</button>
        </div>
      </div>
    </div>
  );
}

export default function Patients() {
  const [patients, setPatients] = useState(INITIAL);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Όλες');
  const [showModal, setShowModal] = useState(false);

  const filtered = patients.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.phone.includes(search) || p.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'Όλες' || p.service === filter;
    return matchSearch && matchFilter;
  });

  const handleSave = (form) => {
    const initials = form.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    setPatients(p => [...p, { id: Date.now(), ...form, initials, visits: 0, lastVisit: new Date().toLocaleDateString('el-GR'), status: 'Νέος' }]);
    setShowModal(false);
  };

  return (
    <div style={{ padding: '24px', animation: 'fadeIn 0.3s ease' }}>
      {showModal && <Modal onClose={() => setShowModal(false)} onSave={handleSave} />}

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.4px', marginBottom: 4 }}>Ασθενείς</h1>
          <p style={{ color: 'var(--text-2)', fontSize: 13.5 }}>{patients.length} συνολικά · {filtered.length} εμφανίζονται</p>
        </div>
        <button onClick={() => setShowModal(true)} style={{
          padding: '9px 18px', borderRadius: 10, background: 'var(--primary)',
          color: '#fff', fontSize: 13.5, fontWeight: 500,
          boxShadow: '0 2px 10px rgba(43,59,240,0.28)',
          display: 'flex', alignItems: 'center', gap: 6,
        }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--primary-hover)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--primary)'}
        >
          <span style={{ fontSize: 18, lineHeight: 1 }}>+</span> Νέος Ασθενής
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: '1 1 220px' }}>
          <svg style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Αναζήτηση ονόματος, email, τηλεφώνου..."
            style={{ paddingLeft: 34 }} />
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {SERVICES.map(s => (
            <button key={s} onClick={() => setFilter(s)} style={{
              padding: '8px 14px', borderRadius: 8, fontSize: 13, border: '1px solid',
              borderColor: filter === s ? 'var(--primary)' : 'var(--border)',
              background: filter === s ? 'var(--primary-light)' : '#fff',
              color: filter === s ? 'var(--primary)' : 'var(--text-2)',
              fontWeight: filter === s ? 500 : 400,
              transition: 'all 0.15s',
            }}>{s}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: 14, border: '1px solid var(--border)', boxShadow: 'var(--shadow)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
            <thead>
              <tr style={{ background: 'var(--bg)' }}>
                {['Ασθενής', 'Τηλέφωνο', 'Υπηρεσία', 'Επισκέψεις', 'Τελευταία Επίσκεψη', 'Status'].map(h => (
                  <th key={h} style={{ padding: '11px 18px', textAlign: 'left', fontSize: 11.5, color: 'var(--text-2)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.6px', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr key={p.id} style={{ borderTop: '1px solid var(--border-light)', cursor: 'pointer', transition: 'background 0.12s', animation: `fadeIn 0.25s ease ${i * 0.04}s both` }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '13px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, flexShrink: 0 }}>{p.initials}</div>
                      <div>
                        <div style={{ fontSize: 13.5, fontWeight: 500 }}>{p.name}</div>
                        <div style={{ fontSize: 11.5, color: 'var(--text-2)' }}>{p.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '13px 18px', fontSize: 13, color: 'var(--text-2)', fontFamily: "'DM Mono', monospace" }}>{p.phone}</td>
                  <td style={{ padding: '13px 18px' }}>
                    <span style={{ fontSize: 12, padding: '4px 10px', borderRadius: 20, fontWeight: 500, ...(SERVICE_COLORS[p.service] || { bg: '#f3f4f6', color: '#374151' }), background: SERVICE_COLORS[p.service]?.bg }}>{p.service}</span>
                  </td>
                  <td style={{ padding: '13px 18px', fontSize: 13.5, color: 'var(--text)', fontWeight: 500 }}>{p.visits}</td>
                  <td style={{ padding: '13px 18px', fontSize: 13, color: 'var(--text-2)' }}>{p.lastVisit}</td>
                  <td style={{ padding: '13px 18px' }}>
                    <span style={{ fontSize: 11.5, padding: '3px 9px', borderRadius: 20, fontWeight: 500, background: p.status === 'Νέος' ? '#fffbeb' : '#ecfdf5', color: p.status === 'Νέος' ? '#92400e' : '#065f46' }}>{p.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div style={{ padding: '48px', textAlign: 'center', color: 'var(--text-2)' }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
            <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 6 }}>Δεν βρέθηκαν ασθενείς</div>
            <div style={{ fontSize: 13, color: 'var(--text-3)' }}>Δοκίμασε διαφορετικά κριτήρια αναζήτησης</div>
          </div>
        )}
      </div>
    </div>
  );
}
