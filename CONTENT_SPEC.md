# Innmotek V2 - Frontend Content Specification & Audit

> **Source Reference**: `Innmotek-frontend-OLD` (React CRA + MUI + Styled Components + React-Bootstrap)  
> **Target**: `innmotek-frontend-NEW` (Modern Next.js / Vite + React 18+ Design System)  
> **Purpose**: Complete checklist of all pages, API dependencies, rendered sections, content blocks, and structural consolidation opportunities so zero content or functionality is dropped during the redesign.

---

## 1. Complete Page Inventory & Categorization

Total Registered Routes: **35** in `src/router/index.js`.

### Group A: Core Pages
| Route Path | Component Name | Source File | Purpose |
|---|---|---|---|
| `/` | `Home` | `src/frontend/home/index.js` | Main brand homepage |
| `/about-us` | `AboutUs` | `src/frontend/abouts/index.js` | Company history, mission, vision, milestones |
| `/contact-us` | `ContactPage` | `src/frontend/contacts/index.js` | Contact channels, address, inquiry form, Google Maps |
| `/faqs` | `FaqPage` | `src/frontend/faqs/index.js` | Filterable/accordion FAQs grouped by category |

### Group B: Catalogue & Taxonomy Pages
| Route Path | Component Name | Source File | Purpose |
|---|---|---|---|
| `/category` | `AllCategory` | `src/frontend/category/AllCategory.js` | Master directory of all product categories |
| `/category/:categoryId` | `CategoryPage` | `src/frontend/category/index.js` | Top-level category page (lists subcategories & products) |
| `/category/:categoryId/:childCategory` | `ChildCategory` | `src/frontend/child-category/index.js` | Nested subcategory listing |
| `/products/:categoryId/category` | `Product` | `src/frontend/product/index.js` | Product listing within a category |
| `/products/:productId` | `ProductDetail` | `src/frontend/ProductDetail/index.js` | Complete product profile, specs, downloads, related items |

### Group C: Content & Editorial Pages
| Route Path | Component Name | Source File | Purpose |
|---|---|---|---|
| `/blogs` | `BlogPage` | `src/frontend/blogs/index.js` | Blog article listing / grid |
| `/blogs/:blogId` | `BlogDetail` | `src/frontend/blogs/BlogDetail/index.js` | Individual blog post reader + category sidebar + related |
| `/blogs/categories/:categoryId` | `BlogCategoryPage` | `src/frontend/blogs/Category/index.js` | Blog posts filtered by category |
| `/projects` | `Project` | `src/frontend/project/index.js` | Portfolio / Case studies gallery |
| `/projects/:projectId` | `ProjectDetail` | `src/frontend/projectDetail/index.js` | Project case study with photo gallery & specs |
| `/services/:serviceId` | `ServiceDetail` | `src/frontend/service/index.js` | Service breakdown, process steps & inquiry |

### Group D: Standalone Product-Type Landing Pages (Custom Hardcoded Showcase Pages)
| Route Path | Component Name | Source File | Product Showcase Focus |
|---|---|---|---|
| `/pool-and-spa-cover` | `PoolSpaCover` | `src/frontend/PoolSpaCover/index.js` | Automatic & manual pool/spa enclosures & covers |
| `/pool-pump` | `PoolPump` | `src/frontend/PoolPump/index.js` | Variable speed & inverter swimming pool pumps |
| `/robotic-pool-cleaner` | `RoboticPoolCleaner` | `src/frontend/RoboticPoolCleaner/index.js` | Cordless & robotic pool floor/wall cleaners |
| `/dehumidifier` | `Dehumidifier` | `src/frontend/dehumidifier/index.js` | Commercial & residential inverter dehumidifiers |
| `/hot-water-storage-tank` | `StainlessWaterTank` | `src/frontend/stainlesswatertank/index.js` | Stainless steel duplex & SUS304/316 hot water tanks |
| `/modular-panel-tank` | `StainlessPanelTank` | `src/frontend/stainlesspaneltank/index.js` | Sectional/modular stainless steel panel water tanks |
| `/thermal-solar-collector` | `SolarCollector` | `src/frontend/SolarCollector/index.js` | Flat plate & evacuated tube solar collectors |
| `/pressurized-thermosiphon` | `SolarThermosyphon` | `src/frontend/SolarThermosyphon/index.js` | Compact pressurized thermosiphon solar water heaters |
| `/radiator-and-fancoil` | `RadiatorPage` | `src/frontend/radiator/index.js` | Aluminum/steel sectional radiators & hydronic fan coils |
| `/glass-lined-hot-water-storage-tank` | `GlassLinedTank` | `src/frontend/GlassTank/index.js` | Vitreous enamel / glass-lined commercial tanks |
| `/heat-pump-air-dryer` | `CategoryDetail` | `src/frontend/CategoryDetail/index.js` | Open & closed-loop industrial heat pump dryers |

### Group E: Legal & Policy Pages
| Route Path | Component Name | Source File | Purpose |
|---|---|---|---|
| `/privacy-policy` | `PrivacyPolicy` | `src/frontend/privacy-policy/index.js` | Privacy data policy |
| `/terms-and-condition` | `TermsAndCondition` | `src/frontend/privacy-policy/TermsAndCondition/index.js` | Terms of service |
| `/payment-policy` | `PaymentPolicy` | `src/frontend/privacy-policy/PaymentPolicy/index.js` | Payment methods, escrow, invoicing terms |
| `/dealer-policy` | `DealerPolicy` | `src/frontend/privacy-policy/DealerPolicy/index.js` | Dealership terms, warranty claims, distributor perks |
| `/company-policy` | `CompanyPolicies` | `src/frontend/company-policie/index.js` | Environmental, safety, quality assurance policies |

### Group F: System & Utility Pages
| Route Path | Component Name | Source File | Purpose |
|---|---|---|---|
| `/healthcare` | `ComingSoonPage` | `src/frontend/coming-soon/index.js` | Healthcare division placeholder |
| `/drcare` | `ComingSoonPage` | `src/frontend/coming-soon/index.js` | DrCare division placeholder |
| `/hamropaani` | `ComingSoonPage` | `src/frontend/coming-soon/index.js` | Hamropaani division placeholder |
| `*` | `PageNotFound` | `src/frontend/page-not-found/index.js` | 404 Error page |

---

## 2. Page-by-Page Audit: Endpoints & Content Blocks

### 1. Home (`/`)
- **API Endpoints Called**:
  - `GET /api/banners` (Hero carousel slides)
  - `GET /api/categories` (Category preview tab system)
  - `GET /api/featured/products` (Featured equipment grid)
  - `GET /api/testimonials` (Client reviews slider)
  - `GET /api/blogs` (Latest editorial insights)
  - `GET /api/brands` (Partner / manufacturer logo strip)
- **Rendered Content Blocks**:
  1. **Hero Slider**: Full-width banners with headline, subline, and CTA to products.
  2. **About Innmotek Teaser**: 2-column intro (Brand overview, engineering credentials, read more link).
  3. **Category Explorer / Tab Box**: Interactive split-view (category tabs on left with custom icons, high-res preview image on right that switches on hover/click).
  4. **Featured Equipment Showcase**: 4-card highlighted product grid (Dehumidifiers, Robotic Cleaners, Heat Pumps).
  5. **Why Choose Innmotek / Stats Strip**: Key metrics (Energy savings, German engineering standards, installation count).
  6. **Client Testimonials Carousel**: Quotes, client name, position, company, rating.
  7. **Latest Insights / Blogs Grid**: 3-card recent article row with date and category tag.
  8. **Brands & Certifications Marquee**: Manufacturer partner logos.

### 2. About Us (`/about-us`)
- **API Endpoints Called**: Static content + Global Layouts (`GET /api/plugins`, `GET /api/categories`)
- **Rendered Content Blocks**:
  1. **Page Hero / Breadcrumb**: Dark header with title "About Innmotek".
  2. **Corporate Overview**: Detailed narrative on Innmotek's green-energy mission, thermal HVAC solutions, and engineering excellence.
  3. **Core Values / Pillars**: 4-card grid (Innovation, Sustainability, Energy Efficiency, Reliability).
  4. **Vision & Mission Statements**: 2-column structured high-contrast block.
  5. **Quality & Engineering Standards**: Certifications, manufacturing partner standards.
  6. **Call to Action / Consultation Strip**: Quick link to Contact / Request Quote.

### 3. Contact Us (`/contact-us`)
- **API Endpoints Called**: Static content + Form submission
- **Rendered Content Blocks**:
  1. **Page Hero**: "Get in Touch with Our Engineering Team".
  2. **Contact Channels Grid**: 3 interactive cards:
     - Email: `info@innmotek.com`
     - Phone / WhatsApp: `+91 808 1741031`
     - Headquarters: `Uttar Pradesh, India, 273001`
  3. **Inquiry Form**: 2-column form (First Name, Last Name, Email, Phone, Subject/Product Interest, Message, Submit Button).
  4. **Interactive Google Map Embed**: Full-width map showing location.

### 4. FAQs (`/faqs`)
- **API Endpoints Called**: `GET /api/faqs`
- **Rendered Content Blocks**:
  1. **Page Hero**: "Frequently Asked Questions".
  2. **Category Tabs / Filter**: Tabs for FAQ categories (Heat Pumps, Solar Systems, Tanks, Maintenance).
  3. **Accordion Q&A Accordion**: Expandable/collapsible rich-text answer cards.
  4. **Direct Support CTA**: "Didn't find your answer? Speak to an engineer."

### 5. Products by Category (`/products/:categoryId/category`)
- **API Endpoints Called**:
  - `GET /api/products/:categoryId`
  - `GET /api/products/related/:categoryId`
- **Rendered Content Blocks**:
  1. **Category Hero & Breadcrumbs**: Parent category -> current category title & SEO description.
  2. **Subcategory Filter Pills**: Quick filter for child categories.
  3. **Product Grid**: Card layout (Product photo, title, brief summary, "View Specifications" CTA).
  4. **Related / Recommended Equipment Slider**: Secondary carousel of related products.

### 6. Product Detail (`/products/:productId`)
- **API Endpoints Called**: `GET /api/products/:productId/show` (or fallback `/api/products/:productId`)
- **Rendered Content Blocks**:
  1. **Product Overview (2-Column)**:
     - Left: Multi-image thumbnail gallery + main zoom photo.
     - Right: Title, Category badge, Brand, Short summary, Warranty badge, "Inquire About This Model" CTA button.
  2. **Tabbed Information Architecture**:
     - **Tab 1: Description**: Full technical writeup and capabilities.
     - **Tab 2: Technical Specifications**: Detailed parameter table (Heating capacity, COP, power supply, refrigerant type, sound level, dimensions, weight).
     - **Tab 3: Installation & Schematics**: Piping diagrams, installation guidelines, clearance requirements.
     - **Tab 4: Warranty & Service**: Warranty period and support coverage.
  3. **Downloadable Documentation**: Product brochures / data sheets.
  4. **Related Products Grid**: Carousel of matching equipment from the same category.
  5. **Quick Inquiry Modal / Form**: Direct lead capture for that specific product.

### 7. Category Tree (`/category/:categoryId` & `/category/:categoryId/:childCategory`)
- **API Endpoints Called**: `GET /api/category/:categoryId`
- **Rendered Content Blocks**:
  1. **Hero Header**: Category name & description.
  2. **Subcategory Cards Grid**: Visual grid of subcategories with photo and child count.
  3. **Category Products**: Products belonging to the selected category level.

### 8. Master Categories Index (`/category`)
- **API Endpoints Called**: `GET /api/categories`
- **Rendered Content Blocks**:
  1. **Catalogue Directory Hero**: "Explore Innmotek Commercial & Residential Solutions".
  2. **Visual Category Tiles**: Large photo-first category cards covering all product pillars (Heat Pumps, Solar Thermal, Tanks, Dehumidifiers, Pool Equipment, Radiators).

### 9. Blogs Listing & Blog Detail (`/blogs`, `/blogs/:blogId`, `/blogs/categories/:categoryId`)
- **API Endpoints Called**:
  - `GET /api/blogs`
  - `GET /api/blogs/:blogId`
  - `GET /api/blogs/categories/:categoryId`
- **Rendered Content Blocks**:
  1. **Hero & Category Navigation**: Filterable chips (Energy Efficiency, Industrial Heating, Technology, Case Studies).
  2. **Featured Post Card**: Highlighted latest article.
  3. **Editorial Article Grid**: Article card with cover image, category badge, publish date, title, excerpt, "Read Article" link.
  4. **Article Detail Reader**:
     - Headline, author, date, category tag, hero image.
     - Rich-text markdown/HTML body with callouts and images.
     - Sticky Sidebar: Category list with article counts, recent posts widget.
     - Social share bar.
     - Related Articles carousel.

### 10. Projects / Case Studies (`/projects`, `/projects/:projectId`)
- **API Endpoints Called**:
  - `GET /api/projects`
  - `GET /api/projects/:projectId`
- **Rendered Content Blocks**:
  1. **Portfolio Hero**: "Engineering Case Studies & Commissioned Projects".
  2. **Project Filter**: Filter by project sector (Commercial, Hospitality, Residential, Industrial).
  3. **Case Study Grid**: Image cards with overlay title, location, and year.
  4. **Project Detail Page**:
     - Project Title, Location badge, Commission date, Client website.
     - High-resolution multi-photo gallery / masonry grid.
     - Project Challenge, Solution Implemented, Equipment Deployed, Energy Savings Result.
     - Inquiry CTA.

### 11. Service Detail (`/services/:serviceId`)
- **API Endpoints Called**: `GET /api/services/:serviceId`
- **Rendered Content Blocks**:
  1. **Service Hero**: Service name & value proposition.
  2. **Scope of Work (2-Column)**: Detailed explanation of engineering service (e.g., HVAC Auditing, System Sizing, Preventive Maintenance, Turnkey Installation).
  3. **Service Deliverables / Step-by-Step Process**: 4-step workflow diagram.
  4. **Service Inquiry Form**: Fast booking form.

### 12. Legal & Policy Pages (`/privacy-policy`, `/terms-and-condition`, `/payment-policy`, `/dealer-policy`, `/company-policy`)
- **API Endpoints Called**: `GET /api/pages/:slug`
- **Rendered Content Blocks**:
  1. **Legal Header**: Clean typography header with last updated date.
  2. **Table of Contents / Jump Links**: Sticky side navigation for fast scanning.
  3. **Structured Policy Content**: Multi-section legal copy with clear headings, bullet points, and contact email.

---

## 3. Analysis & Consolidation of Standalone Product Landing Pages

In the legacy frontend, 11 dedicated routes were hardcoded as separate folders:
1. `PoolSpaCover` (`/pool-and-spa-cover`)
2. `PoolPump` (`/pool-pump`)
3. `RoboticPoolCleaner` (`/robotic-pool-cleaner`)
4. `Dehumidifier` (`/dehumidifier`)
5. `StainlessWaterTank` (`/hot-water-storage-tank`)
6. `StainlessPanelTank` (`/modular-panel-tank`)
7. `SolarCollector` (`/thermal-solar-collector`)
8. `SolarThermosyphon` (`/pressurized-thermosiphon`)
9. `RadiatorPage` (`/radiator-and-fancoil`)
10. `GlassLinedTank` (`/glass-lined-hot-water-storage-tank`)
11. `CategoryDetail` (`/heat-pump-air-dryer`)

### Structural Comparison Matrix

| Page Component | Hero Style | 2-Col Feature Blocks | Technical Spec Table | Gallery / Models Grid | Application Materials / Sectors | FAQ / Inquiry Form | Related Products |
|---|---|---|---|---|---|---|---|
| `PoolPump` | Dark Hero + Badge | Yes (Inverter Tech) | Yes (Flow vs Head) | Yes | Yes (Pool types) | Yes (Contact Slider + Form) | Yes (API: `pool-pumps`) |
| `RoboticPoolCleaner` | Dark Hero + Specs | Yes (Wall/Floor Climb) | Yes (Motor & Cable) | Yes | Yes (Pool finishes) | Yes (Contact Form) | Yes |
| `Dehumidifier` | Dark Hero + Badge | Yes (Dehumidify360) | Yes (L/day capacity) | Yes (Model range) | Yes (Indoor pools/spas) | Yes (Contact Form) | Yes |
| `StainlessWaterTank` | Dark Hero + Blueprint | Yes (Duplex Steel) | Yes (Capacity & Pressure) | Yes | Yes (Hotels/Hospitals) | Yes (Contact Form) | Yes |
| `StainlessPanelTank` | Dark Hero + Blueprint | Yes (Modular Assembly) | Yes (Panel specs) | Yes | Yes (Commercial storage) | Yes (Contact Form) | Yes |
| `SolarCollector` | Dark Hero + Diagram | Yes (Selective Coating) | Yes (Efficiency curve) | Yes | Yes (Solar projects) | Yes (Contact Form) | Yes |
| `SolarThermosyphon` | Dark Hero + Diagram | Yes (Pressurized loop) | Yes (Tank & Collector) | Yes | Yes (Residential/Villa) | Yes (Contact Form) | Yes |
| `RadiatorPage` | Dark Hero + Badge | Yes (Heat Output) | Yes (Section dimensions) | Yes (Styles) | Yes (Modern heating) | Yes (Contact Form) | Yes |
| `GlassLinedTank` | Dark Hero + Blueprint | Yes (Vitreous Enamel) | Yes (Test pressure) | Yes | Yes (Domestic/Industrial) | Yes (Contact Form) | Yes |
| `PoolSpaCover` | Dark Hero + Photos | Yes (Enclosure styles) | Yes (Extrusion specs) | Yes | Yes (All year swimming) | Yes (Contact Form) | Yes |
| `CategoryDetail (Air Dryer)`| Dark Hero + Highlight | Yes (Open/Closed Loop) | Yes (Drying cycles) | Yes | Yes (`ApplicableMaterial`) | Yes (Contact Form) | Yes (API: `heat-pump`) |

### Consolidation Strategy for Innmotek-V2
Rather than writing 11 monolithic, copy-pasted JSX files with duplicated styling and form code:
1. **Create One Unified `ProductShowcaseTemplate`**:
   - Config-driven or structured data schema accepting:
     - `hero`: Title, tagline, badge, background media, CTA
     - `highlights`: Array of feature points with icons
     - `deepDiveSections`: Array of alternating 2-column media + text blocks with bullet points
     - `specifications`: Parameter matrix table
     - `applications`: Target sectors / materials grid
     - `gallery`: Model variants or installation photos
     - `relatedCategorySlug`: API category slug for dynamic related products
     - `inquiryForm`: Pre-filled product interest tag
2. **Benefits**:
   - 100% consistent typography, dark aesthetics, and animations across all 11 landing pages.
   - Zero duplicated CSS/code.
   - Easy content maintenance and instant dark-mode / Thermatec styling compliance.
