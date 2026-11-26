import React, { useMemo, useState } from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';
import { Field, useFieldIds, type FieldControlProps } from '../Field/Field';
import { useInternalGlyph } from '../Icon/InternalIcons';

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxProps
  extends FieldControlProps,
    BaseComponentProps<'trigger' | 'content' | 'item'> {
  options: ComboboxOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  id?: string;
  className?: string;
}

export function Combobox(rawProps: ComboboxProps) {
  const { props, isUnstyled, getSlotClass } = useComponentConfig('Combobox', rawProps);
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
    defaultValue = '',
    onValueChange,
    placeholder = 'Select item...',
    searchPlaceholder = 'Search...',
    emptyText = 'No matches found.',
    className,
  } = props;

  const { id } = useFieldIds(idProp);
  const labelId = `${id}-label`;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [internal, setInternal] = useState(defaultValue);
  const current = value !== undefined ? value : internal;

  const selectedOption = options.find((o) => o.value === current);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? options.filter((o) => o.label.toLowerCase().includes(q)) : options;
  }, [options, query]);

  const select = (val: string) => {
    if (value === undefined) setInternal(val);
    onValueChange?.(val);
    setOpen(false);
    setQuery('');
  };

  const control = (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <button
          id={id}
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-labelledby={label ? labelId : undefined}
          data-kx="combobox"
          data-slot="trigger"
          className={getSlotClass('trigger', 'kx-select-trigger', className)}
        >
          <span style={{ color: selectedOption ? 'inherit' : 'var(--kx-text-muted)' }}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span className="kx-icon">{chevron}</span>
        </button>
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
            placeholder={searchPlaceholder}
            className="kx-combobox-search"
            autoFocus
          />
          <div role="listbox" style={{ maxHeight: '14rem', overflowY: 'auto' }}>
            {filtered.map((opt) => (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={opt.value === current}
                disabled={opt.disabled}
                onClick={() => select(opt.value)}
                data-highlighted={opt.value === current || undefined}
                data-slot="item"
                className={getSlotClass('item', 'kx-select-item')}
                style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'left' }}
              >
                <span>{opt.label}</span>
                {opt.value === current && <span className="kx-icon">{check}</span>}
              </button>
            ))}
            {filtered.length === 0 && (
              <div style={{ padding: '0.75rem', fontSize: '0.8125rem', color: 'var(--kx-text-muted)', textAlign: 'center' }}>
                {emptyText}
              </div>
            )}
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
