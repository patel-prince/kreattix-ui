# Kreattix Design System Guidelines

> **Design Philosophy: Adaptive Clarity**
> Precision-engineered interfaces that feel effortless out of the box, adapt to any brand identity with zero runtime overhead, and scale from compact enterprise consoles to spacious consumer apps.

---

## 1. Core Principles

1. **Zero-Runtime Styling, Instant Adaptation**
   Every visual token resolves to a CSS Custom Property (`--kx-*`) inside `@layer kreattix.base, kreattix.components, kreattix.utilities`. Theme, density, radius, and dark/light mode changes update CSS variables without re-rendering React subtrees.
2. **Dual Ergonomics (Simple + Composable)**
   Common tasks take one line (`<Select options={...} />`, `<Dialog title="..." trigger={...} />`), while complex UIs drop seamlessly into Radix-style compound composition (`<Dialog.Root><Dialog.Trigger />...</Dialog.Root>`).
3. **Accessible by Construction**
   Interactive primitives are powered by **Radix UI Primitives** for WAI-ARIA roles, focus trapping, roving tabindex, portal management, and keyboard navigation. Form controls integrate `label`, `description`, `error`, and `required` with automatic `aria-describedby` and `aria-invalid` wiring.
4. **3-Tier Customization + Unstyled Escape Hatch**
   Customize globally via **Design Tokens**, at the library level via **`ThemeProvider` (`defaultProps`, `tokens`, `slotClasses`)**, or per-instance via **`classNames` / `styles` slots** — or pass `unstyled` to strip Kreattix styles completely.

---

## 2. Color Architecture

### 11-Step Perceptual Shade Scale (`50`–`950`)
Every palette (`primary`, `neutral`, `success`, `warning`, `danger`, `info`) defines 11 steps plus an automatically calculated WCAG-safe `foreground` contrast color:

| Step | Usage |
|---|---|
| `50` | Subtle tinted backgrounds, hover surfaces in light mode |
| `100` | Soft badge/button fills, active list item backgrounds |
| `200` | Subtle borders on tinted surfaces |
| `300` | Interactive borders, focus halos |
| `400` | Secondary icons, muted accents |
| `500` | **Base brand / semantic tone** |
| `600` | Primary solid button fill, high-contrast interactive accents |
| `700` | Hover state for solid primary controls |
| `800` | Active/pressed state, strong emphasis text on light surfaces |
| `900` | Deep headings, dark mode surface accents |
| `950` | Deepest ink / dark mode canvas |

### Semantic Surface & Content Tokens
- **Surfaces**: `--kx-bg-canvas`, `--kx-bg-surface`, `--kx-bg-elevated`, `--kx-bg-subtle`, `--kx-bg-muted`
- **Text**: `--kx-text-primary`, `--kx-text-secondary`, `--kx-text-muted`, `--kx-text-inverse`
- **Borders**: `--kx-border-default`, `--kx-border-subtle`, `--kx-border-strong`, `--kx-border-focus`
- **Status**: `--kx-success-*`, `--kx-warning-*`, `--kx-danger-*`, `--kx-info-*`

---

## 3. Typography & Optical Rhythm

| Token | Size | Line Height | Tracking | Usage |
|---|---|---|---|---|
| `xs` | `0.75rem` (12px) | `1rem` | `0.01em` | Captions, badges, keyboard hints |
| `sm` | `0.875rem` (14px) | `1.25rem` | `0em` | Default UI controls, labels, dense tables |
| `md` | `1rem` (16px) | `1.5rem` | `-0.01em` | Body copy, comfortable inputs |
| `lg` | `1.125rem` (18px) | `1.75rem` | `-0.015em` | Lead text, card titles |
| `xl` | `1.25rem` (20px) | `1.75rem` | `-0.02em` | Section headings |
| `2xl` | `1.5rem` (24px) | `2rem` | `-0.025em` | Page titles |
| `3xl` | `1.875rem` (30px) | `2.25rem` | `-0.03em` | Hero subheadings |
| `4xl` | `2.25rem` (36px) | `2.5rem` | `-0.035em` | Display headlines |

---

## 4. Spatial & Density System

Kreattix UI uses a **4px base grid** multiplied by a CSS `--kx-density-scale` token:

| Density Mode | `--kx-density-scale` | Control Height (`md`) | Ideal For |
|---|---|---|---|
| `compact` | `0.85` | ~32px | Data-heavy dashboards, admin consoles, toolbars |
| `comfortable` *(default)* | `1` | ~38px | General web apps, SaaS workflows |
| `spacious` | `1.18` | ~44px | Marketing sites, touch-friendly & consumer apps |

---

## 5. Elevation, Radius & Motion

- **Radius Presets**: `none` (`0px`), `sm` (`4px`), `md` (`8px`), `lg` (`12px`), `full` (`9999px`) mapped via `--kx-radius-sm`, `--kx-radius-md`, `--kx-radius-lg`.
- **Elevation**: Combines soft ambient shadows with a `1px` hairline border so surfaces stay crisp in both Light and Dark modes (`--kx-shadow-xs` through `--kx-shadow-xl`).
- **Motion**:
  - `--kx-ease-smooth`: `cubic-bezier(0.22, 1, 0.36, 1)`
  - `--kx-ease-spring`: `cubic-bezier(0.34, 1.56, 0.64, 1)`
  - Automatically respects `@media (prefers-reduced-motion: reduce)`.

---

## 6. Iconography Guidelines

- `@kreattix-ui/react` has **zero icon dependencies**.
- Pass any `ReactNode` (from `lucide-react`, Heroicons, Phosphor, Tabler, or custom `<svg>`) into icon slots (`leftIcon`, `rightIcon`, `icon`).
- Use `<Icon size="sm | md | lg" tone="...">` to normalize sizing and color.
- Override internal glyphs (`chevronDown`, `close`, `check`, `minus`, `spinner`) globally via `ThemeProvider` `icons` config.
