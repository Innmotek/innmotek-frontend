# Innmotek V2 - Design System Specification (Thermatec-Inspired)

> **Design Reference**: Thermatec (`thermatec.eu`) — Premium, Architectural, Dark-Mode Industrial Luxury  
> **Target**: `innmotek-frontend-NEW` Design System & Token Architecture  
> **Philosophy**: Precision engineering aesthetics, deep near-black backdrops, warm gold/tan accents, high-contrast typography, generous negative space, and smooth micro-interactions.

---

## 1. Color System & Design Tokens

The palette is anchored by deep, neutral blacks and rich charcoal shades, accented with a refined warm tan/gold tone for focal points, interactive states, badges, and architectural label bars.

### Primary Color Tokens
```css
:root {
  /* Surface & Backgrounds */
  --bg-primary: #0A0A0A;        /* Deepest obsidian black for page backgrounds */
  --bg-surface: #121212;        /* Raised surface / card background */
  --bg-surface-elevated: #1A1A1A; /* Modals, dropdown menus, popovers */
  --bg-surface-subtle: #161616;  /* Alternating content sections */

  /* Accent & Warm Tan/Gold */
  --accent-gold: #C5A880;       /* Signature warm gold/tan (Thermatec primary accent) */
  --accent-gold-hover: #D4B890; /* Hover state for gold buttons & links */
  --accent-gold-dark: #A88B63;  /* Active/pressed states & subtle borders */
  --accent-gold-subtle: rgba(197, 168, 128, 0.12); /* Glass pills & badge backdrops */
  --accent-gold-border: rgba(197, 168, 128, 0.35); /* Accent card outlines */

  /* Text & Typography */
  --text-primary: #FFFFFF;      /* Clean pure white for headlines and active labels */
  --text-secondary: #B3B3B3;    /* Light neutral grey for body copy & subtitles */
  --text-muted: #737373;        /* Muted captions, metadata, breadcrumbs */
  --text-inverse: #0A0A0A;      /* Text on accent gold buttons/bars */

  /* Borders & Dividers */
  --border-subtle: #222222;     /* Card borders, grid separators */
  --border-strong: #333333;     /* Focus rings, input borders */
  --border-gold: #C5A880;       /* Accent highlight borders */

  /* Interactive States */
  --interactive-hover-overlay: rgba(255, 255, 255, 0.04);
  --interactive-active-overlay: rgba(255, 255, 255, 0.08);

  /* Status Colors */
  --status-success: #22C55E;
  --status-warning: #EAB308;
  --status-error: #EF4444;
  --status-info: #38BDF8;
}
```

### Palette Usage Matrix
| Element | Token Applied | Visual Impact |
|---|---|---|
| Page Background | `--bg-primary` (`#0A0A0A`) | Immersive, ultra-modern luxury dark feel |
| Product / Blog Cards | `--bg-surface` (`#121212`) + `--border-subtle` | Sharp, bordered architectural containers |
| Primary Buttons & CTAs | `--accent-gold` (`#C5A880`) + `--text-inverse` | High-contrast callouts that command attention |
| Category Overlaid Label Bar | `--accent-gold` (`#C5A880`) | Solid bar pinned across bottom of photos |
| Side Rail Strip | `--accent-gold` (`#C5A880`) & `--bg-surface` | Distinctive vertical brand signature |
| Body Text | `--text-secondary` (`#B3B3B3`) | Highly readable, zero eye strain on dark canvas |

---

## 2. Typography & Lettering System

The typographic hierarchy combines bold, geometric sans-serif headlines with structured uppercase micro-copy (wide tracking) and clean, legible body text.

### Font Families
- **Headings & Display**: `Syne` or `Outfit` or `Plus Jakarta Sans` (sans-serif, geometric, bold weight 700/800)
- **Body & Specifications**: `Inter` or `Plus Jakarta Sans` (weights 400, 500, 600)
- **Mono / Technical Specs**: `JetBrains Mono` or `Space Mono` (for engineering tables, COP values, dimensions)

### Type Scale & Letter-Spacing
| Role | Font Weight | Size (Desktop / Mobile) | Line Height | Letter Spacing | Transform |
|---|---|---|---|---|---|
| **Display Hero** | 800 (Bold) | `56px` / `34px` | `1.1` | `-0.02em` | Normal |
| **Section Title (H2)** | 700 (Bold) | `38px` / `26px` | `1.2` | `-0.01em` | Normal |
| **Subsection (H3)** | 600 (SemiBold) | `26px` / `20px` | `1.3` | `0` | Normal |
| **Card Title (H4)** | 600 (SemiBold) | `19px` / `17px` | `1.35` | `0` | Normal |
| **Nav Links** | 600 (SemiBold) | `13px` / `13px` | `1.0` | `+0.12em` | **UPPERCASE** |
| **Category Badges & Labels** | 700 (Bold) | `11px` / `10px` | `1.0` | `+0.15em` | **UPPERCASE** |
| **Body Large** | 400 (Regular) | `18px` / `16px` | `1.7` | `0` | Normal |
| **Body Regular** | 400 (Regular) | `15px` / `14px` | `1.65` | `0` | Normal |
| **Caption / Spec Label** | 500 (Medium) | `12px` / `11px` | `1.4` | `+0.05em` | Normal |

---

## 3. Reusable Layout Patterns & Components

### Pattern 1: Cinematic Full-Bleed Hero
- **Structure**:
  - Full-width background image/video with dark gradient vignette (`linear-gradient(to top, #0A0A0A 10%, rgba(10,10,10,0.4) 60%, rgba(10,10,10,0.8) 100%)`).
  - High-impact 2-line textual layout:
    - Line 1: Bold, crisp headline (e.g. *"SUSTAINABLE THERMAL ENGINEERING"*).
    - Line 2: Subtle engineering subtitle in `--text-secondary`.
  - Minimalist Action Group: Primary Gold CTA button (*"Explore Solutions"*) + Secondary Ghost button with subtle border (*"Request System Sizing"*).
- **Micro-Interaction**: Gentle scale-down on scroll, smooth staggered fade-in of text on load.

---

### Pattern 2: Fixed Vertical Side Rail (Brand Signature)
- **Structure**:
  - Pinned to right (or left) viewport edge on desktop (`position: fixed; top: 0; right: 0; width: 56px; height: 100vh; z-index: 100`).
  - Dark semi-transparent backdrop with fine gold border divider.
  - Top: Accent gold indicator notch.
  - Middle: Rotated 90° brand wordmark (*"INNMOTEK THERMAL SYSTEMS"*), letter-spaced in gold.
  - Bottom: Vertical stack of social/contact icons:
    - WhatsApp (`+91 808 1741031`)
    - Email (`info@innmotek.com`)
    - LinkedIn
    - Instagram / Facebook
- **Micro-Interaction**: Icon hover triggers gold glow and subtle horizontal slide-out tooltip.

---

### Pattern 3: Precision Architectural Navigation Bar
- **Structure**:
  - Flat dark bar (`height: 80px; background: rgba(10, 10, 10, 0.85); backdrop-filter: blur(16px)`).
  - Left: Clean vector Innmotek brand logo with accent gold mark.
  - Center: Horizontal menu with uppercase, letter-spaced links (`HEAT PUMPS`, `SOLAR THERMAL`, `WATER TANKS`, `DEHUMIDIFIERS`, `PROJECTS`, `ABOUT`).
  - Mega-Dropdown: Multi-column dark surface (`--bg-surface-elevated`) with category photo previews, subcategory links, and fast spec download link.
  - Right: "GET IN TOUCH" / "REQUEST QUOTE" solid accent gold button.

---

### Pattern 4: Photo-First Product & Category Grid (Thermatec Signature)
- **Structure**:
  - 3-column or 4-column responsive grid with 24px gap.
  - Aspect ratio: `4:5` or `3:4` portrait cards.
  - High-resolution equipment render or installation photograph filling card.
  - Card Top: Floating subtle dark pill badge for category/power rating (e.g. `INVERTER R32`).
  - Bottom: Solid Accent Gold Label Bar overlaid at the base of the image containing:
    - Equipment title in bold dark text (`--text-inverse`).
    - Right-aligned minimal arrow icon (`→`) that translates right on card hover.
- **Hover Effect**: Image scales up subtly (`1.05x`) with smooth cubic-bezier easing while label bar elevates.

---

### Pattern 5: Alternating 2-Column Content / Feature Split
- **Structure**:
  - Left Column: Headline, gold pill badge, deep-dive body paragraphs, checkmark bullet points with gold icons, CTA button.
  - Right Column: High-resolution cutaway diagram, blueprint render, or photography with subtle gold border accent and dark glass caption box.
  - Alternates (Right text, Left photo) sequentially down the page.

---

### Pattern 6: Technical Specification Matrix Table
- **Structure**:
  - Dark striped table on `--bg-surface`.
  - Header: Gold uppercase column titles on dark elevated bar.
  - Parameter rows: Alternating subtle rows (`#121212` / `#161616`) with fine `--border-subtle` separators.
  - Highlighted row: Current recommended model with gold left accent stripe.
  - Export action: "Download PDF Datasheet" button.

---

### Pattern 7: 3-Column Architectural Footer
- **Structure**:
  - Background: `--bg-surface` (`#121212`) with top accent gold dividing line.
  - Column 1 (Brand): Innmotek logo, mission summary, registered ISO / CE engineering credentials.
  - Column 2 (Quick Directory): Grouped links into Products, Solutions, Projects, Company, Legal Policies.
  - Column 3 (Direct Engineering Desk): Phone, Email, Office address, Business hours, Newsletter input.
  - Bottom Bar: Copyright, Legal policy links, Made with pride in India.

---

## 4. Mapping Design Patterns to Innmotek Page Inventory

| Page / Route | Primary Pattern Applied | Secondary Patterns & Custom Solutions |
|---|---|---|
| **Home (`/`)** | Pattern 1 (Hero) + Pattern 4 (Product Grid) | Pattern 2 (Side Rail), Pattern 5 (About Teaser), Interactive Category Tab Explorer, Testimonial Carousel, Pattern 7 (Footer) |
| **All Categories (`/category`)** | Pattern 1 (Subpage Hero) + Pattern 4 (Category Grid) | 6-card full catalogue directory with photo-first tiles & gold label bars |
| **Category Listing (`/category/:id`)** | Pattern 1 (Subpage Hero) + Pattern 4 (Grid) | Subcategory filter chips, Pattern 5 (Category Overview), Related equipment |
| **Product Detail (`/products/:id`)** | Pattern 5 (Gallery + Buy Box Split) | Pattern 6 (Technical Spec Matrix Table), Tabbed deep-dive (Installation, Warranty), Downloadable PDF strip, Related Products Carousel |
| **11 Standalone Product Pages** *(PoolPump, Dehumidifier, WaterTank, SolarCollector, AirDryer, etc.)* | Pattern 1 (Hero) + Pattern 5 (Deep Dive Alternating Split) | Pattern 6 (Spec Matrix Table), Application materials grid, Quick Inquiry Form, Related Category Grid |
| **Projects / Case Studies (`/projects`)** | Pattern 1 (Hero) + Pattern 4 (Case Study Grid) | Sector filter pills (Commercial, Hospitality, Industrial), Location badges |
| **Project Detail (`/projects/:id`)** | Pattern 1 (Hero) + Pattern 5 (2-Col Case Study) | High-res Masonry photo gallery, Specs checklist, Commission details, Client quote |
| **Blogs Index (`/blogs`)** | Pattern 1 (Editorial Hero) | 3-column article card grid with category gold pill badges, Featured story header |
| **Blog Detail (`/blogs/:id`)** | Custom Editorial Layout (Consistent Design) | Centered readable text column (720px max-width), sticky category sidebar, social share pill bar, related reads |
| **Services (`/services/:id`)** | Pattern 1 (Hero) + Pattern 5 (2-Col Service Split) | 4-step workflow process cards, Deliverables checklist, Consultation booking form |
| **FAQs (`/faqs`)** | Pattern 1 (Hero) | Dark accordion cards with gold active chevron and category tabs |
| **Contact Us (`/contact-us`)** | Pattern 1 (Hero) + Pattern 5 (Contact Info / Form Split) | 3 dark glass info cards (Phone, Email, Address) + Full Google Maps dark-mode embed |
| **Legal Policies** *(Privacy, Terms, Payment, Dealer)* | Pattern 1 (Minimal Header) | Structured document reader with sticky table of contents and typography scale |

---

## 5. UI Motion & Micro-Interactions
1. **Page Transitions**: Smooth opacity fade (`0.3s ease-out`).
2. **Scroll Reveal**: Elements stagger upward (`translateY(24px) -> translateY(0)`) using IntersectionObserver with subtle duration (`0.6s cubic-bezier(0.16, 1, 0.3, 1)`).
3. **Card Hovers**:
   - Background image scales `1.04x`.
   - Card border shifts from `--border-subtle` to `--accent-gold-border`.
   - Bottom gold bar shifts up by `2px` with elevated box shadow (`0 8px 24px rgba(197, 168, 128, 0.2)`).
4. **Button Clicks**: Subtle press scale (`0.98x`).
