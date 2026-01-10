import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/finonest');

const pageSchema = new mongoose.Schema({
  slug: String,
  title: String,
  template: String,
  blocks: Array,
  status: String,
  seo: Object
}, { timestamps: true });

const Page = mongoose.model('Page', pageSchema);

const aboutPage = {
  slug: '/about',
  title: 'About Finonest',
  template: 'default',
  status: 'published',
  seo: {
    metaTitle: 'About Finonest - Top 3 Used Car Loan Provider in Rajasthan',
    metaDescription: 'Learn about Finonest India Pvt. Ltd. - one of the top 3 used car loan providers in Rajasthan with 18+ branches, 50K+ happy customers, and 7+ years of experience.'
  },
  blocks: [
    {
      type: 'hero',
      props: {
        badgeText: 'Transforming Financial Services Since 2017',
        heading: 'One of the Top 3 Used Car Loan Providers in Rajasthan',
        subheading: '18+ branches, 50K+ happy customers and growing. We specialize in used car loans and a broad range of lending products across Rajasthan.',
        heroImage: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800',
        ctas: [
          { label: 'Meet Our Team', link: '/contact' },
          { label: 'Contact Sales', link: '/contact' }
        ]
      }
    },
    {
      type: 'stats',
      props: {
        title: 'Our Achievements',
        subtitle: 'Numbers that speak for our success',
        stats: [
          { label: 'Branches', value: '18+', icon: '🏢' },
          { label: 'Happy Customers', value: '50K+', icon: '👥' },
          { label: 'Years Experience', value: '7+', icon: '⭐' },
          { label: 'Loan Products', value: '15+', icon: '💰' }
        ]
      }
    },
    {
      type: 'whyUs',
      props: {
        title: 'What Drives Us',
        subtitle: 'Our core values that guide everything we do',
        features: [
          {
            title: 'Integrity',
            description: 'We believe in transparent and honest dealings with all our customers and partners.',
            icon: '🛡️'
          },
          {
            title: 'Innovation',
            description: 'Constantly evolving our services to meet changing customer needs and market demands.',
            icon: '💡'
          },
          {
            title: 'Customer First',
            description: 'Every decision we make is centered around providing the best experience for our customers.',
            icon: '❤️'
          },
          {
            title: 'Excellence',
            description: 'We strive for excellence in every aspect of our service delivery and customer interactions.',
            icon: '⭐'
          }
        ]
      }
    },
    {
      type: 'testimonials',
      props: {
        title: 'Meet the Visionary Leaders',
        subtitle: 'The driving force behind Finonest\'s success',
        testimonials: [
          {
            name: 'Rajesh Kumar Sharma',
            role: 'Founder & Managing Director',
            content: 'With over 15 years of experience in financial services, Rajesh has been instrumental in establishing Finonest as one of the leading loan providers in Rajasthan.',
            rating: 5,
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
          },
          {
            name: 'Priya Sharma',
            role: 'Co-Founder & Chief Operations Officer',
            content: 'Priya brings extensive expertise in operations and customer service. Her focus on process optimization has helped Finonest maintain excellent service quality.',
            rating: 5,
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100'
          }
        ]
      }
    }
  ]
};

async function createAboutPage() {
  try {
    await Page.deleteOne({ slug: '/about' });
    const page = new Page(aboutPage);
    await page.save();
    console.log('✅ About page created successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

createAboutPage();