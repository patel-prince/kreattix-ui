'use client';

import React from 'react';
import { ArrowRight, Bell, Check, Download, Heart, Plus, Settings, Star, Trash2 } from 'lucide-react';
import {
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Heading,
  HStack,
  Icon,
  IconButton,
  Skeleton,
  Stack,
  Text,
} from '@kreattix/ui';
import type { ComponentDocEntry } from './types';

export const LAYOUT_DISPLAY_DOCS: ComponentDocEntry[] = [
  {
    slug: 'box',
    name: 'Box',
    category: 'Layout',
    radix: '@radix-ui/react-slot',
    summary: 'Polymorphic layout primitive with surface, padding, and radius token shortcuts.',
    description:
      'Box is the foundational layout primitive in Kreattix UI. It provides direct access to surface, padding, and radius tokens and supports `asChild` polymorphism via Radix Slot.',
    importCode: `import { Box } from '@kreattix/ui';`,
    playgroundControls: [
      {
        name: 'surface',
        label: 'Surface',
        type: 'select',
        options: ['canvas', 'surface', 'elevated', 'subtle', 'muted'],
        defaultValue: 'subtle',
      },
      {
        name: 'radius',
        label: 'Radius',
        type: 'select',
        options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
        defaultValue: 'md',
      },
      { name: 'p', label: 'Padding (token)', type: 'number', defaultValue: 5 },
    ],
    renderPlayground: (v) => (
      <Box
        surface={v.surface as 'subtle'}
        radius={v.radius as 'md'}
        p={Number(v.p)}
        style={{ border: '1px solid var(--kx-border-default)' }}
      >
        <Text weight="medium">Box with surface=&ldquo;{String(v.surface)}&rdquo;</Text>
      </Box>
    ),
    generatePlaygroundCode: (v) =>
      `<Box surface="${v.surface}" radius="${v.radius}" p={${v.p}}>\n  Content inside Box\n</Box>`,
    examples: [
      {
        title: 'Polymorphic asChild',
        description: 'Render Box as a semantic <section> or <article> without extra DOM nodes.',
        code: `<Box asChild surface="subtle" radius="lg" p={4}>\n  <section aria-label="Feature panel">\n    <Text>Rendered directly as a semantic section</Text>\n  </section>\n</Box>`,
        render: () => (
          <Box asChild surface="subtle" radius="lg" p={4}>
            <section aria-label="Feature panel">
              <Text>Rendered directly as a semantic section</Text>
            </section>
          </Box>
        ),
      },
    ],
    props: [
      { name: 'asChild', type: 'boolean', defaultValue: 'false', description: 'Merge props onto immediate child via Radix Slot.' },
      { name: 'p', type: 'string | number', defaultValue: 'undefined', description: 'Padding CSS value or spacing token (1–16).' },
      { name: 'surface', type: "'canvas' | 'surface' | 'elevated' | 'subtle' | 'muted'", defaultValue: 'undefined', description: 'Applies semantic background surface token.' },
      { name: 'radius', type: "'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'", defaultValue: 'undefined', description: 'Applies border radius token.' },
      { name: 'unstyled', type: 'boolean', defaultValue: 'false', description: 'Strip Kreattix classes.' },
    ],
    slots: [{ name: 'root', description: 'Root container element.' }],
    cssVars: [
      { token: '--kx-bg-subtle', defaultValue: '#f4f4f5', description: 'Subtle surface background.' },
      { token: '--kx-radius-md', defaultValue: '8px', description: 'Medium border radius.' },
    ],
    a11y: [{ key: 'asChild', description: 'Use semantic HTML elements (<section>, <main>, <nav>) via asChild.' }],
  },
  {
    slug: 'stack',
    name: 'Stack',
    category: 'Layout',
    radix: '@radix-ui/react-slot',
    summary: 'Flexbox layout primitive with HStack and VStack shorthands.',
    description:
      'Stack arranges children along a vertical or horizontal axis with token-based spacing. Includes HStack (row, centered) and VStack (column) convenience exports.',
    importCode: `import { Stack, HStack, VStack } from '@kreattix/ui';`,
    playgroundControls: [
      { name: 'direction', label: 'Direction', type: 'select', options: ['row', 'column'], defaultValue: 'row' },
      { name: 'gap', label: 'Gap (token)', type: 'number', defaultValue: 3 },
      { name: 'align', label: 'Align', type: 'select', options: ['stretch', 'center', 'flex-start', 'flex-end'], defaultValue: 'center' },
    ],
    renderPlayground: (v) => (
      <Stack direction={v.direction as 'row'} gap={Number(v.gap)} align={v.align as 'center'}>
        <Badge>One</Badge>
        <Badge tone="success">Two</Badge>
        <Badge tone="info">Three</Badge>
      </Stack>
    ),
    generatePlaygroundCode: (v) =>
      `<Stack direction="${v.direction}" gap={${v.gap}} align="${v.align}">\n  <Badge>One</Badge>\n  <Badge tone="success">Two</Badge>\n  <Badge tone="info">Three</Badge>\n</Stack>`,
    examples: [
      {
        title: 'HStack & VStack Shorthands',
        description: 'Use HStack for horizontal toolbars and VStack for vertical form groups.',
        code: `<HStack gap={3}>\n  <Button variant="outline">Cancel</Button>\n  <Button>Save Changes</Button>\n</HStack>`,
        render: () => (
          <HStack gap={3}>
            <Button variant="outline">Cancel</Button>
            <Button>Save Changes</Button>
          </HStack>
        ),
      },
    ],
    props: [
      { name: 'direction', type: "'row' | 'column' | 'row-reverse' | 'column-reverse'", defaultValue: "'column'", description: 'Flex direction.' },
      { name: 'gap', type: 'string | number', defaultValue: '3', description: 'Spacing token or CSS gap.' },
      { name: 'align', type: 'CSSProperties["alignItems"]', defaultValue: 'undefined', description: 'Cross-axis alignment.' },
      { name: 'justify', type: 'CSSProperties["justifyContent"]', defaultValue: 'undefined', description: 'Main-axis justification.' },
    ],
    slots: [{ name: 'root', description: 'Flex container.' }],
    cssVars: [{ token: '--kx-space-3', defaultValue: '0.75rem', description: 'Default gap spacing.' }],
    a11y: [{ key: 'DOM order', description: 'Keep visual order aligned with DOM order for keyboard navigation.' }],
  },
  {
    slug: 'grid',
    name: 'Grid',
    category: 'Layout',
    radix: '@radix-ui/react-slot',
    summary: 'CSS Grid layout with fixed columns or responsive auto-fit.',
    description:
      'Grid simplifies CSS Grid layouts with numeric column counts or automatic responsive wrapping via `minChildWidth`.',
    importCode: `import { Grid } from '@kreattix/ui';`,
    playgroundControls: [
      { name: 'columns', label: 'Columns', type: 'number', defaultValue: 3 },
      { name: 'gap', label: 'Gap (token)', type: 'number', defaultValue: 4 },
    ],
    renderPlayground: (v) => (
      <Grid columns={Number(v.columns)} gap={Number(v.gap)} style={{ width: '100%' }}>
        {[1, 2, 3].map((i) => (
          <Box key={i} p={4} surface="subtle" radius="md">
            <Text size="sm" weight="medium">Cell {i}</Text>
          </Box>
        ))}
      </Grid>
    ),
    generatePlaygroundCode: (v) =>
      `<Grid columns={${v.columns}} gap={${v.gap}}>\n  <Box p={4}>Cell 1</Box>\n  <Box p={4}>Cell 2</Box>\n  <Box p={4}>Cell 3</Box>\n</Grid>`,
    examples: [
      {
        title: 'Responsive Auto-Fit',
        description: 'Pass minChildWidth to automatically wrap cards without media queries.',
        code: `<Grid minChildWidth="160px" gap={4}>\n  <Card><Card.Body>Card A</Card.Body></Card>\n  <Card><Card.Body>Card B</Card.Body></Card>\n</Grid>`,
        render: () => (
          <Grid minChildWidth="160px" gap={4} style={{ width: '100%' }}>
            <Card><Card.Body>Card A</Card.Body></Card>
            <Card><Card.Body>Card B</Card.Body></Card>
          </Grid>
        ),
      },
    ],
    props: [
      { name: 'columns', type: 'number | string', defaultValue: '1', description: 'Column count or template string.' },
      { name: 'minChildWidth', type: 'string', defaultValue: 'undefined', description: 'Enables responsive auto-fit columns.' },
      { name: 'gap', type: 'string | number', defaultValue: '4', description: 'Grid gap.' },
    ],
    slots: [{ name: 'root', description: 'CSS grid container.' }],
    cssVars: [{ token: '--kx-space-4', defaultValue: '1rem', description: 'Default grid gap.' }],
    a11y: [{ key: 'Grid flow', description: 'Avoid reordering items visually with CSS order.' }],
  },
  {
    slug: 'divider',
    name: 'Divider',
    category: 'Layout',
    radix: '@radix-ui/react-separator',
    summary: 'Accessible horizontal or vertical separator with optional centered label.',
    description:
      'Built on @radix-ui/react-separator, Divider visually and semantically separates content sections and supports inline labels.',
    importCode: `import { Divider } from '@kreattix/ui';`,
    playgroundControls: [
      { name: 'orientation', label: 'Orientation', type: 'select', options: ['horizontal', 'vertical'], defaultValue: 'horizontal' },
      { name: 'label', label: 'Label', type: 'text', defaultValue: 'OR' },
    ],
    renderPlayground: (v) =>
      v.orientation === 'vertical' ? (
        <HStack gap={4} style={{ height: '2rem' }}>
          <Text size="sm">Left</Text>
          <Divider orientation="vertical" />
          <Text size="sm">Right</Text>
        </HStack>
      ) : (
        <div style={{ width: '100%' }}>
          <Divider label={String(v.label) || undefined} />
        </div>
      ),
    generatePlaygroundCode: (v) =>
      v.orientation === 'vertical'
        ? `<Divider orientation="vertical" />`
        : `<Divider${v.label ? ` label="${v.label}"` : ''} />`,
    examples: [
      {
        title: 'Divider with Label',
        description: 'Ideal for separating OAuth and email login sections.',
        code: `<Divider label="Continue with email" />`,
        render: () => (
          <div style={{ width: '100%' }}>
            <Divider label="Continue with email" />
          </div>
        ),
      },
    ],
    props: [
      { name: 'orientation', type: "'horizontal' | 'vertical'", defaultValue: "'horizontal'", description: 'Separator direction.' },
      { name: 'label', type: 'ReactNode', defaultValue: 'undefined', description: 'Optional centered label (horizontal only).' },
      { name: 'decorative', type: 'boolean', defaultValue: 'true', description: 'When false, exposes role="separator" to screen readers.' },
    ],
    slots: [
      { name: 'root', description: 'Outer separator element.' },
      { name: 'label', description: 'Optional label span.' },
    ],
    cssVars: [{ token: '--kx-border-default', defaultValue: '#e4e4e7', description: 'Line color.' }],
    a11y: [{ key: 'role="separator"', description: 'Automatically applied when decorative={false}.' }],
  },
  {
    slug: 'text',
    name: 'Text',
    category: 'Display',
    radix: '@radix-ui/react-slot',
    summary: 'Semantic typography component with size, tone, weight, and truncation.',
    description:
      'Text standardizes body copy, captions, and inline labels across your app with optical sizing and semantic tones.',
    importCode: `import { Text } from '@kreattix/ui';`,
    playgroundControls: [
      { name: 'size', label: 'Size', type: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'], defaultValue: 'md' },
      { name: 'tone', label: 'Tone', type: 'select', options: ['primary', 'secondary', 'muted', 'brand', 'success', 'warning', 'danger'], defaultValue: 'primary' },
      { name: 'weight', label: 'Weight', type: 'select', options: ['normal', 'medium', 'semibold', 'bold'], defaultValue: 'normal' },
    ],
    renderPlayground: (v) => (
      <Text size={v.size as 'md'} tone={v.tone as 'primary'} weight={v.weight as 'normal'}>
        Adaptive Clarity — Precision typography for modern web apps.
      </Text>
    ),
    generatePlaygroundCode: (v) =>
      `<Text size="${v.size}" tone="${v.tone}" weight="${v.weight}">\n  Adaptive Clarity — Precision typography for modern web apps.\n</Text>`,
    examples: [
      {
        title: 'Semantic Tones & Truncation',
        description: 'Truncate long single-line strings cleanly.',
        code: `<Text truncate style={{ maxWidth: 240 }} tone="muted">\n  Very long notification text that truncates with an ellipsis automatically.\n</Text>`,
        render: () => (
          <Text truncate style={{ maxWidth: 240 }} tone="muted">
            Very long notification text that truncates with an ellipsis automatically.
          </Text>
        ),
      },
    ],
    props: [
      { name: 'as', type: "'p' | 'span' | 'div' | 'label' | 'strong' | 'em'", defaultValue: "'p'", description: 'Underlying HTML tag.' },
      { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", defaultValue: "'md'", description: 'Font size token.' },
      { name: 'tone', type: "'primary' | 'secondary' | 'muted' | 'brand' | 'success' | 'warning' | 'danger'", defaultValue: "'primary'", description: 'Semantic text color.' },
      { name: 'truncate', type: 'boolean', defaultValue: 'false', description: 'Single-line ellipsis truncation.' },
    ],
    slots: [{ name: 'root', description: 'Text element.' }],
    cssVars: [{ token: '--kx-text-primary', defaultValue: '#09090b', description: 'Primary text ink.' }],
    a11y: [{ key: 'Contrast', description: 'All tones meet WCAG 2.1 AA contrast ratios in light and dark modes.' }],
  },
  {
    slug: 'heading',
    name: 'Heading',
    category: 'Display',
    radix: '@radix-ui/react-slot',
    summary: 'Semantic h1–h6 heading with decoupled visual size.',
    description:
      'Heading lets you preserve strict document outline hierarchy (`level={2}`) while choosing any visual scale (`size="3xl"`).',
    importCode: `import { Heading } from '@kreattix/ui';`,
    playgroundControls: [
      { name: 'level', label: 'HTML Level', type: 'select', options: ['1', '2', '3', '4', '5', '6'], defaultValue: '2' },
      { name: 'size', label: 'Visual Size', type: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'], defaultValue: 'xl' },
    ],
    renderPlayground: (v) => (
      <Heading level={Number(v.level) as 2} size={v.size as 'xl'}>
        Build faster with Kreattix UI
      </Heading>
    ),
    generatePlaygroundCode: (v) =>
      `<Heading level={${v.level}} size="${v.size}">\n  Build faster with Kreattix UI\n</Heading>`,
    examples: [
      {
        title: 'Decoupled Semantic Level & Visual Size',
        description: 'Render an h2 visually styled like a hero display title.',
        code: `<Heading level={2} size="3xl">Enterprise Ready</Heading>`,
        render: () => <Heading level={2} size="3xl">Enterprise Ready</Heading>,
      },
    ],
    props: [
      { name: 'level', type: '1 | 2 | 3 | 4 | 5 | 6', defaultValue: '2', description: 'Renders h1–h6 element.' },
      { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'", defaultValue: 'mapped', description: 'Visual scale independent of heading level.' },
    ],
    slots: [{ name: 'root', description: 'Heading element.' }],
    cssVars: [{ token: '--kx-font-sans', defaultValue: 'Inter, sans-serif', description: 'Heading font family.' }],
    a11y: [{ key: 'h1–h6', description: 'Never skip heading levels; use `size` to adjust visual hierarchy.' }],
  },
  {
    slug: 'badge',
    name: 'Badge',
    category: 'Display',
    summary: 'Compact status indicator with soft, solid, outline, and dot variants.',
    description:
      'Badge highlights counts, statuses, and metadata across cards, tables, and navigation.',
    importCode: `import { Badge } from '@kreattix/ui';`,
    playgroundControls: [
      { name: 'variant', label: 'Variant', type: 'select', options: ['soft', 'solid', 'outline', 'dot'], defaultValue: 'soft' },
      { name: 'tone', label: 'Tone', type: 'select', options: ['primary', 'neutral', 'success', 'warning', 'danger', 'info'], defaultValue: 'primary' },
      { name: 'size', label: 'Size', type: 'select', options: ['sm', 'md', 'lg'], defaultValue: 'md' },
    ],
    renderPlayground: (v) => (
      <Badge variant={v.variant as 'soft'} tone={v.tone as 'primary'} size={v.size as 'md'}>
        Production
      </Badge>
    ),
    generatePlaygroundCode: (v) =>
      `<Badge variant="${v.variant}" tone="${v.tone}" size="${v.size}">Production</Badge>`,
    examples: [
      {
        title: 'Status Dot & Icons',
        description: 'Combine variant="dot" or leftIcon with lucide-react icons.',
        code: `<HStack gap={2}>\n  <Badge variant="dot" tone="success">Online</Badge>\n  <Badge variant="soft" tone="warning">Pending</Badge>\n  <Badge variant="solid" tone="danger" leftIcon={<Bell size={12} />}>3 Alerts</Badge>\n</HStack>`,
        render: () => (
          <HStack gap={2}>
            <Badge variant="dot" tone="success">Online</Badge>
            <Badge variant="soft" tone="warning">Pending</Badge>
            <Badge variant="solid" tone="danger" leftIcon={<Bell size={12} />}>3 Alerts</Badge>
          </HStack>
        ),
      },
    ],
    props: [
      { name: 'variant', type: "'soft' | 'solid' | 'outline' | 'dot'", defaultValue: "'soft'", description: 'Visual style.' },
      { name: 'tone', type: "'primary' | 'neutral' | 'success' | 'warning' | 'danger' | 'info'", defaultValue: "'primary'", description: 'Semantic palette.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: 'Badge size.' },
      { name: 'leftIcon', type: 'ReactNode', defaultValue: 'undefined', description: 'Optional leading icon.' },
    ],
    slots: [
      { name: 'root', description: 'Badge container.' },
      { name: 'dot', description: 'Status dot when variant="dot".' },
    ],
    cssVars: [{ token: '--kx-primary-100', defaultValue: '#e0e7ff', description: 'Soft primary fill.' }],
    a11y: [{ key: 'aria-hidden', description: 'Decorative status dot is hidden from screen readers.' }],
  },
  {
    slug: 'avatar',
    name: 'Avatar',
    category: 'Display',
    radix: '@radix-ui/react-avatar',
    summary: 'User avatar with automatic initials fallback, status dot, and AvatarGroup.',
    description:
      'Built on @radix-ui/react-avatar, Avatar gracefully falls back to computed initials when no image is provided or if loading fails.',
    importCode: `import { Avatar, AvatarGroup } from '@kreattix/ui';`,
    playgroundControls: [
      { name: 'name', label: 'Name', type: 'text', defaultValue: 'Prince Kumar' },
      { name: 'size', label: 'Size', type: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'], defaultValue: 'lg' },
      { name: 'status', label: 'Status', type: 'select', options: ['online', 'away', 'busy', 'offline'], defaultValue: 'online' },
    ],
    renderPlayground: (v) => (
      <Avatar name={String(v.name)} size={v.size as 'lg'} status={v.status as 'online'} />
    ),
    generatePlaygroundCode: (v) =>
      `<Avatar name="${v.name}" size="${v.size}" status="${v.status}" />`,
    examples: [
      {
        title: 'AvatarGroup with Overflow',
        description: 'Stack overlapping avatars with a max overflow counter.',
        code: `<AvatarGroup max={3}>\n  <Avatar name="Alice Ray" />\n  <Avatar name="Bob Chen" />\n  <Avatar name="Cara Diaz" />\n  <Avatar name="Dan Lee" />\n</AvatarGroup>`,
        render: () => (
          <AvatarGroup max={3}>
            <Avatar name="Alice Ray" />
            <Avatar name="Bob Chen" />
            <Avatar name="Cara Diaz" />
            <Avatar name="Dan Lee" />
          </AvatarGroup>
        ),
      },
    ],
    props: [
      { name: 'name', type: 'string', defaultValue: 'undefined', description: 'Used to compute fallback initials and alt text.' },
      { name: 'src', type: 'string', defaultValue: 'undefined', description: 'Image URL.' },
      { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", defaultValue: "'md'", description: 'Avatar dimensions.' },
      { name: 'status', type: "'online' | 'busy' | 'away' | 'offline'", defaultValue: 'undefined', description: 'Presence indicator.' },
    ],
    slots: [
      { name: 'root', description: 'Outer avatar circle.' },
      { name: 'image', description: 'Avatar <img>.' },
      { name: 'fallback', description: 'Initials fallback.' },
      { name: 'status', description: 'Presence badge.' },
    ],
    cssVars: [{ token: '--kx-primary-100', defaultValue: '#e0e7ff', description: 'Fallback background.' }],
    a11y: [{ key: 'alt / aria-label', description: 'Automatically derives alt text from name and labels status dot.' }],
  },
  {
    slug: 'card',
    name: 'Card',
    category: 'Display',
    summary: 'Composable surface container with Header, Body, Footer, and interactive hover.',
    description:
      'Card groups related information and actions using `Card.Header`, `Card.Body`, and `Card.Footer` subcomponents.',
    importCode: `import { Card } from '@kreattix/ui';`,
    playgroundControls: [
      { name: 'variant', label: 'Variant', type: 'select', options: ['outlined', 'elevated', 'subtle'], defaultValue: 'outlined' },
      { name: 'interactive', label: 'Interactive Hover', type: 'boolean', defaultValue: false },
    ],
    renderPlayground: (v) => (
      <Card variant={v.variant as 'outlined'} interactive={Boolean(v.interactive)} style={{ width: '20rem' }}>
        <Card.Header>
          <Heading level={4} size="sm">Deployment Ready</Heading>
        </Card.Header>
        <Card.Body>
          <Text size="sm" tone="secondary">Your zero-runtime CSS bundle compiled in 180ms.</Text>
        </Card.Body>
        <Card.Footer>
          <Button size="sm">View Logs</Button>
        </Card.Footer>
      </Card>
    ),
    generatePlaygroundCode: (v) =>
      `<Card variant="${v.variant}"${v.interactive ? ' interactive' : ''}>\n  <Card.Header>Deployment Ready</Card.Header>\n  <Card.Body>Your zero-runtime CSS bundle compiled in 180ms.</Card.Body>\n  <Card.Footer><Button size="sm">View Logs</Button></Card.Footer>\n</Card>`,
    examples: [
      {
        title: 'Slot Customization',
        description: 'Style specific card slots without overriding global CSS.',
        code: `<Card variant="elevated" classNames={{ root: 'my-card' }}>\n  <Card.Body>Elevated surface</Card.Body>\n</Card>`,
        render: () => (
          <Card variant="elevated">
            <Card.Body>Elevated surface</Card.Body>
          </Card>
        ),
      },
    ],
    props: [
      { name: 'variant', type: "'outlined' | 'elevated' | 'subtle'", defaultValue: "'outlined'", description: 'Surface elevation style.' },
      { name: 'interactive', type: 'boolean', defaultValue: 'false', description: 'Adds lift & primary border hover effect.' },
    ],
    slots: [
      { name: 'root', description: 'Card container.' },
      { name: 'header', description: 'Card.Header.' },
      { name: 'body', description: 'Card.Body.' },
      { name: 'footer', description: 'Card.Footer.' },
    ],
    cssVars: [{ token: '--kx-bg-surface', defaultValue: '#ffffff', description: 'Card background.' }],
    a11y: [{ key: 'Semantics', description: 'Use interactive buttons/links inside Card rather than making the whole div clickable.' }],
  },
  {
    slug: 'skeleton',
    name: 'Skeleton',
    category: 'Display',
    summary: 'Shimmering loading placeholder with rect, circle, and multi-line text shapes.',
    description:
      'Skeleton reduces perceived latency during async data fetching with accessible aria-hidden shimmer placeholders.',
    importCode: `import { Skeleton } from '@kreattix/ui';`,
    playgroundControls: [
      { name: 'shape', label: 'Shape', type: 'select', options: ['rect', 'circle', 'text'], defaultValue: 'rect' },
      { name: 'lines', label: 'Lines (text)', type: 'number', defaultValue: 3 },
    ],
    renderPlayground: (v) =>
      v.shape === 'text' ? (
        <div style={{ width: '18rem' }}>
          <Skeleton lines={Number(v.lines)} />
        </div>
      ) : (
        <Skeleton shape={v.shape as 'rect'} width={v.shape === 'circle' ? '3rem' : '16rem'} height="3rem" />
      ),
    generatePlaygroundCode: (v) =>
      v.shape === 'text'
        ? `<Skeleton lines={${v.lines}} />`
        : `<Skeleton shape="${v.shape}" width="${v.shape === 'circle' ? '3rem' : '16rem'}" height="3rem" />`,
    examples: [
      {
        title: 'Card Loading State',
        description: 'Compose circle and multi-line text skeletons.',
        code: `<HStack gap={3} style={{ width: 260 }}>\n  <Skeleton shape="circle" width="2.5rem" height="2.5rem" />\n  <Skeleton lines={2} />\n</HStack>`,
        render: () => (
          <HStack gap={3} style={{ width: 260 }}>
            <Skeleton shape="circle" width="2.5rem" height="2.5rem" />
            <Skeleton lines={2} />
          </HStack>
        ),
      },
    ],
    props: [
      { name: 'shape', type: "'rect' | 'circle' | 'text'", defaultValue: "'rect'", description: 'Placeholder shape.' },
      { name: 'lines', type: 'number', defaultValue: 'undefined', description: 'Renders N staggered text lines.' },
      { name: 'width', type: 'string | number', defaultValue: "'100%'", description: 'Width.' },
      { name: 'height', type: 'string | number', defaultValue: "'2.5rem'", description: 'Height.' },
    ],
    slots: [{ name: 'root', description: 'Skeleton element.' }],
    cssVars: [{ token: '--kx-bg-subtle', defaultValue: '#f4f4f5', description: 'Base shimmer color.' }],
    a11y: [{ key: 'aria-hidden="true"', description: 'Hidden from screen readers; pair with aria-busy on parent container.' }],
  },
  {
    slug: 'icon',
    name: 'Icon',
    category: 'Display',
    summary: 'Zero-lock-in icon wrapper normalizing size and semantic tone for any icon library.',
    description:
      'Kreattix UI has zero icon dependencies. Use Icon to wrap icons from lucide-react, Heroicons, Phosphor, or custom inline SVGs with consistent sizing and semantic tones.',
    importCode: `import { Icon } from '@kreattix/ui';\nimport { Star } from 'lucide-react';`,
    playgroundControls: [
      { name: 'size', label: 'Size', type: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'], defaultValue: 'lg' },
      { name: 'tone', label: 'Tone', type: 'select', options: ['inherit', 'primary', 'neutral', 'muted', 'success', 'warning', 'danger', 'info'], defaultValue: 'primary' },
    ],
    renderPlayground: (v) => (
      <Icon size={v.size as 'lg'} tone={v.tone as 'primary'} label="Favorite">
        <Star size="100%" />
      </Icon>
    ),
    generatePlaygroundCode: (v) =>
      `<Icon size="${v.size}" tone="${v.tone}" label="Favorite">\n  <Star size="100%" />\n</Icon>`,
    examples: [
      {
        title: 'Lucide + Custom SVG (Zero Lock-In)',
        description: 'Works identically with lucide-react or raw inline SVGs.',
        code: `<HStack gap={4}>\n  <Icon size="lg" tone="danger"><Heart size="100%" /></Icon>\n  <Icon size="lg" tone="success"><Check size="100%" /></Icon>\n</HStack>`,
        render: () => (
          <HStack gap={4}>
            <Icon size="lg" tone="danger"><Heart size="100%" /></Icon>
            <Icon size="lg" tone="success"><Check size="100%" /></Icon>
          </HStack>
        ),
      },
    ],
    props: [
      { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", defaultValue: "'md'", description: 'Normalized icon box size.' },
      { name: 'tone', type: "'inherit' | 'primary' | 'neutral' | 'muted' | 'success' | 'warning' | 'danger' | 'info'", defaultValue: "'inherit'", description: 'Semantic icon color.' },
      { name: 'label', type: 'string', defaultValue: 'undefined', description: 'Sets role="img" and aria-label; otherwise aria-hidden.' },
    ],
    slots: [{ name: 'root', description: 'Icon span wrapper.' }],
    cssVars: [{ token: '--kx-primary-600', defaultValue: '#4f46e5', description: 'Primary tone color.' }],
    a11y: [{ key: 'aria-hidden', description: 'Decorative icons omit `label` and are automatically aria-hidden.' }],
  },
  {
    slug: 'button',
    name: 'Button',
    category: 'Actions',
    radix: '@radix-ui/react-slot',
    summary: 'High-craft action button with 5 variants, loading spinner, icons, and asChild.',
    description:
      'Button supports solid, soft, outline, ghost, and link variants, density-aware heights, built-in loading state with `loadingText`, slot customization, `unstyled`, and `asChild` polymorphism.',
    importCode: `import { Button } from '@kreattix/ui';`,
    playgroundControls: [
      { name: 'variant', label: 'Variant', type: 'select', options: ['solid', 'soft', 'outline', 'ghost', 'link'], defaultValue: 'solid' },
      { name: 'tone', label: 'Tone', type: 'select', options: ['primary', 'neutral', 'success', 'danger'], defaultValue: 'primary' },
      { name: 'size', label: 'Size', type: 'select', options: ['xs', 'sm', 'md', 'lg'], defaultValue: 'md' },
      { name: 'loading', label: 'Loading', type: 'boolean', defaultValue: false },
      { name: 'disabled', label: 'Disabled', type: 'boolean', defaultValue: false },
    ],
    renderPlayground: (v) => (
      <Button
        variant={v.variant as 'solid'}
        tone={v.tone as 'primary'}
        size={v.size as 'md'}
        loading={Boolean(v.loading)}
        loadingText="Saving..."
        disabled={Boolean(v.disabled)}
        rightIcon={<ArrowRight size={15} />}
      >
        Deploy App
      </Button>
    ),
    generatePlaygroundCode: (v) =>
      `<Button variant="${v.variant}" tone="${v.tone}" size="${v.size}"${v.loading ? ' loading loadingText="Saving..."' : ''}${v.disabled ? ' disabled' : ''}>\n  Deploy App\n</Button>`,
    examples: [
      {
        title: 'All 5 Variants',
        description: 'Consistent visual hierarchy from primary solid CTAs to subtle ghost actions.',
        code: `<HStack gap={2} wrap="wrap">\n  <Button variant="solid">Solid</Button>\n  <Button variant="soft">Soft</Button>\n  <Button variant="outline">Outline</Button>\n  <Button variant="ghost">Ghost</Button>\n  <Button variant="link">Link</Button>\n</HStack>`,
        render: () => (
          <HStack gap={2} wrap="wrap">
            <Button variant="solid">Solid</Button>
            <Button variant="soft">Soft</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </HStack>
        ),
      },
      {
        title: 'Next.js Link via asChild & Icons',
        description: 'Turn any Next.js <Link> into a styled button without nested interactive elements.',
        code: `<Button asChild leftIcon={<Download size={15} />}>\n  <a href="#download">Download SDK</a>\n</Button>`,
        render: () => (
          <Button asChild leftIcon={<Download size={15} />}>
            <a href="#download">Download SDK</a>
          </Button>
        ),
      },
    ],
    props: [
      { name: 'variant', type: "'solid' | 'soft' | 'outline' | 'ghost' | 'link'", defaultValue: "'solid'", description: 'Visual variant.' },
      { name: 'tone', type: "'primary' | 'neutral' | 'success' | 'danger'", defaultValue: "'primary'", description: 'Semantic color.' },
      { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg'", defaultValue: "'md'", description: 'Density-scaled size.' },
      { name: 'loading', type: 'boolean', defaultValue: 'false', description: 'Shows spinner and disables interaction.' },
      { name: 'asChild', type: 'boolean', defaultValue: 'false', description: 'Delegates rendering to child element.' },
      { name: 'unstyled', type: 'boolean', defaultValue: 'false', description: 'Strips Kreattix styles.' },
    ],
    slots: [
      { name: 'root', description: 'Button element.' },
      { name: 'leftIcon', description: 'Leading icon slot.' },
      { name: 'rightIcon', description: 'Trailing icon slot.' },
      { name: 'spinner', description: 'Loading spinner slot.' },
    ],
    cssVars: [
      { token: '--kx-primary-600', defaultValue: '#4f46e5', description: 'Solid background.' },
      { token: '--kx-density-scale', defaultValue: '1', description: 'Scales height & horizontal padding.' },
    ],
    a11y: [
      { key: 'Enter / Space', description: 'Activates button.' },
      { key: 'aria-busy', description: 'Set to true automatically while loading.' },
    ],
  },
  {
    slug: 'icon-button',
    name: 'IconButton',
    category: 'Actions',
    radix: '@radix-ui/react-slot',
    summary: 'Square icon-only button with TypeScript-enforced aria-label.',
    description:
      'IconButton shares all Button variants, tones, and sizes while enforcing an accessible `aria-label` in TypeScript.',
    importCode: `import { IconButton } from '@kreattix/ui';`,
    playgroundControls: [
      { name: 'variant', label: 'Variant', type: 'select', options: ['solid', 'soft', 'outline', 'ghost'], defaultValue: 'soft' },
      { name: 'tone', label: 'Tone', type: 'select', options: ['primary', 'neutral', 'danger'], defaultValue: 'primary' },
      { name: 'size', label: 'Size', type: 'select', options: ['xs', 'sm', 'md', 'lg'], defaultValue: 'md' },
    ],
    renderPlayground: (v) => (
      <IconButton
        aria-label="Open settings"
        variant={v.variant as 'soft'}
        tone={v.tone as 'primary'}
        size={v.size as 'md'}
        icon={<Settings size={16} />}
      />
    ),
    generatePlaygroundCode: (v) =>
      `<IconButton\n  aria-label="Open settings"\n  variant="${v.variant}"\n  tone="${v.tone}"\n  size="${v.size}"\n  icon={<Settings size={16} />}\n/>`,
    examples: [
      {
        title: 'Toolbar Action Group',
        description: 'Pair IconButtons for compact toolbars.',
        code: `<HStack gap={2}>\n  <IconButton aria-label="Add item" icon={<Plus size={16} />} />\n  <IconButton aria-label="Delete item" variant="soft" tone="danger" icon={<Trash2 size={16} />} />\n</HStack>`,
        render: () => (
          <HStack gap={2}>
            <IconButton aria-label="Add item" icon={<Plus size={16} />} />
            <IconButton aria-label="Delete item" variant="soft" tone="danger" icon={<Trash2 size={16} />} />
          </HStack>
        ),
      },
    ],
    props: [
      { name: 'aria-label', type: 'string', defaultValue: '—', required: true, description: 'Required accessible label for screen readers.' },
      { name: 'icon', type: 'ReactNode', defaultValue: 'undefined', description: 'Icon element to render.' },
      { name: 'variant', type: "'solid' | 'soft' | 'outline' | 'ghost'", defaultValue: "'solid'", description: 'Visual variant.' },
    ],
    slots: [{ name: 'root', description: 'Square button element.' }],
    cssVars: [{ token: '--kx-density-scale', defaultValue: '1', description: 'Scales square dimensions.' }],
    a11y: [{ key: 'aria-label', description: 'Enforced at compile time in TypeScript.' }],
  },
];
