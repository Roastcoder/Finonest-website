import { Link } from 'react-router-dom';

interface Block {
  type: string;
  props: Record<string, any>;
}

interface DynamicBlockProps {
  block: Block;
}

const DynamicBlock = ({ block }: DynamicBlockProps) => {
  switch (block.type) {
    case 'hero':
      return (
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
          <div className="container relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                {block.props.badgeText}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
                {block.props.heading}
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {block.props.subheading}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                {block.props.ctas?.map((cta: any, index: number) => (
                  <a key={index} href={cta.link} className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                    {cta.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      );
    case 'stats':
      return (
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                {block.props.title}
              </h2>
              {block.props.subtitle && (
                <p className="text-lg text-muted-foreground">{block.props.subtitle}</p>
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {block.props.stats?.map((stat: any, index: number) => (
                <div key={index} className="text-center">
                  <div className="text-4xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    case 'whyUs':
      return (
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                {block.props.title}
              </h2>
              {block.props.subtitle && (
                <p className="text-lg text-muted-foreground">{block.props.subtitle}</p>
              )}
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {block.props.features?.map((feature: any, index: number) => (
                <div key={index} className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all group">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    case 'testimonials':
      return (
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                {block.props.title}
              </h2>
              {block.props.subtitle && (
                <p className="text-lg text-muted-foreground">{block.props.subtitle}</p>
              )}
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {block.props.testimonials?.map((testimonial: any, index: number) => (
                <div key={index} className="bg-card p-6 rounded-xl border border-border hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
                      {testimonial.avatar ? (
                        <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <span className="text-xl font-bold text-primary-foreground">
                          {testimonial.name?.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground">{testimonial.name}</h3>
                      <div className="text-primary text-sm font-medium mb-3">{testimonial.role}</div>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {testimonial.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    default:
      return null;
  }
};

export default DynamicBlock;