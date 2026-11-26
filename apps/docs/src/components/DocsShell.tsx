'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, Moon, Palette, Search, Sparkles, Sun } from 'lucide-react';
import { useTheme } from '@kreattix-ui/theme';
import { Badge, Button, Dialog, Drawer, HStack, IconButton, Input, Stack, Text } from '@kreattix-ui/react';
import { COMPONENT_CATEGORIES, COMPONENT_LIST } from '@/registry/components';

const GUIDE_LINKS = [
  { href: '/docs/getting-started', label: 'Getting Started' },
  { href: '/docs/design-system', label: 'Design System' },
  { href: '/docs/theme-studio', label: 'Theme Studio' },
  { href: '/docs/sections', label: 'Sections Gallery (82)' },
  { href: '/docs/roadmap', label: 'Roadmap' },
];

export function DocsShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { resolvedMode, toggleMode, density, setDensity } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const filteredComponents = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COMPONENT_LIST;
    return COMPONENT_LIST.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="docs-shell">
      <header className="docs-header">
        <HStack gap={3}>
          <IconButton
            className="docs-mobile-menu-btn"
            variant="outline"
            size="sm"
            aria-label="Open navigation menu"
            icon={<Menu size={16} />}
            onClick={() => setMobileNavOpen(true)}
          />
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              textDecoration: 'none',
              color: 'var(--kx-text-primary)',
              fontWeight: 700,
              fontSize: '1.0625rem',
              whiteSpace: 'nowrap',
            }}
          >
            <span
              style={{
                width: '1.75rem',
                height: '1.75rem',
                borderRadius: 'var(--kx-radius-md)',
                backgroundColor: 'var(--kx-primary-600)',
                color: 'var(--kx-primary-foreground)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Sparkles size={15} />
            </span>
            <span>Kreattix UI</span>
          </Link>
          <Badge variant="soft" tone="primary" size="sm">
            v0.1.0
          </Badge>
        </HStack>

        <HStack gap={2}>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Search size={14} />}
            onClick={() => setSearchOpen(true)}
          >
            <span>Search</span>
            <span className="docs-kbd docs-desktop-only">Ctrl K</span>
          </Button>

          <Button
            className="docs-desktop-only"
            variant="ghost"
            size="sm"
            onClick={() =>
              setDensity(
                density === 'compact'
                  ? 'comfortable'
                  : density === 'comfortable'
                    ? 'spacious'
                    : 'compact'
              )
            }
          >
            Density: {density}
          </Button>

          <Button
            asChild
            className="docs-desktop-only"
            variant="soft"
            size="sm"
            leftIcon={<Palette size={14} />}
          >
            <Link href="/docs/theme-studio">Theme Studio</Link>
          </Button>

          <IconButton
            variant="outline"
            size="sm"
            aria-label="Toggle color mode"
            icon={resolvedMode === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            onClick={toggleMode}
          />
        </HStack>
      </header>

      <div className="docs-body">
        <aside className="docs-sidebar" aria-label="Documentation navigation">
          <div className="docs-nav-group-title">Guides</div>
          <Stack gap={1}>
            {GUIDE_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="docs-nav-link"
                data-active={pathname === item.href}
              >
                <span>{item.label}</span>
              </Link>
            ))}
          </Stack>

          {COMPONENT_CATEGORIES.map((category) => {
            const items = COMPONENT_LIST.filter((c) => c.category === category);
            return (
              <div key={category}>
                <div className="docs-nav-group-title">
                  {category} ({items.length})
                </div>
                <Stack gap={1}>
                  {items.map((comp) => {
                    const href = `/docs/components/${comp.slug}`;
                    return (
                      <Link
                        key={comp.slug}
                        href={href}
                        className="docs-nav-link"
                        data-active={pathname === href}
                      >
                        <span>{comp.name}</span>
                        {comp.radix && (
                          <Badge variant="soft" tone="neutral" size="sm">
                            Radix
                          </Badge>
                        )}
                      </Link>
                    );
                  })}
                </Stack>
              </div>
            );
          })}
        </aside>

        <main className="docs-main">{children}</main>
      </div>

      <Dialog
        open={searchOpen}
        onOpenChange={(open) => {
          setSearchOpen(open);
          if (!open) setQuery('');
        }}
        title="Quick Jump"
        description={`Search all ${COMPONENT_LIST.length} Kreattix UI components`}
        size="md"
      >
        <Stack gap={3}>
          <Input
            placeholder="Type component name (e.g. Dialog, Select, Button)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            clearable
            onClear={() => setQuery('')}
          />
          <Stack gap={1} style={{ maxHeight: '18rem', overflowY: 'auto' }}>
            {filteredComponents.map((comp) => (
              <Button
                key={comp.slug}
                variant="ghost"
                style={{ justifyContent: 'space-between', width: '100%' }}
                onClick={() => {
                  setSearchOpen(false);
                  setQuery('');
                  router.push(`/docs/components/${comp.slug}`);
                }}
              >
                <span>{comp.name}</span>
                <Text as="span" size="xs" tone="muted">
                  {comp.category}
                </Text>
              </Button>
            ))}
            {filteredComponents.length === 0 && (
              <Text size="sm" tone="muted" style={{ padding: '1rem', textAlign: 'center' }}>
                No components match &ldquo;{query}&rdquo;.
              </Text>
            )}
          </Stack>
        </Stack>
      </Dialog>
      <Drawer
        side="left"
        open={mobileNavOpen}
        onOpenChange={setMobileNavOpen}
        title="Kreattix UI Navigation"
      >
        <Stack gap={1}>
          <div className="docs-nav-group-title">Guides</div>
          {GUIDE_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="docs-nav-link"
              data-active={pathname === item.href}
              onClick={() => setMobileNavOpen(false)}
            >
              <span>{item.label}</span>
            </Link>
          ))}
          {COMPONENT_CATEGORIES.map((category) => {
            const items = COMPONENT_LIST.filter((c) => c.category === category);
            return (
              <div key={category}>
                <div className="docs-nav-group-title">
                  {category} ({items.length})
                </div>
                <Stack gap={1}>
                  {items.map((comp) => {
                    const href = `/docs/components/${comp.slug}`;
                    return (
                      <Link
                        key={comp.slug}
                        href={href}
                        className="docs-nav-link"
                        data-active={pathname === href}
                        onClick={() => setMobileNavOpen(false)}
                      >
                        <span>{comp.name}</span>
                      </Link>
                    );
                  })}
                </Stack>
              </div>
            );
          })}
        </Stack>
      </Drawer>
    </div>
  );
}
