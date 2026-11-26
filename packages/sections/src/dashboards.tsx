import React from 'react';
import {
  Avatar,
  Badge,
  Card,
  Grid,
  Heading,
  HStack,
  List,
  Progress,
  Stack,
  StatCard,
  Table,
  Text,
  Timeline,
} from '@kreattix-ui/react';

export function DashboardKpiStrip() {
  return (
    <Grid minChildWidth="180px" gap={4}>
      <StatCard label="Monthly Revenue" value="$84,200" delta="+18.4%" trend="up" />
      <StatCard label="Active Users" value="14,920" delta="+6.2%" trend="up" />
      <StatCard label="Error Rate" value="0.04%" delta="-0.02%" trend="up" />
      <StatCard label="Churn" value="1.2%" delta="+0.1%" trend="down" />
    </Grid>
  );
}

export function DashboardRevenueOverview() {
  return (
    <Card>
      <Card.Header><Heading level={3} size="md">Revenue Target</Heading></Card.Header>
      <Card.Body>
        <Stack gap={3}>
          <HStack justify="space-between"><Text weight="semibold">$84,200 / $100,000</Text><Badge tone="success">84%</Badge></HStack>
          <Progress value={84} tone="success" />
        </Stack>
      </Card.Body>
    </Card>
  );
}

export function DashboardActivityFeed() {
  return (
    <Card>
      <Card.Header><Heading level={3} size="md">Audit Activity</Heading></Card.Header>
      <Card.Body>
        <Timeline
          items={[
            { title: 'Theme updated to Midnight', timestamp: '2m ago', tone: 'primary' },
            { title: 'API key rotated by Prince', timestamp: '1h ago', tone: 'warning' },
          ]}
        />
      </Card.Body>
    </Card>
  );
}

export function DashboardSystemHealth() {
  return (
    <Grid minChildWidth="180px" gap={4}>
      <Card><Card.Body><HStack justify="space-between"><Text size="sm">API Gateway</Text><Badge variant="dot" tone="success">99.99%</Badge></HStack></Card.Body></Card>
      <Card><Card.Body><HStack justify="space-between"><Text size="sm">Edge Workers</Text><Badge variant="dot" tone="success">Healthy</Badge></HStack></Card.Body></Card>
    </Grid>
  );
}

export function DashboardCohortTable() {
  return (
    <Table>
      <Table.Header><Table.Row><Table.Head>Cohort</Table.Head><Table.Head>Week 1</Table.Head><Table.Head>Week 4</Table.Head></Table.Row></Table.Header>
      <Table.Body>
        <Table.Row><Table.Cell>Oct 2026</Table.Cell><Table.Cell>100%</Table.Cell><Table.Cell>74%</Table.Cell></Table.Row>
        <Table.Row><Table.Cell>Nov 2026</Table.Cell><Table.Cell>100%</Table.Cell><Table.Cell>81%</Table.Cell></Table.Row>
      </Table.Body>
    </Table>
  );
}

export function DashboardFunnelCard() {
  return (
    <Card>
      <Card.Header><Heading level={3} size="md">Conversion Funnel</Heading></Card.Header>
      <Card.Body>
        <Stack gap={3}>
          <Progress value={100} label="Visitors (10,000)" showValue />
          <Progress value={42} label="Signups (4,200)" showValue />
          <Progress value={18} tone="success" label="Paid (1,800)" showValue />
        </Stack>
      </Card.Body>
    </Card>
  );
}

export function DashboardGoalTracker() {
  return (
    <Card variant="subtle">
      <Card.Body>
        <Stack gap={2}>
          <Text weight="semibold">Q4 Component Goal</Text>
          <Progress value={100} tone="success" label="67 / 67 Components" showValue />
        </Stack>
      </Card.Body>
    </Card>
  );
}

export function DashboardTeamWorkload() {
  return (
    <List>
      <List.Item leading={<Avatar name="Alice Ray" size="sm" />} title="Alice Ray" description="Design Tokens" trailing={<Badge size="sm">4 tasks</Badge>} />
      <List.Item leading={<Avatar name="Bob Chen" size="sm" />} title="Bob Chen" description="Radix Overlays" trailing={<Badge size="sm" tone="success">Done</Badge>} />
    </List>
  );
}

export function DashboardApiQuota() {
  return (
    <Card>
      <Card.Body>
        <Stack gap={2}>
          <HStack justify="space-between"><Text weight="semibold">Monthly API Quota</Text><Text size="xs" tone="muted">720k / 1M</Text></HStack>
          <Progress value={72} tone="warning" />
        </Stack>
      </Card.Body>
    </Card>
  );
}

export function DashboardExecutiveSummary() {
  return (
    <Card variant="elevated">
      <Card.Body>
        <Stack gap={2}>
          <Badge tone="primary">Executive Summary</Badge>
          <Heading level={3} size="lg">Net Revenue Retention: 124%</Heading>
          <Text size="sm" tone="muted">Driven by enterprise multi-workspace adoption in Q4.</Text>
        </Stack>
      </Card.Body>
    </Card>
  );
}
