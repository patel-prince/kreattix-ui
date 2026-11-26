'use client';

import React, { useState } from 'react';
import {
  Button,
  ColorPicker,
  Combobox,
  CommandPalette,
  DataGrid,
  DatePicker,
  FileUpload,
  Form,
  Input,
  List,
  MultiSelect,
  NumberInput,
  PasswordInput,
  PinInput,
  Table,
  Text,
  TreeView,
  useFormField,
} from '@kreattix-ui/react';
import type { ComponentDocEntry } from './types';

function FormFieldDemo() {
  const f = useFormField('name');
  return <Input label="Project Name" value={String(f.value ?? '')} onChange={(e) => f.onChange(e.target.value)} error={f.error} required />;
}

function CommandDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>Open Command Palette</Button>
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        enableGlobalShortcut={false}
        commands={[
          { id: '1', label: 'Create Component', group: 'Actions', shortcut: 'C', onSelect: () => {} },
          { id: '2', label: 'Switch Theme', group: 'Preferences', shortcut: 'T', onSelect: () => {} },
        ]}
      />
    </>
  );
}

export const PHASE2_B_DOCS: ComponentDocEntry[] = [
  {
    slug: 'number-input',
    name: 'NumberInput',
    category: 'Forms',
    summary: 'Numeric input with +/- steppers, min/max clamping, and Field ARIA.',
    description: 'Provides accessible increment/decrement controls and keyboard stepping.',
    importCode: `import { NumberInput } from '@kreattix/ui';`,
    playgroundControls: [{ name: 'step', label: 'Step', type: 'number', defaultValue: 1 }],
    renderPlayground: (v) => <div style={{ width: '14rem' }}><NumberInput label="Seats" defaultValue={5} min={1} max={20} step={Number(v.step)} /></div>,
    generatePlaygroundCode: (v) => `<NumberInput label="Seats" defaultValue={5} min={1} max={20} step={${v.step}} />`,
    examples: [{ title: 'Min/Max Clamping', description: 'Automatically disables buttons at bounds.', code: `<NumberInput min={0} max={10} />`, render: () => <NumberInput min={0} max={10} defaultValue={10} /> }],
    props: [{ name: 'min / max / step', type: 'number', defaultValue: '-Infinity / Infinity / 1', description: 'Numeric constraints.' }],
    slots: [{ name: 'wrapper', description: 'Input box.' }, { name: 'input', description: 'Number input.' }],
    cssVars: [],
    a11y: [{ key: 'ArrowUp / ArrowDown', description: 'Steps numeric value.' }],
  },
  {
    slug: 'pin-input',
    name: 'PinInput',
    category: 'Forms',
    summary: 'Multi-cell OTP/PIN input with auto-advance and paste-to-fill.',
    description: 'Ideal for 2FA verification codes with optional `mask` mode.',
    importCode: `import { PinInput } from '@kreattix/ui';`,
    playgroundControls: [{ name: 'mask', label: 'Mask Digits', type: 'boolean', defaultValue: false }],
    renderPlayground: (v) => <PinInput label="Verification Code" length={6} mask={Boolean(v.mask)} />,
    generatePlaygroundCode: (v) => `<PinInput label="Verification Code" length={6}${v.mask ? ' mask' : ''} />`,
    examples: [{ title: '4-Digit PIN', description: 'Customize length for short PINs.', code: `<PinInput length={4} />`, render: () => <PinInput length={4} /> }],
    props: [{ name: 'length', type: 'number', defaultValue: '6', description: 'Number of cells.' }, { name: 'mask', type: 'boolean', defaultValue: 'false', description: 'Masks digits as password.' }],
    slots: [{ name: 'root', description: 'Cell group.' }, { name: 'cell', description: 'Individual input.' }],
    cssVars: [],
    a11y: [{ key: 'Paste / ArrowLeft / ArrowRight', description: 'Distributes pasted codes and navigates cells.' }],
  },
  {
    slug: 'password-input',
    name: 'PasswordInput',
    category: 'Forms',
    summary: 'Password input with Show/Hide toggle and optional strength meter.',
    description: 'Extends `Input` with a visibility toggle button and live strength bar.',
    importCode: `import { PasswordInput } from '@kreattix/ui';`,
    playgroundControls: [{ name: 'showStrength', label: 'Show Strength', type: 'boolean', defaultValue: true }],
    renderPlayground: (v) => <div style={{ width: '18rem' }}><PasswordInput label="Password" showStrength={Boolean(v.showStrength)} defaultValue="Kreattix2026!" /></div>,
    generatePlaygroundCode: (v) => `<PasswordInput label="Password"${v.showStrength ? ' showStrength' : ''} />`,
    examples: [{ title: 'Simple Password', description: 'Omit showStrength for login forms.', code: `<PasswordInput label="Password" />`, render: () => <div style={{ width: '18rem' }}><PasswordInput label="Password" placeholder="Enter password" /></div> }],
    props: [{ name: 'showStrength', type: 'boolean', defaultValue: 'false', description: 'Displays password strength meter.' }],
    slots: [{ name: 'wrapper', description: 'Input container.' }],
    cssVars: [],
    a11y: [{ key: 'aria-label', description: 'Toggle button announces Show/Hide password.' }],
  },
  {
    slug: 'file-upload',
    name: 'FileUpload',
    category: 'Forms',
    summary: 'Drag-and-drop file uploader with file list and size validation.',
    description: 'Supports `accept`, `multiple`, and `maxSizeBytes` with Field error alerts.',
    importCode: `import { FileUpload } from '@kreattix/ui';`,
    playgroundControls: [],
    renderPlayground: () => <div style={{ width: '22rem' }}><FileUpload label="Attachments" accept=".png,.jpg,.pdf" multiple /></div>,
    generatePlaygroundCode: () => `<FileUpload label="Attachments" accept=".png,.jpg,.pdf" multiple />`,
    examples: [{ title: 'Single File Upload', description: 'Omit multiple for single-file inputs.', code: `<FileUpload accept=".csv" />`, render: () => <div style={{ width: '20rem' }}><FileUpload accept=".csv" /></div> }],
    props: [{ name: 'accept', type: 'string', defaultValue: 'undefined', description: 'Allowed MIME/extensions.' }, { name: 'multiple', type: 'boolean', defaultValue: 'false', description: 'Allow multiple files.' }],
    slots: [{ name: 'dropzone', description: 'Interactive drop area.' }, { name: 'list', description: 'Selected files list.' }],
    cssVars: [],
    a11y: [{ key: 'Enter / Space', description: 'Opens file picker dialog from keyboard.' }],
  },
  {
    slug: 'combobox',
    name: 'Combobox',
    category: 'Forms',
    radix: '@radix-ui/react-popover',
    summary: 'Searchable single-select dropdown powered by Radix Popover.',
    description: 'Filter large option lists with instant search and keyboard-accessible selection.',
    importCode: `import { Combobox } from '@kreattix/ui';`,
    playgroundControls: [],
    renderPlayground: () => (
      <div style={{ width: '18rem' }}>
        <Combobox label="Framework" options={[{ value: 'next', label: 'Next.js' }, { value: 'remix', label: 'Remix' }, { value: 'astro', label: 'Astro' }]} />
      </div>
    ),
    generatePlaygroundCode: () => `<Combobox label="Framework" options={[{ value: 'next', label: 'Next.js' }]} />`,
    examples: [{ title: 'Default Value', description: 'Pass defaultValue for uncontrolled selection.', code: `<Combobox defaultValue="next" options={[...]} />`, render: () => <div style={{ width: '16rem' }}><Combobox defaultValue="next" options={[{ value: 'next', label: 'Next.js' }, { value: 'vite', label: 'Vite' }]} /></div> }],
    props: [{ name: 'options', type: 'ComboboxOption[]', defaultValue: '—', required: true, description: 'Searchable options.' }],
    slots: [{ name: 'trigger', description: 'Combobox button.' }, { name: 'content', description: 'Popover menu.' }],
    cssVars: [],
    a11y: [{ key: 'role="combobox"', description: 'Exposes aria-expanded and listbox options.' }],
  },
  {
    slug: 'multi-select',
    name: 'MultiSelect',
    category: 'Forms',
    radix: '@radix-ui/react-popover',
    summary: 'Searchable multi-select with closable Tag chips.',
    description: 'Allows selecting multiple options with inline Tag chips and live search filtering.',
    importCode: `import { MultiSelect } from '@kreattix/ui';`,
    playgroundControls: [],
    renderPlayground: () => (
      <div style={{ width: '20rem' }}>
        <MultiSelect label="Stack" defaultValue={['react', 'ts']} options={[{ value: 'react', label: 'React' }, { value: 'ts', label: 'TypeScript' }, { value: 'next', label: 'Next.js' }]} />
      </div>
    ),
    generatePlaygroundCode: () => `<MultiSelect label="Stack" defaultValue={['react', 'ts']} options={[...]} />`,
    examples: [{ title: 'Filter Tags', description: 'Click × on any Tag chip to deselect.', code: `<MultiSelect options={[...]} />`, render: () => <Text size="sm" tone="muted">Select or remove tags in the playground above.</Text> }],
    props: [{ name: 'options', type: 'ComboboxOption[]', defaultValue: '—', required: true, description: 'Selectable options.' }, { name: 'value / defaultValue', type: 'string[]', defaultValue: '[]', description: 'Selected values.' }],
    slots: [{ name: 'trigger', description: 'Chip container trigger.' }],
    cssVars: [],
    a11y: [{ key: 'aria-selected', description: 'Marks selected listbox options.' }],
  },
  {
    slug: 'date-picker',
    name: 'DatePicker',
    category: 'Forms',
    radix: '@radix-ui/react-popover',
    summary: 'Zero-dependency locale-aware calendar DatePicker powered by Intl.DateTimeFormat.',
    description: 'Uses native `Intl.DateTimeFormat` for localized month/date formatting with zero external date-library lock-in.',
    importCode: `import { DatePicker } from '@kreattix/ui';`,
    playgroundControls: [],
    renderPlayground: () => <div style={{ width: '16rem' }}><DatePicker label="Release Date" /></div>,
    generatePlaygroundCode: () => `<DatePicker label="Release Date" onValueChange={setDate} />`,
    examples: [{ title: 'Locale Support', description: 'Pass any BCP-47 locale string.', code: `<DatePicker locale="en-GB" />`, render: () => <div style={{ width: '16rem' }}><DatePicker locale="en-GB" placeholder="DD MMM YYYY" /></div> }],
    props: [{ name: 'value / defaultValue', type: 'Date | null', defaultValue: 'null', description: 'Selected Date.' }, { name: 'locale', type: 'string', defaultValue: "'en-US'", description: 'Intl locale.' }],
    slots: [{ name: 'trigger', description: 'Picker button.' }, { name: 'content', description: 'Calendar popover.' }],
    cssVars: [],
    a11y: [{ key: 'aria-label', description: 'Month navigation buttons are labeled for screen readers.' }],
  },
  {
    slug: 'color-picker',
    name: 'ColorPicker',
    category: 'Forms',
    summary: 'Swatch grid and hex input color selector.',
    description: 'Combine quick brand swatches with direct hex input.',
    importCode: `import { ColorPicker } from '@kreattix/ui';`,
    playgroundControls: [],
    renderPlayground: () => <div style={{ width: '18rem' }}><ColorPicker label="Primary Color" /></div>,
    generatePlaygroundCode: () => `<ColorPicker label="Primary Color" onValueChange={setColor} />`,
    examples: [{ title: 'Custom Swatches', description: 'Pass swatches={[...]} to restrict palette.', code: `<ColorPicker swatches={['#4f46e5', '#10b981']} />`, render: () => <ColorPicker swatches={['#4f46e5', '#10b981', '#e11d48']} /> }],
    props: [{ name: 'swatches', type: 'string[]', defaultValue: '7 colors', description: 'Preset hex swatches.' }],
    slots: [{ name: 'root', description: 'Picker container.' }, { name: 'swatch', description: 'Color swatch button.' }],
    cssVars: [],
    a11y: [{ key: 'aria-label', description: 'Each swatch announces its hex value.' }],
  },
  {
    slug: 'form',
    name: 'Form',
    category: 'Forms',
    summary: 'Zero-dep form state & validation wrapper with Zod-compatible safeParse adapter.',
    description: 'Provides `useFormField(name)` context and supports custom `validate` or any schema with `safeParse`.',
    importCode: `import { Form, useFormField } from '@kreattix/ui';`,
    playgroundControls: [],
    renderPlayground: () => (
      <div style={{ width: '18rem' }}>
        <Form initialValues={{ name: '' }} validate={(v) => (!v.name ? { name: 'Name is required' } : {})}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <FormFieldDemo />
            <Button type="submit" size="sm">Validate &amp; Submit</Button>
          </div>
        </Form>
      </div>
    ),
    generatePlaygroundCode: () => `<Form initialValues={{ name: '' }} schema={myZodSchema} onSubmit={fn}>\n  ...\n</Form>`,
    examples: [{ title: 'Schema Adapter', description: 'Works directly with Zod schemas via safeParse.', code: `<Form schema={zodSchema} onSubmit={handleSave}>...</Form>`, render: () => <Text size="sm" tone="muted">Click Validate &amp; Submit above with an empty input.</Text> }],
    props: [{ name: 'initialValues', type: 'T', defaultValue: '{}', description: 'Initial field values.' }, { name: 'schema', type: 'SchemaLike<T>', defaultValue: 'undefined', description: 'Object with safeParse().' }],
    slots: [],
    cssVars: [],
    a11y: [{ key: 'noValidate', description: 'Routes errors through accessible Field role="alert" messages.' }],
  },
  {
    slug: 'table',
    name: 'Table',
    category: 'Enterprise Data',
    summary: 'Semantic HTML table with striped, hoverable, and sticky-header modes.',
    description: 'Compound `Table.Header`, `Table.Body`, `Table.Row`, `Table.Head`, `Table.Cell`.',
    importCode: `import { Table } from '@kreattix/ui';`,
    playgroundControls: [{ name: 'striped', label: 'Striped', type: 'boolean', defaultValue: false }],
    renderPlayground: (v) => (
      <div style={{ width: '100%', maxWidth: '28rem' }}>
        <Table striped={Boolean(v.striped)}>
          <Table.Header><Table.Row><Table.Head>Package</Table.Head><Table.Head>Size</Table.Head></Table.Row></Table.Header>
          <Table.Body>
            <Table.Row><Table.Cell>@kreattix-ui/tokens</Table.Cell><Table.Cell>12.2 KB</Table.Cell></Table.Row>
            <Table.Row><Table.Cell>@kreattix-ui/theme</Table.Cell><Table.Cell>11.2 KB</Table.Cell></Table.Row>
          </Table.Body>
        </Table>
      </div>
    ),
    generatePlaygroundCode: (v) => `<Table${v.striped ? ' striped' : ''}>\n  <Table.Header>...</Table.Header>\n  <Table.Body>...</Table.Body>\n</Table>`,
    examples: [{ title: 'Sticky Header', description: 'Pass stickyHeader for scrollable tables.', code: `<Table stickyHeader>...</Table>`, render: () => <Text size="sm" tone="muted">Used internally by DataGrid.</Text> }],
    props: [{ name: 'striped', type: 'boolean', defaultValue: 'false', description: 'Alternating row shading.' }, { name: 'hoverable', type: 'boolean', defaultValue: 'true', description: 'Row hover highlight.' }],
    slots: [{ name: 'root', description: 'Table element.' }],
    cssVars: [],
    a11y: [{ key: '<table>', description: 'Uses native semantic table elements.' }],
  },
  {
    slug: 'data-grid',
    name: 'DataGrid',
    category: 'Enterprise Data',
    summary: 'Zero-dependency enterprise data grid with search, sorting, selection, and pagination.',
    description: 'Typed columns, numeric/natural sorting, row selection checkboxes, and empty states.',
    importCode: `import { DataGrid } from '@kreattix/ui';`,
    playgroundControls: [{ name: 'selectable', label: 'Selectable', type: 'boolean', defaultValue: true }],
    renderPlayground: (v) => (
      <div style={{ width: '100%', maxWidth: '34rem' }}>
        <DataGrid
          selectable={Boolean(v.selectable)}
          pageSize={3}
          data={[
            { id: '1', name: 'Alice Ray', role: 'Admin' },
            { id: '2', name: 'Bob Chen', role: 'Editor' },
            { id: '3', name: 'Cara Diaz', role: 'Viewer' },
            { id: '4', name: 'Dan Lee', role: 'Admin' },
          ]}
          columns={[{ key: 'name', header: 'Name', sortable: true }, { key: 'role', header: 'Role', sortable: true }]}
        />
      </div>
    ),
    generatePlaygroundCode: (v) => `<DataGrid${v.selectable ? ' selectable' : ''} data={rows} columns={columns} />`,
    examples: [{ title: 'Custom Cell Renderers', description: 'Use render(value, row) on any column.', code: `{ key: 'status', header: 'Status', render: (v) => <Badge>{v}</Badge> }`, render: () => <Text size="sm" tone="muted">Try searching, sorting, or paging above.</Text> }],
    props: [{ name: 'data', type: 'T[]', defaultValue: '—', required: true, description: 'Row objects.' }, { name: 'columns', type: 'DataGridColumn<T>[]', defaultValue: '—', required: true, description: 'Column definitions.' }, { name: 'selectable', type: 'boolean', defaultValue: 'false', description: 'Enables row checkboxes.' }],
    slots: [],
    cssVars: [],
    a11y: [{ key: 'aria-label', description: 'Header and row selection checkboxes have explicit labels.' }],
  },
  {
    slug: 'tree-view',
    name: 'TreeView',
    category: 'Enterprise Data',
    summary: 'Hierarchical expandable tree list for file explorers and org charts.',
    description: 'Supports `defaultExpandedIds`, controlled `selectedId`, and nested `children`.',
    importCode: `import { TreeView } from '@kreattix/ui';`,
    playgroundControls: [],
    renderPlayground: () => (
      <div style={{ width: '16rem' }}>
        <TreeView defaultExpandedIds={['src']} data={[{ id: 'src', label: 'src', children: [{ id: 'index', label: 'index.ts' }, { id: 'theme', label: 'theme.ts' }] }]} />
      </div>
    ),
    generatePlaygroundCode: () => `<TreeView defaultExpandedIds={['src']} data={treeData} />`,
    examples: [{ title: 'File Tree', description: 'Click folder nodes to expand/collapse.', code: `<TreeView data={files} onSelect={fn} />`, render: () => <Text size="sm" tone="muted">Click src above to collapse/expand.</Text> }],
    props: [{ name: 'data', type: 'TreeNodeData[]', defaultValue: '—', required: true, description: 'Tree nodes.' }],
    slots: [{ name: 'root', description: 'Tree container.' }, { name: 'node', description: 'Node button.' }],
    cssVars: [],
    a11y: [{ key: 'role="tree" / aria-expanded', description: 'Exposes hierarchical tree state.' }],
  },
  {
    slug: 'list',
    name: 'List',
    category: 'Enterprise Data',
    summary: 'Structured list rows with leading media, title, description, and trailing slot.',
    description: 'Ideal for team rosters, activity feeds, and settings lists.',
    importCode: `import { List } from '@kreattix/ui';`,
    playgroundControls: [{ name: 'divided', label: 'Divided', type: 'boolean', defaultValue: true }],
    renderPlayground: (v) => (
      <div style={{ width: '100%', maxWidth: '24rem' }}>
        <List divided={Boolean(v.divided)}>
          <List.Item title="Design Tokens" description="12.2 KB ESM" trailing={<Button size="xs" variant="outline">Inspect</Button>} />
          <List.Item title="ThemeProvider" description="11.2 KB ESM" trailing={<Button size="xs" variant="outline">Inspect</Button>} />
        </List>
      </div>
    ),
    generatePlaygroundCode: (v) => `<List divided={${v.divided}}>\n  <List.Item title="Design Tokens" description="12.2 KB" />\n</List>`,
    examples: [{ title: 'Actionable List', description: 'Pass Buttons or Badges to trailing.', code: `<List.Item title="Item" trailing={<Badge>New</Badge>} />`, render: () => <Text size="sm" tone="muted">Flexible leading &amp; trailing slots.</Text> }],
    props: [{ name: 'divided', type: 'boolean', defaultValue: 'true', description: 'Renders dividers between rows.' }],
    slots: [{ name: 'root', description: 'List ul.' }],
    cssVars: [],
    a11y: [{ key: '<ul> / <li>', description: 'Semantic list markup.' }],
  },
  {
    slug: 'command-palette',
    name: 'CommandPalette',
    category: 'Enterprise Data',
    radix: '@radix-ui/react-dialog',
    summary: 'Cmd/Ctrl+K command launcher with instant filtering and keyboard shortcuts.',
    description: 'Built on Radix Dialog with fuzzy search, grouped commands, and `Kbd` hints.',
    importCode: `import { CommandPalette } from '@kreattix/ui';`,
    playgroundControls: [],
    renderPlayground: () => <CommandDemo />,
    generatePlaygroundCode: () => `<CommandPalette commands={[{ id: '1', label: 'New Project', shortcut: 'N', onSelect: fn }]} />`,
    examples: [{ title: 'Global Shortcut', description: 'Set enableGlobalShortcut={true} to bind Cmd/Ctrl+K.', code: `<CommandPalette enableGlobalShortcut commands={commands} />`, render: () => <Text size="sm" tone="muted">Click Open Command Palette above.</Text> }],
    props: [{ name: 'commands', type: 'CommandItemData[]', defaultValue: '—', required: true, description: 'Command items.' }, { name: 'enableGlobalShortcut', type: 'boolean', defaultValue: 'true', description: 'Binds Cmd/Ctrl+K.' }],
    slots: [],
    cssVars: [],
    a11y: [{ key: 'Escape', description: 'Closes palette and restores focus.' }],
  },
];
