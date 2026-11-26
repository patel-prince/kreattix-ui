'use client';

import React from 'react';
import { Heading, Text } from '@kreattix-ui/react';
import { getComponentBySlug } from '@/registry/components';
import { ComponentDocView } from './ComponentDocView';

export function ComponentPageClient({ slug }: { slug: string }) {
  const entry = getComponentBySlug(slug);
  if (!entry) {
    return (
      <div>
        <Heading level={1}>Component not found</Heading>
        <Text tone="muted">No documentation found for &ldquo;{slug}&rdquo;.</Text>
      </div>
    );
  }
  return <ComponentDocView entry={entry} />;
}
