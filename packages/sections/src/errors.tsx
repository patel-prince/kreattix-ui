import React from 'react';
import { Alert, Badge, Box, Button, Card, Heading, HStack, Stack, Text } from '@kreattix-ui/react';

export function Error404Page() {
  return (
    <Box p={8} style={{ textAlign: 'center' }}>
      <Stack gap={3} align="center">
        <Badge tone="warning">404</Badge>
        <Heading level={1} size="2xl">Page not found</Heading>
        <Text tone="muted">The page you requested could not be found.</Text>
        <Button>Back to Home</Button>
      </Stack>
    </Box>
  );
}

export function Error500Page() {
  return (
    <Box p={8} style={{ textAlign: 'center' }}>
      <Stack gap={3} align="center">
        <Badge tone="danger">500</Badge>
        <Heading level={1} size="2xl">Unexpected server error</Heading>
        <Text tone="muted">Our engineers have been notified. Please try again.</Text>
        <Button variant="outline">Retry</Button>
      </Stack>
    </Box>
  );
}

export function ErrorMaintenancePage() {
  return (
    <Box surface="subtle" radius="lg" p={8} style={{ textAlign: 'center' }}>
      <Stack gap={3} align="center">
        <Badge tone="info">Maintenance</Badge>
        <Heading level={2} size="xl">Scheduled upgrade in progress</Heading>
        <Text size="sm" tone="muted">We will be back online within 15 minutes.</Text>
      </Stack>
    </Box>
  );
}

export function Error403Forbidden() {
  return (
    <Box p={8} style={{ textAlign: 'center' }}>
      <Stack gap={3} align="center">
        <Badge tone="danger">403</Badge>
        <Heading level={2} size="xl">Permission denied</Heading>
        <Text size="sm" tone="muted">Contact your workspace administrator to request access.</Text>
      </Stack>
    </Box>
  );
}

export function StatusPaymentReceipt() {
  return (
    <Card style={{ maxWidth: '24rem', marginInline: 'auto' }}>
      <Card.Body>
        <Stack gap={3} align="center" style={{ textAlign: 'center' }}>
          <Badge tone="success">Payment Confirmed</Badge>
          <Heading level={3} size="xl">$29.00 Paid</Heading>
          <Text size="sm" tone="muted">Receipt #KX-9042 sent to your billing email.</Text>
          <Button variant="outline" size="sm">Download PDF</Button>
        </Stack>
      </Card.Body>
    </Card>
  );
}

export function StatusOfflineBanner() {
  return (
    <Alert
      tone="warning"
      title="Connection lost"
      description="Trying to reconnect to Kreattix realtime sync..."
      action={<Button size="xs" variant="outline">Retry Now</Button>}
    />
  );
}

export function StatusOnboardingSuccess() {
  return (
    <Card variant="elevated" style={{ maxWidth: '26rem', marginInline: 'auto' }}>
      <Card.Body>
        <Stack gap={3}>
          <HStack justify="space-between"><Text weight="bold">Workspace Ready</Text><Badge tone="success">Live</Badge></HStack>
          <Text size="sm" tone="muted">Your Kreattix Cloud environment is provisioned.</Text>
          <Button fullWidth>Open Dashboard</Button>
        </Stack>
      </Card.Body>
    </Card>
  );
}

export function StatusSessionExpired() {
  return (
    <Alert
      tone="info"
      title="Session expired"
      description="Please sign in again to continue editing."
      action={<Button size="xs">Sign In</Button>}
    />
  );
}
