import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', background: 'var(--bg)',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      {/* Left panel - branding */}
      <div style={{
        flex: '0 0 420px', background: 'var(--navy)', display: 'flex',
        flexDirection: 'column', padding: '48px', position: 'relative', overflow: 'hidden',
      }} className="login-panel">
        {/* Background decoration */}
        <div style={{
          position: 'absolute', top: -80, right: -80, width: 300, height: 300,
          borderRadius: '50%', background: 'rgba(43,59,240,0.12)', pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', bottom: -60, left: -60, width: 240, height: 240,
          borderRadius: '50%', background: 'rgba(43,59,240,0.08)', pointerEvents: 'none'
        }} />

        {/* Logo */}
        <div style={{ marginBottom: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 12 }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(255,255,255,0.35)' }} />
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#2B3BF0', marginLeft: -7 }} />
          </div>
          <div style={{ color: '#fff', fontSize: 22, fontWeight: 500, letterSpacing: '-0.3px' }}>medi360</div>
          <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 10, letterSpacing: '2px', textTransform: 'uppercase', marginTop: 2 }}>Consulting & Recruitment</div>
        </div>

        {/* Tagline */}
        <div>
          <div style={{ color: '#fff', fontSize: 28, fontWeight: 300, lineHeight: 1.3, marginBottom: 16, letterSpacing: '-0.5px' }}>
            Η διαχείριση<br/>της κλινικής σας,<br/><span style={{ fontWeight: 600, color: '#2B3BF0' }}>απλοποιημένη.</span>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, lineHeight: 1.6 }}>
            CRM ειδικά για ιατρικές και αισθητικές κλινικές.
          </div>
        </div>
      </div>

      {/* Right panel - form */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '32px 24px',
      }}>
        <div style={{ width: '100%', maxWidth: 360, animation: 'fadeIn 0.4s ease both' }}>
          <div style={{ marginBottom: 36 }}>
            <h1 style={{ fontSize: 24, fontWeight: 600, color: 'var(--text)', marginBottom: 6, letterSpacing: '-0.4px' }}>
              Καλωσορίσατε
            </h1>
            <p style={{ color: 'var(--text-2)', fontSize: 14 }}>Συνδεθείτε στον λογαριασμό σας</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--text-2)', display: 'block', marginBottom: 6 }}>
                Email
              </label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)} required
                placeholder="email@clinic.gr" autoComplete="email"
              />
            </div>

            <div>
              <label style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--text-2)', display: 'block', marginBottom: 6 }}>
                Κωδικός
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPass ? 'text' : 'password'} value={password}
                  onChange={e => setPassword(e.target.value)} required
                  placeholder="••••••••" autoComplete="current-password"
                  style={{ paddingRight: 40 }}
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  style={{
                    position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', color: 'var(--text-3)', fontSize: 13, padding: 2
                  }}>
                  {showPass ? '🙈' : '👁'}
                </button>
              </div>
            </div>

            {error && (
              <div style={{
                background: 'var(--danger-bg)', color: 'var(--danger)', fontSize: 13,
                padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(239,68,68,0.2)',
                animation: 'fadeIn 0.2s ease'
              }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} style={{
              marginTop: 4, padding: '11px', borderRadius: 'var(--radius-sm)',
              background: loading ? 'var(--text-3)' : 'var(--primary)',
              color: '#fff', fontSize: 14, fontWeight: 500,
              boxShadow: loading ? 'none' : '0 4px 14px rgba(43,59,240,0.3)',
              transform: loading ? 'none' : undefined,
            }}
              onMouseEnter={e => !loading && (e.target.style.background = 'var(--primary-hover)')}
              onMouseLeave={e => !loading && (e.target.style.background = 'var(--primary)')}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <span style={{ animation: 'pulse 1s infinite', display: 'inline-block' }}>●</span>
                  Σύνδεση...
                </span>
              ) : 'Σύνδεση'}
            </button>
          </form>

          <div style={{
            marginTop: 24, padding: '14px', background: 'var(--primary-light)',
            borderRadius: 10, fontSize: 12.5
          }}>
            <div style={{ fontWeight: 600, color: 'var(--primary)', marginBottom: 4 }}>Demo</div>
            <div style={{ color: 'var(--text-2)' }}>admin@medi360.gr &nbsp;/&nbsp; medi360</div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .login-panel { display: none !important; }
        }
      `}</style>
    </div>
  );
}
