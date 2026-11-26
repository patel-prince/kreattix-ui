'use client';

import React from 'react';
import { Badge, Card, Grid, Heading, HStack, Stack, Text } from '@kreattix-ui/react';
import { COMPONENT_LIST } from '@/registry/components';

const UPCOMING_GROUPS = [
  {
    title: 'Layout & Responsive (+4)',
    items: ['Container', 'AspectRatio', 'ScrollArea (Radix)', 'ResizablePanels'],
  },
  {
    title: 'Typography & Display (+6)',
    items: ['CodeBlock', 'Kbd', 'Tag', 'Timeline', 'StatCard', 'EmptyState'],
  },
  {
    title: 'Actions & Navigation (+9)',
    items: ['ButtonGroup', 'SplitButton', 'Breadcrumb', 'Pagination', 'Stepper', 'NavigationMenu', 'Menubar', 'SidebarNav', 'ContextMenu'],
  },
  {
    title: 'Advanced Forms (+12)',
    items: ['NumberInput', 'PinInput / OTP', 'PasswordInput', 'FileUpload', 'Combobox', 'MultiSelect', 'DatePicker', 'DateRangePicker', 'TimePicker', 'ColorPicker', 'RichTextEditor', 'Form'],
  },
  {
    title: 'Enterprise Data & Overlays (+10)',
    items: ['Table', 'DataGrid', 'TreeView', 'List', 'DescriptionList', 'CommandPalette (Cmd+K)', 'HoverCard', 'AlertDialog', 'Sheet', 'Tour'],
  },
];

const SECTIONS_ROADMAP = [
  { category: 'Hero Sections', count: 8 },
  { category: 'Feature Grids', count: 8 },
  { category: 'Pricing & Billing', count: 8 },
  { category: 'Authentication & Onboarding', count: 8 },
  { category: 'App Shells & Navigation', count: 8 },
  { category: 'Dashboards & Analytics', count: 10 },
  { category: 'CRUD & Data Management', count: 8 },
  { category: 'Settings & Account', count: 8 },
  { category: 'Marketing & Content', count: 8 },
  { category: 'Error & Status Pages', count: 6 },
];

export default function RoadmapPage() {
  return (
    <Stack gap={8}>
      <Stack gap={2}>
        <HStack gap={2}>
          <Badge tone="success">All Phases Complete ({COMPONENT_LIST.length} Components)</Badge>
          <Badge tone="primary">82 Readymade Sections</Badge>
        </HStack>
        <Heading level={1} size="3xl">Library Roadmap</Heading>
        <Text size="lg" tone="secondary">
          Phases 1–3 are now complete: {COMPONENT_LIST.length} Radix-powered components and 82
          readymade sections in <code>@kreattix-ui/sections</code>.
        </Text>
      </Stack>

      <Stack gap={4}>
        <Heading level={2} size="xl">Upcoming Component Expansion (60+ Total)</Heading>
        <Grid minChildWidth="260px" gap={4}>
          {UPCOMING_GROUPS.map((grp) => (
            <Card key={grp.title}>
              <Card.Header>
                <Heading level={3} size="sm">{grp.title}</Heading>
              </Card.Header>
              <Card.Body>
                <HStack gap={2} wrap="wrap">
                  {grp.items.map((item) => (
                    <Badge key={item} variant="soft" tone="neutral" size="sm">
                      {item}
                    </Badge>
                  ))}
                </HStack>
              </Card.Body>
            </Card>
          ))}
        </Grid>
      </Stack>

      <Stack gap={4}>
        <Heading level={2} size="xl">80+ Readymade Sections (@kreattix-ui/sections)</Heading>
        <Grid minChildWidth="220px" gap={4}>
          {SECTIONS_ROADMAP.map((sec) => (
            <Card key={sec.category} variant="subtle">
              <Card.Body>
                <HStack justify="space-between">
                  <Text weight="semibold" size="sm">{sec.category}</Text>
                  <Badge tone="primary" size="sm">{sec.count} sections</Badge>
                </HStack>
              </Card.Body>
            </Card>
          ))}
        </Grid>
      </Stack>
    </Stack>
  );
}
