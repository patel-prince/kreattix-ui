'use client';

import React, { useMemo, useState } from 'react';
import {
  Alert,
  Badge,
  Box,
  Button,
  Card,
  Grid,
  Heading,
  HStack,
  Input,
  KreattixProvider,
  RadioGroup,
  Select,
  Stack,
  Switch,
  THEME_PRESETS,
  Text,
  generateColorScale,
  generateThemeCss,
  midnight,
  useTheme,
  type ThemePresetName,
} from '@kreattix/ui';
import { CodeBlock } from '@/components/CodeBlock';

const BRAND_SWATCHES = ['#4f46e5', '#0ea5e9', '#10b981', '#e11d48', '#f59e0b', '#8b5cf6', '#18181b'];

export default function ThemeStudioPage() {
  const { resolvedMode, density, radius, setMode, setDensity, setRadius, setTheme, updateTheme } =
    useTheme();
  const [primaryHex, setPrimaryHex] = useState('#4f46e5');
  const [presetName, setPresetName] = useState<ThemePresetName>('kreattixDefault');

  const generatedScale = useMemo(() => {
    try {
      return generateColorScale(primaryHex);
    } catch {
      return null;
    }
  }, [primaryHex]);

  const applyPrimary = (hex: string) => {
    setPrimaryHex(hex);
    try {
      generateColorScale(hex);
      updateTheme({ colors: { primary: hex } });
    } catch {
      // wait for valid hex
    }
  };

  const applyPreset = (name: ThemePresetName) => {
    setPresetName(name);
    const preset = THEME_PRESETS[name];
    const presetPrimary = preset.colors?.primary;
    if (typeof presetPrimary === 'string') {
      setPrimaryHex(presetPrimary);
    } else if (presetPrimary && typeof presetPrimary === 'object') {
      setPrimaryHex(presetPrimary['600']);
    }
    setTheme(preset);
  };

  const exportedTs = `import { KreattixProvider } from '@kreattix/ui';

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <KreattixProvider
      theme={{
        mode: '${resolvedMode}',
        density: '${density}',
        radius: '${radius}',
        colors: {
          primary: '${primaryHex}',
        },
      }}
    >
      {children}
    </KreattixProvider>
  );
}`;

  const exportedCss = useMemo(
    () =>
      generateThemeCss({
        mode: resolvedMode,
        density,
        radius,
        colors: { primary: generatedScale ? primaryHex : '#4f46e5' },
      }),
    [resolvedMode, density, radius, primaryHex, generatedScale]
  );

  return (
    <Stack gap={8}>
      <Stack gap={2}>
        <Heading level={1} size="3xl">Live Theme Studio</Heading>
        <Text size="lg" tone="secondary">
          Customize your entire design system in real time—zero React re-renders—and export
          ready-to-paste TypeScript or static CSS.
        </Text>
      </Stack>

      <Grid minChildWidth="280px" gap={6} align="start">
        <Card>
          <Card.Header>
            <Heading level={2} size="md">Theme Controls</Heading>
          </Card.Header>
          <Card.Body>
            <Stack gap={5}>
              <Select
                label="Preset Theme"
                value={presetName}
                onValueChange={(v) => applyPreset(v as ThemePresetName)}
                options={[
                  { value: 'kreattixDefault', label: 'Kreattix Default' },
                  { value: 'midnight', label: 'Midnight (Dark)' },
                  { value: 'minimal', label: 'Minimal (Compact)' },
                  { value: 'enterprise', label: 'Enterprise' },
                  { value: 'vibrant', label: 'Vibrant (Pill)' },
                ]}
              />

              <Stack gap={2}>
                <Text size="sm" weight="medium">Primary Brand Color</Text>
                <HStack gap={2} wrap="wrap">
                  {BRAND_SWATCHES.map((hex) => (
                    <button
                      key={hex}
                      type="button"
                      aria-label={`Select color ${hex}`}
                      onClick={() => applyPrimary(hex)}
                      style={{
                        width: '1.85rem',
                        height: '1.85rem',
                        borderRadius: '9999px',
                        backgroundColor: hex,
                        border:
                          primaryHex.toLowerCase() === hex
                            ? '3px solid var(--kx-text-primary)'
                            : '1px solid var(--kx-border-default)',
                        cursor: 'pointer',
                      }}
                    />
                  ))}
                </HStack>
                <Input
                  value={primaryHex}
                  onChange={(e) => applyPrimary(e.target.value)}
                  placeholder="#4f46e5"
                />
              </Stack>

              <RadioGroup
                label="Color Mode"
                orientation="horizontal"
                value={resolvedMode}
                onValueChange={(v) => setMode(v as 'light' | 'dark')}
                options={[
                  { value: 'light', label: 'Light' },
                  { value: 'dark', label: 'Dark' },
                ]}
              />

              <RadioGroup
                label="Density"
                orientation="horizontal"
                value={density}
                onValueChange={(v) => setDensity(v as 'compact' | 'comfortable' | 'spacious')}
                options={[
                  { value: 'compact', label: 'Compact' },
                  { value: 'comfortable', label: 'Comfortable' },
                  { value: 'spacious', label: 'Spacious' },
                ]}
              />

              <Select
                label="Border Radius"
                value={radius}
                onValueChange={(v) => setRadius(v as 'none' | 'sm' | 'md' | 'lg' | 'full')}
                options={[
                  { value: 'none', label: 'None (0px)' },
                  { value: 'sm', label: 'Small' },
                  { value: 'md', label: 'Medium' },
                  { value: 'lg', label: 'Large' },
                  { value: 'full', label: 'Full Pill' },
                ]}
              />
            </Stack>
          </Card.Body>
        </Card>

        <Stack gap={5}>
          <Card>
            <Card.Header>
              <Heading level={2} size="md">Live Component Preview</Heading>
            </Card.Header>
            <Card.Body>
              <Stack gap={4}>
                <HStack gap={2} wrap="wrap">
                  <Button>Primary Action</Button>
                  <Button variant="soft">Soft Action</Button>
                  <Button variant="outline">Outline</Button>
                  <Badge variant="dot" tone="success">Active</Badge>
                </HStack>
                <Input label="Project Slug" defaultValue="acme-console" />
                <Switch label="Enable automatic WCAG contrast" defaultChecked />
                <Alert
                  tone="info"
                  title="Instant CSS Variable Scoping"
                  description="Wrap any subtree in a nested <KreattixProvider> for isolated dark/compact zones."
                />
              </Stack>
            </Card.Body>
          </Card>

          {/* Nested Scoped Theme Demo */}
          <KreattixProvider theme={{ ...midnight, density: 'compact' }}>
            <Box
              p={5}
              surface="surface"
              radius="lg"
              style={{ border: '1px solid var(--kx-border-default)' }}
            >
              <Stack gap={3}>
                <HStack justify="space-between">
                  <Heading level={3} size="sm">Nested Scoped Zone (Midnight + Compact)</Heading>
                  <Badge tone="primary" size="sm">Isolated</Badge>
                </HStack>
                <Text size="sm" tone="muted">
                  This panel runs inside its own nested <code>KreattixProvider</code> without
                  affecting the rest of the page.
                </Text>
                <HStack gap={2}>
                  <Button size="sm">Scoped Button</Button>
                  <Button size="sm" variant="outline">Secondary</Button>
                </HStack>
              </Stack>
            </Box>
          </KreattixProvider>
        </Stack>
      </Grid>

      <CodeBlock title="Exported TypeScript Config" code={exportedTs} />
      <CodeBlock
        title="Static Zero-JS CSS (generateThemeCss)"
        code={exportedCss.split('\n').slice(0, 22).join('\n') + '\n  /* ... */\n}'}
      />
    </Stack>
  );
}
