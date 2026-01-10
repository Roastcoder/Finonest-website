# CMS Mapping — Finonest

**Date:** 2026-01-08

This document maps every page, section, and reusable component to CMS models, editable fields, admin UI behavior, and example payloads. Use this as the source of truth for implementing the Admin Panel and backend models.

---

## Global patterns
- Content types:
  - Singleton: `SiteSettings` (single doc)
  - Page: `Page` (path-based slug + blocks)
  - Service: `Service` (service-specific pages)
  - BlogPost: `BlogPost` (blog) + `Category` + `Tag`
  - Media: `Media` (media library)
  - FormConfig + Lead (form submissions)
  - Testimonial, Partner, Banner, FAQ (small content collections)
- Admin UX conventions:
  - WYSIWYG editor for `content` fields (HTML or Markdown).
  - Media picker: select/upload image, add alt text and caption.
  - SEO panel on every editable page (title, description, canonical, OG image, robots)
  - Block-based page builder: add/reorder/hide blocks, per-block styles and spacing.
  - Publish workflow: Draft → Publish → Schedule (optional scheduled publishAt).

---

## Models & Page mappings (by route)

### Home (`/`) — Page: `HomePage` (type: `Page`, template: `home`)
- Key editable fields & blocks:
  - hero: { badgeText, heading (rich text pieces), subheading, ctas: [{label, type, link}], backgroundImage }
  - stats: [{ label, value }]
  - servicesPreview: list of Service refs or inline items (title, excerpt, image, link)
  - testimonialsRef: reference array
  - partnerBanks: array of Media refs (logo + alt + url)
  - promoBanners: array [{ image, link, priority }]
  - SEO: metaTitle, metaDescription, canonical, openGraphImage
  - layoutSettings: { showHero: boolean, heroHeight, backgroundStyle }
- Admin UI:
  - Hero editor (text, CTA link type picker: page/service/url), image upload, preview.
  - Drag-to-reorder blocks; toggle block visibility.
- Example JSON (block partial):
```json
{
  "slug":"/",
  "template":"home",
  "blocks":[
    {"type":"hero","props":{"badgeText":"India's Fastest Growing Loan Provider","heading":"Your Financial Dreams, Simplified","subheading":"From personal loans to home financing...","ctas":[{"label":"Get Started Today","link":"/apply"}]}}
  ]
}
```

---

### About (`/about`) — Page: `Page` (template `default`)
- Editable fields:
  - title, heroImage, intro (rich text), mission (rich text), team (list of team member objects: name, title, bio, avatar), processSteps, stats
  - SEO fields
- Admin UI:
  - Rich text + repeatable teams & stats editors

---

### Contact (`/contact`) — Page: `Page` + FormConfig
- Editable fields:
  - title, intro text, mainContactInfo (phone, email, address), contactFormRef (link to `FormConfig`), sidebar widgets (e.g., WhatsApp number)
  - map coordinates (optional), SEO
- Forms:
  - `ContactForm` fields configured in `FormConfig`: name, email, phone, message, utm tags
  - Admin UI to set recipients, autoresponder template, webhook URL
- Leads:
  - Submissions saved to `Lead` with formRef link, IP, UTM, assignedTo

---

### Services listing (`/services`) — Page: `ServicesList` (template `services-list`)
- Editable fields:
  - title, intro, featuredServices (refs), serviceCardsOrder, filters, SEO
- Admin UI:
  - Manage service order; mark featured services; upload category banners

---

### Service detail (`/services/:service`) — Model: `Service`
- Example slugs: `/services/home-loan`, `/services/personal-loan`
- Fields:
  - slug, title, shortDescription, heroImage, heroHeading, overview (rich text), benefits (array), features (array), rate, eligibility (list), requiredDocs (list), faqs (array), partnerBanks (refs), applicationFormRef, relatedServices (refs), SEO
- Admin UI:
  - Service editor with preview, hero image upload, set `highlight` flag (popular), link to form builder
- Notes: `Service` can be a top-level collection to enable listing & filtering.

---

### Service Apply (`/services/:service/apply`) — Flow: `FormConfig` + `ServiceApplication`
- FormConfig fields:
  - multi-step configuration: steps: [{title, fields:[{name,type,required,validation}]}]
  - conditional fields, file upload handlers
  - recipientEmails, webhook, notifications templates
- Lead model:
  - store full submission, uploaded documents (media refs), status, assignedTo

---

### Blog listing (`/blog`) — Page: `BlogList` (template `blog-list`)
- Fields (Page-level): hero text, category featured list, promoted posts
- Blog features:
  - BlogPost model: { slug, title, excerpt, content (HTML/MD), featuredImage, author (ref), categories [ref], tags [String], status, publishedAt, readTime, seo }
  - Category model: {name, slug, description}
- Admin UI:
  - Post editor with WYSIWYG, media insert, categories/tags picker, preview and social preview, schedule and publish controls
  - Bulk actions: change status, delete, reorder
- Public features:
  - Search by query, filter by categories & tags, pagination

---

### Blog post detail (`/blog/:slug`) — route to implement
- Data returned: full `BlogPost` with rendered HTML, related posts (by tag/category), comments placeholder (optional), SEO fields

---

### Terms & Privacy (`/terms`, `/privacy`) — Page: `Page` (singleton pages)
- Editable: title, content (rich text), effectiveDate, SEO
- Admin UI: version history (optional) and content diff

---

### Auth & Dashboard (`/auth`, `/dashboard`) — User-specific (not CMS-managed)
- Admin side: `Admin` users + roles are managed via `User` collection
- `Dashboard` is dynamic: user-specific data fetched from API (leads, applications, saved services)

---

### Banking Partners (`/banking-partners`) — Collection: `PartnerBank`
- Fields: name, logo (Media ref), description, featured (bool), applyLink, seo
- Admin UI: upload logo, reorder, set featured

---

### EMI Calculator (`/emi-calculator`) — Page: `Page` with widget
- Editable: hero text, explanation content, default parameters, CTA link
- Server-side endpoint for amortization calculations at `/api/emi/calculate`

---

### Testimonials, Stats, Process Steps — small collections
- `Testimonial`: name, role, content, rating, avatar (MediaRef), published
- `Stat`: label, value, suffix
- `ProcessStep`: title, description, order

Admin UI: CRUD for each small collection with ordering controls

---

### Banners & Promotions
- Model: `Banner` { title, image, link, priority, startDate, endDate, active }
- Admin UX: scheduling and targeting (e.g., show on home only)

---

### Footer & Navbar (Navigation)
- `NavItem`: label, href (internal route or external URL), position, parentNavId (for nested menus)
- `Footer`: quickLinks, contactInfo, socialLinks, legalLinks
- Admin UI: reorder menu items; preview menu

---

### Media Library
- `Media` model: { filename, url, altText, caption, mimeType, width, height, size, tags, uploadedBy }
- Features: search, filter by tags, replace file, crop/resize, direct upload & CDN integration
- API: signed uploads or multipart uploads to server with validation

---

### Forms & Leads
- `FormConfig` model: { name, slug, fields (json), steps (json for multi-step), recipientEmails, webhookUrl, storeInDB }
- `Lead` model: { formRef, data (object), files [MediaRef], source, ip, assignee, status, createdAt }
- Admin UI: submissions viewer with filters, export CSV, assign to users, change status

---

### Admin UX patterns & controls
- List + create + edit + delete patterns for all collections.
- Preview (draft) toggles and schedule publish.
- Role-based permissions (SuperAdmin, Admin, Editor, Contributor).
- Audit log for content changes (who, what, when).

---

## Example Payloads

- BlogPost example
```json
{
  "slug":"improve-credit-score-2025",
  "title":"How to Improve Your Credit Score in 2025",
  "excerpt":"Learn the top strategies to boost your credit score and get better loan rates.",
  "content":"<p>Full article HTML or Markdown...</p>",
  "featuredImage":"media/abc123.jpg",
  "author":"userId123",
  "categories":["catId1"],
  "tags":["credit score","personal finance"],
  "status":"published",
  "publishedAt":"2025-12-15T00:00:00.000Z",
  "seo":{ "metaTitle":"How to Improve Your Credit Score","metaDescription":"..." }
}
```

- Service example
```json
{
  "slug":"home-loan",
  "title":"Home Loan",
  "shortDescription":"Turn your dream home into reality...",
  "heroImage":"media/home-hero.jpg",
  "rate":"6.5%",
  "features":[{"title":"Low interest","description":"6.5% onwards"}],
  "applyFormRef":"formId123",
  "seo":{"metaTitle":"Home Loan - Finonest","metaDescription":"..."},
  "status":"published"
}
```

---

## Implementation Notes
- Prefer a single `Page` model for general content pages to allow flexible block usage; use specialized `Service` and `BlogPost` collections when semantic queries and filters are needed.
- Use `Page.blocks` as an ordered array of small JSON objects with `type` + `props` shape to enable a JSON-driven page builder.
- Store full HTML or Markdown for long-form content but sanitize on server-side during save and again on render.
- Ensure all slugs are unique, with fallback manager in Admin UI for collisions.

---

## Next steps
1. Implement Mongoose schemas for the models listed here and save them in `server/src/models` (I'll produce `docs/DB-Schema.md` and example `.ts` model files next).
2. Draft API contract (OpenAPI-style) for public, auth, and admin endpoints.
3. Start scaffolding Express backend and seed scripts for initial content.

---

*This document is intended to be actionable and used by backend developers and UI engineers building the Admin Panel.*
