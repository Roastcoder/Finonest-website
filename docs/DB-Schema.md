# DB Schema — Finonest (Reference)

This document summarizes the Mongoose models implemented in `server/src/models` and includes example seed payloads to use with seed scripts.

## Models

- **User** (`User`)
  - email (unique), name, passwordHash, role (superadmin|admin|editor|contributor), permissions, isActive

- **Page** (`Page`)
  - slug (unique), title, template, blocks [{type, props}], status (draft|published|scheduled), publishedAt, seo

- **Section** (`Section`)
  - name, type, props, status

- **Service** (`Service`)
  - slug (unique), title, shortDescription, longContent, images[], heroImage, rate, features[], applyFormRef, seo, status

- **BlogPost** (`BlogPost`)
  - slug (unique), title, excerpt, content (HTML/MD), featuredImage, author, categories[], tags[], status, publishedAt, readTime, seo, metrics

- **Category** (`Category`)
  - name, slug, description, parent, type

- **Tag** (`Tag`)
  - name, slug

- **Media** (`Media`)
  - filename, url, mimeType, size, width, height, altText, caption, tags, uploadedBy

- **FormConfig** (`FormConfig`)
  - name, slug, fields[], steps[], recipientEmails, webhookUrl, autoReplyTemplate, storeInDB

- **Lead** (`Lead`)
  - formRef, data, files[], ip, source, assignedTo, status

- **Banner** (`Banner`)
  - title, image, link, priority, startDate, endDate, active

- **Testimonial** (`Testimonial`)
  - name, role, content, rating, avatar, source, published, publishedAt

- **Partner** (`Partner`)
  - name, slug, logo, description, featured, applyLink, seo, status

- **SiteSettings** (`SiteSettings` - singleton)
  - siteTitle, siteDescription, logo, favicon, socialLinks, contactInfo, footerContent, analytics, maintenanceMode

---

## Example Seed Payloads

### Site Settings
```json
{
  "siteTitle": "Finonest",
  "siteDescription": "Smart loans, simple process",
  "contactInfo": { "phone": "+91-99999-99999", "email": "support@finonest.com" }
}
```

### Home Page (Page)
```json
{
  "slug": "/",
  "template": "home",
  "title": "Finonest - Home",
  "blocks": [
    { "type": "hero", "props": { "badgeText": "India's Fastest Growing Loan Provider", "heading": "Your Financial Dreams, Simplified", "subheading": "From personal loans to home financing", "ctas": [{"label":"Get Started","link":"/apply"}] } }
  ],
  "status": "published"
}
```

### Service
```json
{
  "slug": "home-loan",
  "title": "Home Loan",
  "shortDescription": "Turn your dream home into reality",
  "rate": "6.5%",
  "status": "published"
}
```

### BlogPost
```json
{
  "slug":"improve-credit-score-2025",
  "title":"How to Improve Your Credit Score in 2025",
  "excerpt":"Top strategies to boost your credit score.",
  "content":"<p>Full article HTML...</p>",
  "status":"published",
  "publishedAt":"2025-12-15T00:00:00.000Z",
  "seo":{"metaTitle":"How to Improve Your Credit Score","metaDescription":"..."}
}
```

### Partner Bank
```json
{
  "slug": "icici-bank",
  "name": "ICICI Bank",
  "featured": true,
  "applyLink": "https://icici.example.com/apply",
  "status": "published"
}
```

### Testimonial
```json
{
  "name": "Ravi Kumar",
  "role": "Verified Customer",
  "content": "Finonest helped me get a home loan in 30 days.",
  "rating": 5,
  "published": true
}
```

---

Use these examples to build seed scripts (see `server/scripts/seed.ts` if present) or the Admin UI import tools.
