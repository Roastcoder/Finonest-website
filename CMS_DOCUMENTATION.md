# FinoNest CMS Backend Documentation

## Overview
This project now includes a comprehensive Content Management System (CMS) that allows administrators to manage all aspects of the website dynamically without code changes.

## Features

### 🎯 Core CMS Features
- **Dynamic Page Management**: Create, edit, and delete pages
- **Component Builder**: Add/remove/reorder page components
- **Content Blocks**: Manage text, images, and structured content
- **Theme Customization**: Change colors, fonts, and styling
- **Media Library**: Upload and manage images/videos
- **Real-time Updates**: Changes reflect immediately on the frontend

### 🔧 Admin Capabilities
- **Full Content Control**: Admin can change any text, image, or component
- **Page Structure**: Add/remove entire sections and pages
- **Color Themes**: Customize primary, secondary, accent colors
- **Component Templates**: Pre-built components (Hero, Services, Testimonials, etc.)
- **SEO Management**: Meta titles, descriptions, and keywords
- **Analytics Dashboard**: Track page views and user interactions

## Database Schema

### Core Tables
```sql
-- Pages management
pages (id, slug, title, meta_description, is_active, created_at, updated_at)

-- Page components
page_components (id, page_id, component_type, component_data, order_index, is_visible, created_at, updated_at)

-- Content blocks
content_blocks (id, key, title, content, content_type, is_active, created_at, updated_at)

-- Theme settings
theme_settings (id, key, value, category, created_at, updated_at)

-- Media library
media_library (id, filename, original_name, file_path, file_size, mime_type, alt_text, created_at)

-- Admin users
admin_users (id, email, password_hash, role, created_at, updated_at)
```

## API Endpoints

### Pages API
- `GET /api/pages` - Get all pages
- `POST /api/pages` - Create new page
- `PUT /api/pages/:id` - Update page
- `DELETE /api/pages/:id` - Delete page

### Components API
- `GET /api/pages/:id/components` - Get page components
- `POST /api/components` - Add component to page
- `PUT /api/components/:id` - Update component
- `DELETE /api/components/:id` - Remove component
- `PUT /api/components/reorder` - Reorder components

### Content API
- `GET /api/content` - Get all content blocks
- `GET /api/content/:key` - Get specific content
- `POST /api/content` - Create content block
- `PUT /api/content/:id` - Update content
- `DELETE /api/content/:id` - Delete content

### Theme API
- `GET /api/theme` - Get all theme settings
- `PUT /api/theme/:key` - Update theme setting
- `POST /api/theme/bulk` - Bulk update theme

### Media API
- `GET /api/media` - Get media library
- `POST /api/media/upload` - Upload file
- `DELETE /api/media/:id` - Delete file

## Component Types

### Available Components
1. **Hero Section**
   - Title, subtitle, background image
   - Call-to-action button
   - Customizable colors

2. **Services Grid**
   - Service cards with icons
   - Descriptions and features
   - Links to service pages

3. **Testimonials**
   - Customer reviews
   - Star ratings
   - Customer photos

4. **Contact Form**
   - Customizable form fields
   - Contact information display
   - Form submission handling

5. **Statistics**
   - Key metrics display
   - Animated counters
   - Custom styling

6. **Text Block**
   - Rich text content
   - HTML support
   - Custom alignment

7. **Image Gallery**
   - Multiple layout options
   - Lightbox functionality
   - Captions support

8. **CTA Banner**
   - Call-to-action sections
   - Custom buttons
   - Background customization

## Admin Access

### Login Process
1. Navigate to `/admin/login`
2. Enter admin credentials
3. System verifies admin role
4. Redirect to CMS dashboard

### Admin Routes
- `/admin/login` - Admin login page
- `/admin` - Original admin dashboard (applications)
- `/admin/cms` - New CMS interface

### Creating Admin Account
```javascript
// First admin can be created through the login page
// Or via direct database insertion
INSERT INTO admin_users (email, password_hash, role) 
VALUES ('admin@example.com', 'hashed_password', 'admin');
```

## Frontend Integration

### Dynamic Content Hooks
```javascript
// Get dynamic content
const { content, loading } = useContent('hero_title');

// Get theme settings
const { theme, loading } = useTheme();

// Get page components
const { components, loading } = usePageComponents('home');
```

### Real-time Updates
The system uses Supabase real-time subscriptions to update content immediately when admins make changes.

### Component Rendering
```javascript
<DynamicComponent
  type="hero"
  data={componentData}
  theme={themeSettings}
/>
```

## Usage Examples

### 1. Change Homepage Hero Text
1. Login to admin panel
2. Go to Pages → Home
3. Click on Hero component
4. Edit title and subtitle
5. Save changes
6. Changes appear immediately on website

### 2. Add New Service
1. Go to Components tab
2. Select Services component
3. Add new service with title, description, icon
4. Set link to service page
5. Save and publish

### 3. Update Site Colors
1. Go to Theme tab
2. Select Colors section
3. Change primary, secondary, accent colors
4. Preview changes in real-time
5. Apply to entire site

### 4. Create New Page
1. Go to Pages tab
2. Click "Create Page"
3. Set slug, title, meta description
4. Add components (hero, content, etc.)
5. Arrange component order
6. Publish page

## Security Features

### Authentication
- Secure admin login with email/password
- Role-based access control
- Session management

### Authorization
- Admin-only access to CMS
- Row-level security in database
- API endpoint protection

### Data Validation
- Input sanitization
- File upload restrictions
- Content validation

## Performance Optimizations

### Caching
- Content caching for faster load times
- Image optimization
- CDN integration ready

### Real-time Updates
- Efficient WebSocket connections
- Selective component updates
- Minimal re-renders

## Deployment

### Environment Variables
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_key
```

### Database Setup
1. Run migration: `20241223_admin_cms.sql`
2. Set up Row Level Security policies
3. Create admin user account
4. Configure storage bucket for media

### Production Checklist
- [ ] Database migrations applied
- [ ] Admin account created
- [ ] Storage bucket configured
- [ ] Environment variables set
- [ ] SSL certificates installed
- [ ] Backup strategy implemented

## Troubleshooting

### Common Issues
1. **Admin can't login**: Check user_roles table
2. **Content not updating**: Verify RLS policies
3. **Images not loading**: Check storage bucket permissions
4. **Real-time not working**: Verify WebSocket connection

### Debug Mode
Enable debug logging by setting:
```javascript
localStorage.setItem('cms_debug', 'true');
```

## Future Enhancements

### Planned Features
- [ ] Multi-language support
- [ ] Content scheduling
- [ ] Version control
- [ ] Advanced analytics
- [ ] Email templates
- [ ] Form builder
- [ ] SEO optimization tools
- [ ] A/B testing
- [ ] Backup/restore functionality
- [ ] API documentation generator

## Support

For technical support or feature requests, contact the development team or create an issue in the project repository.

---

**Note**: This CMS system provides complete control over website content, design, and structure. Admins can modify everything from text and images to entire page layouts and color schemes without any coding knowledge.