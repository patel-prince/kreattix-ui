import { LAYOUT_DISPLAY_DOCS } from './layoutDisplay';
import { FORMS_DOCS } from './forms';
import { OVERLAYS_DOCS } from './overlays';
import { PHASE2_A_DOCS } from './phase2A';
import { PHASE2_B_DOCS } from './phase2B';
import type { ComponentCategory, ComponentDocEntry } from './types';

export const COMPONENT_LIST: ComponentDocEntry[] = [
  ...LAYOUT_DISPLAY_DOCS,
  ...FORMS_DOCS,
  ...OVERLAYS_DOCS,
  ...PHASE2_A_DOCS,
  ...PHASE2_B_DOCS,
];

export const COMPONENT_CATEGORIES: ComponentCategory[] = [
  'Layout',
  'Display',
  'Actions',
  'Forms',
  'Feedback & Navigation',
  'Overlays',
  'Enterprise Data',
];

export function getComponentBySlug(slug: string): ComponentDocEntry | undefined {
  return COMPONENT_LIST.find((c) => c.slug === slug);
}
