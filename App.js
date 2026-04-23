import React, { useState } from 'react';

const INITIAL = [
  { id: 1, patient: 'Αντιγόνη Π.', initials: 'ΑΠ', service: 'Δερματολογία', time: '09:00', date: '22/04/2026', doctor: 'Δρ. Σταύρου', status: 'Επιβεβαιωμένο', duration: 30 },
  { id: 2, patient: 'Μένη Κ.', initials: 'ΜΚ', service: 'Ενδοδοντολογία', time: '10:30', date: '22/04/2026', doctor: 'Δρ. Παπαδάκης', status: 'Σε αναμονή', duration: 60 },
  { id: 3, patient: 'Γιώργος Τ.', initials: 'ΓΤ', service: 'Laser', time: '12:00', date: '22/04/2026', doctor: 'Δρ. Σταύρου', status: 'Επιβεβαιωμένο', duration: 45 },
  { id: 4, patient: 'Σοφία Μ.', initials: 'ΣΜ', service: 'Αισθητική', time: '14:30', date: '23/04/2026', doctor: 'Δρ. Νικολάου', status: 'Επιβεβαιωμένο', duration: 30 },
  { id: 5, patient: 'Ελένη Π.', initials: 'ΕΠ', service: 'Δερματολογία', time: '11:00', date: '23/04/2026', doctor: 'Δρ. Σταύρου', status: 'Σε αναμονή', duration: 30 },
];

const STATUS_STYLE = {
  'Επιβεβαιωμένο': { bg: '#ecfdf5', color: '#065f46', dot: '#10b981' },
  'Σε αναμονή':    { bg: '#fffbeb', color: '#92400e', dot: '#f59e0b' },
  'Ακυρώθηκε':     { bg: '#fef2f2', color: '#991b1b', dot: '#ef4444' },
};

const SERVICE_COLORS = {
  'Δερματολογία': '#2B3BF0', 'Αισθητική': '#9d174d',
  'Laser': '#10b981', 'Ενδοδοντολογία': '#f59e0b',
};

function Modal({ onClose, onSave }) {
  const [form, setForm] = useState({ patient: '', service: 'Δερματολογία', time: '', date: '', doctor: '', duration: 30 });
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const valid = form.patient && form.time && form.date;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, animation: 'overlayIn 0.2s ease' }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background: '#fff', borderRadius: 16, padding: '28px', width: '100%', maxWidth: 420, boxShadow: 'var(--shadow-lg)', animation: 'modalIn 0.25s ease' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h2 style={{ fontSize: 17, fontWeight: 600 }}>Νέο Ραντεβού</h2>
          <button onClick={onClose} style={{ background: 'none', fontSize: 22, color: 'var(--text-2)', padding: 4, lineHeight: 1 }}>×</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--text-2)', display: 'block', marginBottom: 6 }}>Ασθενής *</label>
            <input value={form.patient} onChange={set('patient')} placeholder="π.χ. Μαρία Π." />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div>
              <label style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--text-2)', display: 'block', marginBottom: 6 }}>Ημερομηνία *</label>
              <input type="date" value={form.date} onChange={set('date')} />
            </div>
            <div>
              <label style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--text-2)', display: 'block', marginBottom: 6 }}>Ώρα *</label>
              <input type="time" value={form.time} onChange={set('time')} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div>
              <label style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--text-2)', display: 'block', marginBottom: 6 }}>Υπηρεσία</label>
              <select value={form.service} onChange={set('service')}>
                {['Δερματολογία', 'Αισθητική', 'Laser', 'Ενδοδοντολογία'].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--text-2)', display: 'block', marginBottom: 6 }}>Διάρκεια (λεπτά)</label>
              <select value={form.duration} onChange={set('duration')}>
                {[15, 30, 45, 60, 90].map(d => <option key={d} value={d}>{d} λεπτά</option>)}
              </select>
            </div>
          </div>
          <div>
            <label style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--text-2)', display: 'block', marginBottom: 6 }}>Ιατρός</label>
            <input value={form.doctor} onChange={set('doctor')} placeholder="π.χ. Δρ. Σταύρου" />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
          <button onClick={onClose} style={{ flex: 1, padding: '10px', borderRadius: 8, background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-2)', fontSize: 13.5 }}>Ακύρωση</button>
          <button onClick={() => valid && onSave(form)} style={{ flex: 2, padding: '10px', borderRadius: 8, background: 'var(--primary)', color: '#fff', fontSize: 13.5, fontWeight: 500, boxShadow: '0 2px 8px rgba(43,59,240,0.25)', opacity: valid ? 1 : 0.5 }}>Αποθήκευση</button>
        </div>
      </div>
    </div>
  );
}

export default function Appointments() {
  const [appointments, setAppointments] = useState(INITIAL);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('Όλα');

  const dates = [...new Set(appointments.map(a => a.date))].sort();
  const allFilters = ['Όλα', ...dates];

  const filtered = appointments.filter(a => filter === 'Όλα' || a.date === filter);

  const handleSave = (form) => {
    const initials = form.patient.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    const dateFormatted = form.date ? new Date(form.date).toLocaleDateString('el-GR') : '';
    setAppointments(a => [...a, { id: Date.now(), ...form, initials, date: dateFormatted || form.date, status: 'Σε αναμονή' }]);
    setShowModal(false);
  };

  const updateStatus = (id, status) => {
    setAppointments(a => a.map(x => x.id === id ? { ...x, status } : x));
  };

  const grouped = dates.reduce((acc, date) => {
    if (filter === 'Όλα' || filter === date) {
      acc[date] = appointments.filter(a => a.date === date);
    }
    return acc;
  }, {});

  return (
    <div style={{ padding: '24px', animation: 'fadeIn 0.3s ease' }}>
      {showModal && <Modal onClose={() => setShowModal(false)} onSave={handleSave} />}

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.4px', marginBottom: 4 }}>Ραντεβού</h1>
          <p style={{ color: 'var(--text-2)', fontSize: 13.5 }}>{filtered.length} ραντεβού</p>
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
          <span style={{ fontSize: 18, lineHeight: 1 }}>+</span> Νέο Ραντεβού
        </button>
      </div>

      {/* Date filter pills */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
        {allFilters.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '7px 14px', borderRadius: 8, fontSize: 13, border: '1px solid',
            borderColor: filter === f ? 'var(--primary)' : 'var(--border)',
            background: filter === f ? 'var(--primary-light)' : '#fff',
            color: filter === f ? 'var(--primary)' : 'var(--text-2)',
            fontWeight: filter === f ? 500 : 400, transition: 'all 0.15s',
          }}>{f}</button>
        ))}
      </div>

      {/* Grouped appointments */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {Object.entries(grouped).map(([date, appts]) => (
          <div key={date}>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ height: 1, flex: 1, background: 'var(--border)' }} />
              {date}
              <div style={{ height: 1, flex: 1, background: 'var(--border)' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {appts.sort((a, b) => a.time.localeCompare(b.time)).map((a, i) => (
                <div key={a.id} style={{
                  background: '#fff', borderRadius: 12, border: '1px solid var(--border)',
                  padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14,
                  boxShadow: 'var(--shadow)', animation: `fadeIn 0.25s ease ${i * 0.05}s both`,
                  transition: 'box-shadow 0.15s',
                }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-md)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'var(--shadow)'}
                >
                  {/* Time */}
                  <div style={{ textAlign: 'center', flexShrink: 0 }}>
                    <div style={{
                      fontFamily: "'DM Mono', monospace", fontSize: 15, fontWeight: 500,
                      color: SERVICE_COLORS[a.service] || 'var(--primary)',
                      background: 'var(--bg)', borderRadius: 8, padding: '6px 10px',
                      minWidth: 58, borderLeft: `3px solid ${SERVICE_COLORS[a.service] || 'var(--primary)'}`,
                    }}>{a.time}</div>
                    <div style={{ fontSize: 10.5, color: 'var(--text-3)', marginTop: 4 }}>{a.duration}λ</div>
                  </div>

                  {/* Avatar + info */}
                  <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12.5, fontWeight: 600, flexShrink: 0 }}>{a.initials}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 3 }}>{a.patient}</div>
                    <div style={{ fontSize: 12.5, color: 'var(--text-2)' }}>{a.service} {a.doctor && `· ${a.doctor}`}</div>
                  </div>

                  {/* Status + actions */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                    <span style={{
                      fontSize: 11.5, padding: '4px 10px', borderRadius: 20, fontWeight: 500,
                      display: 'flex', alignItems: 'center', gap: 5,
                      background: STATUS_STYLE[a.status]?.bg, color: STATUS_STYLE[a.status]?.color,
                    }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: STATUS_STYLE[a.status]?.dot, display: 'inline-block' }} />
                      {a.status}
                    </span>
                    {a.status === 'Σε αναμονή' && (
                      <button onClick={() => updateStatus(a.id, 'Επιβεβαιωμένο')} style={{
                        padding: '5px 10px', borderRadius: 8, fontSize: 12, background: 'var(--success-bg)',
                        color: 'var(--success)', border: '1px solid rgba(16,185,129,0.2)', fontWeight: 500,
                      }}>✓</button>
                    )}
                    {a.status !== 'Ακυρώθηκε' && (
                      <button onClick={() => updateStatus(a.id, 'Ακυρώθηκε')} style={{
                        padding: '5px 10px', borderRadius: 8, fontSize: 12, background: 'var(--danger-bg)',
                        color: 'var(--danger)', border: '1px solid rgba(239,68,68,0.2)', fontWeight: 500,
                      }}>✕</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
