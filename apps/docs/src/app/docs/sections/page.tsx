'use client';

import React, { useMemo, useState } from 'react';
import { SECTION_CATEGORIES, SECTIONS_CATALOG, type SectionCategory } from '@kreattix-ui/sections';
import {
  Badge,
  Box,
  Button,
  Card,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
} from '@kreattix-ui/react';
import { CodeBlock } from '@/components/CodeBlock';

export default function SectionsGalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<SectionCategory | 'All'>('All');
  const [query, setQuery] = useState('');
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop');
  const [openCodeId, setOpenCodeId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SECTIONS_CATALOG.filter((item) => {
      const catMatch = selectedCategory === 'All' || item.category === selectedCategory;
      const qMatch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);
      return catMatch && qMatch;
    });
  }, [selectedCategory, query]);

  return (
    <Stack gap={6}>
      <Stack gap={2}>
        <HStack gap={2}>
          <Badge tone="success">@kreattix-ui/sections</Badge>
          <Badge tone="primary">{SECTIONS_CATALOG.length} Readymade Sections</Badge>
        </HStack>
        <Heading level={1} size="3xl">Sections Gallery</Heading>
        <Text size="lg" tone="secondary">
          Production-ready sections built 100% with Kreattix UI. Import directly from{' '}
          <code>@kreattix-ui/sections</code> or copy the TSX snippet.
        </Text>
      </Stack>

      <HStack justify="space-between" wrap="wrap" gap={3}>
        <Input
          placeholder="Search 82 sections..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          clearable
          onClear={() => setQuery('')}
          style={{ maxWidth: '20rem' }}
        />
        <HStack gap={2}>
          <Button
            size="sm"
            variant={viewport === 'desktop' ? 'solid' : 'outline'}
            onClick={() => setViewport('desktop')}
          >
            Desktop
          </Button>
          <Button
            size="sm"
            variant={viewport === 'mobile' ? 'solid' : 'outline'}
            onClick={() => setViewport('mobile')}
          >
            Mobile (390px)
          </Button>
        </HStack>
      </HStack>

      <HStack gap={2} wrap="wrap">
        <Button
          size="xs"
          variant={selectedCategory === 'All' ? 'solid' : 'soft'}
          onClick={() => setSelectedCategory('All')}
        >
          All ({SECTIONS_CATALOG.length})
        </Button>
        {SECTION_CATEGORIES.map((cat) => {
          const count = SECTIONS_CATALOG.filter((s) => s.category === cat).length;
          return (
            <Button
              key={cat}
              size="xs"
              variant={selectedCategory === cat ? 'solid' : 'soft'}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat} ({count})
            </Button>
          );
        })}
      </HStack>

      <Stack gap={6}>
        {filtered.map((item) => {
          const Comp = item.Component;
          const showingCode = openCodeId === item.id;
          return (
            <Card key={item.id}>
              <Card.Header>
                <HStack justify="space-between" wrap="wrap" gap={2}>
                  <div>
                    <HStack gap={2}>
                      <Heading level={3} size="sm">{item.name}</Heading>
                      <Badge size="sm" variant="outline">{item.category}</Badge>
                    </HStack>
                    <Text size="xs" tone="muted" style={{ marginTop: '0.2rem' }}>
                      {item.description}
                    </Text>
                  </div>
                  <Button
                    size="xs"
                    variant="outline"
                    onClick={() => setOpenCodeId(showingCode ? null : item.id)}
                  >
                    {showingCode ? 'Hide Code' : 'View TSX'}
                  </Button>
                </HStack>
              </Card.Header>
              <Box
                p={4}
                style={{
                  maxWidth: viewport === 'mobile' ? '390px' : '100%',
                  marginInline: viewport === 'mobile' ? 'auto' : undefined,
                  borderInline: viewport === 'mobile' ? '1px dashed var(--kx-border-strong)' : undefined,
                }}
              >
                <Comp />
              </Box>
              {showingCode && (
                <Box p={3} style={{ borderTop: '1px solid var(--kx-border-subtle)' }}>
                  <CodeBlock code={item.code} />
                </Box>
              )}
            </Card>
          );
        })}
      </Stack>
    </Stack>
  );
}
