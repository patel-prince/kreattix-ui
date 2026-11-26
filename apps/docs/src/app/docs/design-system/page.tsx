'use client';

import React from 'react';
import { PALETTES } from '@kreattix/ui';
import { Box, Card, Grid, Heading, Stack, Text } from '@kreattix/ui';

const STEPS = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] as const;

export default function DesignSystemPage() {
  return (
    <Stack gap={8}>
      <Stack gap={2}>
        <Heading level={1} size="3xl">Kreattix Design System</Heading>
        <Text size="lg" tone="secondary">
          Adaptive Clarity: 11-step perceptual shade scales, optical typography, 3 density modes,
          and layered elevation tokens.
        </Text>
      </Stack>

      <Stack gap={4}>
        <Heading level={2} size="xl">Built-in Color Scales (50–950)</Heading>
        <Stack gap={4}>
          {Object.entries(PALETTES).map(([name, scale]) => (
            <Card key={name}>
              <Card.Body>
                <Stack gap={2}>
                  <Text weight="semibold" style={{ textTransform: 'capitalize' }}>
                    {name}
                  </Text>
                  <Grid columns={11} gap={1}>
                    {STEPS.map((step) => (
                      <Stack key={step} gap={1} align="center">
                        <div
                          style={{
                            width: '100%',
                            height: '2.5rem',
                            borderRadius: 'var(--kx-radius-sm)',
                            backgroundColor: scale[step],
                            border: '1px solid var(--kx-border-subtle)',
                          }}
                          title={`${name}-${step}: ${scale[step]}`}
                        />
                        <Text size="xs" tone="muted">{step}</Text>
                      </Stack>
                    ))}
                  </Grid>
                </Stack>
              </Card.Body>
            </Card>
          ))}
        </Stack>
      </Stack>

      <Stack gap={4}>
        <Heading level={2} size="xl">Typography Scale</Heading>
        <Card>
          <Card.Body>
            <Stack gap={3}>
              <Heading level={1} size="3xl">Display 3XL — Adaptive Clarity</Heading>
              <Heading level={2} size="2xl">Heading 2XL — Zero-Runtime Tokens</Heading>
              <Heading level={3} size="xl">Heading XL — Radix Primitives</Heading>
              <Text size="lg">Body LG — Lead paragraph copy</Text>
              <Text size="md">Body MD — Standard interface copy</Text>
              <Text size="sm" tone="muted">Body SM — Helper descriptions &amp; metadata</Text>
            </Stack>
          </Card.Body>
        </Card>
      </Stack>

      <Stack gap={4}>
        <Heading level={2} size="xl">Elevation &amp; Radius Tokens</Heading>
        <Grid minChildWidth="180px" gap={4}>
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((level) => (
            <Box
              key={level}
              p={5}
              surface="surface"
              radius="lg"
              style={{
                boxShadow: `var(--kx-shadow-${level})`,
                border: '1px solid var(--kx-border-subtle)',
              }}
            >
              <Stack gap={1}>
                <Text weight="semibold" size="sm">shadow-{level}</Text>
                <Text size="xs" tone="muted">--kx-shadow-{level}</Text>
              </Stack>
            </Box>
          ))}
        </Grid>

        <Grid minChildWidth="150px" gap={4}>
          {(['none', 'sm', 'md', 'lg', 'xl', 'full'] as const).map((rad) => (
            <Box
              key={rad}
              p={4}
              surface="subtle"
              radius={rad}
              style={{ border: '1px solid var(--kx-border-default)' }}
            >
              <Stack gap={1} align="center">
                <Text weight="semibold" size="sm">radius-{rad}</Text>
                <Text size="xs" tone="muted">--kx-radius-{rad}</Text>
              </Stack>
            </Box>
          ))}
        </Grid>
      </Stack>
    </Stack>
  );
}
