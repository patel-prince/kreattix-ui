'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Layers, Palette, ShieldCheck, Zap } from 'lucide-react';
import {
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Heading,
  HStack,
  Input,
  Progress,
  Select,
  Stack,
  Switch,
  Text,
  toast,
} from '@kreattix/ui';
import { COMPONENT_LIST } from '@/registry/components';

export default function HomePage() {
  return (
    <Stack gap={10}>
      {/* Hero */}
      <Stack gap={4} style={{ paddingTop: '1rem' }}>
        <HStack gap={2} wrap="wrap">
          <Badge variant="soft" tone="primary">
            Zero-Runtime CSS Variables
          </Badge>
          <Badge variant="dot" tone="success">
            {COMPONENT_LIST.length} Components Ready
          </Badge>
          <Badge variant="outline" tone="neutral">
            Radix UI Primitives
          </Badge>
        </HStack>

        <Heading level={1} size="3xl" style={{ maxWidth: '46rem' }}>
          Faster, easier to customize, and more ergonomic than Ant Design &amp; MUI.
        </Heading>

        <Text size="lg" tone="secondary" style={{ maxWidth: '42rem' }}>
          Kreattix UI combines a zero-runtime layered CSS engine, an advanced 3-tier{' '}
          <code>ThemeProvider</code>, Dual Ergonomics (1-liner props + Radix compound APIs), and an{' '}
          <code>unstyled</code> escape hatch—built for React 18/19 and Next.js App Router.
        </Text>

        <HStack gap={3} wrap="wrap" style={{ paddingTop: '0.5rem' }}>
          <Button asChild size="lg" rightIcon={<ArrowRight size={16} />}>
            <Link href="/docs/getting-started">Get Started</Link>
          </Button>
          <Button asChild size="lg" variant="outline" leftIcon={<Palette size={16} />}>
            <Link href="/docs/theme-studio">Open Theme Studio</Link>
          </Button>
          <Button asChild size="lg" variant="ghost">
            <Link href="/docs/components/button">Explore Components</Link>
          </Button>
        </HStack>
      </Stack>

      {/* Feature Highlights */}
      <Grid minChildWidth="220px" gap={4}>
        <Card variant="elevated">
          <Card.Body>
            <Stack gap={2}>
              <Zap size={20} color="var(--kx-primary-600)" />
              <Heading level={3} size="sm">Zero-Runtime CSS</Heading>
              <Text size="sm" tone="muted">
                No Emotion or CSS-in-JS runtime overhead. Instant theme &amp; density switching via{' '}
                <code>--kx-*</code> CSS variables with zero React re-renders.
              </Text>
            </Stack>
          </Card.Body>
        </Card>

        <Card variant="elevated">
          <Card.Body>
            <Stack gap={2}>
              <Palette size={20} color="var(--kx-primary-600)" />
              <Heading level={3} size="sm">3-Tier ThemeProvider</Heading>
              <Text size="sm" tone="muted">
                Auto-generate 11-step WCAG palettes from any hex color, nest scoped dark/compact
                zones, and override component <code>defaultProps</code> &amp; <code>slotClasses</code>.
              </Text>
            </Stack>
          </Card.Body>
        </Card>

        <Card variant="elevated">
          <Card.Body>
            <Stack gap={2}>
              <Layers size={20} color="var(--kx-primary-600)" />
              <Heading level={3} size="sm">Dual Ergonomics</Heading>
              <Text size="sm" tone="muted">
                Write 1-liners like <code>&lt;Select options=&#123;...&#125; /&gt;</code> or compose
                Radix subcomponents directly—plus <code>asChild</code> and <code>unstyled</code>.
              </Text>
            </Stack>
          </Card.Body>
        </Card>

        <Card variant="elevated">
          <Card.Body>
            <Stack gap={2}>
              <ShieldCheck size={20} color="var(--kx-primary-600)" />
              <Heading level={3} size="sm">Radix A11y + Field ARIA</Heading>
              <Text size="sm" tone="muted">
                WAI-ARIA focus traps, portals, and keyboard nav from Radix UI, plus automatic{' '}
                <code>aria-describedby</code> &amp; <code>aria-invalid</code> form wiring.
              </Text>
            </Stack>
          </Card.Body>
        </Card>
      </Grid>

      {/* Interactive Live Preview */}
      <Card>
        <Card.Header>
          <Heading level={2} size="md">Live Interactive Preview (100% Kreattix UI)</Heading>
        </Card.Header>
        <Card.Body>
          <Grid minChildWidth="260px" gap={6}>
            <Stack gap={4}>
              <Input label="Workspace Name" defaultValue="kreattix-prod" clearable />
              <Select
                label="Deployment Region"
                defaultValue="us-east"
                options={[
                  { value: 'us-east', label: 'US East (N. Virginia)' },
                  { value: 'eu-west', label: 'EU West (Ireland)' },
                ]}
              />
              <Switch label="Edge Caching Enabled" defaultChecked />
            </Stack>
            <Stack gap={4} justify="space-between">
              <Box surface="subtle" p={4} radius="md">
                <Stack gap={3}>
                  <HStack justify="space-between">
                    <Text weight="semibold" size="sm">Bundle Optimization</Text>
                    <Badge tone="success" size="sm">Optimal</Badge>
                  </HStack>
                  <Progress value={92} tone="success" showValue />
                </Stack>
              </Box>
              <HStack gap={2} justify="flex-end">
                <Button
                  variant="outline"
                  onClick={() =>
                    toast({
                      title: 'Preview ready',
                      description: 'All 67 components rendered with zero runtime CSS-in-JS.',
                      tone: 'info',
                    })
                  }
                >
                  Preview
                </Button>
                <Button
                  onClick={() =>
                    toast({
                      title: 'Changes published!',
                      description: 'Workspace kreattix-prod is live.',
                      tone: 'success',
                    })
                  }
                >
                  Publish Changes
                </Button>
              </HStack>
            </Stack>
          </Grid>
        </Card.Body>
      </Card>

      <Divider />

      {/* Comparison Table */}
      <Stack gap={3}>
        <Heading level={2} size="xl">Kreattix UI vs Ant Design &amp; MUI</Heading>
        <div className="docs-table-wrap">
          <table className="docs-table">
            <thead>
              <tr>
                <th>Capability</th>
                <th>MUI / Ant Design</th>
                <th>Kreattix UI</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Styling Engine</strong></td>
                <td>Runtime CSS-in-JS (Emotion / @ant-design/cssinjs)</td>
                <td>Zero-runtime layered CSS + <code>--kx-*</code> CSS variables</td>
              </tr>
              <tr>
                <td><strong>Next.js RSC Support</strong></td>
                <td>Requires registry/emotion cache setup</td>
                <td>Native RSC tokens + <code>&apos;use client&apos;</code> banners + <code>ThemeInitScript</code></td>
              </tr>
              <tr>
                <td><strong>Theme Switching</strong></td>
                <td>Triggers React re-renders &amp; style re-injection</td>
                <td>Instant CSS variable updates, zero re-renders, nested scoped zones</td>
              </tr>
              <tr>
                <td><strong>Customization</strong></td>
                <td>Specificity battles or verbose <code>sx</code>/<code>ConfigProvider</code></td>
                <td>3-tier: Tokens &rarr; <code>defaultProps/slotClasses</code> &rarr; <code>unstyled</code> prop</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Stack>
    </Stack>
  );
}
