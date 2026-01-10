import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { isAuthenticated } from '../../lib/api';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Card } from '../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { useToast } from '../../hooks/use-toast';
import AdminLayout from '../../components/AdminLayout';
import { 
  FileText, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  Loader2,
  Eye,
  Copy
} from 'lucide-react';

interface Block {
  type: string;
  props: Record<string, any>;
}

interface Page {
  _id?: string;
  slug: string;
  title?: string;
  template?: string;
  blocks: Block[];
  status: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

const availableBlockTypes = [
  'hero', 'services', 'processSteps', 'whyUs', 'testimonials', 
  'faq', 'contact', 'partnerBanks', 'creditScoreBanner', 'stats', 'featuredServices', 'creditCardBanner'
];

const PagesAdmin = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pages, setPages] = useState<Page[]>([]);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [editingBlock, setEditingBlock] = useState<number | null>(null);
  const [newPageSlug, setNewPageSlug] = useState('');

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Skip auth check for development - directly load pages
    loadPages();
  }, [navigate]);

  const loadPages = async () => {
    try {
      setLoading(true);
      console.log('Loading pages...');
      
      // Try public API first as fallback
      const res = await api.publicCMS.listPages();
      console.log('Pages API response:', res);
      
      if (res && res.status === 'ok' && res.data) {
        // Handle paginated response format
        const pagesData = res.data.items || res.data || [];
        console.log('Pages data:', pagesData);
        setPages(pagesData);
        
        if (pagesData.length > 0) {
          const homePage = pagesData.find((p: Page) => p.slug === '/') || pagesData[0];
          console.log('Selected home page:', homePage);
          setSelectedPage(homePage);
        }
      } else {
        console.log('No pages data received');
        toast({ variant: 'destructive', title: 'Info', description: 'No pages found in database' });
      }
    } catch (error: any) {
      console.error('Failed to load pages:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to load pages: ' + error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleSavePage = async () => {
    if (!selectedPage) return;
    
    try {
      setSaving(true);
      if (selectedPage._id) {
        await api.cms.updatePageAdmin(selectedPage._id, selectedPage);
      } else {
        await api.cms.createPageAdmin(selectedPage);
      }
      toast({ title: 'Saved', description: 'Page updated successfully' });
      loadPages();
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Error', description: error.message || 'Failed to save page' });
    } finally {
      setSaving(false);
    }
  };

  const handleCreatePage = async () => {
    if (!newPageSlug.trim()) return;
    
    const newPage: Page = {
      slug: newPageSlug.startsWith('/') ? newPageSlug : `/${newPageSlug}`,
      title: newPageSlug.replace(/[^a-zA-Z0-9]/g, ' ').replace(/\s+/g, ' ').trim(),
      template: 'default',
      blocks: [],
      status: 'draft'
    };
    
    setSelectedPage(newPage);
    setNewPageSlug('');
  };

  const addBlock = (type: string) => {
    if (!selectedPage) return;
    
    const newBlock: Block = {
      type,
      props: getDefaultProps(type)
    };
    
    setSelectedPage({
      ...selectedPage,
      blocks: [...selectedPage.blocks, newBlock]
    });
  };

  const removeBlock = (index: number) => {
    if (!selectedPage) return;
    
    const updatedBlocks = selectedPage.blocks.filter((_, i) => i !== index);
    setSelectedPage({
      ...selectedPage,
      blocks: updatedBlocks
    });
  };

  const updateBlockProp = (blockIndex: number, key: string, value: any) => {
    if (!selectedPage) return;
    
    const updatedBlocks = [...selectedPage.blocks];
    updatedBlocks[blockIndex] = {
      ...updatedBlocks[blockIndex],
      props: {
        ...updatedBlocks[blockIndex].props,
        [key]: value
      }
    };
    
    setSelectedPage({
      ...selectedPage,
      blocks: updatedBlocks
    });
  };

  const getDefaultProps = (type: string) => {
    switch (type) {
      case 'hero':
        return {
          badgeText: "India's Fastest Growing Loan Provider",
          heading: 'Your Financial Dreams, Simplified',
          subheading: 'Get instant loan approvals with competitive rates. From personal loans to home financing, we make your dreams come true with 100% paperless processing.',
          heroImage: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800',
          carouselImages: [
            'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800',
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
            'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800'
          ],
          ctas: [{ label: 'Apply Now', link: '/apply' }, { label: 'Check Eligibility', link: '/services' }]
        };
      case 'services':
        return { 
          title: 'Our Loan Services', 
          subtitle: 'Choose from our wide range of financial products',
          services: [
            { title: 'Personal Loan', description: 'Quick personal loans up to ₹50 lakhs', icon: '💰', rate: '10.5%', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400' },
            { title: 'Home Loan', description: 'Affordable home loans with low interest', icon: '🏠', rate: '8.5%', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400' },
            { title: 'Business Loan', description: 'Grow your business with flexible loans', icon: '🏢', rate: '12%', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400' }
          ]
        };
      case 'whyUs':
        return { 
          title: 'Why Choose Finonest?', 
          subtitle: 'Your trusted financial partner with unmatched benefits',
          features: [
            { title: 'Quick Approval', description: 'Get approved in just 30 minutes', icon: '⚡', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400' },
            { title: 'Best Rates', description: 'Competitive interest rates in the market', icon: '💎', image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400' },
            { title: '100% Digital', description: 'Completely paperless process', icon: '📱', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400' }
          ]
        };
      case 'testimonials':
        return { 
          title: 'What Our Customers Say', 
          subtitle: 'Over 50,000+ satisfied customers across India',
          testimonials: [
            { name: 'Ravi Kumar', role: 'Business Owner', content: 'Finonest helped me get a business loan quickly. Excellent service!', rating: 5, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100' },
            { name: 'Priya Sharma', role: 'Software Engineer', content: 'Got my home loan approved in just 2 days. Highly recommended!', rating: 5, avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100' }
          ]
        };
      case 'processSteps':
        return { 
          title: 'Get Your Loan in 4 Simple Steps', 
          subtitle: 'Quick and hassle-free loan process',
          steps: [
            { step: 1, title: 'Apply Online', description: 'Fill our simple online application form', icon: '📝', image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400' },
            { step: 2, title: 'Document Upload', description: 'Upload required documents digitally', icon: '📄', image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400' },
            { step: 3, title: 'Quick Approval', description: 'Get instant approval notification', icon: '✅', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400' },
            { step: 4, title: 'Fund Transfer', description: 'Receive funds directly in your account', icon: '💸', image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400' }
          ]
        };
      case 'faq':
        return { 
          title: 'Frequently Asked Questions', 
          subtitle: 'Get answers to common loan-related queries',
          faqs: [
            { question: 'How long does loan approval take?', answer: 'Most loans are approved within 24-48 hours of document submission.' },
            { question: 'What documents are required?', answer: 'Basic documents include ID proof, address proof, income proof, and bank statements.' },
            { question: 'What is the minimum credit score required?', answer: 'We accept applications from credit scores of 650 and above.' }
          ]
        };
      case 'contact':
        return { 
          title: 'Get in Touch', 
          subtitle: 'Our loan experts are available 24/7 to assist you',
          phone: '+91 9876543210',
          email: 'contact@finonest.com',
          address: '3rd Floor, Besides Jaipur Hospital, BL Tower 1, Tonk Rd, Mahaveer Nagar, Jaipur, Rajasthan 302018'
        };
      case 'partnerBanks':
        return { 
          title: 'Our Banking Partners', 
          subtitle: 'Partnered with 50+ leading banks and NBFCs',
          partners: [
            { name: 'HDFC Bank', logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200', featured: true },
            { name: 'ICICI Bank', logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200', featured: true },
            { name: 'Axis Bank', logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200', featured: false }
          ]
        };
      case 'creditScoreBanner':
        return { 
          title: 'Check Your Credit Score for Free', 
          subtitle: 'Know your creditworthiness instantly',
          backgroundImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800'
        };
      case 'stats':
        return {
          title: 'Our Achievements',
          subtitle: 'Numbers that speak for our success',
          stats: [
            { label: 'Customers Annually', value: '5.8 Lacs +', icon: '👥' },
            { label: 'Cities Covered', value: '150 +', icon: '🏙️' },
            { label: 'Branches', value: '587 +', icon: '🏢' },
            { label: 'Disbursed Annually', value: '61,000 Cr+', icon: '💰' }
          ]
        };
      case 'featuredServices':
        return {
          title: 'Featured Services',
          subtitle: 'Our most popular loan products',
          services: [
            { title: 'Home Loan', description: 'Turn your dream home into reality', featured: true, image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400' },
            { title: 'Credit Card', description: 'Choose cards from all top banks', featured: true, image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400' },
            { title: 'New Car Loan', description: 'Drive away your dream car today', featured: true, image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400' },
            { title: 'Personal Loan', description: 'Paperless process at low rate', featured: true, image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400' }
          ]
        };
      case 'creditCardBanner':
        return {
          title: 'Your Rewards Unlimited',
          subtitle: 'Choose cards from all top banks',
          description: 'Compare and apply for credit cards from leading banks',
          backgroundImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
          ctaText: 'Apply Now',
          ctaLink: '/credit-cards'
        };
      default:
        return {};
    }
  };

  const renderBlockEditor = (block: Block, index: number) => {
    const commonFields = (
      <>
        <div>
          <label className="text-sm font-medium mb-1 block">Title</label>
          <Input
            value={block.props.title || ''}
            onChange={(e) => updateBlockProp(index, 'title', e.target.value)}
            placeholder="Block title"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Subtitle</label>
          <Input
            value={block.props.subtitle || ''}
            onChange={(e) => updateBlockProp(index, 'subtitle', e.target.value)}
            placeholder="Block subtitle"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Description</label>
          <Textarea
            value={block.props.description || ''}
            onChange={(e) => updateBlockProp(index, 'description', e.target.value)}
            placeholder="Block description"
            rows={3}
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Background Image URL</label>
          <Input
            value={block.props.backgroundImage || ''}
            onChange={(e) => updateBlockProp(index, 'backgroundImage', e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
          {block.props.backgroundImage && (
            <div className="mt-2">
              <img src={block.props.backgroundImage} alt="Background preview" className="w-32 h-20 object-cover rounded border" />
            </div>
          )}
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Image URL</label>
          <Input
            value={block.props.image || ''}
            onChange={(e) => updateBlockProp(index, 'image', e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
          {block.props.image && (
            <div className="mt-2">
              <img src={block.props.image} alt="Image preview" className="w-32 h-20 object-cover rounded border" />
            </div>
          )}
        </div>
      </>
    );

    switch (block.type) {
      case 'hero':
        return (
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium mb-1 block">Badge Text</label>
              <Input
                value={block.props.badgeText || ''}
                onChange={(e) => updateBlockProp(index, 'badgeText', e.target.value)}
                placeholder="Badge text"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Heading</label>
              <Input
                value={block.props.heading || ''}
                onChange={(e) => updateBlockProp(index, 'heading', e.target.value)}
                placeholder="Main heading"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Subheading</label>
              <Textarea
                value={block.props.subheading || ''}
                onChange={(e) => updateBlockProp(index, 'subheading', e.target.value)}
                placeholder="Subheading text"
                rows={2}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Hero Image URL</label>
              <Input
                value={block.props.heroImage || ''}
                onChange={(e) => updateBlockProp(index, 'heroImage', e.target.value)}
                placeholder="https://example.com/hero-image.jpg"
              />
              {block.props.heroImage && (
                <div className="mt-2">
                  <img src={block.props.heroImage} alt="Hero image preview" className="w-32 h-20 object-cover rounded border" />
                </div>
              )}
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Carousel Images</label>
              {(block.props.carouselImages || []).map((img: string, idx: number) => (
                <div key={idx} className="border rounded p-2 mb-2 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Image {idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const images = [...(block.props.carouselImages || [])];
                        images.splice(idx, 1);
                        updateBlockProp(index, 'carouselImages', images);
                      }}
                      className="text-red-500 text-xs"
                    >
                      Remove
                    </button>
                  </div>
                  <Input
                    placeholder="Image URL"
                    value={img || ''}
                    onChange={(e) => {
                      const images = [...(block.props.carouselImages || [])];
                      images[idx] = e.target.value;
                      updateBlockProp(index, 'carouselImages', images);
                    }}
                  />
                  {img && <img src={img} alt={`Carousel ${idx + 1}`} className="w-20 h-12 object-cover rounded" />}
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const images = [...(block.props.carouselImages || []), ''];
                  updateBlockProp(index, 'carouselImages', images);
                }}
                className="text-sm bg-primary text-primary-foreground px-3 py-1 rounded"
              >
                Add Image
              </button>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Background Video URL</label>
              <Input
                value={block.props.videoUrl || ''}
                onChange={(e) => updateBlockProp(index, 'videoUrl', e.target.value)}
                placeholder="https://example.com/video.mp4"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Call-to-Action Buttons</label>
              {(block.props.ctas || []).map((cta: any, idx: number) => (
                <div key={idx} className="border rounded p-2 mb-2 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Button {idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const ctas = [...(block.props.ctas || [])];
                        ctas.splice(idx, 1);
                        updateBlockProp(index, 'ctas', ctas);
                      }}
                      className="text-red-500 text-xs"
                    >
                      Remove
                    </button>
                  </div>
                  <Input
                    placeholder="Button label"
                    value={cta.label || ''}
                    onChange={(e) => {
                      const ctas = [...(block.props.ctas || [])];
                      ctas[idx] = { ...ctas[idx], label: e.target.value };
                      updateBlockProp(index, 'ctas', ctas);
                    }}
                  />
                  <Input
                    placeholder="Button link"
                    value={cta.link || ''}
                    onChange={(e) => {
                      const ctas = [...(block.props.ctas || [])];
                      ctas[idx] = { ...ctas[idx], link: e.target.value };
                      updateBlockProp(index, 'ctas', ctas);
                    }}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const ctas = [...(block.props.ctas || []), { label: '', link: '' }];
                  updateBlockProp(index, 'ctas', ctas);
                }}
                className="text-sm bg-primary text-primary-foreground px-3 py-1 rounded"
              >
                Add Button
              </button>
            </div>
          </div>
        );
      case 'services':
        return (
          <div className="space-y-3">
            {commonFields}
            <div>
              <label className="text-sm font-medium mb-1 block">Services</label>
              {(block.props.services || []).map((service: any, idx: number) => (
                <div key={idx} className="border rounded p-3 mb-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Service {idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const services = [...(block.props.services || [])];
                        services.splice(idx, 1);
                        updateBlockProp(index, 'services', services);
                      }}
                      className="text-red-500 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <Input
                    placeholder="Service title"
                    value={service.title || ''}
                    onChange={(e) => {
                      const services = [...(block.props.services || [])];
                      services[idx] = { ...services[idx], title: e.target.value };
                      updateBlockProp(index, 'services', services);
                    }}
                  />
                  <Textarea
                    placeholder="Service description"
                    value={service.description || ''}
                    onChange={(e) => {
                      const services = [...(block.props.services || [])];
                      services[idx] = { ...services[idx], description: e.target.value };
                      updateBlockProp(index, 'services', services);
                    }}
                    rows={2}
                  />
                  <Input
                    placeholder="Icon"
                    value={service.icon || ''}
                    onChange={(e) => {
                      const services = [...(block.props.services || [])];
                      services[idx] = { ...services[idx], icon: e.target.value };
                      updateBlockProp(index, 'services', services);
                    }}
                  />
                  <Input
                    placeholder="Rate"
                    value={service.rate || ''}
                    onChange={(e) => {
                      const services = [...(block.props.services || [])];
                      services[idx] = { ...services[idx], rate: e.target.value };
                      updateBlockProp(index, 'services', services);
                    }}
                  />
                  <Input
                    placeholder="Image URL"
                    value={service.image || ''}
                    onChange={(e) => {
                      const services = [...(block.props.services || [])];
                      services[idx] = { ...services[idx], image: e.target.value };
                      updateBlockProp(index, 'services', services);
                    }}
                  />
                  {service.image && (
                    <img src={service.image} alt="Service preview" className="w-20 h-12 object-cover rounded" />
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const services = [...(block.props.services || []), { title: '', description: '', icon: '', rate: '', image: '' }];
                  updateBlockProp(index, 'services', services);
                }}
                className="text-sm bg-primary text-primary-foreground px-3 py-1 rounded"
              >
                Add Service
              </button>
            </div>
          </div>
        );
      case 'testimonials':
        return (
          <div className="space-y-3">
            {commonFields}
            <div>
              <label className="text-sm font-medium mb-1 block">Testimonials</label>
              {(block.props.testimonials || []).map((testimonial: any, idx: number) => (
                <div key={idx} className="border rounded p-3 mb-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Testimonial {idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const testimonials = [...(block.props.testimonials || [])];
                        testimonials.splice(idx, 1);
                        updateBlockProp(index, 'testimonials', testimonials);
                      }}
                      className="text-red-500 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <Input
                    placeholder="Name"
                    value={testimonial.name || ''}
                    onChange={(e) => {
                      const testimonials = [...(block.props.testimonials || [])];
                      testimonials[idx] = { ...testimonials[idx], name: e.target.value };
                      updateBlockProp(index, 'testimonials', testimonials);
                    }}
                  />
                  <Input
                    placeholder="Role"
                    value={testimonial.role || ''}
                    onChange={(e) => {
                      const testimonials = [...(block.props.testimonials || [])];
                      testimonials[idx] = { ...testimonials[idx], role: e.target.value };
                      updateBlockProp(index, 'testimonials', testimonials);
                    }}
                  />
                  <Textarea
                    placeholder="Testimonial content"
                    value={testimonial.content || ''}
                    onChange={(e) => {
                      const testimonials = [...(block.props.testimonials || [])];
                      testimonials[idx] = { ...testimonials[idx], content: e.target.value };
                      updateBlockProp(index, 'testimonials', testimonials);
                    }}
                    rows={3}
                  />
                  <Input
                    placeholder="Rating (1-5)"
                    type="number"
                    min="1"
                    max="5"
                    value={testimonial.rating || ''}
                    onChange={(e) => {
                      const testimonials = [...(block.props.testimonials || [])];
                      testimonials[idx] = { ...testimonials[idx], rating: parseInt(e.target.value) };
                      updateBlockProp(index, 'testimonials', testimonials);
                    }}
                  />
                  <Input
                    placeholder="Avatar URL"
                    value={testimonial.avatar || ''}
                    onChange={(e) => {
                      const testimonials = [...(block.props.testimonials || [])];
                      testimonials[idx] = { ...testimonials[idx], avatar: e.target.value };
                      updateBlockProp(index, 'testimonials', testimonials);
                    }}
                  />
                  {testimonial.avatar && (
                    <img src={testimonial.avatar} alt="Avatar preview" className="w-12 h-12 object-cover rounded-full" />
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const testimonials = [...(block.props.testimonials || []), { name: '', role: '', content: '', rating: 5, avatar: '' }];
                  updateBlockProp(index, 'testimonials', testimonials);
                }}
                className="text-sm bg-primary text-primary-foreground px-3 py-1 rounded"
              >
                Add Testimonial
              </button>
            </div>
          </div>
        );
      case 'whyUs':
        return (
          <div className="space-y-3">
            {commonFields}
            <div>
              <label className="text-sm font-medium mb-1 block">Features</label>
              {(block.props.features || []).map((feature: any, idx: number) => (
                <div key={idx} className="border rounded p-3 mb-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Feature {idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const features = [...(block.props.features || [])];
                        features.splice(idx, 1);
                        updateBlockProp(index, 'features', features);
                      }}
                      className="text-red-500 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <Input
                    placeholder="Feature title"
                    value={feature.title || ''}
                    onChange={(e) => {
                      const features = [...(block.props.features || [])];
                      features[idx] = { ...features[idx], title: e.target.value };
                      updateBlockProp(index, 'features', features);
                    }}
                  />
                  <Textarea
                    placeholder="Feature description"
                    value={feature.description || ''}
                    onChange={(e) => {
                      const features = [...(block.props.features || [])];
                      features[idx] = { ...features[idx], description: e.target.value };
                      updateBlockProp(index, 'features', features);
                    }}
                    rows={2}
                  />
                  <Input
                    placeholder="Icon (emoji or text)"
                    value={feature.icon || ''}
                    onChange={(e) => {
                      const features = [...(block.props.features || [])];
                      features[idx] = { ...features[idx], icon: e.target.value };
                      updateBlockProp(index, 'features', features);
                    }}
                  />
                  <Input
                    placeholder="Image URL"
                    value={feature.image || ''}
                    onChange={(e) => {
                      const features = [...(block.props.features || [])];
                      features[idx] = { ...features[idx], image: e.target.value };
                      updateBlockProp(index, 'features', features);
                    }}
                  />
                  {feature.image && (
                    <img src={feature.image} alt="Feature preview" className="w-20 h-12 object-cover rounded" />
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const features = [...(block.props.features || []), { title: '', description: '', icon: '', image: '' }];
                  updateBlockProp(index, 'features', features);
                }}
                className="text-sm bg-primary text-primary-foreground px-3 py-1 rounded"
              >
                Add Feature
              </button>
            </div>
          </div>
        );
      case 'processSteps':
        return (
          <div className="space-y-3">
            {commonFields}
            <div>
              <label className="text-sm font-medium mb-1 block">Process Steps</label>
              {(block.props.steps || []).map((step: any, idx: number) => (
                <div key={idx} className="border rounded p-3 mb-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Step {idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const steps = [...(block.props.steps || [])];
                        steps.splice(idx, 1);
                        updateBlockProp(index, 'steps', steps);
                      }}
                      className="text-red-500 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <Input
                    placeholder="Step number"
                    type="number"
                    value={step.step || ''}
                    onChange={(e) => {
                      const steps = [...(block.props.steps || [])];
                      steps[idx] = { ...steps[idx], step: parseInt(e.target.value) };
                      updateBlockProp(index, 'steps', steps);
                    }}
                  />
                  <Input
                    placeholder="Step title"
                    value={step.title || ''}
                    onChange={(e) => {
                      const steps = [...(block.props.steps || [])];
                      steps[idx] = { ...steps[idx], title: e.target.value };
                      updateBlockProp(index, 'steps', steps);
                    }}
                  />
                  <Textarea
                    placeholder="Step description"
                    value={step.description || ''}
                    onChange={(e) => {
                      const steps = [...(block.props.steps || [])];
                      steps[idx] = { ...steps[idx], description: e.target.value };
                      updateBlockProp(index, 'steps', steps);
                    }}
                    rows={2}
                  />
                  <Input
                    placeholder="Icon"
                    value={step.icon || ''}
                    onChange={(e) => {
                      const steps = [...(block.props.steps || [])];
                      steps[idx] = { ...steps[idx], icon: e.target.value };
                      updateBlockProp(index, 'steps', steps);
                    }}
                  />
                  <Input
                    placeholder="Image URL"
                    value={step.image || ''}
                    onChange={(e) => {
                      const steps = [...(block.props.steps || [])];
                      steps[idx] = { ...steps[idx], image: e.target.value };
                      updateBlockProp(index, 'steps', steps);
                    }}
                  />
                  {step.image && (
                    <img src={step.image} alt="Step preview" className="w-20 h-12 object-cover rounded" />
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const steps = [...(block.props.steps || []), { step: (block.props.steps?.length || 0) + 1, title: '', description: '', icon: '', image: '' }];
                  updateBlockProp(index, 'steps', steps);
                }}
                className="text-sm bg-primary text-primary-foreground px-3 py-1 rounded"
              >
                Add Step
              </button>
            </div>
          </div>
        );
      case 'faq':
        return (
          <div className="space-y-3">
            {commonFields}
            <div>
              <label className="text-sm font-medium mb-1 block">FAQ Items</label>
              {(block.props.faqs || []).map((faq: any, idx: number) => (
                <div key={idx} className="border rounded p-3 mb-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">FAQ {idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const faqs = [...(block.props.faqs || [])];
                        faqs.splice(idx, 1);
                        updateBlockProp(index, 'faqs', faqs);
                      }}
                      className="text-red-500 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <Input
                    placeholder="Question"
                    value={faq.question || ''}
                    onChange={(e) => {
                      const faqs = [...(block.props.faqs || [])];
                      faqs[idx] = { ...faqs[idx], question: e.target.value };
                      updateBlockProp(index, 'faqs', faqs);
                    }}
                  />
                  <Textarea
                    placeholder="Answer"
                    value={faq.answer || ''}
                    onChange={(e) => {
                      const faqs = [...(block.props.faqs || [])];
                      faqs[idx] = { ...faqs[idx], answer: e.target.value };
                      updateBlockProp(index, 'faqs', faqs);
                    }}
                    rows={3}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const faqs = [...(block.props.faqs || []), { question: '', answer: '' }];
                  updateBlockProp(index, 'faqs', faqs);
                }}
                className="text-sm bg-primary text-primary-foreground px-3 py-1 rounded"
              >
                Add FAQ
              </button>
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="space-y-3">
            {commonFields}
            <div>
              <label className="text-sm font-medium mb-1 block">Phone</label>
              <Input
                value={block.props.phone || ''}
                onChange={(e) => updateBlockProp(index, 'phone', e.target.value)}
                placeholder="+91 9876543210"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Email</label>
              <Input
                value={block.props.email || ''}
                onChange={(e) => updateBlockProp(index, 'email', e.target.value)}
                placeholder="contact@finonest.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Address</label>
              <Textarea
                value={block.props.address || ''}
                onChange={(e) => updateBlockProp(index, 'address', e.target.value)}
                placeholder="Office address"
                rows={3}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Map Embed URL</label>
              <Input
                value={block.props.mapUrl || ''}
                onChange={(e) => updateBlockProp(index, 'mapUrl', e.target.value)}
                placeholder="Google Maps embed URL"
              />
            </div>
          </div>
        );
      case 'partnerBanks':
        return (
          <div className="space-y-3">
            {commonFields}
            <div>
              <label className="text-sm font-medium mb-1 block">Partners Data (JSON)</label>
              <Textarea
                value={JSON.stringify(block.props.partners || [], null, 2)}
                onChange={(e) => {
                  try {
                    const partners = JSON.parse(e.target.value);
                    updateBlockProp(index, 'partners', partners);
                  } catch {}
                }}
                placeholder='[{"name": "HDFC Bank", "logo": "https://example.com/hdfc-logo.png", "featured": true}]'
                rows={5}
              />
            </div>
          </div>
        );
      case 'stats':
        return (
          <div className="space-y-3">
            {commonFields}
            <div>
              <label className="text-sm font-medium mb-1 block">Stats Data (JSON)</label>
              <Textarea
                value={JSON.stringify(block.props.stats || [], null, 2)}
                onChange={(e) => {
                  try {
                    const stats = JSON.parse(e.target.value);
                    updateBlockProp(index, 'stats', stats);
                  } catch {}
                }}
                placeholder='[{"label": "Customers", "value": "5.8 Lacs +", "icon": "👥"}]'
                rows={5}
              />
            </div>
          </div>
        );
      case 'featuredServices':
        return (
          <div className="space-y-3">
            {commonFields}
            <div>
              <label className="text-sm font-medium mb-1 block">Featured Services Data (JSON)</label>
              <Textarea
                value={JSON.stringify(block.props.services || [], null, 2)}
                onChange={(e) => {
                  try {
                    const services = JSON.parse(e.target.value);
                    updateBlockProp(index, 'services', services);
                  } catch {}
                }}
                placeholder='[{"title": "Home Loan", "description": "Turn your dream home into reality", "featured": true, "image": "https://example.com/image.jpg"}]'
                rows={5}
              />
            </div>
          </div>
        );
      case 'creditCardBanner':
        return (
          <div className="space-y-3">
            {commonFields}
            <div>
              <label className="text-sm font-medium mb-1 block">CTA Text</label>
              <Input
                value={block.props.ctaText || ''}
                onChange={(e) => updateBlockProp(index, 'ctaText', e.target.value)}
                placeholder="Apply Now"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">CTA Link</label>
              <Input
                value={block.props.ctaLink || ''}
                onChange={(e) => updateBlockProp(index, 'ctaLink', e.target.value)}
                placeholder="/credit-cards"
              />
            </div>
          </div>
        );
      default:
        return commonFields;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <AdminLayout title="Pages Management">
      <div className="flex gap-8 h-[calc(100vh-120px)]">
        {/* Pages List - Enhanced */}
        <div className="w-80 flex-shrink-0">
          <Card className="p-6 h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Pages</h3>
              <div className="flex gap-2">
                <Input
                  placeholder="/new-page"
                  value={newPageSlug}
                  onChange={(e) => setNewPageSlug(e.target.value)}
                  className="w-28 h-9 text-sm"
                />
                <Button size="sm" onClick={handleCreatePage} className="h-9">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-240px)]">
              {pages.map((page) => (
                <Button
                  key={page._id}
                  variant={selectedPage?._id === page._id ? "default" : "ghost"}
                  className="w-full justify-start text-left p-4 h-auto hover:bg-gray-50 transition-colors"
                  onClick={() => setSelectedPage(page)}
                >
                  <div className="flex items-start gap-3 w-full">
                    <FileText className="w-5 h-5 mt-0.5 flex-shrink-0 text-gray-500" />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm truncate">
                        {page.slug === '/' ? 'Home Page' : (page.title || page.slug)}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{page.slug}</div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          page.status === 'published' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {page.status}
                        </span>
                        <span className="text-xs text-gray-400">
                          {page.blocks?.length || 0} blocks
                        </span>
                      </div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </Card>
        </div>

        {/* Page Editor - Enhanced */}
        <div className="flex-1 overflow-hidden">
          {selectedPage ? (
            <div className="h-full flex flex-col">
              {/* Header with actions */}
              <div className="bg-white border-b p-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedPage.slug === '/' ? 'Home Page' : (selectedPage.title || 'Untitled Page')}
                  </h2>
                  <p className="text-gray-500 mt-1">{selectedPage.slug}</p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" onClick={() => window.open(selectedPage.slug, '_blank')}>
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button onClick={handleSavePage} disabled={saving} className="bg-blue-600 hover:bg-blue-700">
                    {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                    Save Changes
                  </Button>
                </div>
              </div>

              {/* Content area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Page Settings */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Page Settings</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block text-gray-700">Page Title</label>
                      <Input
                        value={selectedPage.title || ''}
                        onChange={(e) => setSelectedPage({...selectedPage, title: e.target.value})}
                        placeholder="Enter page title"
                        className="h-10"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block text-gray-700">URL Slug</label>
                      <Input
                        value={selectedPage.slug}
                        onChange={(e) => setSelectedPage({...selectedPage, slug: e.target.value})}
                        placeholder="/page-url"
                        className="h-10"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block text-gray-700">Status</label>
                      <Select
                        value={selectedPage.status}
                        onValueChange={(value) => setSelectedPage({...selectedPage, status: value})}
                      >
                        <SelectTrigger className="h-10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block text-gray-700">Template</label>
                      <Select
                        value={selectedPage.template || 'default'}
                        onValueChange={(value) => setSelectedPage({...selectedPage, template: value})}
                      >
                        <SelectTrigger className="h-10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">Default</SelectItem>
                          <SelectItem value="home">Home</SelectItem>
                          <SelectItem value="service">Service</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block text-gray-700">SEO Title</label>
                      <Input
                        value={selectedPage.seo?.metaTitle || ''}
                        onChange={(e) => setSelectedPage({
                          ...selectedPage, 
                          seo: {...selectedPage.seo, metaTitle: e.target.value}
                        })}
                        placeholder="SEO optimized title"
                        className="h-10"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block text-gray-700">SEO Description</label>
                      <Textarea
                        value={selectedPage.seo?.metaDescription || ''}
                        onChange={(e) => setSelectedPage({
                          ...selectedPage, 
                          seo: {...selectedPage.seo, metaDescription: e.target.value}
                        })}
                        placeholder="Brief description for search engines"
                        rows={3}
                        className="resize-none"
                      />
                    </div>
                  </div>
                </Card>

                {/* Content Blocks */}
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Content Blocks</h3>
                    <Select onValueChange={addBlock}>
                      <SelectTrigger className="w-48 h-10">
                        <SelectValue placeholder="+ Add Content Block" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableBlockTypes.map(type => (
                          <SelectItem key={type} value={type}>
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                              {type.charAt(0).toUpperCase() + type.slice(1).replace(/([A-Z])/g, ' $1')}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    {selectedPage.blocks.map((block, index) => (
                      <Card key={index} className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                <span className="text-blue-600 font-semibold text-sm">{index + 1}</span>
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 capitalize">
                                  {block.type.replace(/([A-Z])/g, ' $1')} Block
                                </h4>
                                <p className="text-sm text-gray-500">
                                  {block.props.title || block.props.heading || 'No title set'}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setEditingBlock(editingBlock === index ? null : index)}
                                className="h-8 w-8 p-0"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeBlock(index)}
                                className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          {editingBlock === index && (
                            <div className="border-t bg-gray-50 -mx-4 -mb-4 p-6 mt-4">
                              <div className="bg-white rounded-lg p-4 border">
                                {renderBlockEditor(block, index)}
                              </div>
                            </div>
                          )}
                        </div>
                      </Card>
                    ))}
                    
                    {selectedPage.blocks.length === 0 && (
                      <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed">
                        <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <h3 className="text-lg font-medium mb-2">No content blocks yet</h3>
                        <p className="text-sm">Start building your page by adding content blocks above.</p>
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            </div>
          ) : (
            <Card className="p-12 text-center h-full flex items-center justify-center">
              <div>
                <FileText className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">Select a Page to Edit</h3>
                <p className="text-gray-500 max-w-md">Choose a page from the sidebar to start editing its content, settings, and layout blocks.</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default PagesAdmin;