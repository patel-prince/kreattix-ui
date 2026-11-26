import React, { forwardRef, useState } from 'react';
import { Input, type InputProps } from '../Input/Input';

export interface PasswordInputProps extends Omit<InputProps, 'type' | 'rightAddon'> {
  showStrength?: boolean;
}

function getStrength(val: string): { score: number; label: string; color: string } {
  let score = 0;
  if (val.length >= 8) score++;
  if (/[A-Z]/.test(val)) score++;
  if (/[0-9]/.test(val)) score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;
  if (score <= 1) return { score: 25, label: 'Weak', color: 'var(--kx-danger-500)' };
  if (score === 2) return { score: 50, label: 'Fair', color: 'var(--kx-warning-500)' };
  if (score === 3) return { score: 75, label: 'Good', color: 'var(--kx-info-500)' };
  return { score: 100, label: 'Strong', color: 'var(--kx-success-500)' };
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput({ showStrength = false, value, defaultValue, onChange, ...rest }, ref) {
    const [visible, setVisible] = useState(false);
    const [internalVal, setInternalVal] = useState(String(defaultValue ?? ''));
    const currentVal = value !== undefined ? String(value) : internalVal;
    const strength = showStrength && currentVal.length > 0 ? getStrength(currentVal) : null;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', width: '100%' }}>
        <Input
          ref={ref}
          type={visible ? 'text' : 'password'}
          value={value}
          defaultValue={defaultValue}
          onChange={(e) => {
            if (value === undefined) setInternalVal(e.target.value);
            onChange?.(e);
          }}
          rightAddon={
            <button
              type="button"
              onClick={() => setVisible((v) => !v)}
              aria-label={visible ? 'Hide password' : 'Show password'}
              className="kx-input-clear"
              style={{ fontSize: '0.75rem', fontWeight: 600 }}
            >
              {visible ? 'Hide' : 'Show'}
            </button>
          }
          {...rest}
        />
        {strength && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div
              style={{
                flex: 1,
                height: '0.25rem',
                borderRadius: '9999px',
                backgroundColor: 'var(--kx-bg-muted)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${strength.score}%`,
                  height: '100%',
                  backgroundColor: strength.color,
                  transition: 'width 200ms',
                }}
              />
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--kx-text-muted)' }}>
              {strength.label}
            </span>
          </div>
        )}
      </div>
    );
  }
);
