---
name: Intelligent CRM System
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#464554'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#767586'
  outline-variant: '#c7c4d7'
  surface-tint: '#494bd6'
  primary: '#4648d4'
  on-primary: '#ffffff'
  primary-container: '#6063ee'
  on-primary-container: '#fffbff'
  inverse-primary: '#c0c1ff'
  secondary: '#4b41e1'
  on-secondary: '#ffffff'
  secondary-container: '#645efb'
  on-secondary-container: '#fffbff'
  tertiary: '#904900'
  on-tertiary: '#ffffff'
  tertiary-container: '#b55d00'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#e2dfff'
  secondary-fixed-dim: '#c3c0ff'
  on-secondary-fixed: '#0f0069'
  on-secondary-fixed-variant: '#3323cc'
  tertiary-fixed: '#ffdcc5'
  tertiary-fixed-dim: '#ffb783'
  on-tertiary-fixed: '#301400'
  on-tertiary-fixed-variant: '#703700'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  container-max: 1440px
  gutter: 24px
---

## Brand & Style

The design system is engineered for a high-performance B2B SaaS environment, focusing on clarity, efficiency, and data-driven decision-making. The brand personality is professional and reliable, yet forward-thinking. 

The design style follows a **Modern Corporate** aesthetic with a lean towards **Minimalism**. It prioritizes a high signal-to-noise ratio by utilizing generous whitespace, a precise typographic hierarchy, and subtle depth markers. The interface should feel intentional and uncluttered, allowing sales professionals to process complex lead data without cognitive overload. 

**Key Visual Principles:**
- **Clarity over Decoration:** Every element serves a functional purpose.
- **Precision:** Alignment to a strict grid to evoke a sense of order and trustworthiness.
- **Subtle Modernity:** Utilizing soft shadows and smooth transitions to distinguish from legacy enterprise software.

## Colors

The palette is anchored by a vibrant Indigo primary color, which provides a modern, tech-focused energy. 

**Color Strategy:**
- **Primary:** Used for action-oriented elements like primary buttons, active states, and focus indicators.
- **Neutral:** A slate-based neutral scale is used for text, borders, and secondary icons to maintain a sophisticated professional tone.
- **Semantic/Status:** Four distinct colors (Green, Yellow, Red, Blue) are reserved strictly for status communication (e.g., lead conversion, pending tasks, urgent alerts).
- **Adaptive Modes:** The system supports both Light and Dark modes. In Dark mode, surfaces use deep navy/slate tones rather than pure black to maintain readability and reduce eye strain during prolonged use.

## Typography

The typography system relies exclusively on **Inter**, a typeface designed for user interfaces. It offers high legibility on screens and a neutral, functional character that suits a B2B SaaS context.

- **Scale:** A modular scale ensures consistent hierarchy. Headlines use tighter letter spacing and heavier weights to command attention.
- **Labels:** Small labels use a semi-bold or bold weight to remain legible even at 12px.
- **Readability:** Body text uses a generous line height (1.5x) to ensure long-form data (like CRM notes) is easy to digest.

## Layout & Spacing

This design system utilizes an **8px grid system** for consistent spatial relationships.

- **Layout Model:** A 12-column fluid grid is used for dashboard layouts, transitioning to a single-column stack on mobile devices.
- **Standard Margins:** Desktop views utilize 32px (xl) page margins, while mobile views use 16px (md).
- **Density:** The CRM environment defaults to a "Comfortable" density, but the spacing units are designed to scale down to a "Compact" mode for data-heavy tables where information density is critical.

## Elevation & Depth

Depth is conveyed through a combination of **Tonal Layering** and **Subtle Ambient Shadows**. 

- **Level 0 (Base):** Background color.
- **Level 1 (Cards):** Surface color with a very soft, diffused shadow (e.g., `0px 4px 6px -1px rgba(0, 0, 0, 0.1)`). This level is used for the primary content containers.
- **Level 2 (Dropdowns/Modals):** Elevated surfaces with a more pronounced shadow to indicate temporary overlay and interaction focus.
- **Borders:** In dark mode, shadows are less effective; depth is primarily achieved by slightly lightening the surface hex code for each increasing elevation level.

## Shapes

The shape language is defined by a consistent **10px corner radius** across all primary UI components.

- **Cards & Modals:** Use the standard 10px radius to create a soft, approachable feel while remaining professional.
- **Buttons & Inputs:** Follow the same 10px radius for visual harmony.
- **Small Elements:** Tooltips and small badges may use a slightly reduced radius (4px) or a full pill-shape where appropriate for categorical distinction.

## Components

The component library prioritizes consistency and state-clear interaction.

- **Buttons:** 
  - **Primary:** Solid Indigo background, white text, 10px radius. 
  - **Secondary:** Transparent background with a subtle slate border.
- **Status Badges:** Use a light tinted background (10% opacity of the semantic color) with high-contrast text for maximum readability (e.g., Success badge has a light green background and dark green text).
- **Input Fields:** Use a 1px border (#cbd5e1 in light mode). On focus, the border transitions to the primary Indigo with a subtle outer glow.
- **Cards:** White or dark slate containers with the 10px radius and level 1 shadow. Headers within cards should be separated by a fine 1px horizontal divider.
- **Data Tables:** Row-based layouts with subtle hover states (#f1f5f9) to help users track information across wide screens.
- **Lead Pipeline:** A specialized "kanban" card component using the standard card styling, with color-coded vertical stripes on the left edge to denote lead priority or source.