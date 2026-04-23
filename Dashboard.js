import React from 'react';

const PRESETS = {
  success:  { bg: 'var(--green-bg)',  color: 'var(--green-text)' },
  warning:  { bg: 'var(--amber-bg)',  color: 'var(--amber-text)' },
  danger:   { bg: 'var(--red-bg)',    color: 'var(--red-text)'   },
  info:     { bg: 'var(--blue-light)',color: 'var(--blue)'       },
  purple:   { bg: 'var(--purple-bg)', color: 'var(--purple-text)'},
  neutral:  { bg: 'var(--surface-2)', color: 'var(--text-2)'    },
};

export default function Badge({ children, variant = 'neutral', dot }) {
  const p = PRESETS[variant] || PRESETS.neutral;
  return (
    <span style={{
      ...p,
      display: 'inline-flex', alignItems: 'center', gap: 5,
      fontSize: 11, fontWeight: 500, padding: '3px 8px',
      borderRadius: 20, whiteSpace: 'nowrap',
    }}>
      {dot && <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor', flexShrink: 0 }} />}
      {children}
    </span>
  );
}
