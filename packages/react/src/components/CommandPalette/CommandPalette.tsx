import React, { useEffect, useMemo, useState } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Kbd } from '../Kbd/Kbd';

export interface CommandItemData {
  id: string;
  label: string;
  group?: string;
  shortcut?: string;
  icon?: React.ReactNode;
  onSelect: () => void;
}

export interface CommandPaletteProps {
  commands: CommandItemData[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  placeholder?: string;
  enableGlobalShortcut?: boolean;
}

export function CommandPalette({
  commands,
  open: controlledOpen,
  onOpenChange,
  placeholder = 'Type a command or search...',
  enableGlobalShortcut = true,
}: CommandPaletteProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [query, setQuery] = useState('');
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const setOpen = (next: boolean) => {
    if (controlledOpen === undefined) setInternalOpen(next);
    onOpenChange?.(next);
    if (!next) setQuery('');
  };

  useEffect(() => {
    if (!enableGlobalShortcut) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(!open);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [enableGlobalShortcut, open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q
      ? commands.filter(
          (c) =>
            c.label.toLowerCase().includes(q) ||
            (c.group && c.group.toLowerCase().includes(q))
        )
      : commands;
  }, [commands, query]);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="kx-dialog-overlay" />
        <DialogPrimitive.Content
          aria-label="Command palette"
          className="kx-dialog-content kx-command-content"
        >
          <DialogPrimitive.Title style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden' }}>
            Command Palette
          </DialogPrimitive.Title>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="kx-command-input"
            autoFocus
          />
          <div className="kx-command-list">
            {filtered.map((cmd) => (
              <button
                key={cmd.id}
                type="button"
                className="kx-command-item"
                onClick={() => {
                  cmd.onSelect();
                  setOpen(false);
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  {cmd.icon}
                  <span>{cmd.label}</span>
                  {cmd.group && (
                    <span style={{ fontSize: '0.75rem', color: 'var(--kx-text-muted)' }}>
                      {cmd.group}
                    </span>
                  )}
                </span>
                {cmd.shortcut && <Kbd size="sm">{cmd.shortcut}</Kbd>}
              </button>
            ))}
            {filtered.length === 0 && (
              <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--kx-text-muted)', fontSize: '0.875rem' }}>
                No commands match &ldquo;{query}&rdquo;.
              </div>
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
