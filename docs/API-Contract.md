# API Contract — Finonest

This is a concise OpenAPI-style contract describing public, auth, and admin endpoints used by the frontend and Admin Panel.

Authentication
- POST /api/auth/login
  - Body: { email, password }
  - Response: { accessToken (JWT short-lived), refreshToken cookie (httpOnly), user }
- POST /api/auth/refresh
  - Uses httpOnly refresh cookie; returns new access token and rotates refresh token
- POST /api/auth/logout
  - Clears refresh cookie and invalidates refresh token
- GET /api/auth/me
  - Header: Authorization: Bearer <accessToken>
  - Response: { user }

Public API
- GET /api/pages/:slug
  - Returns Page by slug with blocks and SEO
- GET /api/services
  - Query: ?page=&limit=&featured=&search=&category=
  - Returns paginated list
- GET /api/services/:slug
  - Returns service detail
- GET /api/blog
  - Query: ?page=&limit=&category=&tag=&q=
  - Returns paginated list
- GET /api/blog/:slug
  - Returns full BlogPost (HTML content, SEO, related posts)
- GET /api/categories
  - Returns categories list
- GET /api/tags
  - Returns tags list
- GET /api/media
  - Query: ?q=&tags=&page=&limit= (public read or auth required for private media)
- POST /api/forms/:slug/submit
  - Body: form data (JSON or multipart when files)
  - Response: { leadId }
- POST /api/emi/calculate
  - Body: { principal, rate, tenureMonths }
  - Response: { schedule[], monthlyPayment, totalInterest }

Admin API (RBAC enforced; all under /api/admin)
- Users
  - GET /api/admin/users
  - GET /api/admin/users/:id
  - POST /api/admin/users
  - PATCH /api/admin/users/:id
  - DELETE /api/admin/users/:id
  - Roles: SuperAdmin can manage users and roles
- Pages
  - GET /api/admin/pages
  - GET /api/admin/pages/:id
  - POST /api/admin/pages
  - PATCH /api/admin/pages/:id
  - DELETE /api/admin/pages/:id
  - Additional: POST /api/admin/pages/:id/publish, POST /api/admin/pages/:id/schedule
- Services
  - CRUD at /api/admin/services
- BlogPosts
  - CRUD at /api/admin/blogposts
  - POST /api/admin/blogposts/:id/publish
  - POST /api/admin/blogposts/:id/schedule
- Categories / Tags / Media / Banners / Testimonials / Partners / Forms
  - CRUD routes at /api/admin/<resource>
- Leads
  - GET /api/admin/leads
  - GET /api/admin/leads/:id
  - PATCH /api/admin/leads/:id (assign, change status)
  - Export: GET /api/admin/leads/export?format=csv

Security & Validation
- All admin endpoints require `Authorization: Bearer <accessToken>` and role checks
- Short-lived access tokens (15m) and rotating refresh tokens via httpOnly cookies
- All inputs validated with express-validator and sanitized; rich HTML saved only after sanitization

Error handling
- Use consistent error shape: { status: 'error', message: string, code?: string, details?: any }

Rate limiting & throttling
- Auth, form submissions and public APIs rate-limited per IP to prevent abuse

Notes
- Media uploads use signed upload endpoints and server-side multipart handling; integrate with CDN in production
- Provide `?preview=true` on content endpoints to allow editor preview of drafts when a valid preview token or admin JWT is presented
