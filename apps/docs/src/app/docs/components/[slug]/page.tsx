import React from 'react';
import { notFound } from 'next/navigation';
import { ComponentPageClient } from '@/components/ComponentPageClient';
import { COMPONENT_SLUGS } from '@/registry/meta';

export function generateStaticParams() {
  return COMPONENT_SLUGS.map((slug) => ({ slug }));
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!COMPONENT_SLUGS.includes(slug as (typeof COMPONENT_SLUGS)[number])) {
    notFound();
  }
  return <ComponentPageClient slug={slug} />;
}
