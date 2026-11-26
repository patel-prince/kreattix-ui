'use client';

import React, { useState } from 'react';
import {
  AlertDialog,
  AspectRatio,
  Badge,
  Box,
  Breadcrumb,
  Button,
  ButtonGroup,
  CodeBlock,
  Container,
  ContextMenu,
  EmptyState,
  HoverCard,
  Kbd,
  Menubar,
  NavigationMenu,
  Pagination,
  ResizablePanels,
  ScrollArea,
  Sheet,
  SidebarNav,
  SplitButton,
  Stack,
  StatCard,
  Stepper,
  Tag,
  Text,
  Timeline,
} from '@kreattix/ui';
import type { ComponentDocEntry } from './types';

function PaginationPlayground() {
  const [page, setPage] = useState(2);
  return <Pagination page={page} totalPages={8} onPageChange={setPage} />;
}

function StepperPlayground() {
  const [step, setStep] = useState(1);
  return (
    <div style={{ width: '100%', maxWidth: '30rem' }}>
      <Stepper
        activeStep={step}
        onStepClick={setStep}
        steps={[{ title: 'Account' }, { title: 'Workspace' }, { title: 'Deploy' }]}
      />
    </div>
  );
}

export const PHASE2_A_DOCS: ComponentDocEntry[] = [
  {
    slug: 'container',
    name: 'Container',
    category: 'Layout',
    summary: 'Responsive max-width container with centered alignment presets.',
    description: 'Centers page content with standard breakpoint max-widths (`sm` through `2xl` or `full`).',
    importCode: `import { Container } from '@kreattix/ui';`,
    playgroundControls: [{ name: 'size', label: 'Size', type: 'select', options: ['sm', 'md', 'lg', 'xl', '2xl', 'full'], defaultValue: 'md' }],
    renderPlayground: (v) => (
      <Container size={v.size as 'md'}>
        <Box surface="subtle" p={4} radius="md"><Text size="sm">Centered Container ({String(v.size)})</Text></Box>
      </Container>
    ),
    generatePlaygroundCode: (v) => `<Container size="${v.size}">Content</Container>`,
    examples: [{ title: 'Fluid Full Width', description: 'Use size="full" for edge-to-edge dashboards.', code: `<Container size="full">...</Container>`, render: () => <Container size="full"><Box surface="subtle" p={3} radius="md"><Text size="sm">Full-width container</Text></Box></Container> }],
    props: [{ name: 'size', type: "'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'", defaultValue: "'xl'", description: 'Max-width preset.' }],
    slots: [{ name: 'root', description: 'Container div.' }],
    cssVars: [],
    a11y: [{ key: 'asChild', description: 'Use semantic <main> or <section> via asChild.' }],
  },
  {
    slug: 'aspect-ratio',
    name: 'AspectRatio',
    category: 'Layout',
    radix: '@radix-ui/react-aspect-ratio',
    summary: 'Maintains consistent width-to-height ratio for media and embeds.',
    description: 'Built on `@radix-ui/react-aspect-ratio` for responsive 16:9, 4:3, or 1:1 media frames.',
    importCode: `import { AspectRatio } from '@kreattix/ui';`,
    playgroundControls: [],
    renderPlayground: () => (
      <div style={{ width: '16rem' }}>
        <AspectRatio ratio={16 / 9}>
          <Box surface="subtle" radius="md" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Text size="sm" weight="medium">16 : 9 Frame</Text>
          </Box>
        </AspectRatio>
      </div>
    ),
    generatePlaygroundCode: () => `<AspectRatio ratio={16 / 9}>\n  <img src="/cover.png" alt="Cover" />\n</AspectRatio>`,
    examples: [{ title: 'Square 1:1', description: 'Set ratio={1} for avatars or thumbnails.', code: `<AspectRatio ratio={1}>...</AspectRatio>`, render: () => <div style={{ width: '6rem' }}><AspectRatio ratio={1}><Box surface="muted" radius="md" style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}><Text size="xs">1:1</Text></Box></AspectRatio></div> }],
    props: [{ name: 'ratio', type: 'number', defaultValue: '16 / 9', description: 'Desired width / height ratio.' }],
    slots: [{ name: 'root', description: 'Ratio wrapper.' }],
    cssVars: [],
    a11y: [{ key: 'alt', description: 'Always provide descriptive alt text on child images.' }],
  },
  {
    slug: 'scroll-area',
    name: 'ScrollArea',
    category: 'Layout',
    radix: '@radix-ui/react-scroll-area',
    summary: 'Cross-browser custom scrollbars with smooth Radix viewport.',
    description: 'Built on `@radix-ui/react-scroll-area` with clean vertical/horizontal scrollbars.',
    importCode: `import { ScrollArea } from '@kreattix/ui';`,
    playgroundControls: [],
    renderPlayground: () => (
      <ScrollArea style={{ height: '8rem', width: '16rem', border: '1px solid var(--kx-border-default)', borderRadius: 'var(--kx-radius-md)', padding: '0.75rem' }}>
        <Stack gap={2}>{Array.from({ length: 10 }, (_, i) => <Text key={i} size="sm">Scrollable row #{i + 1}</Text>)}</Stack>
      </ScrollArea>
    ),
    generatePlaygroundCode: () => `<ScrollArea style={{ height: '10rem' }}>\n  ...\n</ScrollArea>`,
    examples: [{ title: 'Horizontal Scroll', description: 'Use orientation="horizontal" for wide strips.', code: `<ScrollArea orientation="horizontal">...</ScrollArea>`, render: () => <Text size="sm" tone="muted">Supports vertical, horizontal, or both.</Text> }],
    props: [{ name: 'orientation', type: "'vertical' | 'horizontal' | 'both'", defaultValue: "'vertical'", description: 'Active scrollbar axes.' }],
    slots: [{ name: 'root', description: 'ScrollArea root.' }, { name: 'viewport', description: 'Scrollable viewport.' }],
    cssVars: [{ token: '--kx-border-strong', defaultValue: '#d4d4d8', description: 'Scrollbar thumb fill.' }],
    a11y: [{ key: 'Keyboard scroll', description: 'Native arrow/PageUp/PageDown scrolling preserved.' }],
  },
  {
    slug: 'resizable-panels',
    name: 'ResizablePanels',
    category: 'Layout',
    summary: 'Split-pane layout with pointer and keyboard-accessible resize handle.',
    description: 'Supports horizontal or vertical splitting with `ArrowLeft`/`ArrowRight` keyboard resizing.',
    importCode: `import { ResizablePanels } from '@kreattix/ui';`,
    playgroundControls: [],
    renderPlayground: () => (
      <div style={{ width: '100%', maxWidth: '28rem', height: '8rem' }}>
        <ResizablePanels defaultRatio={40}>
          <ResizablePanels.Panel index={0}><Box p={3}><Text size="sm">Sidebar</Text></Box></ResizablePanels.Panel>
          <ResizablePanels.Handle />
          <ResizablePanels.Panel index={1}><Box p={3}><Text size="sm">Editor</Text></Box></ResizablePanels.Panel>
        </ResizablePanels>
      </div>
    ),
    generatePlaygroundCode: () => `<ResizablePanels defaultRatio={40}>\n  <ResizablePanels.Panel index={0}>Sidebar</ResizablePanels.Panel>\n  <ResizablePanels.Handle />\n  <ResizablePanels.Panel index={1}>Editor</ResizablePanels.Panel>\n</ResizablePanels>`,
    examples: [{ title: 'Vertical Split', description: 'Use direction="vertical" for top/bottom consoles.', code: `<ResizablePanels direction="vertical">...</ResizablePanels>`, render: () => <Text size="sm" tone="muted">Drag or use Arrow keys on the handle.</Text> }],
    props: [{ name: 'direction', type: "'horizontal' | 'vertical'", defaultValue: "'horizontal'", description: 'Split axis.' }, { name: 'defaultRatio', type: 'number', defaultValue: '50', description: 'Initial percentage for panel 0.' }],
    slots: [{ name: 'root', description: 'Flex container.' }],
    cssVars: [{ token: '--kx-primary-500', defaultValue: '#6366f1', description: 'Active handle highlight.' }],
    a11y: [{ key: 'ArrowLeft / ArrowRight', description: 'Resizes panels in 5% increments.' }],
  },
  {
    slug: 'code-block',
    name: 'CodeBlock',
    category: 'Display',
    summary: 'Formatted code snippet viewer with line numbers and copy button.',
    description: 'Displays syntax-styled code with optional line numbers and 1-click clipboard copy.',
    importCode: `import { CodeBlock } from '@kreattix/ui';`,
    playgroundControls: [{ name: 'showLineNumbers', label: 'Line Numbers', type: 'boolean', defaultValue: true }],
    renderPlayground: (v) => (
      <div style={{ width: '100%', maxWidth: '26rem' }}>
        <CodeBlock language="tsx" showLineNumbers={Boolean(v.showLineNumbers)} code={`import { Button } from '@kreattix/ui';\n\nexport const App = () => <Button>Hello</Button>;`} />
      </div>
    ),
    generatePlaygroundCode: (v) => `<CodeBlock language="tsx"${v.showLineNumbers ? ' showLineNumbers' : ''} code="..." />`,
    examples: [{ title: 'CLI Command', description: 'Omit line numbers for single-line commands.', code: `<CodeBlock language="bash" code="npm install @kreattix/ui" />`, render: () => <CodeBlock language="bash" code="npm install @kreattix/ui" /> }],
    props: [{ name: 'code', type: 'string', defaultValue: '—', required: true, description: 'Code string.' }, { name: 'showLineNumbers', type: 'boolean', defaultValue: 'false', description: 'Displays line numbers.' }],
    slots: [{ name: 'root', description: 'Code container.' }, { name: 'copy', description: 'Copy button.' }],
    cssVars: [],
    a11y: [{ key: 'Copy button', description: 'Keyboard-focusable button with live Copied state.' }],
  },
  {
    slug: 'kbd',
    name: 'Kbd',
    category: 'Display',
    summary: 'Semantic keyboard shortcut keycap.',
    description: 'Renders tactile `<kbd>` keycaps for shortcuts in menus, tooltips, and command palettes.',
    importCode: `import { Kbd } from '@kreattix/ui';`,
    playgroundControls: [{ name: 'size', label: 'Size', type: 'select', options: ['sm', 'md'], defaultValue: 'md' }],
    renderPlayground: (v) => <Kbd size={v.size as 'md'}>Ctrl + K</Kbd>,
    generatePlaygroundCode: (v) => `<Kbd size="${v.size}">Ctrl + K</Kbd>`,
    examples: [{ title: 'Key Combinations', description: 'Compose multiple Kbd elements.', code: `<Kbd>Cmd</Kbd> + <Kbd>Shift</Kbd> + <Kbd>P</Kbd>`, render: () => <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}><Kbd>Cmd</Kbd>+<Kbd>Shift</Kbd>+<Kbd>P</Kbd></div> }],
    props: [{ name: 'size', type: "'sm' | 'md'", defaultValue: "'md'", description: 'Keycap size.' }],
    slots: [{ name: 'root', description: 'kbd element.' }],
    cssVars: [],
    a11y: [{ key: '<kbd>', description: 'Uses native semantic HTML <kbd> element.' }],
  },
  {
    slug: 'tag',
    name: 'Tag',
    category: 'Display',
    summary: 'Closable and selectable chip for filters, categories, and multi-select.',
    description: 'Supports semantic tones, `selected` state, and `closable` dismiss button.',
    importCode: `import { Tag } from '@kreattix/ui';`,
    playgroundControls: [
      { name: 'tone', label: 'Tone', type: 'select', options: ['neutral', 'primary', 'success', 'danger'], defaultValue: 'primary' },
      { name: 'closable', label: 'Closable', type: 'boolean', defaultValue: true },
    ],
    renderPlayground: (v) => <Tag tone={v.tone as 'primary'} closable={Boolean(v.closable)}>React 19</Tag>,
    generatePlaygroundCode: (v) => `<Tag tone="${v.tone}"${v.closable ? ' closable' : ''}>React 19</Tag>`,
    examples: [{ title: 'Selectable Filter Tag', description: 'Use selected prop for active filter chips.', code: `<Tag selected>Active Filter</Tag>`, render: () => <Tag selected>Active Filter</Tag> }],
    props: [{ name: 'tone', type: "'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info'", defaultValue: "'neutral'", description: 'Tag tone.' }, { name: 'closable', type: 'boolean', defaultValue: 'false', description: 'Shows remove button.' }],
    slots: [{ name: 'root', description: 'Tag wrapper.' }, { name: 'close', description: 'Close button.' }],
    cssVars: [],
    a11y: [{ key: 'aria-label="Remove tag"', description: 'Close button is keyboard accessible.' }],
  },
  {
    slug: 'timeline',
    name: 'Timeline',
    category: 'Display',
    summary: 'Chronological activity & event feed with connected status dots.',
    description: 'Supports 1-liner `items` array or compound `Timeline.Item` children.',
    importCode: `import { Timeline } from '@kreattix/ui';`,
    playgroundControls: [],
    renderPlayground: () => (
      <div style={{ width: '100%', maxWidth: '24rem' }}>
        <Timeline items={[{ title: 'Build passed', timestamp: '2m ago', tone: 'success', description: 'All 14 tests green.' }, { title: 'PR merged', timestamp: '1h ago', tone: 'primary' }]} />
      </div>
    ),
    generatePlaygroundCode: () => `<Timeline items={[{ title: 'Build passed', timestamp: '2m ago', tone: 'success' }]} />`,
    examples: [{ title: 'Release History', description: 'Use semantic tones per milestone.', code: `<Timeline items={[...]} />`, render: () => <Timeline items={[{ title: 'v0.2.0 Released', timestamp: 'Today', tone: 'success' }]} /> }],
    props: [{ name: 'items', type: 'TimelineItemData[]', defaultValue: 'undefined', description: 'Timeline events.' }],
    slots: [{ name: 'root', description: 'Ordered list.' }, { name: 'item', description: 'Event row.' }],
    cssVars: [],
    a11y: [{ key: '<ol>', description: 'Uses ordered list semantics for chronological events.' }],
  },
  {
    slug: 'stat-card',
    name: 'StatCard',
    category: 'Display',
    summary: 'KPI metric card with trend delta badge and footer slot.',
    description: 'Built for analytics dashboards with `up`, `down`, and `neutral` delta styling.',
    importCode: `import { StatCard } from '@kreattix/ui';`,
    playgroundControls: [{ name: 'trend', label: 'Trend', type: 'select', options: ['up', 'down', 'neutral'], defaultValue: 'up' }],
    renderPlayground: (v) => (
      <div style={{ width: '16rem' }}>
        <StatCard label="Monthly Revenue" value="$84,200" delta={v.trend === 'down' ? '-3.1%' : '+18.4%'} trend={v.trend as 'up'} footer="vs. last 30 days" />
      </div>
    ),
    generatePlaygroundCode: (v) => `<StatCard label="Monthly Revenue" value="$84,200" delta="+18.4%" trend="${v.trend}" />`,
    examples: [{ title: 'KPI Strip', description: 'Arrange multiple StatCards inside Grid.', code: `<StatCard label="Active Users" value="14,920" delta="+6.2%" trend="up" />`, render: () => <StatCard label="Active Users" value="14,920" delta="+6.2%" trend="up" /> }],
    props: [{ name: 'label / value', type: 'ReactNode', defaultValue: '—', required: true, description: 'Metric label and value.' }, { name: 'trend', type: "'up' | 'down' | 'neutral'", defaultValue: "'neutral'", description: 'Delta badge styling.' }],
    slots: [{ name: 'root', description: 'Card wrapper.' }, { name: 'value', description: 'Metric value.' }],
    cssVars: [],
    a11y: [{ key: 'Text clarity', description: 'Delta uses color + +/- prefix so trend is never color-only.' }],
  },
  {
    slug: 'empty-state',
    name: 'EmptyState',
    category: 'Display',
    summary: 'Zero-data placeholder with icon, title, description, and action CTA.',
    description: 'Guides users when tables, searches, or dashboards have no records yet.',
    importCode: `import { EmptyState } from '@kreattix/ui';`,
    playgroundControls: [],
    renderPlayground: () => (
      <div style={{ width: '100%', maxWidth: '24rem' }}>
        <EmptyState title="No deployments yet" description="Connect your repository to deploy your first app." action={<Button size="sm">Create Project</Button>} />
      </div>
    ),
    generatePlaygroundCode: () => `<EmptyState title="No deployments yet" description="..." action={<Button>Create Project</Button>} />`,
    examples: [{ title: 'Minimal Empty State', description: 'Omit action for read-only views.', code: `<EmptyState title="No results" />`, render: () => <EmptyState title="No results" /> }],
    props: [{ name: 'title', type: 'ReactNode', defaultValue: '—', required: true, description: 'Heading.' }, { name: 'action', type: 'ReactNode', defaultValue: 'undefined', description: 'CTA button slot.' }],
    slots: [{ name: 'root', description: 'Dashed container.' }],
    cssVars: [],
    a11y: [{ key: 'Heading', description: 'Uses semantic <h3> for empty state title.' }],
  },
  {
    slug: 'button-group',
    name: 'ButtonGroup',
    category: 'Actions',
    summary: 'Groups related buttons with seamless attached borders.',
    description: 'Renders horizontal or vertical `role="group"` button clusters.',
    importCode: `import { ButtonGroup, Button } from '@kreattix/ui';`,
    playgroundControls: [{ name: 'attached', label: 'Attached', type: 'boolean', defaultValue: true }],
    renderPlayground: (v) => (
      <ButtonGroup attached={Boolean(v.attached)}>
        <Button variant="outline">Day</Button>
        <Button variant="outline">Week</Button>
        <Button variant="outline">Month</Button>
      </ButtonGroup>
    ),
    generatePlaygroundCode: (v) => `<ButtonGroup attached={${v.attached}}>\n  <Button variant="outline">Day</Button>\n  <Button variant="outline">Week</Button>\n</ButtonGroup>`,
    examples: [{ title: 'Segmented Actions', description: 'Combine outline buttons in a connected bar.', code: `<ButtonGroup><Button variant="outline">Left</Button><Button variant="outline">Right</Button></ButtonGroup>`, render: () => <ButtonGroup><Button variant="outline" size="sm">Left</Button><Button variant="outline" size="sm">Right</Button></ButtonGroup> }],
    props: [{ name: 'attached', type: 'boolean', defaultValue: 'true', description: 'Merges inner borders.' }, { name: 'orientation', type: "'horizontal' | 'vertical'", defaultValue: "'horizontal'", description: 'Group direction.' }],
    slots: [{ name: 'root', description: 'Group container.' }],
    cssVars: [],
    a11y: [{ key: 'role="group"', description: 'Groups buttons semantically for screen readers.' }],
  },
  {
    slug: 'split-button',
    name: 'SplitButton',
    category: 'Actions',
    radix: '@radix-ui/react-dropdown-menu',
    summary: 'Primary action button paired with a secondary DropdownMenu trigger.',
    description: 'Combines `ButtonGroup` + `Button` + `DropdownMenu` for default + alternate actions.',
    importCode: `import { SplitButton } from '@kreattix/ui';`,
    playgroundControls: [],
    renderPlayground: () => (
      <SplitButton items={[{ label: 'Save as Draft' }, { label: 'Schedule Publish' }]}>Publish</SplitButton>
    ),
    generatePlaygroundCode: () => `<SplitButton items={[{ label: 'Save as Draft' }]}>Publish</SplitButton>`,
    examples: [{ title: 'Outline SplitButton', description: 'Supports all Button variants and tones.', code: `<SplitButton variant="outline" items={[...]}>Export</SplitButton>`, render: () => <SplitButton variant="outline" size="sm" items={[{ label: 'Export CSV' }, { label: 'Export JSON' }]}>Export</SplitButton> }],
    props: [{ name: 'items', type: 'DropdownMenuItemData[]', defaultValue: '—', required: true, description: 'Secondary dropdown actions.' }],
    slots: [{ name: 'root', description: 'ButtonGroup wrapper.' }],
    cssVars: [],
    a11y: [{ key: 'aria-label="More actions"', description: 'Dropdown trigger has an accessible label.' }],
  },
  {
    slug: 'breadcrumb',
    name: 'Breadcrumb',
    category: 'Feedback & Navigation',
    summary: 'Accessible hierarchical page trail with customizable separators.',
    description: 'Marks the current page with `aria-current="page"` automatically.',
    importCode: `import { Breadcrumb } from '@kreattix/ui';`,
    playgroundControls: [],
    renderPlayground: () => <Breadcrumb items={[{ label: 'Home', href: '#' }, { label: 'Docs', href: '#' }, { label: 'Breadcrumb' }]} />,
    generatePlaygroundCode: () => `<Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Docs' }]} />`,
    examples: [{ title: 'Custom Separator', description: 'Pass "/" or any ReactNode to separator.', code: `<Breadcrumb separator="/" items={[...]} />`, render: () => <Breadcrumb separator="/" items={[{ label: 'Workspace', href: '#' }, { label: 'Settings' }]} /> }],
    props: [{ name: 'items', type: 'BreadcrumbItemData[]', defaultValue: '—', required: true, description: 'Trail items.' }, { name: 'separator', type: 'ReactNode', defaultValue: 'chevronRight', description: 'Separator glyph.' }],
    slots: [{ name: 'root', description: 'Nav element.' }, { name: 'item', description: 'Breadcrumb item.' }],
    cssVars: [],
    a11y: [{ key: 'aria-current="page"', description: 'Applied to the final active item.' }],
  },
  {
    slug: 'pagination',
    name: 'Pagination',
    category: 'Feedback & Navigation',
    summary: 'Smart page navigation with automatic ellipsis collapsing.',
    description: 'Handles large page counts cleanly with `siblingCount` and `aria-current="page"`.',
    importCode: `import { Pagination } from '@kreattix/ui';`,
    playgroundControls: [],
    renderPlayground: () => <PaginationPlayground />,
    generatePlaygroundCode: () => `<Pagination page={page} totalPages={8} onPageChange={setPage} />`,
    examples: [{ title: 'Compact Pagination', description: 'Used automatically inside DataGrid.', code: `<Pagination page={1} totalPages={3} onPageChange={fn} />`, render: () => <Pagination page={1} totalPages={3} onPageChange={() => {}} /> }],
    props: [{ name: 'page', type: 'number', defaultValue: '—', required: true, description: 'Current 1-based page.' }, { name: 'totalPages', type: 'number', defaultValue: '—', required: true, description: 'Total pages.' }],
    slots: [{ name: 'root', description: 'Nav element.' }, { name: 'button', description: 'Page button.' }],
    cssVars: [],
    a11y: [{ key: 'aria-current="page"', description: 'Identifies the active page button.' }],
  },
  {
    slug: 'stepper',
    name: 'Stepper',
    category: 'Feedback & Navigation',
    summary: 'Multi-step progress indicator for wizards and onboarding flows.',
    description: 'Supports horizontal/vertical orientation and optional interactive `onStepClick`.',
    importCode: `import { Stepper } from '@kreattix/ui';`,
    playgroundControls: [],
    renderPlayground: () => <StepperPlayground />,
    generatePlaygroundCode: () => `<Stepper activeStep={step} onStepClick={setStep} steps={[...]} />`,
    examples: [{ title: 'Vertical Stepper', description: 'Use orientation="vertical" for sidebars.', code: `<Stepper orientation="vertical" activeStep={1} steps={[...]} />`, render: () => <Stepper orientation="vertical" activeStep={1} steps={[{ title: 'Step 1' }, { title: 'Step 2' }]} /> }],
    props: [{ name: 'steps', type: 'StepItemData[]', defaultValue: '—', required: true, description: 'Step definitions.' }, { name: 'activeStep', type: 'number', defaultValue: '—', required: true, description: '0-based active index.' }],
    slots: [{ name: 'root', description: 'Ordered list.' }, { name: 'step', description: 'Step item.' }],
    cssVars: [],
    a11y: [{ key: 'aria-current="step"', description: 'Marks the active step.' }],
  },
  {
    slug: 'navigation-menu',
    name: 'NavigationMenu',
    category: 'Feedback & Navigation',
    radix: '@radix-ui/react-navigation-menu',
    summary: 'Accessible top-level site navigation with rich dropdown mega-menus.',
    description: 'Built on `@radix-ui/react-navigation-menu` with Dual Ergonomics.',
    importCode: `import { NavigationMenu } from '@kreattix/ui';`,
    playgroundControls: [],
    renderPlayground: () => (
      <NavigationMenu
        items={[
          { label: 'Products', children: [{ title: 'Kreattix React', description: '67 UI components', href: '#' }, { title: 'Sections', description: '82+ blocks', href: '#' }] },
          { label: 'Docs', href: '#' },
        ]}
      />
    ),
    generatePlaygroundCode: () => `<NavigationMenu items={[{ label: 'Products', children: [...] }, { label: 'Docs', href: '/docs' }]} />`,
    examples: [{ title: 'Simple Links', description: 'Omit children for direct navigation links.', code: `<NavigationMenu items={[{ label: 'Home', href: '/' }]} />`, render: () => <NavigationMenu items={[{ label: 'Home', href: '#' }, { label: 'Pricing', href: '#' }]} /> }],
    props: [{ name: 'items', type: 'NavigationMenuItemData[]', defaultValue: 'undefined', description: '1-liner nav items.' }],
    slots: [{ name: 'root', description: 'Nav root.' }, { name: 'trigger', description: 'Dropdown trigger.' }],
    cssVars: [],
    a11y: [{ key: 'ArrowLeft / ArrowRight / Escape', description: 'Keyboard navigation across menu triggers.' }],
  },
  {
    slug: 'menubar',
    name: 'Menubar',
    category: 'Feedback & Navigation',
    radix: '@radix-ui/react-menubar',
    summary: 'Desktop-style application menu bar (File, Edit, View).',
    description: 'Built on `@radix-ui/react-menubar` with keyboard shortcuts and separators.',
    importCode: `import { Menubar } from '@kreattix/ui';`,
    playgroundControls: [],
    renderPlayground: () => (
      <Menubar
        menus={[
          { label: 'File', items: [{ label: 'New Tab', shortcut: 'Ctrl+T' }, { label: 'Save', shortcut: 'Ctrl+S', separatorBefore: true }] },
          { label: 'Edit', items: [{ label: 'Undo', shortcut: 'Ctrl+Z' }, { label: 'Redo', shortcut: 'Ctrl+Y' }] },
        ]}
      />
    ),
    generatePlaygroundCode: () => `<Menubar menus={[{ label: 'File', items: [{ label: 'New Tab', shortcut: 'Ctrl+T' }] }]} />`,
    examples: [{ title: 'Workspace Menubar', description: 'Ideal for editors and IDE-like web apps.', code: `<Menubar menus={[...]} />`, render: () => <Badge tone="info">Click File or Edit above</Badge> }],
    props: [{ name: 'menus', type: 'MenubarMenuData[]', defaultValue: 'undefined', description: 'Top-level menus.' }],
    slots: [{ name: 'root', description: 'Menubar strip.' }],
    cssVars: [],
    a11y: [{ key: 'ArrowLeft / ArrowRight', description: 'Switches between top-level menus.' }],
  },
  {
    slug: 'sidebar-nav',
    name: 'SidebarNav',
    category: 'Feedback & Navigation',
    summary: 'Collapsible grouped sidebar navigation with active state and badges.',
    description: 'Ideal for SaaS application shells and admin consoles.',
    importCode: `import { SidebarNav } from '@kreattix/ui';`,
    playgroundControls: [{ name: 'collapsed', label: 'Collapsed', type: 'boolean', defaultValue: false }],
    renderPlayground: (v) => (
      <SidebarNav
        collapsed={Boolean(v.collapsed)}
        groups={[{ title: 'Platform', items: [{ id: '1', label: 'Overview', active: true }, { id: '2', label: 'Deployments', badge: <Badge size="sm">4</Badge> }] }]}
      />
    ),
    generatePlaygroundCode: (v) => `<SidebarNav collapsed={${v.collapsed}} groups={[...]} />`,
    examples: [{ title: 'Grouped Nav', description: 'Organize links into titled groups.', code: `<SidebarNav groups={[...]} />`, render: () => <Text size="sm" tone="muted">Toggle Collapsed above to preview.</Text> }],
    props: [{ name: 'groups', type: 'SidebarNavGroupData[]', defaultValue: '—', required: true, description: 'Navigation groups.' }, { name: 'collapsed', type: 'boolean', defaultValue: 'false', description: 'Icon-only collapsed mode.' }],
    slots: [{ name: 'root', description: 'Nav container.' }, { name: 'item', description: 'Nav link/button.' }],
    cssVars: [],
    a11y: [{ key: 'aria-current="page"', description: 'Applied to active item.' }],
  },
  {
    slug: 'context-menu',
    name: 'ContextMenu',
    category: 'Overlays',
    radix: '@radix-ui/react-context-menu',
    summary: 'Right-click contextual action menu powered by Radix ContextMenu.',
    description: 'Built on `@radix-ui/react-context-menu` with danger tones, shortcuts, and separators.',
    importCode: `import { ContextMenu } from '@kreattix/ui';`,
    playgroundControls: [],
    renderPlayground: () => (
      <ContextMenu items={[{ label: 'Copy Link', shortcut: 'Ctrl+C' }, { label: 'Delete', tone: 'danger', separatorBefore: true }]}>
        <Box surface="subtle" p={6} radius="md" style={{ border: '1px dashed var(--kx-border-strong)' }}>
          <Text size="sm">Right-click inside this box</Text>
        </Box>
      </ContextMenu>
    ),
    generatePlaygroundCode: () => `<ContextMenu items={[{ label: 'Copy Link' }, { label: 'Delete', tone: 'danger' }]}>\n  <div>Right-click target</div>\n</ContextMenu>`,
    examples: [{ title: 'Canvas Context Menu', description: 'Attach to cards, rows, or canvas areas.', code: `<ContextMenu items={[...]}><Card>...</Card></ContextMenu>`, render: () => <Text size="sm" tone="muted">Supports Shift+F10 keyboard trigger.</Text> }],
    props: [{ name: 'items', type: 'ContextMenuItemData[]', defaultValue: 'undefined', description: 'Menu items.' }],
    slots: [{ name: 'content', description: 'Floating menu.' }],
    cssVars: [],
    a11y: [{ key: 'Shift+F10', description: 'Opens context menu via keyboard.' }],
  },
  {
    slug: 'hover-card',
    name: 'HoverCard',
    category: 'Overlays',
    radix: '@radix-ui/react-hover-card',
    summary: 'Rich preview card revealed on hover or focus.',
    description: 'Built on `@radix-ui/react-hover-card` for user profiles, link previews, and metadata.',
    importCode: `import { HoverCard } from '@kreattix/ui';`,
    playgroundControls: [],
    renderPlayground: () => (
      <HoverCard
        trigger={<Button variant="link">@kreattix-ui</Button>}
        content={<Stack gap={1}><Text weight="semibold" size="sm">Kreattix UI</Text><Text size="xs" tone="muted">Zero-runtime React design system.</Text></Stack>}
      />
    ),
    generatePlaygroundCode: () => `<HoverCard trigger={<Button variant="link">@kreattix-ui</Button>} content={<div>Preview</div>} />`,
    examples: [{ title: '1-Liner Profile Card', description: 'No Portal boilerplate required.', code: `<HoverCard trigger={<a href="#">@prince</a>} content={<Text>Maintainer</Text>} />`, render: () => <Text size="sm" tone="muted">Hover over @kreattix-ui above.</Text> }],
    props: [{ name: 'trigger', type: 'ReactNode', defaultValue: 'undefined', description: 'Trigger element.' }, { name: 'content', type: 'ReactNode', defaultValue: 'undefined', description: 'Preview content.' }],
    slots: [{ name: 'content', description: 'Floating card.' }],
    cssVars: [],
    a11y: [{ key: 'Focus', description: 'Also opens when trigger receives keyboard focus.' }],
  },
  {
    slug: 'alert-dialog',
    name: 'AlertDialog',
    category: 'Overlays',
    radix: '@radix-ui/react-alert-dialog',
    summary: 'Destructive confirmation modal requiring explicit user action.',
    description: 'Built on `@radix-ui/react-alert-dialog`; prevents accidental dismissal on backdrop click.',
    importCode: `import { AlertDialog } from '@kreattix/ui';`,
    playgroundControls: [],
    renderPlayground: () => (
      <AlertDialog
        trigger={<Button tone="danger" variant="soft">Delete Workspace</Button>}
        title="Delete workspace?"
        description="This action permanently removes all projects and tokens."
        confirmText="Yes, delete"
      />
    ),
    generatePlaygroundCode: () => `<AlertDialog trigger={<Button tone="danger">Delete</Button>} title="Delete?" confirmText="Yes, delete" onConfirm={fn} />`,
    examples: [{ title: 'Controlled AlertDialog', description: 'Control open state with open and onOpenChange.', code: `<AlertDialog open={open} onOpenChange={setOpen} ... />`, render: () => <Text size="sm" tone="muted">Click Delete Workspace above to test.</Text> }],
    props: [{ name: 'title / description', type: 'ReactNode', defaultValue: 'undefined', description: 'Confirmation text.' }, { name: 'onConfirm', type: '() => void', defaultValue: 'undefined', description: 'Confirm callback.' }],
    slots: [{ name: 'overlay', description: 'Backdrop.' }, { name: 'content', description: 'Dialog panel.' }],
    cssVars: [],
    a11y: [{ key: 'role="alertdialog"', description: 'Traps focus and requires explicit Cancel or Confirm.' }],
  },
  {
    slug: 'sheet',
    name: 'Sheet',
    category: 'Overlays',
    radix: '@radix-ui/react-dialog',
    summary: 'Bottom or edge-anchored action sheet built on Radix Dialog.',
    description: 'Ergonomic sheet defaulting to `side="bottom"` for mobile-friendly action panels.',
    importCode: `import { Sheet } from '@kreattix/ui';`,
    playgroundControls: [],
    renderPlayground: () => (
      <Sheet trigger={<Button variant="outline">Open Bottom Sheet</Button>} title="Share Document">
        <Text size="sm" tone="muted">Anyone with the link can view this workspace.</Text>
      </Sheet>
    ),
    generatePlaygroundCode: () => `<Sheet trigger={<Button>Open Sheet</Button>} title="Share">\n  Content\n</Sheet>`,
    examples: [{ title: 'Side Sheet', description: 'Pass side="right" for desktop inspector sheets.', code: `<Sheet side="right" ... />`, render: () => <Text size="sm" tone="muted">Click Open Bottom Sheet above.</Text> }],
    props: [{ name: 'side', type: "'bottom' | 'right' | 'left' | 'top'", defaultValue: "'bottom'", description: 'Sheet anchor edge.' }],
    slots: [{ name: 'content', description: 'Sheet panel.' }],
    cssVars: [],
    a11y: [{ key: 'Escape', description: 'Dismisses sheet and restores focus.' }],
  },
];
