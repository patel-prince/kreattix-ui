'use client';

import React, { useState } from 'react';
import { Mail, Search } from 'lucide-react';
import {
  Checkbox,
  Field,
  Input,
  RadioGroup,
  Select,
  Slider,
  Stack,
  Switch,
  Textarea,
} from '@kreattix-ui/react';
import type { ComponentDocEntry } from './types';

function ControlledSelectDemo() {
  const [val, setVal] = useState('next');
  return (
    <div style={{ width: '16rem' }}>
      <Select
        label="Framework"
        value={val}
        onValueChange={setVal}
        options={[
          { value: 'next', label: 'Next.js App Router' },
          { value: 'vite', label: 'Vite + React' },
          { value: 'remix', label: 'Remix' },
        ]}
      />
    </div>
  );
}

export const FORMS_DOCS: ComponentDocEntry[] = [
  {
    slug: 'field',
    name: 'Field',
    category: 'Forms',
    radix: '@radix-ui/react-label',
    summary: 'Unified accessible wrapper providing label, required asterisk, description, and error alert.',
    description:
      'Field eliminates MUI-style FormControl boilerplate. All Kreattix form controls include Field props built in, and you can use <Field> directly for custom controls.',
    importCode: `import { Field } from '@kreattix/ui';`,
    playgroundControls: [
      { name: 'label', label: 'Label', type: 'text', defaultValue: 'API Key' },
      { name: 'description', label: 'Description', type: 'text', defaultValue: 'Keep your secret key private.' },
      { name: 'error', label: 'Error', type: 'text', defaultValue: '' },
      { name: 'required', label: 'Required', type: 'boolean', defaultValue: true },
    ],
    renderPlayground: (v) => (
      <div style={{ width: '20rem' }}>
        <Field
          label={String(v.label)}
          description={String(v.description) || undefined}
          error={String(v.error) || undefined}
          required={Boolean(v.required)}
        >
          <Input placeholder="kx_live_..." />
        </Field>
      </div>
    ),
    generatePlaygroundCode: (v) =>
      `<Field label="${v.label}"${v.description ? ` description="${v.description}"` : ''}${v.error ? ` error="${v.error}"` : ''}${v.required ? ' required' : ''}>\n  <Input placeholder="kx_live_..." />\n</Field>`,
    examples: [
      {
        title: 'Error State',
        description: 'Error automatically replaces helper description and announces via role="alert".',
        code: `<Field label="Username" error="Username is already taken" required>\n  <Input defaultValue="prince" />\n</Field>`,
        render: () => (
          <div style={{ width: '20rem' }}>
            <Field label="Username" error="Username is already taken" required>
              <Input defaultValue="prince" />
            </Field>
          </div>
        ),
      },
    ],
    props: [
      { name: 'label', type: 'ReactNode', defaultValue: 'undefined', description: 'Accessible label.' },
      { name: 'description', type: 'ReactNode', defaultValue: 'undefined', description: 'Helper text.' },
      { name: 'error', type: 'ReactNode', defaultValue: 'undefined', description: 'Validation error message.' },
      { name: 'required', type: 'boolean', defaultValue: 'false', description: 'Shows required indicator.' },
    ],
    slots: [
      { name: 'root', description: 'Field container.' },
      { name: 'label', description: 'Radix Label element.' },
      { name: 'description', description: 'Helper text.' },
      { name: 'error', description: 'Error alert.' },
    ],
    cssVars: [{ token: '--kx-danger-600', defaultValue: '#e11d48', description: 'Error text color.' }],
    a11y: [{ key: 'aria-describedby', description: 'Links description and error IDs to the wrapped control.' }],
  },
  {
    slug: 'input',
    name: 'Input',
    category: 'Forms',
    summary: 'Text input with built-in Field ARIA wiring, addons, and clearable button.',
    description:
      'Input supports prefix/suffix addons, one-click clearable state, validation states, and automatic label/description/error accessibility.',
    importCode: `import { Input } from '@kreattix/ui';`,
    playgroundControls: [
      { name: 'size', label: 'Size', type: 'select', options: ['sm', 'md', 'lg'], defaultValue: 'md' },
      { name: 'label', label: 'Label', type: 'text', defaultValue: 'Email Address' },
      { name: 'clearable', label: 'Clearable', type: 'boolean', defaultValue: true },
      { name: 'disabled', label: 'Disabled', type: 'boolean', defaultValue: false },
      { name: 'error', label: 'Error', type: 'text', defaultValue: '' },
    ],
    renderPlayground: (v) => (
      <div style={{ width: '20rem' }}>
        <Input
          size={v.size as 'md'}
          label={String(v.label)}
          placeholder="you@company.com"
          leftAddon={<Mail size={15} />}
          clearable={Boolean(v.clearable)}
          disabled={Boolean(v.disabled)}
          error={String(v.error) || undefined}
        />
      </div>
    ),
    generatePlaygroundCode: (v) =>
      `<Input\n  size="${v.size}"\n  label="${v.label}"\n  placeholder="you@company.com"\n  leftAddon={<Mail size={15} />}${v.clearable ? '\n  clearable' : ''}${v.disabled ? '\n  disabled' : ''}${v.error ? `\n  error="${v.error}"` : ''}\n/>`,
    examples: [
      {
        title: 'Search Input with Clearable Button',
        description: 'Built-in clear button appears automatically when input has value.',
        code: `<Input leftAddon={<Search size={15} />} placeholder="Search docs..." clearable />`,
        render: () => (
          <div style={{ width: '20rem' }}>
            <Input leftAddon={<Search size={15} />} placeholder="Search docs..." clearable />
          </div>
        ),
      },
    ],
    props: [
      { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: 'Control height.' },
      { name: 'leftAddon', type: 'ReactNode', defaultValue: 'undefined', description: 'Leading icon or text.' },
      { name: 'rightAddon', type: 'ReactNode', defaultValue: 'undefined', description: 'Trailing icon or text.' },
      { name: 'clearable', type: 'boolean', defaultValue: 'false', description: 'Shows clear button when non-empty.' },
      { name: 'label / error / description', type: 'ReactNode', defaultValue: 'undefined', description: 'Automatic Field integration.' },
    ],
    slots: [
      { name: 'wrapper', description: 'Bordered input container.' },
      { name: 'input', description: 'Native <input>.' },
      { name: 'leftAddon', description: 'Left addon span.' },
      { name: 'rightAddon', description: 'Right addon span.' },
    ],
    cssVars: [{ token: '--kx-border-focus', defaultValue: '#6366f1', description: 'Focus ring & border color.' }],
    a11y: [{ key: 'aria-invalid', description: 'Automatically set when `error` prop is provided.' }],
  },
  {
    slug: 'textarea',
    name: 'Textarea',
    category: 'Forms',
    summary: 'Multi-line text input with live character counter and Field ARIA wiring.',
    description:
      'Textarea integrates Field label/error wiring and an optional live character counter.',
    importCode: `import { Textarea } from '@kreattix/ui';`,
    playgroundControls: [
      { name: 'label', label: 'Label', type: 'text', defaultValue: 'Release Notes' },
      { name: 'showCount', label: 'Show Count', type: 'boolean', defaultValue: true },
      { name: 'error', label: 'Error', type: 'text', defaultValue: '' },
    ],
    renderPlayground: (v) => (
      <div style={{ width: '22rem' }}>
        <Textarea
          label={String(v.label)}
          placeholder="Describe what changed..."
          showCount={Boolean(v.showCount)}
          maxLength={140}
          error={String(v.error) || undefined}
        />
      </div>
    ),
    generatePlaygroundCode: (v) =>
      `<Textarea\n  label="${v.label}"\n  placeholder="Describe what changed..."${v.showCount ? '\n  showCount\n  maxLength={140}' : ''}${v.error ? `\n  error="${v.error}"` : ''}\n/>`,
    examples: [
      {
        title: 'Character Limit Counter',
        description: 'Display live character counts alongside validation.',
        code: `<Textarea label="Bio" maxLength={100} showCount defaultValue="Building Kreattix UI" />`,
        render: () => (
          <div style={{ width: '22rem' }}>
            <Textarea label="Bio" maxLength={100} showCount defaultValue="Building Kreattix UI" />
          </div>
        ),
      },
    ],
    props: [
      { name: 'showCount', type: 'boolean', defaultValue: 'false', description: 'Displays character counter.' },
      { name: 'maxLength', type: 'number', defaultValue: 'undefined', description: 'Maximum allowed characters.' },
      { name: 'label / description / error', type: 'ReactNode', defaultValue: 'undefined', description: 'Built-in Field props.' },
    ],
    slots: [{ name: 'textarea', description: 'Native <textarea>.' }],
    cssVars: [{ token: '--kx-border-default', defaultValue: '#e4e4e7', description: 'Border color.' }],
    a11y: [{ key: 'aria-describedby', description: 'Connects description & error text automatically.' }],
  },
  {
    slug: 'checkbox',
    name: 'Checkbox',
    category: 'Forms',
    radix: '@radix-ui/react-checkbox',
    summary: 'Accessible checkbox supporting checked, unchecked, and indeterminate states.',
    description:
      'Built on @radix-ui/react-checkbox with label, description, error, and indeterminate state support.',
    importCode: `import { Checkbox } from '@kreattix/ui';`,
    playgroundControls: [
      { name: 'label', label: 'Label', type: 'text', defaultValue: 'Enable two-factor authentication' },
      { name: 'description', label: 'Description', type: 'text', defaultValue: 'Recommended for team admins.' },
      { name: 'disabled', label: 'Disabled', type: 'boolean', defaultValue: false },
    ],
    renderPlayground: (v) => (
      <Checkbox
        label={String(v.label)}
        description={String(v.description) || undefined}
        disabled={Boolean(v.disabled)}
        defaultChecked
      />
    ),
    generatePlaygroundCode: (v) =>
      `<Checkbox\n  label="${v.label}"${v.description ? `\n  description="${v.description}"` : ''}${v.disabled ? '\n  disabled' : ''}\n  defaultChecked\n/>`,
    examples: [
      {
        title: 'Indeterminate State',
        description: 'Use checked="indeterminate" for select-all table headers.',
        code: `<Checkbox checked="indeterminate" label="Select all rows" />`,
        render: () => <Checkbox checked="indeterminate" label="Select all rows" />,
      },
    ],
    props: [
      { name: 'checked', type: "boolean | 'indeterminate'", defaultValue: 'undefined', description: 'Controlled checked state.' },
      { name: 'label / description / error', type: 'ReactNode', defaultValue: 'undefined', description: 'Field integration.' },
    ],
    slots: [
      { name: 'root', description: 'Outer wrapper.' },
      { name: 'control', description: 'Checkbox box.' },
      { name: 'indicator', description: 'Check/minus icon.' },
    ],
    cssVars: [{ token: '--kx-primary-600', defaultValue: '#4f46e5', description: 'Checked fill color.' }],
    a11y: [{ key: 'Space', description: 'Toggles checkbox state.' }],
  },
  {
    slug: 'switch',
    name: 'Switch',
    category: 'Forms',
    radix: '@radix-ui/react-switch',
    summary: 'Spring-animated toggle switch with configurable label placement.',
    description:
      'Built on @radix-ui/react-switch, Switch provides instant tactile feedback and full keyboard support.',
    importCode: `import { Switch } from '@kreattix/ui';`,
    playgroundControls: [
      { name: 'label', label: 'Label', type: 'text', defaultValue: 'Real-time sync' },
      { name: 'labelPlacement', label: 'Label Placement', type: 'select', options: ['end', 'start'], defaultValue: 'end' },
      { name: 'disabled', label: 'Disabled', type: 'boolean', defaultValue: false },
    ],
    renderPlayground: (v) => (
      <Switch
        label={String(v.label)}
        labelPlacement={v.labelPlacement as 'end'}
        disabled={Boolean(v.disabled)}
        defaultChecked
      />
    ),
    generatePlaygroundCode: (v) =>
      `<Switch label="${v.label}" labelPlacement="${v.labelPlacement}"${v.disabled ? ' disabled' : ''} defaultChecked />`,
    examples: [
      {
        title: 'Settings Row',
        description: 'Align label at the start for clean settings rows.',
        code: `<Switch label="Auto-save drafts" labelPlacement="start" defaultChecked />`,
        render: () => <Switch label="Auto-save drafts" labelPlacement="start" defaultChecked />,
      },
    ],
    props: [
      { name: 'checked / defaultChecked', type: 'boolean', defaultValue: 'false', description: 'Switch state.' },
      { name: 'labelPlacement', type: "'start' | 'end'", defaultValue: "'end'", description: 'Label side.' },
    ],
    slots: [
      { name: 'control', description: 'Switch track.' },
      { name: 'thumb', description: 'Animated thumb.' },
    ],
    cssVars: [{ token: '--kx-ease-spring', defaultValue: 'cubic-bezier(0.34, 1.56, 0.64, 1)', description: 'Thumb transition.' }],
    a11y: [{ key: 'Space / Enter', description: 'Toggles switch role="switch".' }],
  },
  {
    slug: 'radio-group',
    name: 'RadioGroup',
    category: 'Forms',
    radix: '@radix-ui/react-radio-group',
    summary: 'Radio group with 1-liner options or compound items and card variant.',
    description:
      'Built on @radix-ui/react-radio-group with roving tabindex and both `default` and `card` visual variants.',
    importCode: `import { RadioGroup } from '@kreattix/ui';`,
    playgroundControls: [
      { name: 'variant', label: 'Variant', type: 'select', options: ['default', 'card'], defaultValue: 'card' },
      { name: 'orientation', label: 'Orientation', type: 'select', options: ['vertical', 'horizontal'], defaultValue: 'vertical' },
    ],
    renderPlayground: (v) => (
      <div style={{ width: '22rem' }}>
        <RadioGroup
          label="Compute Tier"
          variant={v.variant as 'card'}
          orientation={v.orientation as 'vertical'}
          defaultValue="pro"
          options={[
            { value: 'starter', label: 'Starter', description: 'Up to 10k requests/mo' },
            { value: 'pro', label: 'Pro', description: 'Unlimited edge deployments' },
          ]}
        />
      </div>
    ),
    generatePlaygroundCode: (v) =>
      `<RadioGroup\n  label="Compute Tier"\n  variant="${v.variant}"\n  orientation="${v.orientation}"\n  defaultValue="pro"\n  options={[\n    { value: 'starter', label: 'Starter', description: 'Up to 10k requests/mo' },\n    { value: 'pro', label: 'Pro', description: 'Unlimited edge deployments' },\n  ]}\n/>`,
    examples: [
      {
        title: 'Compound API',
        description: 'Compose RadioGroup.Item children manually when needed.',
        code: `<RadioGroup defaultValue="a">\n  <RadioGroup.Item value="a" label="Option A" />\n  <RadioGroup.Item value="b" label="Option B" />\n</RadioGroup>`,
        render: () => (
          <RadioGroup defaultValue="a">
            <RadioGroup.Item value="a" label="Option A" />
            <RadioGroup.Item value="b" label="Option B" />
          </RadioGroup>
        ),
      },
    ],
    props: [
      { name: 'options', type: 'RadioOption[]', defaultValue: 'undefined', description: '1-liner option list.' },
      { name: 'variant', type: "'default' | 'card'", defaultValue: "'default'", description: 'Visual style.' },
      { name: 'orientation', type: "'vertical' | 'horizontal'", defaultValue: "'vertical'", description: 'Layout axis.' },
    ],
    slots: [
      { name: 'root', description: 'RadioGroup root.' },
      { name: 'item', description: 'Individual radio item.' },
    ],
    cssVars: [{ token: '--kx-primary-600', defaultValue: '#4f46e5', description: 'Selected border & dot.' }],
    a11y: [{ key: 'ArrowUp / ArrowDown', description: 'Moves selection between radio items.' }],
  },
  {
    slug: 'slider',
    name: 'Slider',
    category: 'Forms',
    radix: '@radix-ui/react-slider',
    summary: 'Single or range slider with live value readout.',
    description:
      'Built on @radix-ui/react-slider with keyboard stepping, range support, and optional `showValue` header.',
    importCode: `import { Slider } from '@kreattix/ui';`,
    playgroundControls: [
      { name: 'showValue', label: 'Show Value', type: 'boolean', defaultValue: true },
      { name: 'disabled', label: 'Disabled', type: 'boolean', defaultValue: false },
    ],
    renderPlayground: (v) => (
      <div style={{ width: '20rem' }}>
        <Slider
          label="Quality"
          defaultValue={[75]}
          showValue={Boolean(v.showValue)}
          disabled={Boolean(v.disabled)}
        />
      </div>
    ),
    generatePlaygroundCode: (v) =>
      `<Slider label="Quality" defaultValue={[75]}${v.showValue ? ' showValue' : ''}${v.disabled ? ' disabled' : ''} />`,
    examples: [
      {
        title: 'Range Slider (2 Thumbs)',
        description: 'Pass two values to defaultValue for min/max range selection.',
        code: `<Slider label="Price Range" defaultValue={[20, 80]} showValue />`,
        render: () => (
          <div style={{ width: '20rem' }}>
            <Slider label="Price Range" defaultValue={[20, 80]} showValue />
          </div>
        ),
      },
    ],
    props: [
      { name: 'value / defaultValue', type: 'number[]', defaultValue: '[50]', description: 'Array of thumb values.' },
      { name: 'min / max / step', type: 'number', defaultValue: '0 / 100 / 1', description: 'Range bounds.' },
      { name: 'showValue', type: 'boolean', defaultValue: 'false', description: 'Displays current value next to label.' },
    ],
    slots: [
      { name: 'track', description: 'Slider track.' },
      { name: 'range', description: 'Active range bar.' },
      { name: 'thumb', description: 'Draggable thumb.' },
    ],
    cssVars: [{ token: '--kx-primary-600', defaultValue: '#4f46e5', description: 'Active range & thumb border.' }],
    a11y: [{ key: 'ArrowLeft / ArrowRight', description: 'Increments or decrements thumb value.' }],
  },
  {
    slug: 'select',
    name: 'Select',
    category: 'Forms',
    radix: '@radix-ui/react-select',
    summary: 'Accessible select dropdown with 1-liner options prop AND Radix compound subcomponents.',
    description:
      'Select combines AntD-level simplicity (`options={[...]}`) with Radix UI Select keyboard navigation, typeahead, and portal positioning.',
    importCode: `import { Select } from '@kreattix/ui';`,
    playgroundControls: [
      { name: 'label', label: 'Label', type: 'text', defaultValue: 'Region' },
      { name: 'placeholder', label: 'Placeholder', type: 'text', defaultValue: 'Choose region...' },
      { name: 'error', label: 'Error', type: 'text', defaultValue: '' },
    ],
    renderPlayground: (v) => (
      <div style={{ width: '18rem' }}>
        <Select
          label={String(v.label)}
          placeholder={String(v.placeholder)}
          error={String(v.error) || undefined}
          options={[
            { value: 'us-east', label: 'US East (N. Virginia)' },
            { value: 'eu-west', label: 'EU West (Ireland)' },
            { value: 'ap-south', label: 'AP South (Mumbai)' },
          ]}
        />
      </div>
    ),
    generatePlaygroundCode: (v) =>
      `<Select\n  label="${v.label}"\n  placeholder="${v.placeholder}"${v.error ? `\n  error="${v.error}"` : ''}\n  options={[\n    { value: 'us-east', label: 'US East (N. Virginia)' },\n    { value: 'eu-west', label: 'EU West (Ireland)' },\n    { value: 'ap-south', label: 'AP South (Mumbai)' },\n  ]}\n/>`,
    examples: [
      {
        title: 'Controlled Select',
        description: 'Control value and onValueChange in React state.',
        code: `const [val, setVal] = useState('next');\n<Select label="Framework" value={val} onValueChange={setVal} options={[...]} />`,
        render: () => <ControlledSelectDemo />,
      },
    ],
    props: [
      { name: 'options', type: 'SelectOption[]', defaultValue: 'undefined', description: '1-liner options array.' },
      { name: 'value / defaultValue', type: 'string', defaultValue: 'undefined', description: 'Selected value.' },
      { name: 'onValueChange', type: '(value: string) => void', defaultValue: 'undefined', description: 'Change callback.' },
      { name: 'placeholder', type: 'string', defaultValue: "'Select an option...'", description: 'Placeholder text.' },
    ],
    slots: [
      { name: 'trigger', description: 'Select trigger button.' },
      { name: 'content', description: 'Floating menu surface.' },
      { name: 'item', description: 'Option item.' },
    ],
    cssVars: [{ token: '--kx-z-popover', defaultValue: '1400', description: 'Menu z-index.' }],
    a11y: [
      { key: 'Enter / Space / ArrowDown', description: 'Opens select menu.' },
      { key: 'Typeahead', description: 'Typing jumps to matching option.' },
    ],
  },
];
