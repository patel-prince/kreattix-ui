import React, { useMemo, useState } from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { useComponentConfig, type BaseComponentProps } from '../../utils/useComponentConfig';
import { Field, useFieldIds, type FieldControlProps } from '../Field/Field';

export interface DatePickerProps
  extends FieldControlProps,
    BaseComponentProps<'trigger' | 'content'> {
  value?: Date | null;
  defaultValue?: Date | null;
  onValueChange?: (date: Date | null) => void;
  locale?: string;
  placeholder?: string;
  id?: string;
  className?: string;
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export function DatePicker(rawProps: DatePickerProps) {
  const { props, isUnstyled, getSlotClass } = useComponentConfig('DatePicker', rawProps);
  const {
    id: idProp,
    label,
    description,
    error,
    required,
    value,
    defaultValue = null,
    onValueChange,
    locale = 'en-US',
    placeholder = 'Pick a date...',
    className,
  } = props;

  const { id } = useFieldIds(idProp);
  const labelId = `${id}-label`;
  const [open, setOpen] = useState(false);
  const [internalDate, setInternalDate] = useState<Date | null>(defaultValue);
  const selected = value !== undefined ? value : internalDate;

  const initialView = selected ?? new Date();
  const [viewYear, setViewYear] = useState(initialView.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialView.getMonth());

  const monthLabel = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(
        new Date(viewYear, viewMonth, 1)
      ),
    [locale, viewYear, viewMonth]
  );

  const formattedValue = useMemo(() => {
    if (!selected) return '';
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(selected);
  }, [selected, locale]);

  const calendarDays = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const cells: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    return cells;
  }, [viewYear, viewMonth]);

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const pickDay = (day: number) => {
    const next = new Date(viewYear, viewMonth, day);
    if (value === undefined) setInternalDate(next);
    onValueChange?.(next);
    setOpen(false);
  };

  const isSameDay = (day: number) =>
    selected !== null &&
    selected.getFullYear() === viewYear &&
    selected.getMonth() === viewMonth &&
    selected.getDate() === day;

  const control = (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <button
          id={id}
          type="button"
          aria-labelledby={label ? labelId : undefined}
          data-kx="date-picker"
          data-slot="trigger"
          className={getSlotClass('trigger', 'kx-select-trigger', className)}
        >
          <span style={{ color: formattedValue ? 'inherit' : 'var(--kx-text-muted)' }}>
            {formattedValue || placeholder}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--kx-text-muted)' }}>Cal</span>
        </button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={4}
          data-slot="content"
          className={getSlotClass('content', 'kx-popover-content')}
          style={{ width: '17.5rem', padding: '0.75rem' }}
        >
          <div className="kx-cal-header">
            <button type="button" onClick={prevMonth} aria-label="Previous month" className="kx-page-btn">
              &lsaquo;
            </button>
            <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{monthLabel}</span>
            <button type="button" onClick={nextMonth} aria-label="Next month" className="kx-page-btn">
              &rsaquo;
            </button>
          </div>
          <div className="kx-cal-grid">
            {WEEKDAYS.map((w) => (
              <span key={w} className="kx-cal-weekday">
                {w}
              </span>
            ))}
            {calendarDays.map((day, idx) =>
              day === null ? (
                <span key={`empty-${idx}`} />
              ) : (
                <button
                  key={day}
                  type="button"
                  onClick={() => pickDay(day)}
                  data-selected={isSameDay(day) || undefined}
                  className="kx-cal-day"
                >
                  {day}
                </button>
              )
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
