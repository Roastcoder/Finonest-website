import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Star, Phone, Mail, MapPin, ArrowRight, CheckCircle } from 'lucide-react';

interface DynamicComponentProps {
  type: string;
  data: any;
  theme?: any;
  className?: string;
}

const DynamicComponent: React.FC<DynamicComponentProps> = ({ type, data, theme = {}, className = '' }) => {
  const renderComponent = () => {
    switch (type) {
      case 'hero':
        return (
          <section 
            className={`relative py-20 px-6 text-center ${className}`}
            style={{ 
              backgroundColor: theme.primary_color || '#3B82F6',
              color: theme.text_color || '#FFFFFF',
              backgroundImage: data.backgroundImage ? `url(${data.backgroundImage})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="container mx-auto max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {data.title || 'Welcome to Our Platform'}
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                {data.subtitle || 'Your success is our mission'}
              </p>
              {data.ctaText && (
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-3"
                  style={{ backgroundColor: theme.accent_color || '#F59E0B' }}
                  onClick={() => window.location.href = data.ctaLink || '/apply'}
                >
                  {data.ctaText}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              )}
            </div>
          </section>
        );

      case 'services':
        return (
          <section className={`py-16 px-6 ${className}`} style={{ backgroundColor: theme.background_color || '#FFFFFF' }}>
            <div className="container mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: theme.text_color || '#1F2937' }}>
                {data.title || 'Our Services'}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(data.services || []).map((service: any, index: number) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center" 
                           style={{ backgroundColor: theme.accent_color || '#F59E0B' }}>
                        {service.icon && <span className="text-white text-xl">{service.icon}</span>}
                      </div>
                      <CardTitle>{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{service.description}</p>
                      {service.features && (
                        <ul className="space-y-2">
                          {service.features.map((feature: string, idx: number) => (
                            <li key={idx} className="flex items-center text-sm">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      )}
                      {service.link && (
                        <Button variant="outline" className="mt-4 w-full" onClick={() => window.location.href = service.link}>
                          Learn More
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        );

      case 'testimonials':
        return (
          <section 
            className={`py-16 px-6 ${className}`} 
            style={{ backgroundColor: theme.secondary_color || '#10B981', color: '#FFFFFF' }}
          >
            <div className="container mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                {data.title || 'What Our Customers Say'}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(data.testimonials || []).map((testimonial: any, index: number) => (
                  <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
                    <CardContent className="p-6">
                      <div className="flex mb-4">
                        {[...Array(testimonial.rating || 5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="mb-4 italic">"{testimonial.text}"</p>
                      <div className="flex items-center">
                        {testimonial.avatar && (
                          <img src={testimonial.avatar} alt={testimonial.name} className="w-10 h-10 rounded-full mr-3" />
                        )}
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          {testimonial.title && <p className="text-sm opacity-80">{testimonial.title}</p>}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        );

      case 'stats':
        return (
          <section className={`py-16 px-6 ${className}`} style={{ backgroundColor: theme.background_color || '#FFFFFF' }}>
            <div className="container mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {(data.stats || []).map((stat: any, index: number) => (
                  <div key={index}>
                    <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: theme.primary_color || '#3B82F6' }}>
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'contact':
        return (
          <section className={`py-16 px-6 ${className}`} style={{ backgroundColor: theme.background_color || '#FFFFFF' }}>
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: theme.text_color || '#1F2937' }}>
                {data.title || 'Get In Touch'}
              </h2>
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    {data.phone && (
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 mr-3" style={{ color: theme.primary_color }} />
                        <span>{data.phone}</span>
                      </div>
                    )}
                    {data.email && (
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 mr-3" style={{ color: theme.primary_color }} />
                        <span>{data.email}</span>
                      </div>
                    )}
                    {data.address && (
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 mr-3" style={{ color: theme.primary_color }} />
                        <span>{data.address}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <form className="space-y-4">
                    {(data.fields || ['name', 'email', 'message']).map((field: string) => (
                      <div key={field}>
                        <label className="block text-sm font-medium mb-1 capitalize">{field}</label>
                        {field === 'message' ? (
                          <textarea 
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={4}
                            placeholder={`Enter your ${field}`}
                          />
                        ) : (
                          <input 
                            type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder={`Enter your ${field}`}
                          />
                        )}
                      </div>
                    ))}
                    <Button 
                      type="submit" 
                      className="w-full"
                      style={{ backgroundColor: theme.primary_color || '#3B82F6' }}
                    >
                      Send Message
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        );

      case 'text_block':
        return (
          <section className={`py-8 px-6 ${className}`}>
            <div className="container mx-auto">
              <div 
                className={`prose max-w-none text-${data.alignment || 'left'}`}
                style={{ 
                  fontSize: data.fontSize || theme.font_size_base || '16px',
                  color: data.color || theme.text_color || '#1F2937'
                }}
                dangerouslySetInnerHTML={{ __html: data.content || '' }}
              />
            </div>
          </section>
        );

      case 'image_gallery':
        return (
          <section className={`py-16 px-6 ${className}`}>
            <div className="container mx-auto">
              <div className={`grid gap-4 ${
                data.layout === 'masonry' ? 'columns-1 md:columns-2 lg:columns-3' : 
                `grid-cols-1 md:grid-cols-${Math.min(data.columns || 3, 4)}`
              }`}>
                {(data.images || []).map((image: any, index: number) => (
                  <div key={index} className="relative group overflow-hidden rounded-lg">
                    <img 
                      src={image.url} 
                      alt={image.alt || `Gallery image ${index + 1}`}
                      className="w-full h-auto object-cover transition-transform group-hover:scale-105"
                    />
                    {image.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-3">
                        <p className="text-sm">{image.caption}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'cta_banner':
        return (
          <section 
            className={`py-16 px-6 text-center ${className}`}
            style={{ backgroundColor: theme.primary_color || '#3B82F6', color: '#FFFFFF' }}
          >
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {data.title || 'Ready to Get Started?'}
              </h2>
              <p className="text-xl mb-8 opacity-90">
                {data.description || 'Join thousands of satisfied customers'}
              </p>
              <Button 
                size="lg" 
                className="text-lg px-8 py-3"
                style={{ backgroundColor: theme.accent_color || '#F59E0B' }}
                onClick={() => window.location.href = data.buttonLink || '/apply'}
              >
                {data.buttonText || 'Apply Now'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </section>
        );

      default:
        return (
          <div className={`p-8 border-2 border-dashed border-gray-300 text-center ${className}`}>
            <p className="text-gray-500">Unknown component type: {type}</p>
            <p className="text-sm text-gray-400 mt-2">Component data: {JSON.stringify(data, null, 2)}</p>
          </div>
        );
    }
  };

  return <div className="dynamic-component">{renderComponent()}</div>;
};

export default DynamicComponent;