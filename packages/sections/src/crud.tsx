import React, { useState } from 'react';
import {
  AlertDialog,
  Badge,
  Box,
  Button,
  Card,
  DataGrid,
  Drawer,
  EmptyState,
  FileUpload,
  Grid,
  Heading,
  HStack,
  Input,
  Stack,
  Tabs,
  Text,
} from '@kreattix-ui/react';

const SAMPLE_USERS = [
  { id: '1', name: 'Alice Ray', role: 'Admin', status: 'Active' },
  { id: '2', name: 'Bob Chen', role: 'Editor', status: 'Active' },
  { id: '3', name: 'Cara Diaz', role: 'Viewer', status: 'Invited' },
];

export function CrudToolbar() {
  return (
    <HStack justify="space-between" wrap="wrap" gap={3}>
      <Input placeholder="Filter records..." clearable style={{ maxWidth: '18rem' }} />
      <HStack gap={2}>
        <Button variant="outline" size="sm">Export CSV</Button>
        <Button size="sm">Add Record</Button>
      </HStack>
    </HStack>
  );
}

export function CrudMasterDetail() {
  const [selected, setSelected] = useState(SAMPLE_USERS[0]!);
  return (
    <Grid minChildWidth="240px" gap={4}>
      <Card>
        <Card.Body>
          <Stack gap={2}>
            {SAMPLE_USERS.map((u) => (
              <Button key={u.id} variant={selected.id === u.id ? 'soft' : 'ghost'} style={{ justifyContent: 'flex-start' }} onClick={() => setSelected(u)}>
                {u.name}
              </Button>
            ))}
          </Stack>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header><Heading level={3} size="md">{selected.name}</Heading></Card.Header>
        <Card.Body><Text size="sm" tone="muted">Role: {selected.role} • Status: {selected.status}</Text></Card.Body>
      </Card>
    </Grid>
  );
}

export function CrudDataGridView() {
  return (
    <DataGrid
      data={SAMPLE_USERS}
      selectable
      columns={[
        { key: 'name', header: 'Name', sortable: true },
        { key: 'role', header: 'Role', sortable: true },
        { key: 'status', header: 'Status', render: (v) => <Badge size="sm" tone={v === 'Active' ? 'success' : 'warning'}>{String(v)}</Badge> },
      ]}
    />
  );
}

export function CrudEmptyView() {
  return (
    <EmptyState
      title="No projects created yet"
      description="Create your first Kreattix workspace to start deploying components."
      action={<Button>Create Project</Button>}
    />
  );
}

export function CrudImportWizard() {
  return (
    <Card>
      <Card.Header><Heading level={3} size="md">Import CSV Records</Heading></Card.Header>
      <Card.Body><FileUpload accept=".csv,.json" /></Card.Body>
    </Card>
  );
}

export function CrudSavedViewsTabs() {
  return (
    <Tabs
      variant="pill"
      items={[
        { value: 'all', label: 'All (3)', content: <Text size="sm">Showing all records.</Text> },
        { value: 'active', label: 'Active (2)', content: <Text size="sm">Showing active records only.</Text> },
      ]}
    />
  );
}

export function CrudDetailDrawer() {
  return (
    <Drawer
      side="right"
      trigger={<Button variant="outline" size="sm">Inspect Record</Button>}
      title="Record #USR-001"
    >
      <Stack gap={3}>
        <Input label="Display Name" defaultValue="Alice Ray" />
        <Button>Save Changes</Button>
      </Stack>
    </Drawer>
  );
}

export function CrudDeleteConfirm() {
  return (
    <Box surface="subtle" p={4} radius="md">
      <HStack justify="space-between">
        <Text size="sm" weight="medium">Delete workspace permanently?</Text>
        <AlertDialog
          trigger={<Button tone="danger" size="sm">Delete</Button>}
          title="Are you absolutely sure?"
          description="This permanently deletes all records and cannot be undone."
          confirmText="Delete Workspace"
        />
      </HStack>
    </Box>
  );
}
