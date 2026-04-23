import React from 'react';

const VARIANTS = {
  primary: {
    background: 'var(--blue)', color: '#fff', border: 'none',
  },
  secondary: {
    background: 'var(--surface)', color: 'var(--text-1)',
    border: '1px solid var(--border-strong)',
  },
  ghost: {
    background: 'transparent', color: 'var(--text-2)', border: 'none',
  },
  danger: {
    background: 'var(--red-bg)', color: 'var(--red-text)',
    border: '1px solid rgba(239,68,68,0.2)',
  },
};

export default function Btn({ children, variant = 'primary', size = 'md', onClick, disabled, style = {}, type = 'button' }) {
  const v = VARIANTS[variant] || VARIANTS.primary;
  const sz = size === 'sm'
    ? { padding: '6px 12px', fontSize: 12, borderRadius: 6 }
    : { padding: '9px 16px', fontSize: 13, borderRadius: 8 };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        ...v, ...sz,
        fontWeight: 500, cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        display: 'inline-flex', alignItems: 'center', gap: 6,
        transition: 'opacity 0.15s, box-shadow 0.15s, background 0.15s',
        fontFamily: 'inherit',
        ...style,
      }}
      onMouseEnter={e => !disabled && (e.currentTarget.style.opacity = '0.88')}
      onMouseLeave={e => !disabled && (e.currentTarget.style.opacity = '1')}
    >
      {children}
    </button>
  );
}
