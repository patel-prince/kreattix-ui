import React, { useState } from 'react';
import {
  Alert,
  Badge,
  Box,
  Button,
  Card,
  Container,
  Grid,
  Heading,
  HStack,
  Slider,
  Stack,
  Switch,
  Table,
  Text,
} from '@kreattix-ui/react';

export function PricingThreeTier() {
  const plans = [
    { name: 'Starter', price: '$0', desc: 'For hobby projects', cta: 'Start Free', featured: false },
    { name: 'Pro', price: '$29', desc: 'For growing SaaS teams', cta: 'Upgrade to Pro', featured: true },
    { name: 'Enterprise', price: 'Custom', desc: 'Dedicated SLA & SSO', cta: 'Contact Sales', featured: false },
  ];
  return (
    <Container size="xl" style={{ paddingBlock: '2.5rem' }}>
      <Grid minChildWidth="220px" gap={4}>
        {plans.map((p) => (
          <Card key={p.name} variant={p.featured ? 'elevated' : 'outlined'}>
            <Card.Body>
              <Stack gap={3}>
                <HStack justify="space-between">
                  <Heading level={3} size="md">{p.name}</Heading>
                  {p.featured && <Badge tone="primary">Popular</Badge>}
                </HStack>
                <Heading level={4} size="2xl">{p.price}</Heading>
                <Text size="sm" tone="muted">{p.desc}</Text>
                <Button variant={p.featured ? 'solid' : 'outline'} fullWidth>{p.cta}</Button>
              </Stack>
            </Card.Body>
          </Card>
        ))}
      </Grid>
    </Container>
  );
}

export function PricingToggleBilling() {
  const [annual, setAnnual] = useState(true);
  return (
    <Container size="md" style={{ paddingBlock: '2.5rem', textAlign: 'center' }}>
      <Stack gap={4} align="center">
        <HStack gap={3}>
          <Text size="sm">Monthly</Text>
          <Switch checked={annual} onCheckedChange={setAnnual} aria-label="Annual billing" />
          <Text size="sm" weight="semibold">Annual (Save 20%)</Text>
        </HStack>
        <Card style={{ width: '100%', maxWidth: '22rem' }}>
          <Card.Body>
            <Stack gap={2}>
              <Text weight="semibold">Pro Workspace</Text>
              <Heading level={3} size="2xl">{annual ? '$24/mo' : '$29/mo'}</Heading>
              <Button fullWidth>Choose Pro</Button>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>
    </Container>
  );
}

export function PricingEnterpriseQuote() {
  return (
    <Container size="lg" style={{ paddingBlock: '2rem' }}>
      <Box surface="subtle" radius="xl" p={6}>
        <HStack justify="space-between" wrap="wrap" gap={4}>
          <Stack gap={1}>
            <Badge tone="info">Enterprise Licensing</Badge>
            <Heading level={3} size="lg">Need custom seats or on-premise support?</Heading>
            <Text size="sm" tone="muted">Volume discounts, SAML SSO, and dedicated design-system engineers.</Text>
          </Stack>
          <Button size="lg">Talk to Sales</Button>
        </HStack>
      </Box>
    </Container>
  );
}

export function PricingFeatureTable() {
  return (
    <Container size="lg" style={{ paddingBlock: '2rem' }}>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Head>Capability</Table.Head>
            <Table.Head>Starter</Table.Head>
            <Table.Head>Pro</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>67 Components</Table.Cell>
            <Table.Cell>Included</Table.Cell>
            <Table.Cell>Included</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>82+ Sections</Table.Cell>
            <Table.Cell>Preview</Table.Cell>
            <Table.Cell>Unlimited</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Container>
  );
}

export function PricingUsageCalculator() {
  const [seats, setSeats] = useState([10]);
  return (
    <Container size="md" style={{ paddingBlock: '2rem' }}>
      <Card>
        <Card.Body>
          <Stack gap={4}>
            <Slider label="Team Seats" min={1} max={100} value={seats} onValueChange={setSeats} showValue />
            <HStack justify="space-between">
              <Text tone="muted">Estimated Monthly Total</Text>
              <Heading level={3} size="xl">${(seats[0] ?? 10) * 12}/mo</Heading>
            </HStack>
          </Stack>
        </Card.Body>
      </Card>
    </Container>
  );
}

export function PricingAddOnModules() {
  return (
    <Container size="lg" style={{ paddingBlock: '2rem' }}>
      <Grid minChildWidth="220px" gap={4}>
        <Card><Card.Body><Text weight="semibold">Audit Logs Add-on</Text><Text size="sm" tone="muted">+$15/mo</Text></Card.Body></Card>
        <Card><Card.Body><Text weight="semibold">Dedicated Edge Region</Text><Text size="sm" tone="muted">+$40/mo</Text></Card.Body></Card>
      </Grid>
    </Container>
  );
}

export function PricingUpgradeBanner() {
  return (
    <Alert
      tone="info"
      title="Unlock unlimited team members"
      description="Upgrade to Kreattix Pro for full access to 82+ production sections."
      action={<Button size="sm">Upgrade Now</Button>}
    />
  );
}

export function PricingInvoiceHistory() {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Head>Invoice</Table.Head>
          <Table.Head>Date</Table.Head>
          <Table.Head>Amount</Table.Head>
          <Table.Head>Status</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>INV-2026-01</Table.Cell>
          <Table.Cell>Nov 1, 2026</Table.Cell>
          <Table.Cell>$29.00</Table.Cell>
          <Table.Cell><Badge tone="success" size="sm">Paid</Badge></Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}
