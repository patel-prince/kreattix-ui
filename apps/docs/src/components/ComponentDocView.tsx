'use client';

import React, { useMemo, useState } from 'react';
import {
  Badge,
  Box,
  Card,
  Divider,
  Grid,
  Heading,
  HStack,
  Input,
  Select,
  Stack,
  Switch,
  Tabs,
  Text,
} from '@kreattix-ui/react';
import type { ComponentDocEntry } from '@/registry/types';
import { CodeBlock } from './CodeBlock';

function renderInlineCode(text: string): React.ReactNode {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, idx) =>
    part.startsWith('`') && part.endsWith('`') ? (
      <code
        key={idx}
        style={{
          fontFamily: 'var(--kx-font-mono)',
          fontSize: '0.88em',
          padding: '0.1rem 0.35rem',
          borderRadius: 'var(--kx-radius-sm)',
          backgroundColor: 'var(--kx-bg-subtle)',
          border: '1px solid var(--kx-border-subtle)',
        }}
      >
        {part.slice(1, -1)}
      </code>
    ) : (
      <React.Fragment key={idx}>{part}</React.Fragment>
    )
  );
}

export function ComponentDocView({ entry }: { entry: ComponentDocEntry }) {
  const initialValues = useMemo(() => {
    const acc: Record<string, string | boolean | number> = {};
    for (const ctrl of entry.playgroundControls) {
      acc[ctrl.name] = ctrl.defaultValue;
    }
    return acc;
  }, [entry]);

  const [values, setValues] = useState<Record<string, string | boolean | number>>(initialValues);

  const setControl = (name: string, val: string | boolean | number) => {
    setValues((prev) => ({ ...prev, [name]: val }));
  };

  const generatedCode = entry.generatePlaygroundCode(values);

  return (
    <Stack gap={8}>
      {/* Header */}
      <Stack gap={3}>
        <HStack gap={2} wrap="wrap">
          <Badge variant="soft" tone="primary">
            {entry.category}
          </Badge>
          {entry.radix && (
            <Badge variant="outline" tone="neutral">
              Powered by {entry.radix}
            </Badge>
          )}
          <Badge variant="soft" tone="success">
            RSC Safe (&apos;use client&apos;)
          </Badge>
        </HStack>
        <Heading level={1} size="3xl">
          {entry.name}
        </Heading>
        <Text size="lg" tone="secondary">
          {renderInlineCode(entry.description)}
        </Text>
      </Stack>

      <CodeBlock title="Import (React / Next.js / TypeScript)" code={entry.importCode} />

      {/* Interactive Prop Playground */}
      <Stack gap={3}>
        <Heading level={2} size="xl">
          Interactive Playground
        </Heading>
        <div className="docs-preview-stage">
          <div className="docs-preview-canvas">{entry.renderPlayground(values)}</div>
          {entry.playgroundControls.length > 0 && (
            <Box
              p={4}
              surface="subtle"
              style={{ borderTop: '1px solid var(--kx-border-default)' }}
            >
              <Grid minChildWidth="190px" gap={4} align="end">
                {entry.playgroundControls.map((ctrl) => {
                  const val = values[ctrl.name];
                  if (ctrl.type === 'boolean') {
                    return (
                      <Switch
                        key={ctrl.name}
                        label={ctrl.label}
                        checked={Boolean(val)}
                        onCheckedChange={(checked) => setControl(ctrl.name, checked)}
                      />
                    );
                  }
                  if (ctrl.type === 'select' && ctrl.options) {
                    return (
                      <Select
                        key={ctrl.name}
                        label={ctrl.label}
                        value={String(val)}
                        onValueChange={(v) => setControl(ctrl.name, v)}
                        options={ctrl.options.map((opt) => ({ value: opt, label: opt }))}
                      />
                    );
                  }
                  if (ctrl.type === 'number') {
                    return (
                      <Input
                        key={ctrl.name}
                        type="number"
                        label={ctrl.label}
                        value={String(val)}
                        onChange={(e) => setControl(ctrl.name, Number(e.target.value))}
                      />
                    );
                  }
                  return (
                    <Input
                      key={ctrl.name}
                      label={ctrl.label}
                      value={String(val)}
                      onChange={(e) => setControl(ctrl.name, e.target.value)}
                    />
                  );
                })}
              </Grid>
            </Box>
          )}
          <Box p={3} style={{ borderTop: '1px solid var(--kx-border-default)' }}>
            <CodeBlock code={generatedCode} />
          </Box>
        </div>
      </Stack>

      <Divider />

      {/* Multi-Scenario Examples */}
      <Stack gap={4}>
        <Heading level={2} size="xl">
          Usage Examples
        </Heading>
        <Stack gap={5}>
          {entry.examples.map((ex, idx) => (
            <Card key={idx}>
              <Card.Header>
                <Heading level={3} size="sm">
                  {ex.title}
                </Heading>
                <Text size="sm" tone="muted" style={{ marginTop: '0.25rem' }}>
                  {renderInlineCode(ex.description)}
                </Text>
              </Card.Header>
              <div className="docs-preview-canvas">{ex.render()}</div>
              <Box p={3} style={{ borderTop: '1px solid var(--kx-border-subtle)' }}>
                <CodeBlock code={ex.code} />
              </Box>
            </Card>
          ))}
        </Stack>
      </Stack>

      <Divider />

      {/* API, CSS Vars & Accessibility Tabs */}
      <Stack gap={4}>
        <Heading level={2} size="xl">
          API &amp; Accessibility Reference
        </Heading>
        <Tabs
          variant="pill"
          items={[
            {
              value: 'props',
              label: `Props (${entry.props.length})`,
              content: (
                <div className="docs-table-wrap">
                  <table className="docs-table">
                    <thead>
                      <tr>
                        <th>Prop</th>
                        <th>Type</th>
                        <th>Default</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {entry.props.map((p) => (
                        <tr key={p.name}>
                          <td>
                            <code>{p.name}</code>
                            {p.required && (
                              <Badge tone="danger" size="sm" style={{ marginLeft: '0.35rem' }}>
                                required
                              </Badge>
                            )}
                          </td>
                          <td>
                            <code style={{ color: 'var(--kx-primary-600)' }}>{p.type}</code>
                          </td>
                          <td>
                            <code>{p.defaultValue}</code>
                          </td>
                          <td>{p.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ),
            },
            {
              value: 'slots',
              label: `Slots & CSS Vars (${entry.slots.length + entry.cssVars.length})`,
              content: (
                <Stack gap={4}>
                  <div className="docs-table-wrap">
                    <table className="docs-table">
                      <thead>
                        <tr>
                          <th>data-slot</th>
                          <th>Purpose (classNames / styles / ThemeProvider slotClasses)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {entry.slots.map((s) => (
                          <tr key={s.name}>
                            <td>
                              <code>{s.name}</code>
                            </td>
                            <td>{s.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="docs-table-wrap">
                    <table className="docs-table">
                      <thead>
                        <tr>
                          <th>CSS Variable</th>
                          <th>Default</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {entry.cssVars.map((v) => (
                          <tr key={v.token}>
                            <td>
                              <code>{v.token}</code>
                            </td>
                            <td>
                              <code>{v.defaultValue}</code>
                            </td>
                            <td>{v.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Stack>
              ),
            },
            {
              value: 'a11y',
              label: `Accessibility (${entry.a11y.length})`,
              content: (
                <div className="docs-table-wrap">
                  <table className="docs-table">
                    <thead>
                      <tr>
                        <th>Key / ARIA Attribute</th>
                        <th>Behavior</th>
                      </tr>
                    </thead>
                    <tbody>
                      {entry.a11y.map((a) => (
                        <tr key={a.key}>
                          <td>
                            <span className="docs-kbd">{a.key}</span>
                          </td>
                          <td>{a.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ),
            },
          ]}
        />
      </Stack>
    </Stack>
  );
}
