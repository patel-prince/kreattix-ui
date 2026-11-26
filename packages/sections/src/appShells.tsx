import React from 'react';
import {
  Avatar,
  Badge,
  Box,
  Breadcrumb,
  Button,
  Drawer,
  DropdownMenu,
  Heading,
  HStack,
  Kbd,
  Select,
  SidebarNav,
  Stack,
  Tabs,
  Text,
} from '@kreattix-ui/react';

export function AppShellSidebar() {
  return (
    <Box style={{ display: 'flex', border: '1px solid var(--kx-border-default)', borderRadius: 'var(--kx-radius-lg)', overflow: 'hidden' }}>
      <Box surface="subtle" p={3} style={{ borderRight: '1px solid var(--kx-border-default)' }}>
        <SidebarNav
          groups={[
            {
              title: 'Workspace',
              items: [
                { id: 'dash', label: 'Dashboard', active: true },
                { id: 'users', label: 'Users', badge: <Badge size="sm">12</Badge> },
                { id: 'billing', label: 'Billing' },
              ],
            },
          ]}
        />
      </Box>
      <Box p={5} style={{ flex: 1 }}>
        <Heading level={3} size="md">Main Content Area</Heading>
        <Text size="sm" tone="muted">Responsive sidebar shell with zero Tailwind.</Text>
      </Box>
    </Box>
  );
}

export function AppShellDualRail() {
  return (
    <HStack gap={0} style={{ border: '1px solid var(--kx-border-default)', borderRadius: 'var(--kx-radius-lg)', overflow: 'hidden' }}>
      <Box surface="muted" p={3}><Text size="xs" weight="bold">KX</Text></Box>
      <Box surface="subtle" p={4} style={{ width: '12rem' }}><Text size="sm" weight="medium">Projects</Text></Box>
      <Box p={4} style={{ flex: 1 }}><Text size="sm">Dual-Rail Admin Workspace</Text></Box>
    </HStack>
  );
}

export function AppShellCommandHeader() {
  return (
    <Box surface="surface" p={3} style={{ border: '1px solid var(--kx-border-default)', borderRadius: 'var(--kx-radius-md)' }}>
      <HStack justify="space-between">
        <Text weight="semibold">Kreattix Console</Text>
        <Button variant="outline" size="sm">Search <Kbd size="sm">Ctrl+K</Kbd></Button>
      </HStack>
    </Box>
  );
}

export function AppShellBreadcrumbHeader() {
  return (
    <HStack justify="space-between" wrap="wrap" gap={3}>
      <Stack gap={1}>
        <Breadcrumb items={[{ label: 'Projects', href: '#' }, { label: 'Kreattix Cloud' }]} />
        <Heading level={2} size="lg">Production Deployments</Heading>
      </Stack>
      <Button>New Deployment</Button>
    </HStack>
  );
}

export function AppShellOrgSwitcher() {
  return (
    <HStack
      justify="space-between"
      style={{
        padding: '0.75rem',
        border: '1px solid var(--kx-border-default)',
        borderRadius: 'var(--kx-radius-md)',
      }}
    >
      <div style={{ width: '14rem' }}>
        <Select
          defaultValue="acme"
          options={[
            { value: 'acme', label: 'Acme Corp (Pro)' },
            { value: 'personal', label: 'Personal Sandbox' },
          ]}
        />
      </div>
      <DropdownMenu
        trigger={<Avatar name="Prince Kumar" size="sm" status="online" />}
        items={[{ label: 'Profile' }, { label: 'Sign Out', tone: 'danger', separatorBefore: true }]}
      />
    </HStack>
  );
}

export function AppShellNotificationDrawer() {
  return (
    <Drawer
      side="right"
      trigger={<Button variant="outline" size="sm">Notifications (3)</Button>}
      title="Notifications"
    >
      <Stack gap={3}>
        <Box surface="subtle" p={3} radius="md"><Text size="sm">Build #482 succeeded</Text></Box>
        <Box surface="subtle" p={3} radius="md"><Text size="sm">New teammate joined</Text></Box>
      </Stack>
    </Drawer>
  );
}

export function AppShellMobileBottomNav() {
  return (
    <HStack
      justify="space-around"
      style={{
        padding: '0.5rem',
        border: '1px solid var(--kx-border-default)',
        borderRadius: 'var(--kx-radius-lg)',
        maxWidth: '24rem',
      }}
    >
      <Button variant="ghost" size="sm">Home</Button>
      <Button variant="soft" size="sm">Explore</Button>
      <Button variant="ghost" size="sm">Profile</Button>
    </HStack>
  );
}

export function AppShellSettingsSubNav() {
  return (
    <Tabs
      variant="line"
      items={[
        { value: 'general', label: 'General', content: <Text size="sm">General workspace settings.</Text> },
        { value: 'members', label: 'Members', content: <Text size="sm">Manage team roles.</Text> },
        { value: 'billing', label: 'Billing', content: <Text size="sm">Invoices &amp; payment methods.</Text> },
      ]}
    />
  );
}
