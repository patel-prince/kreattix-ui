import React from 'react';
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  ColorPicker,
  Heading,
  HStack,
  Input,
  RadioGroup,
  Stack,
  Switch,
  Table,
  Text,
} from '@kreattix-ui/react';

export function SettingsProfile() {
  return (
    <Card>
      <Card.Header><Heading level={3} size="md">Profile</Heading></Card.Header>
      <Card.Body>
        <Stack gap={4}>
          <HStack gap={3}><Avatar name="Prince Kumar" size="lg" /><Button variant="outline" size="sm">Change Avatar</Button></HStack>
          <Input label="Display Name" defaultValue="Prince Kumar" />
          <Button style={{ alignSelf: 'flex-start' }}>Save Profile</Button>
        </Stack>
      </Card.Body>
    </Card>
  );
}

export function SettingsAppearance() {
  return (
    <Card>
      <Card.Header><Heading level={3} size="md">Appearance</Heading></Card.Header>
      <Card.Body>
        <Stack gap={4}>
          <RadioGroup
            label="Density"
            orientation="horizontal"
            defaultValue="comfortable"
            options={[
              { value: 'compact', label: 'Compact' },
              { value: 'comfortable', label: 'Comfortable' },
              { value: 'spacious', label: 'Spacious' },
            ]}
          />
          <ColorPicker label="Brand Accent" />
        </Stack>
      </Card.Body>
    </Card>
  );
}

export function SettingsSecurity2fa() {
  return (
    <Card>
      <Card.Body>
        <Stack gap={3}>
          <HStack justify="space-between">
            <div><Text weight="semibold">Two-Factor Authentication</Text><Text size="xs" tone="muted">Require OTP on new logins.</Text></div>
            <Switch defaultChecked aria-label="Enable 2FA" />
          </HStack>
        </Stack>
      </Card.Body>
    </Card>
  );
}

export function SettingsApiKeys() {
  return (
    <Table>
      <Table.Header><Table.Row><Table.Head>Name</Table.Head><Table.Head>Prefix</Table.Head><Table.Head>Status</Table.Head></Table.Row></Table.Header>
      <Table.Body>
        <Table.Row><Table.Cell>Production CLI</Table.Cell><Table.Cell>kx_live_9f2a</Table.Cell><Table.Cell><Badge tone="success" size="sm">Active</Badge></Table.Cell></Table.Row>
      </Table.Body>
    </Table>
  );
}

export function SettingsWebhooks() {
  return (
    <Card>
      <Card.Body>
        <Stack gap={3}>
          <Input label="Endpoint URL" defaultValue="https://api.acme.com/webhooks/kreattix" />
          <Button style={{ alignSelf: 'flex-start' }}>Save Webhook</Button>
        </Stack>
      </Card.Body>
    </Card>
  );
}

export function SettingsRbacMatrix() {
  return (
    <Table>
      <Table.Header><Table.Row><Table.Head>Permission</Table.Head><Table.Head>Admin</Table.Head><Table.Head>Editor</Table.Head></Table.Row></Table.Header>
      <Table.Body>
        <Table.Row><Table.Cell>Publish Themes</Table.Cell><Table.Cell><Checkbox defaultChecked aria-label="Admin publish" /></Table.Cell><Table.Cell><Checkbox defaultChecked aria-label="Editor publish" /></Table.Cell></Table.Row>
        <Table.Row><Table.Cell>Manage Billing</Table.Cell><Table.Cell><Checkbox defaultChecked aria-label="Admin billing" /></Table.Cell><Table.Cell><Checkbox aria-label="Editor billing" /></Table.Cell></Table.Row>
      </Table.Body>
    </Table>
  );
}

export function SettingsNotifications() {
  return (
    <Card>
      <Card.Body>
        <Stack gap={3}>
          <Switch label="Deployment alerts" defaultChecked />
          <Switch label="Weekly digest email" />
        </Stack>
      </Card.Body>
    </Card>
  );
}

export function SettingsDangerZone() {
  return (
    <Alert
      tone="danger"
      title="Danger Zone"
      description="Deleting this organization removes all projects and tokens."
      action={<Button tone="danger" size="sm">Delete Organization</Button>}
    />
  );
}
