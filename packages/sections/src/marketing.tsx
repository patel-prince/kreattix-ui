import React from 'react';
import {
  Accordion,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Container,
  Grid,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  Timeline,
} from '@kreattix-ui/react';

export function MarketingLogoCloud() {
  const brands = ['Vercel', 'Linear', 'Raycast', 'Supabase', 'Stripe', 'Figma'];
  return (
    <Container size="lg" style={{ paddingBlock: '2rem', textAlign: 'center' }}>
      <Stack gap={4}>
        <Text size="sm" tone="muted" weight="medium">TRUSTED BY PRODUCT TEAMS AT</Text>
        <HStack gap={4} justify="center" wrap="wrap">
          {brands.map((b) => <Badge key={b} variant="outline" size="lg">{b}</Badge>)}
        </HStack>
      </Stack>
    </Container>
  );
}

export function MarketingTestimonialGrid() {
  return (
    <Grid minChildWidth="220px" gap={4}>
      <Card>
        <Card.Body>
          <Stack gap={3}>
            <Text size="sm">&ldquo;Switching from runtime CSS-in-JS cut our bundle by 38%.&rdquo;</Text>
            <HStack gap={2}>
              <Avatar name="Maya Lin" size="sm" />
              <Text size="xs" weight="semibold">Maya Lin, Staff Frontend</Text>
            </HStack>
          </Stack>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Stack gap={3}>
            <Text size="sm">&ldquo;The 3-tier ThemeProvider made white-labeling effortless.&rdquo;</Text>
            <HStack gap={2}>
              <Avatar name="Liam Patel" size="sm" />
              <Text size="xs" weight="semibold">Liam Patel, Design Lead</Text>
            </HStack>
          </Stack>
        </Card.Body>
      </Card>
    </Grid>
  );
}

export function MarketingCaseStudy() {
  return (
    <Box surface="subtle" radius="lg" p={6}>
      <Stack gap={2}>
        <Badge tone="success">Case Study</Badge>
        <Heading level={3} size="lg">How Acme migrated 120 screens in 2 weeks</Heading>
        <Text size="sm" tone="secondary">Zero-runtime CSS and Dual Ergonomics boosted Lighthouse performance to 99.</Text>
      </Stack>
    </Box>
  );
}

export function MarketingFaqAccordion() {
  return (
    <Accordion
      type="single"
      collapsible
      items={[
        { value: 'q1', title: 'Is Kreattix UI free for commercial use?', content: 'Yes, MIT licensed for personal and enterprise apps.' },
        { value: 'q2', title: 'Does it support Next.js App Router?', content: 'Yes, with RSC-safe tokens and "use client" component bundles.' },
      ]}
    />
  );
}

export function MarketingChangelogTimeline() {
  return (
    <Timeline
      items={[
        { title: 'v0.2.0 — 67 Components & 82+ Sections', timestamp: 'Today', tone: 'success', description: 'Added DataGrid, DatePicker, CommandPalette, and @kreattix-ui/sections.' },
        { title: 'v0.1.0 — Core Design System', timestamp: 'Nov 2026', tone: 'primary', description: 'Launched 31 Radix-powered components and Live Theme Studio.' },
      ]}
    />
  );
}

export function MarketingBlogGrid() {
  return (
    <Grid minChildWidth="220px" gap={4}>
      <Card interactive><Card.Body><Badge size="sm">Engineering</Badge><Heading level={4} size="sm" style={{ marginTop: '0.5rem' }}>Why Zero-Runtime CSS Wins</Heading></Card.Body></Card>
      <Card interactive><Card.Body><Badge size="sm">Design</Badge><Heading level={4} size="sm" style={{ marginTop: '0.5rem' }}>11-Step Perceptual Scales</Heading></Card.Body></Card>
    </Grid>
  );
}

export function MarketingNewsletterBanner() {
  return (
    <Box surface="subtle" radius="lg" p={6}>
      <HStack justify="space-between" wrap="wrap" gap={4}>
        <Stack gap={1}>
          <Heading level={3} size="md">Stay in the loop</Heading>
          <Text size="sm" tone="muted">Monthly release notes and new section drops.</Text>
        </Stack>
        <HStack gap={2}>
          <Input placeholder="you@company.com" />
          <Button>Subscribe</Button>
        </HStack>
      </HStack>
    </Box>
  );
}

export function MarketingFooter() {
  return (
    <Box surface="surface" p={6} style={{ borderTop: '1px solid var(--kx-border-default)' }}>
      <HStack justify="space-between" wrap="wrap" gap={4}>
        <Text weight="bold">Kreattix UI</Text>
        <HStack gap={4}>
          <Text size="sm" tone="muted">Docs</Text>
          <Text size="sm" tone="muted">Theme Studio</Text>
          <Text size="sm" tone="muted">Roadmap</Text>
        </HStack>
        <Text size="xs" tone="muted">&copy; 2026 Kreattix UI</Text>
      </HStack>
    </Box>
  );
}
