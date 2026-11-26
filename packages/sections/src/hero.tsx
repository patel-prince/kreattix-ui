import React, { useState } from 'react';
import {
  Badge,
  Box,
  Button,
  Card,
  CodeBlock,
  Container,
  Grid,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
} from '@kreattix-ui/react';

export interface HeroSectionProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  primaryCta?: string;
  secondaryCta?: string;
  onPrimaryClick?: () => void;
}

export function HeroCentered({
  badge = 'v0.2.0 Released',
  title = 'Ship enterprise UIs with zero-runtime CSS',
  subtitle = '67 Radix-powered components, 3-tier theming, and 80+ readymade sections built for React and Next.js.',
  primaryCta = 'Get Started',
  secondaryCta = 'View Components',
  onPrimaryClick,
}: HeroSectionProps) {
  return (
    <Container size="lg" style={{ paddingBlock: '4rem', textAlign: 'center' }}>
      <Stack gap={4} align="center">
        <Badge variant="soft" tone="primary">{badge}</Badge>
        <Heading level={1} size="3xl" style={{ maxWidth: '42rem' }}>{title}</Heading>
        <Text size="lg" tone="secondary" style={{ maxWidth: '36rem' }}>{subtitle}</Text>
        <HStack gap={3} wrap="wrap" justify="center">
          <Button size="lg" onClick={onPrimaryClick}>{primaryCta}</Button>
          <Button size="lg" variant="outline">{secondaryCta}</Button>
        </HStack>
      </Stack>
    </Container>
  );
}

export function HeroSplitPreview({
  badge = 'Adaptive Clarity',
  title = 'Design systems that scale without CSS-in-JS bloat',
  subtitle = 'Customize brand palettes, density, and slot classes globally with zero React re-renders.',
  primaryCta = 'Start Building',
}: HeroSectionProps) {
  return (
    <Container size="xl" style={{ paddingBlock: '3.5rem' }}>
      <Grid minChildWidth="280px" gap={8} align="center">
        <Stack gap={4}>
          <Badge variant="dot" tone="success">{badge}</Badge>
          <Heading level={1} size="2xl">{title}</Heading>
          <Text size="md" tone="secondary">{subtitle}</Text>
          <HStack gap={3}>
            <Button>{primaryCta}</Button>
            <Button variant="ghost">Live Demo</Button>
          </HStack>
        </Stack>
        <Card variant="elevated">
          <Card.Body>
            <Stack gap={3}>
              <Text weight="semibold">Instant Brand Theme</Text>
              <Input label="Workspace" defaultValue="kreattix-cloud" />
              <Button fullWidth>Deploy Edge App</Button>
            </Stack>
          </Card.Body>
        </Card>
      </Grid>
    </Container>
  );
}

export function HeroDeveloperCli({
  title = 'One command to your next design system',
  subtitle = 'Zero icon lock-in, full TypeScript strictness, and Next.js App Router ready.',
}: HeroSectionProps) {
  return (
    <Container size="lg" style={{ paddingBlock: '3.5rem' }}>
      <Stack gap={5} align="center" style={{ textAlign: 'center' }}>
        <Heading level={1} size="2xl">{title}</Heading>
        <Text tone="secondary" style={{ maxWidth: '34rem' }}>{subtitle}</Text>
        <div style={{ width: '100%', maxWidth: '32rem', textAlign: 'left' }}>
          <CodeBlock language="bash" code="npm install @kreattix-ui/react @kreattix-ui/theme @kreattix-ui/tokens" />
        </div>
      </Stack>
    </Container>
  );
}

export function HeroWaitlist({
  title = 'Early access to Kreattix Sections',
  subtitle = 'Join 12,000+ engineers building faster React and Next.js products.',
}: HeroSectionProps) {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);
  return (
    <Container size="md" style={{ paddingBlock: '3.5rem', textAlign: 'center' }}>
      <Stack gap={4} align="center">
        <Badge tone="info">Private Beta</Badge>
        <Heading level={1} size="2xl">{title}</Heading>
        <Text tone="secondary">{subtitle}</Text>
        <HStack gap={2} style={{ width: '100%', maxWidth: '26rem' }}>
          <Input placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Button onClick={() => setJoined(true)}>{joined ? 'Joined!' : 'Join Waitlist'}</Button>
        </HStack>
      </Stack>
    </Container>
  );
}

export function HeroEnterpriseTrust({
  title = 'Built for mission-critical enterprise consoles',
  subtitle = 'WCAG 2.1 AA contrast, Radix keyboard navigation, and compact density out of the box.',
}: HeroSectionProps) {
  return (
    <Container size="xl" style={{ paddingBlock: '3.5rem' }}>
      <Box surface="subtle" radius="xl" p={8}>
        <Stack gap={4}>
          <Badge tone="neutral">SOC2 &amp; WCAG Ready</Badge>
          <Heading level={1} size="2xl" style={{ maxWidth: '38rem' }}>{title}</Heading>
          <Text tone="secondary" style={{ maxWidth: '36rem' }}>{subtitle}</Text>
          <HStack gap={3}>
            <Button>Request Enterprise Demo</Button>
            <Button variant="outline">Security Whitepaper</Button>
          </HStack>
        </Stack>
      </Box>
    </Container>
  );
}

export function HeroGradientMesh({
  title = 'Craft interfaces that feel effortless',
  subtitle = 'Perceptual 11-step color scales generated from a single brand hex.',
}: HeroSectionProps) {
  return (
    <Box
      p={8}
      radius="xl"
      style={{
        background: 'linear-gradient(135deg, var(--kx-primary-600), var(--kx-info-600))',
        color: '#ffffff',
        textAlign: 'center',
      }}
    >
      <Stack gap={4} align="center">
        <Heading level={1} size="2xl" style={{ color: '#ffffff' }}>{title}</Heading>
        <Text style={{ color: 'rgba(255,255,255,0.9)', maxWidth: '34rem' }}>{subtitle}</Text>
        <HStack gap={3}>
          <Button variant="solid" tone="neutral">Explore Theme Studio</Button>
        </HStack>
      </Stack>
    </Box>
  );
}

export function HeroInteractiveDemo() {
  const [count, setCount] = useState(0);
  return (
    <Container size="lg" style={{ paddingBlock: '3rem' }}>
      <Card variant="elevated">
        <Card.Body>
          <HStack justify="space-between" wrap="wrap" gap={4}>
            <Stack gap={2} style={{ maxWidth: '28rem' }}>
              <Badge tone="primary">Interactive Hero</Badge>
              <Heading level={2} size="xl">Try zero-re-render interactions</Heading>
              <Text size="sm" tone="muted">Every component ships with accessible state &amp; slots.</Text>
            </Stack>
            <HStack gap={3}>
              <Button variant="outline" onClick={() => setCount((c) => c + 1)}>
                Clicked {count} times
              </Button>
              <Button>Continue</Button>
            </HStack>
          </HStack>
        </Card.Body>
      </Card>
    </Container>
  );
}

export function HeroVideoShowcase({
  title = 'See Kreattix UI in 60 seconds',
  subtitle = 'From token generation to production Next.js App Router deployment.',
}: HeroSectionProps) {
  return (
    <Container size="lg" style={{ paddingBlock: '3rem', textAlign: 'center' }}>
      <Stack gap={4} align="center">
        <Heading level={1} size="2xl">{title}</Heading>
        <Text tone="secondary">{subtitle}</Text>
        <Box
          surface="muted"
          radius="lg"
          p={8}
          style={{ width: '100%', maxWidth: '40rem', border: '1px solid var(--kx-border-default)' }}
        >
          <Stack gap={3} align="center">
            <Badge tone="primary">Walkthrough Preview</Badge>
            <Button>Play Product Tour</Button>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
