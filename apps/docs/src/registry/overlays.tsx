'use client';

import React from 'react';
import {
  Accordion,
  Alert,
  Button,
  Dialog,
  Drawer,
  DropdownMenu,
  HStack,
  Popover,
  Progress,
  Tabs,
  Text,
  Tooltip,
  toast,
} from '@kreattix-ui/react';
import type { ComponentDocEntry } from './types';

export const OVERLAYS_DOCS: ComponentDocEntry[] = [
  {
    slug: 'alert',
    name: 'Alert',
    category: 'Feedback & Navigation',
    summary: 'Contextual feedback banner with semantic tones, icons, actions, and dismiss.',
    description:
      'Alert communicates important status updates, warnings, or errors inline with automatic semantic icons.',
    importCode: `import { Alert } from '@kreattix/ui';`,
    playgroundControls: [
      { name: 'tone', label: 'Tone', type: 'select', options: ['info', 'success', 'warning', 'danger', 'neutral'], defaultValue: 'info' },
      { name: 'title', label: 'Title', type: 'text', defaultValue: 'Update available' },
      { name: 'dismissible', label: 'Dismissible', type: 'boolean', defaultValue: true },
    ],
    renderPlayground: (v) => (
      <div style={{ width: '100%', maxWidth: '28rem' }}>
        <Alert
          tone={v.tone as 'info'}
          title={String(v.title)}
          description="Kreattix UI v0.1.0 is ready to install."
          dismissible={Boolean(v.dismissible)}
        />
      </div>
    ),
    generatePlaygroundCode: (v) =>
      `<Alert\n  tone="${v.tone}"\n  title="${v.title}"\n  description="Kreattix UI v0.1.0 is ready to install."${v.dismissible ? '\n  dismissible' : ''}\n/>`,
    examples: [
      {
        title: 'With Action Button',
        description: 'Attach a contextual CTA inside the alert.',
        code: `<Alert tone="warning" title="Token expiring" action={<Button size="xs" variant="outline">Renew</Button>} />`,
        render: () => (
          <div style={{ width: '100%', maxWidth: '28rem' }}>
            <Alert
              tone="warning"
              title="Token expiring"
              description="Rotate your API key within 48 hours."
              action={<Button size="xs" variant="outline">Renew</Button>}
            />
          </div>
        ),
      },
    ],
    props: [
      { name: 'tone', type: "'info' | 'success' | 'warning' | 'danger' | 'neutral'", defaultValue: "'info'", description: 'Semantic tone.' },
      { name: 'title', type: 'ReactNode', defaultValue: 'undefined', description: 'Alert heading.' },
      { name: 'description', type: 'ReactNode', defaultValue: 'undefined', description: 'Body message.' },
      { name: 'dismissible', type: 'boolean', defaultValue: 'false', description: 'Renders close button.' },
    ],
    slots: [
      { name: 'root', description: 'Alert container.' },
      { name: 'icon', description: 'Leading icon.' },
      { name: 'title', description: 'Title text.' },
      { name: 'description', description: 'Description text.' },
    ],
    cssVars: [{ token: '--kx-info-50', defaultValue: '#f0f9ff', description: 'Info alert background.' }],
    a11y: [{ key: 'role="alert"', description: 'Announces urgent messages to assistive technologies.' }],
  },
  {
    slug: 'progress',
    name: 'Progress',
    category: 'Feedback & Navigation',
    radix: '@radix-ui/react-progress',
    summary: 'Accessible progress bar with size, semantic tones, and percentage label.',
    description: 'Built on @radix-ui/react-progress with smooth GPU-accelerated transform transitions.',
    importCode: `import { Progress } from '@kreattix/ui';`,
    playgroundControls: [
      { name: 'value', label: 'Value (%)', type: 'number', defaultValue: 68 },
      { name: 'tone', label: 'Tone', type: 'select', options: ['primary', 'success', 'warning', 'danger'], defaultValue: 'primary' },
      { name: 'size', label: 'Size', type: 'select', options: ['sm', 'md', 'lg'], defaultValue: 'md' },
      { name: 'showValue', label: 'Show %', type: 'boolean', defaultValue: true },
    ],
    renderPlayground: (v) => (
      <div style={{ width: '20rem' }}>
        <Progress
          value={Number(v.value)}
          tone={v.tone as 'primary'}
          size={v.size as 'md'}
          label="Uploading assets"
          showValue={Boolean(v.showValue)}
        />
      </div>
    ),
    generatePlaygroundCode: (v) =>
      `<Progress value={${v.value}} tone="${v.tone}" size="${v.size}" label="Uploading assets"${v.showValue ? ' showValue' : ''} />`,
    examples: [
      {
        title: 'Success Completion',
        description: 'Switch tone dynamically when tasks complete.',
        code: `<Progress value={100} tone="success" label="Build complete" showValue />`,
        render: () => (
          <div style={{ width: '20rem' }}>
            <Progress value={100} tone="success" label="Build complete" showValue />
          </div>
        ),
      },
    ],
    props: [
      { name: 'value', type: 'number', defaultValue: '0', description: 'Current progress value.' },
      { name: 'max', type: 'number', defaultValue: '100', description: 'Maximum value.' },
      { name: 'tone', type: "'primary' | 'success' | 'warning' | 'danger'", defaultValue: "'primary'", description: 'Bar color.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: 'Track thickness.' },
    ],
    slots: [
      { name: 'root', description: 'Progress track.' },
      { name: 'indicator', description: 'Filled bar.' },
    ],
    cssVars: [{ token: '--kx-primary-600', defaultValue: '#4f46e5', description: 'Indicator fill.' }],
    a11y: [{ key: 'role="progressbar"', description: 'Exposes aria-valuenow, aria-valuemin, aria-valuemax.' }],
  },
  {
    slug: 'tabs',
    name: 'Tabs',
    category: 'Feedback & Navigation',
    radix: '@radix-ui/react-tabs',
    summary: 'Tabbed navigation supporting line & pill variants with Dual Ergonomics.',
    description:
      'Built on @radix-ui/react-tabs. Pass an `items` array for rapid setup or compose `Tabs.List`, `Tabs.Trigger`, and `Tabs.Content` directly.',
    importCode: `import { Tabs } from '@kreattix/ui';`,
    playgroundControls: [
      { name: 'variant', label: 'Variant', type: 'select', options: ['line', 'pill'], defaultValue: 'line' },
    ],
    renderPlayground: (v) => (
      <div style={{ width: '100%', maxWidth: '28rem' }}>
        <Tabs
          variant={v.variant as 'line'}
          items={[
            { value: 'overview', label: 'Overview', content: <Text size="sm">Overview metrics and summary.</Text> },
            { value: 'analytics', label: 'Analytics', content: <Text size="sm">Real-time traffic & latency.</Text> },
            { value: 'settings', label: 'Settings', content: <Text size="sm">Configure webhooks & access.</Text> },
          ]}
        />
      </div>
    ),
    generatePlaygroundCode: (v) =>
      `<Tabs\n  variant="${v.variant}"\n  items={[\n    { value: 'overview', label: 'Overview', content: 'Overview metrics' },\n    { value: 'analytics', label: 'Analytics', content: 'Real-time traffic' },\n  ]}\n/>`,
    examples: [
      {
        title: 'Compound Composition',
        description: 'Use Tabs.List, Tabs.Trigger, and Tabs.Content for custom layouts.',
        code: `<Tabs defaultValue="a">\n  <Tabs.List variant="pill">\n    <Tabs.Trigger value="a">Code</Tabs.Trigger>\n    <Tabs.Trigger value="b">Preview</Tabs.Trigger>\n  </Tabs.List>\n  <Tabs.Content value="a">TSX Source</Tabs.Content>\n  <Tabs.Content value="b">Live UI</Tabs.Content>\n</Tabs>`,
        render: () => (
          <Tabs defaultValue="a">
            <Tabs.List variant="pill">
              <Tabs.Trigger value="a">Code</Tabs.Trigger>
              <Tabs.Trigger value="b">Preview</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="a">TSX Source</Tabs.Content>
            <Tabs.Content value="b">Live UI</Tabs.Content>
          </Tabs>
        ),
      },
    ],
    props: [
      { name: 'variant', type: "'line' | 'pill'", defaultValue: "'line'", description: 'Tab list indicator style.' },
      { name: 'items', type: 'TabItem[]', defaultValue: 'undefined', description: '1-liner tab definitions.' },
      { name: 'value / defaultValue', type: 'string', defaultValue: 'first item', description: 'Active tab value.' },
    ],
    slots: [
      { name: 'root', description: 'Tabs root.' },
      { name: 'list', description: 'Tablist bar.' },
      { name: 'trigger', description: 'Tab button.' },
      { name: 'content', description: 'Tab panel.' },
    ],
    cssVars: [{ token: '--kx-primary-600', defaultValue: '#4f46e5', description: 'Active line accent.' }],
    a11y: [{ key: 'ArrowLeft / ArrowRight', description: 'Cycles focus between tab triggers.' }],
  },
  {
    slug: 'accordion',
    name: 'Accordion',
    category: 'Feedback & Navigation',
    radix: '@radix-ui/react-accordion',
    summary: 'Collapsible disclosure panels with single/multiple modes and Dual Ergonomics.',
    description:
      'Built on @radix-ui/react-accordion with animated chevron indicator, `bordered` or `ghost` variants, and 1-liner `items` or compound composition.',
    importCode: `import { Accordion } from '@kreattix/ui';`,
    playgroundControls: [
      { name: 'variant', label: 'Variant', type: 'select', options: ['bordered', 'ghost'], defaultValue: 'bordered' },
    ],
    renderPlayground: (v) => (
      <div style={{ width: '100%', maxWidth: '28rem' }}>
        <Accordion
          type="single"
          collapsible
          variant={v.variant as 'bordered'}
          items={[
            { value: '1', title: 'Why zero-runtime CSS?', content: 'Zero JS style injection overhead and instant CSS variable theme switching.' },
            { value: '2', title: 'Does it work with Next.js RSC?', content: 'Yes! Tokens are pure JS/TS and interactive components emit "use client".' },
          ]}
        />
      </div>
    ),
    generatePlaygroundCode: (v) =>
      `<Accordion\n  type="single"\n  collapsible\n  variant="${v.variant}"\n  items={[\n    { value: '1', title: 'Why zero-runtime CSS?', content: '...' },\n    { value: '2', title: 'Does it work with Next.js RSC?', content: '...' },\n  ]}\n/>`,
    examples: [
      {
        title: 'Multiple Open Panels',
        description: 'Use type="multiple" to allow several sections open simultaneously.',
        code: `<Accordion type="multiple" items={[...]} />`,
        render: () => (
          <div style={{ width: '100%', maxWidth: '28rem' }}>
            <Accordion
              type="multiple"
              items={[
                { value: 'a', title: 'Section A', content: 'Open independently.' },
                { value: 'b', title: 'Section B', content: 'Also open independently.' },
              ]}
            />
          </div>
        ),
      },
    ],
    props: [
      { name: 'type', type: "'single' | 'multiple'", defaultValue: '—', required: true, description: 'Allow one or multiple items open.' },
      { name: 'variant', type: "'bordered' | 'ghost'", defaultValue: "'bordered'", description: 'Visual container style.' },
      { name: 'items', type: 'AccordionItemData[]', defaultValue: 'undefined', description: '1-liner items array.' },
    ],
    slots: [
      { name: 'root', description: 'Accordion root.' },
      { name: 'item', description: 'Item container.' },
      { name: 'trigger', description: 'Header button.' },
      { name: 'content', description: 'Collapsible body.' },
    ],
    cssVars: [{ token: '--kx-border-default', defaultValue: '#e4e4e7', description: 'Item divider border.' }],
    a11y: [{ key: 'Enter / Space / ArrowDown', description: 'Expands/collapses and navigates headers.' }],
  },
  {
    slug: 'tooltip',
    name: 'Tooltip',
    category: 'Overlays',
    radix: '@radix-ui/react-tooltip',
    summary: 'Accessible hover/focus tooltip with arrow and configurable placement.',
    description:
      'Built on @radix-ui/react-tooltip. Wrap any trigger element with `<Tooltip content="...">` in one line.',
    importCode: `import { Tooltip } from '@kreattix/ui';`,
    playgroundControls: [
      { name: 'content', label: 'Content', type: 'text', defaultValue: 'Copy to clipboard (Ctrl+C)' },
      { name: 'side', label: 'Side', type: 'select', options: ['top', 'right', 'bottom', 'left'], defaultValue: 'top' },
    ],
    renderPlayground: (v) => (
      <Tooltip content={String(v.content)} side={v.side as 'top'}>
        <Button variant="outline">Hover or focus me</Button>
      </Tooltip>
    ),
    generatePlaygroundCode: (v) =>
      `<Tooltip content="${v.content}" side="${v.side}">\n  <Button variant="outline">Hover or focus me</Button>\n</Tooltip>`,
    examples: [
      {
        title: 'Quick Placement',
        description: 'Position tooltips on any side of the trigger.',
        code: `<Tooltip content="Bottom tip" side="bottom"><Button size="sm">Bottom</Button></Tooltip>`,
        render: () => (
          <Tooltip content="Bottom tip" side="bottom">
            <Button size="sm">Bottom</Button>
          </Tooltip>
        ),
      },
    ],
    props: [
      { name: 'content', type: 'ReactNode', defaultValue: '—', required: true, description: 'Tooltip text or node.' },
      { name: 'side', type: "'top' | 'right' | 'bottom' | 'left'", defaultValue: "'top'", description: 'Preferred placement.' },
      { name: 'delayDuration', type: 'number', defaultValue: '200', description: 'Open delay in ms.' },
    ],
    slots: [{ name: 'content', description: 'Floating tooltip bubble.' }],
    cssVars: [{ token: '--kx-z-tooltip', defaultValue: '1600', description: 'Tooltip z-index.' }],
    a11y: [{ key: 'Escape', description: 'Closes visible tooltip immediately.' }],
  },
  {
    slug: 'popover',
    name: 'Popover',
    category: 'Overlays',
    radix: '@radix-ui/react-popover',
    summary: 'Non-modal floating panel with focus management and Dual Ergonomics.',
    description:
      'Built on @radix-ui/react-popover for rich interactive overlays such as filter panels and mini forms.',
    importCode: `import { Popover } from '@kreattix/ui';`,
    playgroundControls: [
      { name: 'side', label: 'Side', type: 'select', options: ['bottom', 'top', 'left', 'right'], defaultValue: 'bottom' },
    ],
    renderPlayground: (v) => (
      <Popover
        side={v.side as 'bottom'}
        trigger={<Button variant="outline">Open Popover</Button>}
        content={
          <div>
            <Text weight="semibold" size="sm">Filter Status</Text>
            <Text size="xs" tone="muted" style={{ marginTop: '0.25rem' }}>
              Select active environments to display.
            </Text>
          </div>
        }
      />
    ),
    generatePlaygroundCode: (v) =>
      `<Popover\n  side="${v.side}"\n  trigger={<Button variant="outline">Open Popover</Button>}\n  content={<div>Filter Status</div>}\n/>`,
    examples: [
      {
        title: '1-Liner Trigger + Content',
        description: 'No boilerplate Root/Trigger/Portal wiring required for common popovers.',
        code: `<Popover trigger={<Button>Info</Button>} content={<Text size="sm">Details here</Text>} />`,
        render: () => <Popover trigger={<Button size="sm">Info</Button>} content={<Text size="sm">Details here</Text>} />,
      },
    ],
    props: [
      { name: 'trigger', type: 'ReactNode', defaultValue: 'undefined', description: 'Trigger element.' },
      { name: 'content', type: 'ReactNode', defaultValue: 'undefined', description: 'Popover body.' },
      { name: 'side / align', type: 'string', defaultValue: "'bottom' / 'center'", description: 'Floating position.' },
    ],
    slots: [{ name: 'content', description: 'Popover surface.' }],
    cssVars: [{ token: '--kx-z-popover', defaultValue: '1400', description: 'Popover z-index.' }],
    a11y: [{ key: 'Escape', description: 'Closes popover and returns focus to trigger.' }],
  },
  {
    slug: 'dropdown-menu',
    name: 'DropdownMenu',
    category: 'Overlays',
    radix: '@radix-ui/react-dropdown-menu',
    summary: 'Keyboard-navigable action menu with shortcuts, separators, and danger tones.',
    description:
      'Built on @radix-ui/react-dropdown-menu. Supports both a clean `items` array prop and full Radix compound subcomponents.',
    importCode: `import { DropdownMenu } from '@kreattix/ui';`,
    playgroundControls: [
      { name: 'align', label: 'Align', type: 'select', options: ['start', 'center', 'end'], defaultValue: 'end' },
    ],
    renderPlayground: (v) => (
      <DropdownMenu
        align={v.align as 'end'}
        trigger={<Button variant="outline">Actions</Button>}
        items={[
          { label: 'Duplicate', shortcut: 'Ctrl+D' },
          { label: 'Archive', shortcut: 'Ctrl+E' },
          { label: 'Delete', tone: 'danger', separatorBefore: true },
        ]}
      />
    ),
    generatePlaygroundCode: (v) =>
      `<DropdownMenu\n  align="${v.align}"\n  trigger={<Button variant="outline">Actions</Button>}\n  items={[\n    { label: 'Duplicate', shortcut: 'Ctrl+D' },\n    { label: 'Delete', tone: 'danger', separatorBefore: true },\n  ]}\n/>`,
    examples: [
      {
        title: 'Compound Subcomponents',
        description: 'Compose DropdownMenu.Item and DropdownMenu.Separator manually.',
        code: `<DropdownMenu.Root>\n  <DropdownMenu.Trigger asChild><Button>Menu</Button></DropdownMenu.Trigger>\n  <DropdownMenu.Content>\n    <DropdownMenu.Item>Profile</DropdownMenu.Item>\n  </DropdownMenu.Content>\n</DropdownMenu.Root>`,
        render: () => (
          <DropdownMenu
            trigger={<Button size="sm" variant="soft">Account Menu</Button>}
            items={[{ label: 'Profile' }, { label: 'Billing' }]}
          />
        ),
      },
    ],
    props: [
      { name: 'trigger', type: 'ReactNode', defaultValue: 'undefined', description: 'Trigger element.' },
      { name: 'items', type: 'DropdownMenuItemData[]', defaultValue: 'undefined', description: '1-liner menu items.' },
      { name: 'align', type: "'start' | 'center' | 'end'", defaultValue: "'end'", description: 'Menu alignment.' },
    ],
    slots: [
      { name: 'content', description: 'Menu container.' },
      { name: 'item', description: 'Menu item row.' },
    ],
    cssVars: [{ token: '--kx-z-dropdown', defaultValue: '1000', description: 'Menu z-index.' }],
    a11y: [{ key: 'ArrowUp / ArrowDown / Enter', description: 'Navigates and activates menu items.' }],
  },
  {
    slug: 'dialog',
    name: 'Dialog',
    category: 'Overlays',
    radix: '@radix-ui/react-dialog',
    summary: 'Modal dialog with focus trapping, backdrop blur, sizes, and Dual Ergonomics.',
    description:
      'Built on @radix-ui/react-dialog. Open modals in one line with `trigger`, `title`, `description`, and `footer`, or drop down to `Dialog.Root/Content`.',
    importCode: `import { Dialog } from '@kreattix/ui';`,
    playgroundControls: [
      { name: 'size', label: 'Size', type: 'select', options: ['sm', 'md', 'lg', 'xl'], defaultValue: 'md' },
      { name: 'title', label: 'Title', type: 'text', defaultValue: 'Confirm Deployment' },
    ],
    renderPlayground: (v) => (
      <Dialog
        size={v.size as 'md'}
        trigger={<Button>Open Dialog</Button>}
        title={String(v.title)}
        description="This will publish Kreattix UI v0.1.0 to production."
        footer={
          <HStack gap={2}>
            <Dialog.Close asChild><Button variant="outline">Cancel</Button></Dialog.Close>
            <Dialog.Close asChild><Button>Deploy</Button></Dialog.Close>
          </HStack>
        }
      >
        <Text size="sm" tone="secondary">All 13 automated tests and tsup builds passed.</Text>
      </Dialog>
    ),
    generatePlaygroundCode: (v) =>
      `<Dialog\n  size="${v.size}"\n  trigger={<Button>Open Dialog</Button>}\n  title="${v.title}"\n  description="This will publish Kreattix UI v0.1.0."\n>\n  <Text size="sm">Ready to deploy.</Text>\n</Dialog>`,
    examples: [
      {
        title: '1-Liner Modal with Footer',
        description: 'Use Dialog.Close asChild on footer buttons to dismiss cleanly.',
        code: `<Dialog trigger={<Button>Delete</Button>} title="Delete Project?" footer={<Dialog.Close asChild><Button tone="danger">Confirm</Button></Dialog.Close>} />`,
        render: () => (
          <Dialog
            trigger={<Button variant="soft" tone="danger" size="sm">Delete Project</Button>}
            title="Delete Project?"
            description="This action cannot be undone."
            footer={<Dialog.Close asChild><Button tone="danger">Confirm Delete</Button></Dialog.Close>}
          >
            <Text size="sm">All project tokens and logs will be removed.</Text>
          </Dialog>
        ),
      },
    ],
    props: [
      { name: 'trigger', type: 'ReactNode', defaultValue: 'undefined', description: 'Trigger element.' },
      { name: 'title / description', type: 'ReactNode', defaultValue: 'undefined', description: 'Accessible dialog title & description.' },
      { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", defaultValue: "'md'", description: 'Max width.' },
      { name: 'footer', type: 'ReactNode', defaultValue: 'undefined', description: 'Right-aligned action row.' },
    ],
    slots: [
      { name: 'overlay', description: 'Backdrop.' },
      { name: 'content', description: 'Modal panel.' },
      { name: 'title', description: 'Heading.' },
      { name: 'description', description: 'Subtitle.' },
    ],
    cssVars: [{ token: '--kx-z-modal', defaultValue: '1300', description: 'Modal z-index.' }],
    a11y: [
      { key: 'Escape', description: 'Closes modal and restores focus.' },
      { key: 'Tab', description: 'Focus is trapped inside the open dialog.' },
    ],
  },
  {
    slug: 'drawer',
    name: 'Drawer',
    category: 'Overlays',
    radix: '@radix-ui/react-dialog',
    summary: 'Slide-over panel anchored to left, right, top, or bottom.',
    description:
      'Drawer reuses Radix Dialog accessibility (focus trap, scroll lock, Escape dismiss) in a smooth edge-anchored sheet.',
    importCode: `import { Drawer } from '@kreattix/ui';`,
    playgroundControls: [
      { name: 'side', label: 'Side', type: 'select', options: ['right', 'left', 'top', 'bottom'], defaultValue: 'right' },
    ],
    renderPlayground: (v) => (
      <Drawer
        side={v.side as 'right'}
        trigger={<Button variant="outline">Open Drawer</Button>}
        title="Workspace Settings"
        description="Adjust theme density and tokens."
      >
        <Text size="sm" tone="secondary">Slide-over content from the {String(v.side)} edge.</Text>
      </Drawer>
    ),
    generatePlaygroundCode: (v) =>
      `<Drawer\n  side="${v.side}"\n  trigger={<Button variant="outline">Open Drawer</Button>}\n  title="Workspace Settings"\n>\n  Drawer content\n</Drawer>`,
    examples: [
      {
        title: 'Left Navigation Drawer',
        description: 'Ideal for mobile navigation menus.',
        code: `<Drawer side="left" trigger={<Button>Menu</Button>} title="Navigation">...</Drawer>`,
        render: () => (
          <Drawer side="left" trigger={<Button size="sm" variant="soft">Left Drawer</Button>} title="Navigation">
            <Text size="sm">Mobile navigation links</Text>
          </Drawer>
        ),
      },
    ],
    props: [
      { name: 'side', type: "'left' | 'right' | 'top' | 'bottom'", defaultValue: "'right'", description: 'Anchor edge.' },
      { name: 'trigger / title / description / footer', type: 'ReactNode', defaultValue: 'undefined', description: '1-liner drawer configuration.' },
    ],
    slots: [
      { name: 'overlay', description: 'Backdrop.' },
      { name: 'content', description: 'Slide-over sheet.' },
    ],
    cssVars: [{ token: '--kx-z-modal', defaultValue: '1300', description: 'Drawer z-index.' }],
    a11y: [{ key: 'Escape', description: 'Dismisses drawer and restores focus.' }],
  },
  {
    slug: 'toast',
    name: 'Toast',
    category: 'Overlays',
    radix: '@radix-ui/react-toast',
    summary: 'Non-blocking notification queue with imperative toast() and useToast() hook.',
    description:
      'Built on @radix-ui/react-toast. Wrap your app in `<ToastProvider>` and trigger notifications from anywhere with `toast({ title, tone })`.',
    importCode: `import { ToastProvider, toast, useToast } from '@kreattix/ui';`,
    playgroundControls: [
      { name: 'tone', label: 'Tone', type: 'select', options: ['neutral', 'info', 'success', 'warning', 'danger'], defaultValue: 'success' },
      { name: 'title', label: 'Title', type: 'text', defaultValue: 'Changes saved!' },
    ],
    renderPlayground: (v) => (
      <Button
        onClick={() =>
          toast({
            title: String(v.title),
            description: 'Your theme configuration was updated.',
            tone: v.tone as 'success',
          })
        }
      >
        Show Toast
      </Button>
    ),
    generatePlaygroundCode: (v) =>
      `toast({\n  title: "${v.title}",\n  description: "Your theme configuration was updated.",\n  tone: "${v.tone}",\n});`,
    examples: [
      {
        title: 'Semantic Toast Tones',
        description: 'Trigger info, success, warning, or danger notifications imperatively.',
        code: `toast({ title: 'Build failed', tone: 'danger' });`,
        render: () => (
          <HStack gap={2}>
            <Button size="sm" variant="soft" tone="success" onClick={() => toast({ title: 'Deployed!', tone: 'success' })}>
              Success
            </Button>
            <Button size="sm" variant="soft" tone="danger" onClick={() => toast({ title: 'Error occurred', tone: 'danger' })}>
              Danger
            </Button>
          </HStack>
        ),
      },
    ],
    props: [
      { name: 'title', type: 'ReactNode', defaultValue: '—', required: true, description: 'Toast heading.' },
      { name: 'description', type: 'ReactNode', defaultValue: 'undefined', description: 'Optional body.' },
      { name: 'tone', type: "'neutral' | 'info' | 'success' | 'warning' | 'danger'", defaultValue: "'neutral'", description: 'Accent border tone.' },
      { name: 'duration', type: 'number', defaultValue: '4000', description: 'Auto-dismiss ms.' },
    ],
    slots: [{ name: 'root', description: 'Toast card.' }],
    cssVars: [{ token: '--kx-z-toast', defaultValue: '1500', description: 'Toast viewport z-index.' }],
    a11y: [{ key: 'F8', description: 'Radix Toast region shortcut to focus notifications.' }],
  },
];
