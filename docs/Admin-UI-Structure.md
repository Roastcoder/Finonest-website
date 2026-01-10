# Admin Panel UI Structure — Finonest

Overview: Admin Panel will include role-specific navigation (SuperAdmin, Admin, Editor, Contributor). Screens follow CRUD patterns and include preview, scheduling, audit trail, and bulk actions when applicable.

Primary Sections
- Dashboard
  - Quick stats (published pages, drafts, pending leads), recent activity, scheduled items

- Content
  - Pages
    - List (search, filter by template/status), Create/Edit page, Page builder (blocks list, add/reorder/toggle), SEO panel, Publish/Schedule controls
  - Services
    - Service list, Create/Edit (slug, hero, rate, features, apply form link), Preview
  - Blog
    - Posts list, Create/Edit with WYSIWYG, Categories, Tags, Featured image, Preview & Social preview, Publish/Schedule
  - Categories & Tags
    - CRUD, reorder (for categories), type (blog/service)
  - Sections
    - Reusable sections (content blocks) to attach to pages

- Media
  - Library grid, upload, replace, add alt/caption, filter by tags, insert into content

- Forms & Leads
  - Form builder (fields/steps/options), webhook, recipients
  - Leads viewer (filter by form/status/assignee), detail view, change status, assign, export CSV

- Marketing
  - Banners (schedule, priority), Testimonials (CRUD), Partner Banks (CRUD), Promo campaigns

- Site Settings
  - Global settings (Site title, metadata, social links, analytics, maintenance mode), Footer & Navigation editor (menu builder)

- Users & Roles
  - User list, Create/Edit user, Set roles/permissions; only SuperAdmin can manage roles

UX Patterns
- WYSIWYG editors with media picker
- Draft/Preview scheduling
- Role-based UI: hide or disable actions based on user role
- Audit log (who changed what) accessible from entity detail

Permissions matrix (summary)
- SuperAdmin: full access to all modules, user management
- Admin: full access to content & site settings but cannot delete SuperAdmin
- Editor: create/edit/publish content, manage media
- Contributor: create/edit drafts; cannot publish

Implementation notes
- Build UI using the existing React app under `src/pages/Admin*` or a new `src/admin` area; reuse UI components in `src/components/ui`
- API integration uses the contracts in `docs/API-Contract.md`
