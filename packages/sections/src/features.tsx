import React from 'react';
import {
  Badge,
  Box,
  Card,
  CodeBlock,
  Container,
  Grid,
  Heading,
  HStack,
  Stack,
  StatCard,
  Tabs,
  Text,
} from '@kreattix-ui/react';

const DEFAULT_FEATURES = [
  { title: 'Zero-Runtime CSS', desc: 'Compiles to static @layer CSS driven by --kx-* custom properties.' },
  { title: 'Radix Primitives', desc: 'Focus traps, portals, and WAI-ARIA keyboard nav out of the box.' },
  { title: 'Dual Ergonomics', desc: '1-liner props or full compound subcomponents whenever you need them.' },
];

export function FeaturesThreeColumn({ items = DEFAULT_FEATURES }: { items?: typeof DEFAULT_FEATURES }) {
  return (
    <Container size="xl" style={{ paddingBlock: '2.5rem' }}>
      <Grid minChildWidth="220px" gap={4}>
        {items.map((f) => (
          <Card key={f.title}>
            <Card.Body>
              <Stack gap={2}>
                <Heading level={3} size="sm">{f.title}</Heading>
                <Text size="sm" tone="muted">{f.desc}</Text>
              </Stack>
            </Card.Body>
          </Card>
        ))}
      </Grid>
    </Container>
  );
}

export function FeaturesBentoGrid() {
  return (
    <Container size="xl" style={{ paddingBlock: '2.5rem' }}>
      <Grid columns={2} gap={4}>
        <Card variant="elevated">
          <Card.Body>
            <Badge tone="primary">3-Tier Theming</Badge>
            <Heading level={3} size="md" style={{ marginTop: '0.5rem' }}>Nested Scoped Zones</Heading>
            <Text size="sm" tone="muted">Mix dark sidebars inside light dashboards effortlessly.</Text>
          </Card.Body>
        </Card>
        <Card variant="subtle">
          <Card.Body>
            <Badge tone="success">Unstyled Mode</Badge>
            <Heading level={3} size="md" style={{ marginTop: '0.5rem' }}>Clean Escape Hatch</Heading>
            <Text size="sm" tone="muted">Strip Kreattix classes per-component or globally.</Text>
          </Card.Body>
        </Card>
      </Grid>
    </Container>
  );
}

export function FeaturesAlternatingRows() {
  return (
    <Container size="lg" style={{ paddingBlock: '2.5rem' }}>
      <Stack gap={6}>
        <Grid minChildWidth="240px" gap={6} align="center">
          <Stack gap={2}>
            <Heading level={3} size="lg">Automatic Field ARIA Wiring</Heading>
            <Text tone="secondary">Every input connects label, description, and error alerts automatically.</Text>
          </Stack>
          <Box surface="subtle" radius="lg" p={6}><Text size="sm">Input + Field Preview</Text></Box>
        </Grid>
      </Stack>
    </Container>
  );
}

export function FeaturesTabbedShowcase() {
  return (
    <Container size="lg" style={{ paddingBlock: '2.5rem' }}>
      <Tabs
        variant="pill"
        items={[
          { value: 'tokens', label: 'Tokens', content: <Text size="sm">11-step perceptual palettes &amp; density scale.</Text> },
          { value: 'theme', label: 'ThemeProvider', content: <Text size="sm">Component defaultProps &amp; slotClasses.</Text> },
          { value: 'a11y', label: 'Accessibility', content: <Text size="sm">WCAG 2.1 AA contrast &amp; Radix keyboard nav.</Text> },
        ]}
      />
    </Container>
  );
}

export function FeaturesComparisonMatrix() {
  return (
    <Container size="lg" style={{ paddingBlock: '2.5rem' }}>
      <Card>
        <Card.Header><Heading level={3} size="md">Architecture Comparison</Heading></Card.Header>
        <Card.Body>
          <Grid columns={3} gap={4}>
            <Text weight="semibold" size="sm">Feature</Text>
            <Text weight="semibold" size="sm">Legacy CSS-in-JS</Text>
            <Text weight="semibold" size="sm" tone="brand">Kreattix UI</Text>
            <Text size="sm">Runtime Overhead</Text>
            <Text size="sm" tone="muted">Style recalc per render</Text>
            <Text size="sm" tone="success">Zero runtime</Text>
          </Grid>
        </Card.Body>
      </Card>
    </Container>
  );
}

export function FeaturesBenchmarkStats() {
  return (
    <Container size="xl" style={{ paddingBlock: '2.5rem' }}>
      <Grid minChildWidth="180px" gap={4}>
        <StatCard label="Components" value="67+" delta="Radix-backed" trend="up" />
        <StatCard label="Sections" value="82+" delta="Readymade" trend="up" />
        <StatCard label="Runtime CSS-in-JS" value="0 KB" delta="Static @layer" trend="up" />
      </Grid>
    </Container>
  );
}

export function FeaturesIntegrationHub() {
  const stack = ['Next.js 15', 'React 19', 'TypeScript 5', 'Radix UI', 'Lucide Icons', 'Vitest'];
  return (
    <Container size="lg" style={{ paddingBlock: '2.5rem', textAlign: 'center' }}>
      <Stack gap={4} align="center">
        <Heading level={3} size="lg">Works with your modern React stack</Heading>
        <HStack gap={2} wrap="wrap" justify="center">
          {stack.map((s) => <Badge key={s} variant="outline" size="lg">{s}</Badge>)}
        </HStack>
      </Stack>
    </Container>
  );
}

export function FeaturesCodeToUiSplit() {
  return (
    <Container size="xl" style={{ paddingBlock: '2.5rem' }}>
      <Grid minChildWidth="260px" gap={6} align="center">
        <CodeBlock language="tsx" code={`<Button variant="soft" tone="success">Ready</Button>`} />
        <Box surface="subtle" radius="lg" p={6}>
          <HStack gap={3}>
            <Badge variant="dot" tone="success">Compiled Output</Badge>
            <Text size="sm">Instant preview with zero config.</Text>
          </HStack>
        </Box>
      </Grid>
    </Container>
  );
}
