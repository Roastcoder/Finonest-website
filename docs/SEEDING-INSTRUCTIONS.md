# CMS Content Seeding Instructions

## Quick Start

1. **Ensure MongoDB is running**
   ```bash
   # Check if MongoDB is running
   # If not, start it:
   mongod
   # Or use your MongoDB service/Atlas connection
   ```

2. **Set environment variables** (optional)
   ```bash
   # Create .env file in project root if not exists
   MONGO_URI=mongodb://localhost:27017/finonest-dev
   SEED_ADMIN_EMAIL=admin@finonest.com
   SEED_ADMIN_PASSWORD=Admin@123
   ```

3. **Run the seeding script**
   ```bash
   npm run seed:cms
   ```

## What Gets Created

The seeding script populates your database with:

- ✅ **1 SuperAdmin user** (for admin panel access)
- ✅ **4 Stats** (customers, cities, branches, disbursed amount)
- ✅ **4 Process Steps** (application workflow)
- ✅ **5 FAQs** (common questions)
- ✅ **12 Navigation Items** (header + footer menus)
- ✅ **1 Footer** (complete footer content)
- ✅ **6 WhyUs Features** (why choose us section)
- ✅ **5 Services** (home loan, personal loan, car loan, business loan, credit cards)
- ✅ **5 Categories** (for blog/services)
- ✅ **5 Tags** (for content tagging)
- ✅ **4 Testimonials** (customer reviews)
- ✅ **6 Banking Partners** (partner banks)
- ✅ **Site Settings** (contact info, social links, SEO)
- ✅ **2 Blog Posts** (sample articles)

## Default Admin Credentials

After seeding, you can login with:
- **Email:** `admin@finonest.com`
- **Password:** `Admin@123`

⚠️ **Important:** Change the password immediately after first login!

## Verification

After seeding, verify the content:

1. **Frontend:**
   - Visit `http://localhost:5173`
   - Check that stats, services, FAQs, etc. are displayed

2. **Admin Panel:**
   - Login at `http://localhost:5173/admin/login`
   - Navigate to `/admin/cms` to see all seeded content
   - Check each section (Pages, Services, Blog, etc.)

## Re-running the Script

The script is **idempotent** - safe to run multiple times:
- Uses `upsert: true` to update existing records
- Won't create duplicates
- Updates existing content with latest seed data

## Customization

After seeding, you can:
- Edit any content through the admin panel
- Add more services, blog posts, FAQs, etc.
- Customize navigation and footer
- Update site settings

## Troubleshooting

### MongoDB Not Running
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Start MongoDB or update `MONGO_URI` to your MongoDB instance.

### Connection String Issues
If using MongoDB Atlas, use the full connection string:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/finonest
```

### TypeScript Errors
Make sure dependencies are installed:
```bash
npm install
```

## Next Steps

After successful seeding:
1. ✅ Login to admin panel
2. ✅ Review all seeded content
3. ✅ Customize content as needed
4. ✅ Add more content through admin UI
5. ✅ Test frontend to ensure CMS content displays correctly
