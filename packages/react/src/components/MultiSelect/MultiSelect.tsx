import React, { useMemo, useState } from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';
import { Field, useFieldIds, type FieldControlProps } from '../Field/Field';
import { Tag } from '../Tag/Tag';
import { useInternalGlyph } from '../Icon/InternalIcons';
import type { ComboboxOption } from '../Combobox/Combobox';

export interface MultiSelectProps
  extends FieldControlProps,
    BaseComponentProps<'trigger' | 'content'> {
  options: ComboboxOption[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  id?: string;
  className?: string;
}

export function MultiSelect(rawProps: MultiSelectProps) {
  const { props, isUnstyled, getSlotClass } = useComponentConfig('MultiSelect', rawProps);
  const chevron = useInternalGlyph('chevronDown');
  const check = useInternalGlyph('check');

  const {
    id: idProp,
    label,
    description,
    error,
    required,
    options,
    value,
    defaultValue = [],
    onValueChange,
    placeholder = 'Select items...',
    className,
  } = props;

  const { id } = useFieldIds(idProp);
  const labelId = `${id}-label`;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [internal, setInternal] = useState<string[]>(defaultValue);
  const current = value !== undefined ? value : internal;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? options.filter((o) => o.label.toLowerCase().includes(q)) : options;
  }, [options, query]);

  const toggle = (val: string) => {
    const next = current.includes(val) ? current.filter((v) => v !== val) : [...current, val];
    if (value === undefined) setInternal(next);
    onValueChange?.(next);
  };

  const control = (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <div
          id={id}
          role="combobox"
          tabIndex={0}
          aria-expanded={open}
          aria-labelledby={label ? labelId : undefined}
          data-kx="multi-select"
          data-slot="trigger"
          className={getSlotClass('trigger', 'kx-multiselect-trigger', className)}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', flex: 1 }}>
            {current.length > 0 ? (
              current.map((val) => {
                const opt = options.find((o) => o.value === val);
                return (
                  <Tag
                    key={val}
                    tone="primary"
                    closable
                    onClose={() => toggle(val)}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {opt?.label ?? val}
                  </Tag>
                );
              })
            ) : (
              <span style={{ color: 'var(--kx-text-muted)', fontSize: '0.875rem' }}>
                {placeholder}
              </span>
            )}
          </div>
          <span className="kx-icon">{chevron}</span>
        </div>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={4}
          data-slot="content"
          className={getSlotClass('content', 'kx-select-content')}
          style={{ width: 'var(--radix-popover-trigger-width)' }}
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter options..."
            className="kx-combobox-search"
            autoFocus
          />
          <div role="listbox" style={{ maxHeight: '14rem', overflowY: 'auto' }}>
            {filtered.map((opt) => {
              const selected = current.includes(opt.value);
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  disabled={opt.disabled}
                  onClick={() => toggle(opt.value)}
                  data-highlighted={selected || undefined}
                  className="kx-select-item"
                  style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'left' }}
                >
                  <span>{opt.label}</span>
                  {selected && <span className="kx-icon">{check}</span>}
                </button>
              );
            })}
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );

  if (!label && !description && !error) return control;
  return (
    <Field htmlFor={id} labelAs="span" labelId={labelId} label={label} description={description} error={error} required={required} unstyled={isUnstyled}>
      {control}
    </Field>
  );
}
