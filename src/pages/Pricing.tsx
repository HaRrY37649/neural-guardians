
import React from 'react';
import { Shield, Check, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import FadeIn from '@/components/animations/FadeIn';
import { Link } from 'react-router-dom';

const pricingPlans = [
  {
    name: 'Basic',
    description: 'Essential security checks for individual developers',
    price: '$29',
    period: 'monthly',
    color: 'bg-blue-50 dark:bg-blue-950',
    buttonVariant: 'outline' as const,
    features: [
      'Up to 5 security scans per month',
      'Basic vulnerability detection',
      'PDF reports',
      'Email support',
    ],
    mostPopular: false,
  },
  {
    name: 'Professional',
    description: 'Advanced protection for professional teams and startups',
    price: '$79',
    period: 'monthly',
    color: 'bg-neural-primary/10',
    buttonVariant: 'default' as const,
    features: [
      'Up to 20 security scans per month',
      'Advanced vulnerability detection',
      'Detailed recommendations',
      'Interactive reports',
      'Priority email support',
      'API access',
    ],
    mostPopular: true,
  },
  {
    name: 'Enterprise',
    description: 'Maximum security for large-scale projects and organizations',
    price: '$199',
    period: 'monthly',
    color: 'bg-purple-50 dark:bg-purple-950',
    buttonVariant: 'outline' as const,
    features: [
      'Unlimited security scans',
      'Complete vulnerability detection',
      'Custom security rules',
      'Dedicated account manager',
      'Phone and email support',
      'Advanced API access',
      'Multi-chain integration',
    ],
    mostPopular: false,
  },
];

const Pricing = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 pt-24">
        <section className="container py-12 md:py-24">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Simple, Transparent Pricing
              </h1>
              <p className="text-xl text-muted-foreground">
                Choose the perfect plan for your Web3 security needs
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
            {pricingPlans.map((plan, index) => (
              <FadeIn delay={index * 0.1} key={plan.name}>
                <div className={`relative rounded-2xl ${plan.color} h-full border border-border p-8 shadow-sm transition-all hover:shadow-md flex flex-col`}>
                  {plan.mostPopular && (
                    <div className="absolute -top-4 inset-x-0 flex justify-center">
                      <span className="bg-neural-primary px-3 py-1 text-xs font-medium text-white rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="mb-5 flex items-center gap-2">
                    {plan.name === 'Basic' ? (
                      <Shield className="h-6 w-6 text-neural-primary" />
                    ) : plan.name === 'Professional' ? (
                      <Shield className="h-6 w-6 text-neural-primary" />
                    ) : (
                      <Zap className="h-6 w-6 text-neural-accent" />
                    )}
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-5">
                    {plan.description}
                  </p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                  
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <Check className="h-5 w-5 text-neural-primary shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button variant={plan.buttonVariant} size="lg" className="w-full" asChild>
                    <Link to="/signup">
                      Get Started
                    </Link>
                  </Button>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mt-16 p-8 rounded-xl glass-card">
              <h2 className="text-2xl font-bold mb-4">Need a Custom Solution?</h2>
              <p className="text-muted-foreground mb-6">
                Contact our team to discuss your specific security requirements
              </p>
              <Button variant="outline" asChild>
                <a href="mailto:contact@neuralguard.ai">Contact Sales</a>
              </Button>
            </div>
          </FadeIn>
        </section>
      </main>
    </div>
  );
};

export default Pricing;
