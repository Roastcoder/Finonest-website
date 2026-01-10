const API_URL = process.env.VITE_API_URL || 'http://localhost:4000';

const pagesData = [
  {
    title: "Home",
    slug: "home",
    description: "Finonest - Your trusted financial partner for loans, credit solutions, and financial services across India.",
    status: "published",
    blocks: [
      {
        type: "hero",
        props: {
          title: "Your Trusted Financial Partner",
          subtitle: "Get Quick Loans with Transparent Process",
          description: "Fast approval, competitive rates, and hassle-free documentation for all your financial needs.",
          cta: { text: "Apply Now", link: "/apply" }
        }
      },
      {
        type: "stats",
        props: {
          items: [
            { value: "5.8L+", label: "Happy Customers" },
            { value: "35+", label: "Bank Partners" },
            { value: "24hrs", label: "Quick Approval" },
            { value: "100%", label: "Transparent" }
          ]
        }
      }
    ]
  },
  {
    title: "About Finonest",
    slug: "about",
    description: "Learn about Finonest India Pvt. Ltd. - one of the top 3 used car loan providers in Rajasthan with 18+ branches, 50K+ happy customers, and 7+ years of experience.",
    status: "published",
    blocks: [
      {
        type: "hero",
        props: {
          title: "One of the Top 3 Used Car Loan Providers in Rajasthan",
          subtitle: "Transforming Financial Services Since 2017",
          description: "18+ branches, 50K+ happy customers and growing. We specialize in used car loans and a broad range of lending products across Rajasthan."
        }
      },
      {
        type: "values",
        props: {
          title: "What Drives Us",
          items: [
            { icon: "Shield", title: "Integrity", description: "We uphold the highest standards of ethics and transparency." },
            { icon: "Lightbulb", title: "Innovation", description: "Constantly improving our product and customer experience." },
            { icon: "Heart", title: "Customer-Centric", description: "Customers' needs are at the heart of everything we do." },
            { icon: "Star", title: "Excellence", description: "Delivering high-quality service and measurable results." }
          ]
        }
      }
    ]
  },
  {
    title: "Contact Us",
    slug: "contact",
    description: "Get in touch with Finonest for all your loan and financial service needs. Multiple ways to reach us.",
    status: "published",
    blocks: [
      {
        type: "hero",
        props: {
          title: "Get in Touch",
          description: "We're here to help with all your financial needs"
        }
      },
      {
        type: "contact_info",
        props: {
          phone: "+91 98765 43210",
          email: "info@finonest.com",
          address: "Finonest India Pvt. Ltd., Rajasthan, India"
        }
      }
    ]
  },
  {
    title: "Privacy Policy",
    slug: "privacy-policy",
    description: "Finonest Privacy Policy - How we collect, use, and protect your personal information.",
    status: "published",
    blocks: [
      {
        type: "content",
        props: {
          title: "Privacy Policy",
          content: "At Finonest, we are committed to protecting your privacy and ensuring the security of your personal information..."
        }
      }
    ]
  },
  {
    title: "Terms and Conditions",
    slug: "terms-and-conditions",
    description: "Finonest Terms and Conditions - Legal terms governing the use of our services.",
    status: "published",
    blocks: [
      {
        type: "content",
        props: {
          title: "Terms and Conditions",
          content: "These terms and conditions govern your use of Finonest services..."
        }
      }
    ]
  }
];

const servicesData = [
  {
    title: "Home Loan",
    slug: "home-loan",
    description: "Get affordable home loans with competitive interest rates and flexible repayment options.",
    category: "Property Loans",
    featured: true,
    status: "published",
    blocks: [
      {
        type: "hero",
        props: {
          title: "Home Loan",
          description: "Make your dream home a reality with our affordable home loan solutions",
          features: ["Up to 90% financing", "Competitive rates", "Quick approval"]
        }
      }
    ]
  },
  {
    title: "Personal Loan",
    slug: "personal-loan",
    description: "Quick personal loans for all your immediate financial needs with minimal documentation.",
    category: "Personal Finance",
    featured: true,
    status: "published",
    blocks: [
      {
        type: "hero",
        props: {
          title: "Personal Loan",
          description: "Quick funds for your personal needs with minimal documentation",
          features: ["Instant approval", "No collateral", "Flexible tenure"]
        }
      }
    ]
  },
  {
    title: "Business Loan",
    slug: "business-loan",
    description: "Grow your business with our flexible business loan solutions and competitive rates.",
    category: "Business Finance",
    featured: true,
    status: "published",
    blocks: [
      {
        type: "hero",
        props: {
          title: "Business Loan",
          description: "Fuel your business growth with our tailored business loan solutions",
          features: ["Working capital", "Equipment finance", "Business expansion"]
        }
      }
    ]
  }
];

async function seedAllPages() {
  try {
    console.log('🌱 Starting to seed all pages...');

    // Seed Pages
    for (const page of pagesData) {
      try {
        const response = await fetch(`${API_URL}/api/admin/pages`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(page)
        });

        if (response.ok) {
          console.log(`✅ Page "${page.title}" seeded successfully`);
        } else {
          console.error(`❌ Failed to seed page "${page.title}":`, await response.text());
        }
      } catch (error) {
        console.error(`❌ Error seeding page "${page.title}":`, error.message);
      }
    }

    // Seed Services
    for (const service of servicesData) {
      try {
        const response = await fetch(`${API_URL}/api/admin/services`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(service)
        });

        if (response.ok) {
          console.log(`✅ Service "${service.title}" seeded successfully`);
        } else {
          console.error(`❌ Failed to seed service "${service.title}":`, await response.text());
        }
      } catch (error) {
        console.error(`❌ Error seeding service "${service.title}":`, error.message);
      }
    }

    console.log('🎉 All pages and services seeded successfully!');

  } catch (error) {
    console.error('❌ Error in seeding process:', error);
  }
}

// Run seeder
seedAllPages();